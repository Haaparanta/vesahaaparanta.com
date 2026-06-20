import { Briefcase, Calendar, ExternalLink, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const CARD_CLASS =
  "border-slate-800/60 bg-slate-950/50 backdrop-blur-sm hover:border-cyan-500/30 transition-colors ring-slate-800/60";

const CATEGORY_LABELS = {
  defence: "Defence",
  consulting: "Consulting",
  university: "University",
  research: "Research",
  simulation: "Simulation",
};

function formatMonthYear(dateStr) {
  return new Date(`${dateStr}-01`).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
}

function formatDateRange(startDate, endDate, current) {
  const start = formatMonthYear(startDate);
  const end = current ? "Present" : formatMonthYear(endDate);
  return `${start} – ${end}`;
}

function sortExperience(experience) {
  return [...experience].sort((a, b) => b.startDate.localeCompare(a.startDate));
}

function ExperienceCard({ job }) {
  return (
    <Card className={CARD_CLASS}>
      <CardHeader>
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div className="space-y-1">
            <CardTitle className="text-lg leading-snug">{job.title}</CardTitle>
            <CardDescription className="text-sm">
              <a
                href={job.companyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-400 hover:underline"
              >
                {job.company}
              </a>
            </CardDescription>
            {job.subtitle && (
              <p className="text-sm text-muted-foreground">{job.subtitle}</p>
            )}
          </div>
          <Badge variant="outline">{CATEGORY_LABELS[job.category] ?? job.category}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
          <Badge variant="secondary">
            <Calendar className="mr-1 inline size-3.5" />
            {formatDateRange(job.startDate, job.endDate, job.current)}
          </Badge>
          <span className="inline-flex items-center gap-1.5">
            <MapPin className="size-3.5" />
            {job.location}
          </span>
        </div>
        {job.highlights.length > 0 && (
          <ul className="list-disc space-y-1.5 pl-5 text-sm text-muted-foreground">
            {job.highlights.map((highlight) => (
              <li key={highlight}>{highlight}</li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}

function EarlierExperience({ earlierExperience }) {
  return (
    <details className="group rounded-lg border border-slate-800/60 bg-slate-950/30">
      <summary className="cursor-pointer list-none px-4 py-4 text-sm font-medium text-slate-300 transition-colors hover:text-slate-100 [&::-webkit-details-marker]:hidden">
        <span className="inline-flex items-center gap-2">
          <Briefcase className="size-4 text-muted-foreground" />
          Earlier experience — {earlierExperience.company} ({earlierExperience.period})
          <span className="text-xs text-muted-foreground group-open:hidden">(click to expand)</span>
        </span>
      </summary>
      <div className="space-y-3 border-t border-slate-800/60 px-4 pb-4 pt-3">
        <p className="text-sm text-muted-foreground">{earlierExperience.summary}</p>
        <div className="flex flex-wrap gap-2">
          {earlierExperience.roles.map((role) => (
            <Badge key={role} variant="outline">
              {role}
            </Badge>
          ))}
        </div>
        <a
          href={earlierExperience.companyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-sm text-cyan-400 hover:underline"
        >
          {earlierExperience.company}
          <ExternalLink className="size-3.5" />
        </a>
      </div>
    </details>
  );
}

export function ExperienceTimeline({ profile, experience, earlierExperience }) {
  const sortedExperience = sortExperience(experience);

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-16 md:px-10 md:py-20">
      <header className="mb-10 space-y-4">
        <h1 className="text-4xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-slate-300 to-slate-500 md:text-5xl">
          Work Experience
        </h1>
        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-slate-200">{profile.name}</h2>
          <p className="text-sm text-muted-foreground">{profile.headline}</p>
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="size-4" />
              {profile.location}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Briefcase className="size-4" />
              {profile.totalExperience}
            </span>
            <a
              href={profile.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-cyan-400 hover:underline"
            >
              <ExternalLink className="size-4" />
              LinkedIn
            </a>
          </div>
        </div>
      </header>

      <div className="relative space-y-6">
        <div
          className="absolute left-[11px] top-2 hidden h-[calc(100%-2rem)] w-px bg-slate-800 md:block"
          aria-hidden="true"
        />
        {sortedExperience.map((job) => (
          <div key={job.id} className="relative md:pl-8">
            <div
              className="absolute left-0 top-6 hidden size-[22px] rounded-full border-2 border-cyan-500/40 bg-slate-950 md:block"
              aria-hidden="true"
            />
            <ExperienceCard job={job} />
          </div>
        ))}
      </div>

      {earlierExperience && (
        <div className="mt-8">
          <EarlierExperience earlierExperience={earlierExperience} />
        </div>
      )}
    </div>
  );
}
