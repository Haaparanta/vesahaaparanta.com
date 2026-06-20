import careerData from "@/data/career.json";
import { EducationList } from "@/components/education/education-list";

export const metadata = {
  title: "Education",
  description: "Academic background and degrees at Tampere University.",
};

export default function EducationPage() {
  return (
    <main className="min-h-screen">
      <EducationList education={careerData.education} />
    </main>
  );
}
