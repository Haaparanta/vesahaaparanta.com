import githubData from "@/data/github.json";
import { ProjectGrid } from "@/components/projects/project-grid";

export const metadata = {
  title: "Projects | Vesa Haaparanta",
  description: "Curated open-source projects from GitHub.",
};

export default function ProjectsPage() {
  return (
    <main className="min-h-screen">
      <ProjectGrid profile={githubData.profile} projects={githubData.projects} />
    </main>
  );
}
