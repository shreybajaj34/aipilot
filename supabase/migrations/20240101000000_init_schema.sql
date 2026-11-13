-- AI CareerPilot Database Schema Migration
-- Enables UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. PROFILES TABLE (Linked to auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT,
    email TEXT,
    avatar_url TEXT,
    education_level TEXT DEFAULT 'Bachelor''s Degree',
    current_role TEXT DEFAULT 'Student / Job Seeker',
    years_of_experience INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 2. CAREER GOALS TABLE
CREATE TABLE IF NOT EXISTS public.career_goals (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    target_role TEXT NOT NULL,
    target_industry TEXT DEFAULT 'Technology',
    target_timeline_months INTEGER DEFAULT 6,
    daily_learning_minutes INTEGER DEFAULT 60,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 3. USER SKILLS TABLE
CREATE TABLE IF NOT EXISTS public.user_skills (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    skill_name TEXT NOT NULL,
    category TEXT CHECK (category IN ('technical', 'soft', 'tool')) DEFAULT 'technical',
    proficiency TEXT CHECK (proficiency IN ('beginner', 'intermediate', 'advanced')) DEFAULT 'beginner',
    verified_score INTEGER DEFAULT 50 CHECK (verified_score >= 0 AND verified_score <= 100),
    source TEXT DEFAULT 'manual',
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 4. RESUMES TABLE
CREATE TABLE IF NOT EXISTS public.resumes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    file_name TEXT NOT NULL,
    file_path TEXT NOT NULL,
    file_size_bytes INTEGER NOT NULL,
    raw_text TEXT,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 5. RESUME ANALYSIS TABLE
CREATE TABLE IF NOT EXISTS public.resume_analysis (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    resume_id UUID REFERENCES public.resumes(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    overall_score INTEGER NOT NULL CHECK (overall_score >= 0 AND overall_score <= 100),
    ats_compatibility_score INTEGER NOT NULL CHECK (ats_compatibility_score >= 0 AND ats_compatibility_score <= 100),
    parsed_info JSONB DEFAULT '{}'::jsonb,
    technical_strengths JSONB DEFAULT '[]'::jsonb,
    missing_skills JSONB DEFAULT '[]'::jsonb,
    experience_critique JSONB DEFAULT '{}'::jsonb,
    project_critique JSONB DEFAULT '{}'::jsonb,
    improvement_recommendations JSONB DEFAULT '[]'::jsonb,
    suggested_roles JSONB DEFAULT '[]'::jsonb,
    actionable_next_steps JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 6. CAREER ROADMAPS TABLE
CREATE TABLE IF NOT EXISTS public.career_roadmaps (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    target_role TEXT NOT NULL,
    difficulty_level TEXT DEFAULT 'intermediate',
    estimated_weeks INTEGER DEFAULT 12,
    total_stages INTEGER DEFAULT 3,
    current_stage INTEGER DEFAULT 1,
    completion_percentage INTEGER DEFAULT 0 CHECK (completion_percentage >= 0 AND completion_percentage <= 100),
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 7. ROADMAP TASKS TABLE
CREATE TABLE IF NOT EXISTS public.roadmap_tasks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    roadmap_id UUID NOT NULL REFERENCES public.career_roadmaps(id) ON DELETE CASCADE,
    stage_number INTEGER NOT NULL, -- 1: Beginner, 2: Intermediate, 3: Advanced
    stage_name TEXT NOT NULL,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    task_type TEXT CHECK (task_type IN ('skill', 'resource', 'exercise', 'project')) DEFAULT 'skill',
    resource_url TEXT,
    estimated_hours INTEGER DEFAULT 5,
    is_completed BOOLEAN DEFAULT FALSE,
    completed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 8. MOCK INTERVIEWS TABLE
CREATE TABLE IF NOT EXISTS public.mock_interviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    job_role TEXT NOT NULL,
    interview_type TEXT CHECK (interview_type IN ('technical', 'hr', 'behavioral', 'mixed')) DEFAULT 'mixed',
    difficulty TEXT CHECK (difficulty IN ('entry', 'mid', 'senior')) DEFAULT 'entry',
    total_questions INTEGER DEFAULT 5,
    completed_questions INTEGER DEFAULT 0,
    overall_score NUMERIC(5,2),
    overall_feedback JSONB DEFAULT '{}'::jsonb,
    status TEXT CHECK (status IN ('in_progress', 'completed', 'abandoned')) DEFAULT 'in_progress',
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    completed_at TIMESTAMPTZ
);

-- 9. INTERVIEW ANSWERS TABLE
CREATE TABLE IF NOT EXISTS public.interview_answers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    interview_id UUID NOT NULL REFERENCES public.mock_interviews(id) ON DELETE CASCADE,
    question_number INTEGER NOT NULL,
    question_text TEXT NOT NULL,
    question_category TEXT DEFAULT 'general',
    user_answer TEXT NOT NULL,
    score NUMERIC(5,2) DEFAULT 0,
    strengths TEXT,
    weaknesses TEXT,
    suggested_star_answer TEXT,
    metrics JSONB DEFAULT '{"relevance": 0, "technical_accuracy": 0, "clarity": 0, "structure": 0}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 10. PROJECT RECOMMENDATIONS TABLE
CREATE TABLE IF NOT EXISTS public.project_recommendations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    category TEXT CHECK (category IN ('beginner', 'intermediate', 'advanced', 'hackathon', 'portfolio')) DEFAULT 'portfolio',
    target_role TEXT NOT NULL,
    problem_statement TEXT NOT NULL,
    description TEXT NOT NULL,
    tech_stack JSONB DEFAULT '[]'::jsonb,
    key_features JSONB DEFAULT '[]'::jsonb,
    estimated_hours INTEGER DEFAULT 20,
    difficulty_level TEXT DEFAULT 'intermediate',
    learning_outcomes JSONB DEFAULT '[]'::jsonb,
    implementation_steps JSONB DEFAULT '[]'::jsonb,
    future_improvements JSONB DEFAULT '[]'::jsonb,
    is_bookmarked BOOLEAN DEFAULT FALSE,
    status TEXT CHECK (status IN ('suggested', 'in_progress', 'completed')) DEFAULT 'suggested',
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 11. USER PROGRESS TABLE
CREATE TABLE IF NOT EXISTS public.user_progress (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    log_date DATE DEFAULT CURRENT_DATE NOT NULL,
    readiness_score INTEGER DEFAULT 0 CHECK (readiness_score >= 0 AND readiness_score <= 100),
    roadmap_tasks_completed INTEGER DEFAULT 0,
    interview_minutes_practiced INTEGER DEFAULT 0,
    projects_completed INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Performance Indexes
CREATE INDEX IF NOT EXISTS idx_career_goals_user ON public.career_goals(user_id);
CREATE INDEX IF NOT EXISTS idx_user_skills_user ON public.user_skills(user_id);
CREATE INDEX IF NOT EXISTS idx_resumes_user ON public.resumes(user_id);
CREATE INDEX IF NOT EXISTS idx_resume_analysis_user ON public.resume_analysis(user_id);
CREATE INDEX IF NOT EXISTS idx_career_roadmaps_user ON public.career_roadmaps(user_id);
CREATE INDEX IF NOT EXISTS idx_roadmap_tasks_roadmap ON public.roadmap_tasks(roadmap_id);
CREATE INDEX IF NOT EXISTS idx_mock_interviews_user ON public.mock_interviews(user_id);
CREATE INDEX IF NOT EXISTS idx_interview_answers_interview ON public.interview_answers(interview_id);
CREATE INDEX IF NOT EXISTS idx_project_recommendations_user ON public.project_recommendations(user_id);
CREATE INDEX IF NOT EXISTS idx_user_progress_user ON public.user_progress(user_id);
