import {
  Profile,
  ResumeAnalysis,
  CareerRoadmap,
  MockInterview,
  ProjectRecommendation,
  UserProgress,
} from "@/types/database.types";

export const MOCK_USER_PROFILE: Profile = {
  id: "mock-user-123",
  full_name: "Alex Rivera",
  email: "alex.rivera@example.com",
  avatar_url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
  education_level: "B.S. in Computer Science",
  current_role: "Aspiring Full Stack Engineer",
  years_of_experience: 1,
  created_at: new Date(Date.now() - 30 * 86400000).toISOString(),
  updated_at: new Date().toISOString(),
};

export const MOCK_RESUME_ANALYSIS: ResumeAnalysis = {
  id: "analysis-mock-001",
  user_id: "mock-user-123",
  overall_score: 82,
  ats_compatibility_score: 88,
  parsed_info: {
    name: "Alex Rivera",
    email: "alex.rivera@example.com",
    phone: "+1 (555) 234-5678",
    education: [
      {
        degree: "B.S. in Computer Science",
        school: "State University",
        year: "2024",
      },
    ],
    skills: [
      "JavaScript",
      "TypeScript",
      "React",
      "Node.js",
      "Tailwind CSS",
      "Git",
      "PostgreSQL",
      "REST APIs",
    ],
    experience: [
      {
        title: "Frontend Intern",
        company: "TechPulse Solutions",
        duration: "Jun 2023 - Aug 2023",
        bullets: [
          "Developed reusable UI components in React and TypeScript.",
          "Collaborated with backend engineers to integrate GraphQL endpoints.",
          "Boosted page load speed by 24% via lazy loading images.",
        ],
      },
    ],
    certifications: ["Meta Front-End Developer Professional Certificate"],
  },
  technical_strengths: [
    "Strong core TypeScript & modern React component design",
    "Clean Git version control & CI workflow exposure",
    "Solid relational database foundations (PostgreSQL)",
    "Demonstrated performance optimization awareness",
  ],
  missing_skills: [
    "Docker / Containerization tooling",
    "Automated end-to-end testing (Playwright / Cypress)",
    "Cloud infrastructure experience (AWS/GCP/Vercel)",
    "Distributed caching (Redis)",
  ],
  experience_critique: {
    strengths: [
      "Quantifiable performance metrics cited (24% speed improvement).",
      "Action-oriented verbs at the beginning of experience bullets.",
    ],
    areas_for_improvement: [
      "Add scope and scale of users impacted by the UI components.",
      "Detail automated testing practices utilized in production.",
    ],
    bullet_improvements: [
      {
        original: "Developed reusable UI components in React and TypeScript.",
        improved:
          "Architected 18+ reusable React & TypeScript components across 4 client modules, standardizing design patterns and cutting dev time by 30%.",
        reason:
          "Includes exact component count, scope of modules, and business efficiency impact.",
      },
    ],
  },
  project_critique: {
    strengths: [
      "Good diversity of web applications and state management.",
      "Live deployment links included.",
    ],
    missing_elements: [
      "Missing architectural diagrams or clear API contract descriptions.",
      "Include unit test coverage badges in GitHub repositories.",
    ],
  },
  improvement_recommendations: [
    "Incorporate containerization keywords (Docker, Docker Compose) into your technical skills summary.",
    "Format job headers consistently: Role, Company, Location, and Exact Month/Year.",
    "Add a dedicated 'Leadership & Extracurricular' section to highlight soft skills.",
  ],
  suggested_roles: [
    "Junior Full Stack Developer",
    "Frontend Engineer (React/Next.js)",
    "Software Engineer - Early Career",
    "Web Application Developer",
  ],
  actionable_next_steps: [
    "Build a production-grade full-stack project utilizing Docker and Next.js 14 App Router.",
    "Write comprehensive unit and integration tests using Vitest and Playwright.",
    "Take 2 mock behavioral interviews to refine STAR storytelling.",
  ],
  created_at: new Date(Date.now() - 2 * 86400000).toISOString(),
};

