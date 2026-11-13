-- AI CareerPilot Row Level Security (RLS) Policies

-- Function to handle updated_at timestamp
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc'::text, NOW());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply updated_at triggers
DROP TRIGGER IF EXISTS set_profiles_updated_at ON public.profiles;
CREATE TRIGGER set_profiles_updated_at
BEFORE UPDATE ON public.profiles
FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS set_career_goals_updated_at ON public.career_goals;
CREATE TRIGGER set_career_goals_updated_at
BEFORE UPDATE ON public.career_goals
FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS set_career_roadmaps_updated_at ON public.career_roadmaps;
CREATE TRIGGER set_career_roadmaps_updated_at
BEFORE UPDATE ON public.career_roadmaps
FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- Trigger to automatically insert a profile row when a user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, email, full_name, avatar_url)
    VALUES (
        NEW.id,
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
        COALESCE(NEW.raw_user_meta_data->>'avatar_url', '')
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Enable RLS on all 11 tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.career_goals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.resumes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.resume_analysis ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.career_roadmaps ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.roadmap_tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mock_interviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.interview_answers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_recommendations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_progress ENABLE ROW LEVEL SECURITY;

-- 1. PROFILES POLICIES
CREATE POLICY "Users can view their own profile"
ON public.profiles FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- 2. CAREER GOALS POLICIES
CREATE POLICY "Users can manage their career goals"
ON public.career_goals FOR ALL USING (auth.uid() = user_id);

-- 3. USER SKILLS POLICIES
CREATE POLICY "Users can manage their skills"
ON public.user_skills FOR ALL USING (auth.uid() = user_id);

-- 4. RESUMES POLICIES
CREATE POLICY "Users can manage their resumes"
ON public.resumes FOR ALL USING (auth.uid() = user_id);

-- 5. RESUME ANALYSIS POLICIES
CREATE POLICY "Users can view their resume analysis"
ON public.resume_analysis FOR ALL USING (auth.uid() = user_id);

-- 6. CAREER ROADMAPS POLICIES
CREATE POLICY "Users can manage their roadmaps"
ON public.career_roadmaps FOR ALL USING (auth.uid() = user_id);

-- 7. ROADMAP TASKS POLICIES
CREATE POLICY "Users can manage their roadmap tasks"
ON public.roadmap_tasks FOR ALL
USING (
    EXISTS (
        SELECT 1 FROM public.career_roadmaps
        WHERE career_roadmaps.id = roadmap_tasks.roadmap_id
        AND career_roadmaps.user_id = auth.uid()
    )
);

-- 8. MOCK INTERVIEWS POLICIES
CREATE POLICY "Users can manage their mock interviews"
ON public.mock_interviews FOR ALL USING (auth.uid() = user_id);

-- 9. INTERVIEW ANSWERS POLICIES
CREATE POLICY "Users can manage their interview answers"
ON public.interview_answers FOR ALL
USING (
    EXISTS (
        SELECT 1 FROM public.mock_interviews
        WHERE mock_interviews.id = interview_answers.interview_id
        AND mock_interviews.user_id = auth.uid()
    )
);

-- 10. PROJECT RECOMMENDATIONS POLICIES
CREATE POLICY "Users can manage their recommended projects"
ON public.project_recommendations FOR ALL USING (auth.uid() = user_id);

-- 11. USER PROGRESS POLICIES
CREATE POLICY "Users can manage their progress logs"
ON public.user_progress FOR ALL USING (auth.uid() = user_id);
