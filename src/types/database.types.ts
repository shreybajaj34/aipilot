export interface Profile {
  id: string;
  full_name: string | null;
  email: string | null;
  avatar_url: string | null;
  education_level: string | null;
  current_role: string | null;
  years_of_experience: number | null;
  created_at: string;
  updated_at: string;
}

export interface CareerGoal {
  id: string;
  user_id: string;
  target_role: string;
  target_industry?: string;
  target_timeline_months: number;
  daily_learning_minutes: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface UserSkill {
  id: string;
  user_id: string;
  skill_name: string;
  category: "technical" | "soft" | "tool";
  proficiency: "beginner" | "intermediate" | "advanced";
  verified_score?: number;
  source: "manual" | "resume_extract" | "test";
  created_at: string;
}

export interface Resume {
  id: string;
  user_id: string;
  file_name: string;
  file_path: string;
  file_size_bytes: number;
  raw_text?: string;
  created_at: string;
}

export interface ResumeAnalysis {
  id: string;
  resume_id?: string;
  user_id: string;
  overall_score: number;
  ats_compatibility_score: number;
  parsed_info: {
    name?: string;
    email?: string;
    phone?: string;
    education?: Array<{ degree: string; school: string; year?: string }>;
    experience?: Array<{ title: string; company: string; duration?: string; bullets?: string[] }>;
    skills?: string[];
    certifications?: string[];
  };
  technical_strengths: string[];
  missing_skills: string[];
  experience_critique: {
    strengths: string[];
    areas_for_improvement: string[];
    bullet_improvements: Array<{ original: string; improved: string; reason: string }>;
  };
  project_critique: {
    strengths: string[];
    missing_elements: string[];
  };
  improvement_recommendations: string[];
  suggested_roles: string[];
  actionable_next_steps: string[];
  created_at: string;
}

export interface CareerRoadmap {
  id: string;
  user_id: string;
  target_role: string;
  difficulty_level: string;
  estimated_weeks: number;
  total_stages: number;
  current_stage: number;
  completion_percentage: number;
  created_at: string;
  updated_at: string;
  tasks?: RoadmapTask[];
}

export interface RoadmapTask {
  id: string;
  roadmap_id: string;
  stage_number: number; // 1: Beginner, 2: Intermediate, 3: Advanced
  stage_name: string;
  title: string;
  description: string;
  task_type: "skill" | "resource" | "exercise" | "project";
  resource_url?: string;
  estimated_hours: number;
  is_completed: boolean;
  completed_at?: string | null;
  created_at: string;
}

export interface MockInterview {
  id: string;
  user_id: string;
  job_role: string;
  interview_type: "technical" | "hr" | "behavioral" | "mixed";
  difficulty: "entry" | "mid" | "senior";
  total_questions: number;
  completed_questions: number;
  overall_score: number | null;
  overall_feedback?: {
    strengths: string[];
    areas_for_improvement: string[];
    summary: string;
  } | null;
  status: "in_progress" | "completed" | "abandoned";
  created_at: string;
  completed_at?: string | null;
  answers?: InterviewAnswer[];
}

export interface InterviewAnswer {
  id: string;
  interview_id: string;
  question_number: number;
  question_text: string;
  question_category: string;
  user_answer: string;
  score: number;
  strengths: string;
  weaknesses: string;
  suggested_star_answer: string;
  metrics: {
    relevance: number;
    technical_accuracy: number;
    clarity: number;
    structure: number;
  };
  created_at: string;
}

export interface ProjectRecommendation {
  id: string;
  user_id: string;
  title: string;
  category: "beginner" | "intermediate" | "advanced" | "hackathon" | "portfolio";
  target_role: string;
  problem_statement: string;
  description: string;
  tech_stack: string[];
  key_features: string[];
  estimated_hours: number;
  difficulty_level: string;
  learning_outcomes: string[];
  implementation_steps: Array<{ step: number; title: string; description: string }>;
  future_improvements: string[];
  is_bookmarked: boolean;
  status: "suggested" | "in_progress" | "completed";
  created_at: string;
}

export interface UserProgress {
  id: string;
  user_id: string;
  log_date: string;
  readiness_score: number;
  roadmap_tasks_completed: number;
  interview_minutes_practiced: number;
  projects_completed: number;
  created_at: string;
}
