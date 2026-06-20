import careerData from "@/data/career.json";
import { cn } from "@/utils/cn";

const EMAIL = "vesahaaparanta@hotmail.fi";

export function ContactLinks({ className }) {
  return (
    <div className={cn("flex flex-col items-center gap-3 text-base md:text-lg", className)}>
      <a
        href={`mailto:${EMAIL}`}
        className="text-slate-300 hover:text-white transition-colors"
      >
        {EMAIL}
      </a>
      <a
        href={careerData.profile.linkedinUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="text-slate-300 hover:text-white transition-colors"
      >
        LinkedIn
      </a>
    </div>
  );
}
