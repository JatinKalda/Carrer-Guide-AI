// Central mock/demo data for CareerOS AI.
// In production, these would be fetched via TanStack Query from the API layer.

export const user = {
  name: "John Doe",
  firstName: "John",
  email: "john.doe@email.com",
  role: "Software Engineer",
  location: "Bengaluru, India",
  headline: "Software Engineer | Open to opportunities",
  linkedin: "linkedin.com/in/johndoe",
  github: "github.com/johndoe",
  portfolio: "johndoe.dev",
  avatar: "JD",
  plan: "Premium Plan",
};

export const careerScores = {
  aiCareerScore: 87,
  profileHealth: 82,
  jobMatch: 74,
  activityScore: 65,
};

export const scoreBreakdown = [
  { label: "Headline", score: 88 },
  { label: "About", score: 90 },
  { label: "Experience", score: 92 },
  { label: "Skills", score: 85 },
  { label: "Projects", score: 70 },
  { label: "Recommendations", score: 80 },
];

export const strengths = [
  "Strong technical skills",
  "Good work experience",
  "Active on LinkedIn",
  "Complete education history",
];

export const weaknesses = [
  "Add more projects",
  "Improve headline clarity",
  "Get more endorsements",
  "Add certifications",
];

export const aiSuggestions = [
  {
    icon: "Sparkles",
    title: "Improve your headline",
    description: "Increase profile views by 30%",
  },
  {
    icon: "FolderKanban",
    title: "Add more projects",
    description: "Profiles with projects get 40% more work",
  },
  {
    icon: "BadgeCheck",
    title: "Get certified",
    description: "Boost credibility and stand out",
  },
  {
    icon: "Activity",
    title: "Increase activity",
    description: "Engage more to get noticed",
  },
];

export const careerProgress = [
  { month: "Mar 8", score: 62 },
  { month: "Mar 15", score: 68 },
  { month: "Mar 22", score: 71 },
  { month: "Mar 29", score: 76 },
  { month: "Apr 5", score: 81 },
  { month: "Apr 12", score: 87 },
];

export const weeklyActivity = [
  { day: "Mon", applications: 3, interviews: 0 },
  { day: "Tue", applications: 5, interviews: 1 },
  { day: "Wed", applications: 2, interviews: 0 },
  { day: "Thu", applications: 6, interviews: 2 },
  { day: "Fri", applications: 4, interviews: 1 },
  { day: "Sat", applications: 1, interviews: 0 },
  { day: "Sun", applications: 2, interviews: 0 },
];

export const skillDistribution = [
  { name: "Frontend", value: 32, color: "#5B5FEF" },
  { name: "Backend", value: 28, color: "#7C3AED" },
  { name: "System Design", value: 18, color: "#10B981" },
  { name: "DevOps", value: 12, color: "#F59E0B" },
  { name: "Soft Skills", value: 10, color: "#EF4444" },
];

export const recentActivity = [
  { id: 1, action: "Applied to Backend Engineer at Microsoft", time: "2h ago" },
  { id: 2, action: "Completed \"System Design Basics\" module", time: "5h ago" },
  { id: 3, action: "AI Coach generated a new roadmap", time: "1d ago" },
  { id: 4, action: "Profile analyzed — score improved to 87", time: "2d ago" },
];

export const jobs = [
  {
    id: 1,
    company: "Google",
    logo: "G",
    logoColor: "#4285F4",
    role: "Software Engineer",
    location: "Bengaluru, India · Full-time",
    posted: "2 days ago",
    match: 92,
    salary: "₹28L – ₹42L",
    remote: true,
    skills: ["Data Structures", "System Design", "Go"],
  },
  {
    id: 2,
    company: "Microsoft",
    logo: "M",
    logoColor: "#00A4EF",
    role: "Backend Developer",
    location: "Hyderabad, India · Full-time",
    posted: "1 day ago",
    match: 88,
    salary: "₹24L – ₹36L",
    remote: true,
    skills: ["Node.js", "AWS", "SQL"],
  },
  {
    id: 3,
    company: "Amazon",
    logo: "a",
    logoColor: "#FF9900",
    role: "SDE - II",
    location: "Bengaluru, India · Full-time",
    posted: "3 days ago",
    match: 84,
    salary: "₹22L – ₹34L",
    remote: false,
    skills: ["Java", "Distributed Systems"],
  },
  {
    id: 4,
    company: "Adobe",
    logo: "A",
    logoColor: "#FA0F00",
    role: "Full Stack Developer",
    location: "Noida, India · Hybrid",
    posted: "4 days ago",
    match: 79,
    salary: "₹18L – ₹28L",
    remote: false,
    skills: ["React", "Node.js", "MongoDB"],
  },
];

export const skillRadar = [
  { skill: "JavaScript", current: 85, target: 95 },
  { skill: "System Design", current: 55, target: 90 },
  { skill: "Docker", current: 40, target: 85 },
  { skill: "AWS", current: 60, target: 90 },
  { skill: "Kubernetes", current: 25, target: 75 },
  { skill: "Leadership", current: 65, target: 85 },
];

export const skillPriorities = [
  { skill: "Docker", priority: "High Impact", time: "2 weeks" },
  { skill: "System Design", priority: "High Impact", time: "4 weeks" },
  { skill: "AWS", priority: "Medium Impact", time: "3 weeks" },
  { skill: "CI/CD", priority: "Medium Impact", time: "2 weeks" },
];

export const roadmap = [
  {
    week: "Week 1-2",
    title: "Data Structures & Algorithms",
    description: "Learn essential DSA concepts and problem solving",
    progress: 60,
  },
  {
    week: "Week 3-4",
    title: "System Design Basics",
    description: "Learn system design fundamentals and architectural patterns",
    progress: 60,
  },
  {
    week: "Week 5-6",
    title: "AWS Cloud Practitioner",
    description: "Learn AWS services and cloud deployment patterns",
    progress: 30,
  },
  {
    week: "Week 7-8",
    title: "Backend Development",
    description: "Build scalable backend applications with best practices",
    progress: 0,
  },
];

export const chatSuggestions = [
  "How can I become a Backend Engineer at top companies?",
  "Review my LinkedIn headline",
  "What skills should I learn next?",
  "Help me prepare for a system design interview",
];

export const analyticsSummary = [
  { label: "Career Growth", value: "+24%", trend: "up" },
  { label: "Weekly Improvement", value: "+6 pts", trend: "up" },
  { label: "Applications", value: "23", trend: "up" },
  { label: "Interviews", value: "5", trend: "up" },
  { label: "Recruiter Views", value: "142", trend: "up" },
  { label: "Profile Visits", value: "980", trend: "down" },
];
