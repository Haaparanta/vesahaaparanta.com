import careerData from "@/data/career.json";
import { ExperienceTimeline } from "@/components/experience/experience-timeline";

export const metadata = {
  title: "Experience",
  description: "Professional work history in software engineering and defence systems.",
};

export default function JobsPage() {
  return (
    <main className="min-h-screen">
      <ExperienceTimeline
        profile={careerData.profile}
        experience={careerData.experience}
        earlierExperience={careerData.earlierExperience}
      />
    </main>
  );
}
