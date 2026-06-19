const API_BASE = "/_/backend/api/v1";

export async function uploadResume(file: File) {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch(`${API_BASE}/resume/upload`, {
    method: "POST",
    body: formData,
  });
  if (!res.ok) throw new Error("Failed to upload resume");
  return res.json();
}

export async function optimizeResume(bullets: string[]) {
  const res = await fetch(`${API_BASE}/resume/optimize`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ bullets }),
  });
  if (!res.ok) throw new Error("Failed to optimize resume");
  return res.json();
}

export async function predictSuccess(atsScore: number, numSkills: number) {
  const res = await fetch(`${API_BASE}/ml/predict-success?ats_score=${atsScore}&num_skills=${numSkills}`, {
    method: "POST",
  });
  if (!res.ok) throw new Error("Failed to predict success");
  return res.json();
}

export async function generateInterview(targetRole: string, experienceLevel: string, company: string = "general") {
  const res = await fetch(`${API_BASE}/interview/generate-questions?target_role=${encodeURIComponent(targetRole)}&experience_level=${encodeURIComponent(experienceLevel)}&company=${encodeURIComponent(company)}`, {
    method: "POST",
  });
  if (!res.ok) throw new Error("Failed to generate interview questions");
  return res.json();
}

export async function evaluateAnswer(question: string, answer: string) {
  const res = await fetch(`${API_BASE}/interview/evaluate-answer?question=${encodeURIComponent(question)}&answer=${encodeURIComponent(answer)}`, {
    method: "POST",
  });
  if (!res.ok) throw new Error("Failed to evaluate answer");
  return res.json();
}

export async function generateRoadmap(targetRole: string, currentSkills: string[]) {
  const res = await fetch(`${API_BASE}/roadmap/generate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      target_role: targetRole,
      current_skills: currentSkills
    })
  });
  if (!res.ok) throw new Error("Failed to generate roadmap");
  return res.json();
}