export const MOCK_ROADMAP: CareerRoadmap = {
  id: "roadmap-mock-001",
  user_id: "mock-user-123",
  target_role: "Full Stack Developer",
  difficulty_level: "Intermediate",
  estimated_weeks: 14,
  total_stages: 3,
  current_stage: 2,
  completion_percentage: 58,
  created_at: new Date(Date.now() - 14 * 86400000).toISOString(),
  updated_at: new Date().toISOString(),
  tasks: [
    {
      id: "task-01",
      roadmap_id: "roadmap-mock-001",
      stage_number: 1,
      stage_name: "Stage 1: Core Fundamentals & TypeScript Mastery",
      title: "Master Advanced TypeScript & Generic Patterns",
      description:
        "Understand utility types (Pick, Omit, Record), conditional types, discriminated unions, and strict typing with Zod schemas.",
      task_type: "skill",
      resource_url: "https://www.typescriptlang.org/docs/handbook/2/types-from-types.html",
      estimated_hours: 8,
      is_completed: true,
      completed_at: new Date(Date.now() - 10 * 86400000).toISOString(),
      created_at: new Date().toISOString(),
    },
    {
      id: "task-02",
      roadmap_id: "roadmap-mock-001",
      stage_number: 1,
      stage_name: "Stage 1: Core Fundamentals & TypeScript Mastery",
      title: "Next.js App Router Architecture Deep-Dive",
      description:
        "Implement Server Components, Client boundaries, Server Actions, Route Handlers, and streaming Suspense wrappers.",
      task_type: "resource",
      resource_url: "https://nextjs.org/docs/app",
      estimated_hours: 12,
      is_completed: true,
      completed_at: new Date(Date.now() - 7 * 86400000).toISOString(),
      created_at: new Date().toISOString(),
    },
    {
      id: "task-03",
      roadmap_id: "roadmap-mock-001",
      stage_number: 2,
      stage_name: "Stage 2: Backend, Security & Cloud Database",
      title: "PostgreSQL Modeling & Row Level Security (RLS)",
      description:
        "Design normalized relational schemas, configure foreign key cascading, and write secure RLS authorization policies in Supabase.",
      task_type: "exercise",
      resource_url: "https://supabase.com/docs/guides/auth/row-level-security",
      estimated_hours: 10,
      is_completed: true,
      completed_at: new Date(Date.now() - 2 * 86400000).toISOString(),
      created_at: new Date().toISOString(),
    },
    {
      id: "task-04",
      roadmap_id: "roadmap-mock-001",
      stage_number: 2,
      stage_name: "Stage 2: Backend, Security & Cloud Database",
      title: "Implement Production Authentication & Cookie Middleware",
      description:
        "Configure SSR token verification, session refreshing, and route interception using Next.js middleware.",
      task_type: "skill",
      resource_url: "https://supabase.com/docs/guides/auth/server-side/nextjs",
      estimated_hours: 8,
      is_completed: false,
      completed_at: null,
      created_at: new Date().toISOString(),
    },
    {
      id: "task-05",
      roadmap_id: "roadmap-mock-001",
      stage_number: 3,
      stage_name: "Stage 3: DevOps, AI Integration & Capstone Deployment",
      title: "Deploy Containerized Next.js App to Vercel/Cloud",
      description:
        "Set up production environment variables, custom domains, and automated CI/CD checks via GitHub Actions.",
      task_type: "project",
      resource_url: "https://vercel.com/docs",
      estimated_hours: 15,
      is_completed: false,
      completed_at: null,
      created_at: new Date().toISOString(),
    },
    {
      id: "task-06",
      roadmap_id: "roadmap-mock-001",
      stage_number: 3,
      stage_name: "Stage 3: DevOps, AI Integration & Capstone Deployment",
      title: "Integrate Gemini AI with Server-Side Fallback Mechanisms",
      description:
        "Build prompt templates with structured JSON schemas, token management, and Zod response validation.",
      task_type: "skill",
      resource_url: "https://ai.google.dev/gemini-api/docs",
      estimated_hours: 10,
      is_completed: false,
      completed_at: null,
      created_at: new Date().toISOString(),
    },
  ],
};

