import githubData from "@/data/github.json";
import { SkillsDisplay } from "@/components/skills/skills-display";

export const metadata = {
  title: "Skills | Vesa Haaparanta",
  description: "Technical skills and expertise derived from GitHub activity.",
};

export default function SkillsPage() {
  return (
    <main className="min-h-screen">
      <SkillsDisplay profile={githubData.profile} skills={githubData.skills} />
    </main>
  );
}
