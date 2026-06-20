import careerData from "@/data/career.json";
import { EducationList } from "@/components/education/education-list";

export const metadata = {
  title: "Education | Vesa Haaparanta",
  description: "Academic background and degrees.",
};

export default function EducationPage() {
  return (
    <main className="min-h-screen">
      <EducationList education={careerData.education} />
    </main>
  );
}