export const MOCK_SKILL_GAP_DATA = {
  targetRole: "Full Stack Developer",
  matchPercentage: 74,
  readinessLevel: "Job-Ready with Minor Gap Bridging",
  benchmarkSkills: [
    { skill: "React & Next.js", userLevel: 85, benchmark: 80, status: "strong" },
    { skill: "TypeScript", userLevel: 80, benchmark: 75, status: "strong" },
    { skill: "Tailwind CSS", userLevel: 90, benchmark: 70, status: "strong" },
    { skill: "PostgreSQL & RLS", userLevel: 70, benchmark: 75, status: "partial" },
    { skill: "REST & Server Actions", userLevel: 75, benchmark: 80, status: "partial" },
    { skill: "Docker & Containers", userLevel: 30, benchmark: 70, status: "missing" },
    { skill: "CI/CD & GitHub Actions", userLevel: 45, benchmark: 65, status: "partial" },
    { skill: "End-to-End Testing", userLevel: 25, benchmark: 60, status: "missing" },
  ],
  priorityActions: [
    {
      skill: "Docker & Containerization",
      importance: "High Priority",
      estimatedHours: 6,
      recommendation: "Build a multi-stage Dockerfile for a Next.js application and run it with local PostgreSQL using Docker Compose.",
    },
    {
      skill: "End-to-End Testing (Playwright)",
      importance: "Medium Priority",
      estimatedHours: 8,
      recommendation: "Write 5 automated tests for auth flows, forms, and mock interview submission to guarantee zero regression.",
    },
    {
      skill: "Database Indexing & Optimization",
      importance: "Medium Priority",
      estimatedHours: 4,
      recommendation: "Analyze query execution plans with EXPLAIN ANALYZE on Supabase PostgreSQL tables.",
    },
  ],
};

export const MOCK_INTERVIEW_SESSION: MockInterview = {
  id: "interview-mock-001",
  user_id: "mock-user-123",
  job_role: "Full Stack Engineer",
  interview_type: "mixed",
  difficulty: "entry",
  total_questions: 3,
  completed_questions: 3,
  overall_score: 84,
  overall_feedback: {
    strengths: [
      "Articulated component lifecycle and React re-rendering principles clearly.",
      "Effective use of the STAR method on behavioral teamwork question.",
      "Demonstrated good awareness of API security and token protection.",
    ],
    areas_for_improvement: [
      "Elaborate further on database connection pooling and caching strategies.",
      "Provide more concrete numbers on system throughput and response times.",
    ],
    summary:
      "Strong performance demonstrating clear conceptual foundations and positive communicative structure. Ready for associate technical screening calls.",
  },
  status: "completed",
  created_at: new Date(Date.now() - 86400000).toISOString(),
  completed_at: new Date(Date.now() - 84000000).toISOString(),
  answers: [
    {
      id: "ans-01",
      interview_id: "interview-mock-001",
      question_number: 1,
      question_text: "Can you explain the difference between Server and Client Components in Next.js App Router, and when you would choose each?",
      question_category: "Technical Architecture",
      user_answer:
        "Server Components render solely on the server and do not ship JavaScript to the browser, making them ideal for data fetching and keeping secrets safe. Client Components use the 'use client' directive when interactivity, state (useState), or browser APIs are required.",
      score: 88,
      strengths: "Crisp definition of bundle size implications and security boundaries.",
      weaknesses: "Could have mentioned streaming and Suspense boundaries as another advantage.",
      suggested_star_answer:
        "In Next.js App Router, Server Components run exclusively on the server, producing static or streamed HTML with zero client-side JavaScript overhead. They should be the default for data fetching, secret handling, and markdown rendering. In contrast, Client Components are designated with the 'use client' boundary and are required whenever components need user interactions (onClick), React hooks (useState, useEffect), or browser APIs.",
      metrics: {
        relevance: 95,
        technical_accuracy: 90,
        clarity: 88,
        structure: 85,
      },
      created_at: new Date().toISOString(),
    },
    {
      id: "ans-02",
      interview_id: "interview-mock-001",
      question_number: 2,
      question_text: "Describe a challenging bug you encountered in a recent project and how you diagnosed and resolved it.",
      question_category: "Behavioral & Problem Solving",
      user_answer:
        "In our team project, we had an infinite loop of re-renders caused by an un-memoized object passed into a useEffect dependency array. I used React DevTools Profiler to pinpoint the repeating render cycles, wrapped the configuration in useMemo, and added lint rules to prevent recurrence.",
      score: 85,
      strengths: "Clear diagnosis methodology (React DevTools) and preventative solution.",
      weaknesses: "Could briefly state the user impact before the fix.",
      suggested_star_answer:
        "Situation: During our final semester project, our dashboard became sluggish, locking up client browsers.\nTask: I was assigned to diagnose the performance regression.\nAction: Using React DevTools Profiler, I traced the issue to an un-memoized object dependency triggering infinite state updates in a child chart component. I refactored the data derivation with useMemo and configured strict ESLint hooks rules.\nResult: CPU utilization dropped by 70% and memory usage stabilized.",
      metrics: {
        relevance: 90,
        technical_accuracy: 86,
        clarity: 84,
        structure: 88,
      },
      created_at: new Date().toISOString(),
    },
    {
      id: "ans-03",
      interview_id: "interview-mock-001",
      question_number: 3,
      question_text: "How do you ensure security when storing and accessing user data in a modern cloud database?",
      question_category: "Security & Database",
      user_answer:
        "By enforcing Row Level Security (RLS) on PostgreSQL, validating all inputs with schemas like Zod, never exposing service role keys in client code, and hashing passwords using industry standards.",
      score: 80,
      strengths: "Mentions defense-in-depth principles: RLS, validation, and key separation.",
      weaknesses: "Brief on SQL injection prevention and ORM parameterized queries.",
      suggested_star_answer:
        "Security requires defense in depth: First, enable PostgreSQL Row Level Security (RLS) so the database itself checks auth.uid() = user_id on every query. Second, keep service-role keys server-side only. Third, sanitize and validate every request body using Zod. Finally, enforce HTTPS, parameterized queries to prevent SQL injections, and secure HTTP-only cookies for session management.",
      metrics: {
        relevance: 85,
        technical_accuracy: 82,
        clarity: 80,
        structure: 80,
      },
      created_at: new Date().toISOString(),
    },
  ],
};

