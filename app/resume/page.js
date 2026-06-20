import careerData from "@/data/career.json";
import githubData from "@/data/github.json";
import { ResumeView } from "@/components/resume/resume-view";

export const metadata = {
  title: "Resume",
  description: "Resume and CV with experience, education, and skills.",
};

export default function ResumePage() {
  return (
    <main className="min-h-screen">
      <ResumeView
        profile={careerData.profile}
        experience={careerData.experience}
        earlierExperience={careerData.earlierExperience}
        education={careerData.education}
        githubProfile={githubData.profile}
        skills={githubData.skills}
      />
    </main>
  );
}
