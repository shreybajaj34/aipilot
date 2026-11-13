# AI CareerPilot — API Documentation

This document describes all server-side Route Handlers, endpoints, expected payload schemas, and response formats.

---

## 1. Resume Analyzer
### `POST /api/resume/analyze`
Extracts raw text from an uploaded PDF resume (or direct text payload) and runs an ATS audit and candidate profile extraction via Google Gemini.

- **Content-Type:** `multipart/form-data` or `application/json`
- **Request Body (Multipart):**
  - `file`: PDF binary (max 5MB)
  - `targetRole`: string (e.g. `"Full Stack Developer"`)
- **Request Body (JSON alternative):**
  - `text`: string
  - `targetRole`: string
- **Success Response (200 OK):**
  ```json
  {
    "success": true,
    "data": {
      "overall_score": 82,
      "ats_compatibility_score": 88,
      "parsed_info": {
        "name": "Alex Rivera",
        "email": "alex@example.com",
        "education": [...],
        "skills": ["React", "TypeScript", "Node.js"],
        "experience": [...]
      },
      "technical_strengths": ["Strong TypeScript foundations"],
      "missing_skills": ["Docker", "Playwright"],
      "experience_critique": {
        "bullet_improvements": [
          {
            "original": "Built website in React",
            "improved": "Architected responsive Next.js application across 4 modules, cutting LCP by 35%",
            "reason": "Quantifies performance metrics and module scale"
          }
        ]
      },
      "suggested_roles": ["Junior Full Stack Developer"],
      "actionable_next_steps": [...]
    }
  }
  ```

---

## 2. Career Roadmap Generator
### `POST /api/career/roadmap`
Synthesizes a 3-stage learning curriculum (Beginner, Intermediate, Advanced) adapted to candidate background and daily hours.

- **Content-Type:** `application/json`
- **Request Body:**
  ```json
  {
    "targetRole": "Full Stack Developer",
    "educationLevel": "Bachelor's Degree",
    "currentSkills": "JavaScript, React",
    "dailyHours": 2,
    "timelineMonths": 6
  }
  ```
- **Success Response (200 OK):**
  ```json
  {
    "success": true,
    "data": {
      "target_role": "Full Stack Developer",
      "estimated_weeks": 14,
      "total_stages": 3,
      "completion_percentage": 58,
      "tasks": [
        {
          "id": "task-01",
          "stage_number": 1,
          "title": "Master Advanced TypeScript",
          "task_type": "skill",
          "resource_url": "https://www.typescriptlang.org",
          "estimated_hours": 8,
          "is_completed": true
        }
      ]
    }
  }
  ```

---

## 3. Skill Gap Analyzer
### `POST /api/career/skill-gap`
Compares candidate skills against industry competency requirements for their target role.

- **Content-Type:** `application/json`
- **Request Body:**
  ```json
  {
    "targetRole": "Full Stack Developer",
    "currentSkills": ["React", "TypeScript", "Tailwind CSS", "Node.js"]
  }
  ```
- **Success Response (200 OK):**
  ```json
  {
    "success": true,
    "data": {
      "targetRole": "Full Stack Developer",
      "matchPercentage": 74,
      "readinessLevel": "Job-Ready with Minor Gap Bridging",
      "benchmarkSkills": [
        { "skill": "React & Next.js", "userLevel": 85, "benchmark": 80, "status": "strong" },
        { "skill": "Docker", "userLevel": 30, "benchmark": 70, "status": "missing" }
      ],
      "priorityActions": [...]
    }
  }
  ```

---

## 4. Mock Interview System
### `POST /api/interview/generate`
Generates customized interview questions based on role, type, and difficulty.

- **Request Body:**
  ```json
  {
    "jobRole": "Full Stack Developer",
    "interviewType": "technical",
    "difficulty": "entry",
    "count": 3
  }
  ```

### `POST /api/interview/evaluate`
Evaluates the candidate's answer using technical accuracy, clarity, and STAR structure criteria.

- **Request Body:**
  ```json
  {
    "questionText": "Explain the difference between Server and Client Components in Next.js",
    "userAnswer": "Server Components run on the server and do not ship JS...",
    "jobRole": "Full Stack Developer"
  }
  ```
- **Success Response (200 OK):**
  ```json
  {
    "success": true,
    "data": {
      "score": 88,
      "strengths": "Clear definition of bundle size implications",
      "weaknesses": "Could mention streaming Suspense boundaries",
      "suggested_star_answer": "In Next.js App Router, Server Components run exclusively on the server...",
      "metrics": {
        "relevance": 95,
        "technical_accuracy": 90,
        "clarity": 88,
        "structure": 85
      }
    }
  }
  ```

---

## 5. Project Recommendation Engine
### `POST /api/projects/recommend`
Generates novel, distinctive portfolio project ideas.

- **Request Body:**
  ```json
  {
    "targetRole": "Full Stack Developer",
    "skills": "React, TypeScript, Node.js",
    "difficulty": "intermediate"
  }
  ```

---

## 6. Dashboard Analytics Aggregator
### `GET /api/analytics/dashboard`
Aggregates live database metrics into the composite Career Readiness index and computes "Your Next Best Step".