export const MOCK_PROJECT_RECOMMENDATIONS: ProjectRecommendation[] = [
  {
    id: "proj-01",
    user_id: "mock-user-123",
    title: "AI Collaborative Markdown Workspace with Real-Time RLS",
    category: "portfolio",
    target_role: "Full Stack Developer",
    problem_statement:
      "Most markdown editors lack fine-grained team permission controls and contextual AI drafting without leaking sensitive enterprise data.",
    description:
      "Build a real-time markdown editor with document versioning, live presence, Supabase Row Level Security permissions, and Gemini AI auto-completion.",
    tech_stack: ["Next.js 14", "TypeScript", "Tailwind CSS", "Supabase", "Gemini API", "TipTap"],
    key_features: [
      "Real-time multi-user document presence and editing",
      "Per-document granular sharing with PostgreSQL RLS policies",
      "Context-aware Gemini drafting and summarization helper",
      "Export to clean PDF, Markdown, and HTML formats",
    ],
    estimated_hours: 24,
    difficulty_level: "Intermediate",
    learning_outcomes: [
      "Master WebSocket / Realtime channels with Supabase",
      "Implement multi-tenant authorization policies",
      "Integrate generative AI within rich-text editors",
    ],
    implementation_steps: [
      { step: 1, title: "Schema Design", description: "Create documents and permissions tables with RLS triggers." },
      { step: 2, title: "Editor Setup", description: "Configure TipTap editor with markdown extensions and toolbar." },
      { step: 3, title: "AI Assistant", description: "Wire server actions to Gemini API for inline prompt expansions." },
      { step: 4, title: "Export & Polish", description: "Build export pipelines and verify mobile responsiveness." },
    ],
    future_improvements: ["Add offline sync with IndexedDB", "Include collaborative commenting threads"],
    is_bookmarked: true,
    status: "in_progress",
    created_at: new Date(Date.now() - 5 * 86400000).toISOString(),
  },
  {
    id: "proj-02",
    user_id: "mock-user-123",
    title: "DevPulse — Automated GitHub CI Metrics & Team Velocity Visualizer",
    category: "portfolio",
    target_role: "Full Stack Engineer",
    problem_statement:
      "Engineering managers often struggle to visualize PR cycle time, test flakiness, and deployment frequencies across multiple repositories.",
    description:
      "A developer productivity dashboard connecting to GitHub webhooks to calculate DORA metrics (Deployment Frequency, Lead Time for Changes, Time to Restore, Change Failure Rate).",
    tech_stack: ["Next.js", "TypeScript", "Recharts", "PostgreSQL", "GitHub REST API", "Docker"],
    key_features: [
      "Webhook intake for pull request, build, and release events",
      "Interactive DORA metric charts rendered with Recharts",
      "Automated weekly velocity summary generated via AI",
      "Dockerized microservice deployment",
    ],
    estimated_hours: 32,
    difficulty_level: "Advanced",
    learning_outcomes: [
      "Process asynchronous webhooks with cryptographic signature verification",
      "Calculate complex rolling time-series metrics in SQL",
      "Deploy containerized production apps",
    ],
    implementation_steps: [
      { step: 1, title: "Webhook Ingestion", description: "Set up Next.js route handler to receive and verify GitHub webhook payloads." },
      { step: 2, title: "Analytics Pipeline", description: "Aggregate build durations and PR merge intervals in PostgreSQL." },
      { step: 3, title: "Data Visualization", description: "Build interactive area and bar charts with Recharts." },
      { step: 4, title: "AI Digest", description: "Generate concise weekly engineering summaries with Gemini." },
    ],
    future_improvements: ["Slack / Discord notifications integration", "Support GitLab and Bitbucket webhooks"],
    is_bookmarked: false,
    status: "suggested",
    created_at: new Date(Date.now() - 3 * 86400000).toISOString(),
  },
  {
    id: "proj-03",
    user_id: "mock-user-123",
    title: "EcoTrack — Smart Campus Energy & Carbon Footprint Simulator",
    category: "hackathon",
    target_role: "Full Stack / Data Engineer",
    problem_statement:
      "University campuses waste up to 35% of peak energy due to lack of localized building usage insights.",
    description:
      "An IoT simulation and data visualization platform showing simulated campus building electricity consumption, carbon impact, and AI power-saving recommendations.",
    tech_stack: ["Next.js", "Tailwind CSS", "Recharts", "Gemini 1.5", "Zod"],
    key_features: [
      "Simulated real-time sensor streams with time controls",
      "Dynamic building efficiency scorecards and heatmaps",
      "AI recommendation engine for automated HVAC scheduling",
    ],
    estimated_hours: 18,
    difficulty_level: "Beginner",
    learning_outcomes: [
      "Build dynamic stateful dashboards with real-time UI updates",
      "Design clean visual hierarchy with Tailwind and Recharts",
    ],
    implementation_steps: [
      { step: 1, title: "Mock Generator", description: "Create mock sensor time-series generator." },
      { step: 2, title: "Dashboard Cards", description: "Implement metric cards and consumption graph." },
      { step: 3, title: "Recommendation Prompt", description: "Prompt Gemini for cost-effective facility actions." },
    ],
    future_improvements: ["Hardware integration with Raspberry Pi / ESP32"],
    is_bookmarked: true,
    status: "suggested",
    created_at: new Date(Date.now() - 1 * 86400000).toISOString(),
  },
];

export const MOCK_PROGRESS_HISTORY: UserProgress[] = [
  {
    id: "prog-01",
    user_id: "mock-user-123",
    log_date: "2024-10-01",
    readiness_score: 55,
    roadmap_tasks_completed: 1,
    interview_minutes_practiced: 15,
    projects_completed: 0,
    created_at: "2024-10-01T00:00:00Z",
  },
  {
    id: "prog-02",
    user_id: "mock-user-123",
    log_date: "2024-10-08",
    readiness_score: 62,
    roadmap_tasks_completed: 2,
    interview_minutes_practiced: 30,
    projects_completed: 0,
    created_at: "2024-10-08T00:00:00Z",
  },
  {
    id: "prog-03",
    user_id: "mock-user-123",
    log_date: "2024-10-15",
    readiness_score: 68,
    roadmap_tasks_completed: 3,
    interview_minutes_practiced: 45,
    projects_completed: 1,
    created_at: "2024-10-15T00:00:00Z",
  },
  {
    id: "prog-04",
    user_id: "mock-user-123",
    log_date: "2024-10-22",
    readiness_score: 75,
    roadmap_tasks_completed: 4,
    interview_minutes_practiced: 75,
    projects_completed: 1,
    created_at: "2024-10-22T00:00:00Z",
  },
  {
    id: "prog-05",
    user_id: "mock-user-123",
    log_date: "2024-10-29",
    readiness_score: 82,
    roadmap_tasks_completed: 5,
    interview_minutes_practiced: 110,
    projects_completed: 2,
    created_at: "2024-10-29T00:00:00Z",
  },
];
