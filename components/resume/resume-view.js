import {
  Briefcase,
  Calendar,
  ExternalLink,
  GraduationCap,
  Mail,
  MapPin,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const CARD_CLASS =
  "border-slate-800/60 bg-slate-950/50 backdrop-blur-sm hover:border-cyan-500/30 transition-colors ring-slate-800/60";

const EMAIL = "vesahaaparanta@hotmail.fi";

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

function formatYearRange(startYear, endYear) {
  return `${startYear} – ${endYear}`;
}

function sortExperience(experience) {
  return [...experience].sort((a, b) => b.startDate.localeCompare(a.startDate));
}

function SectionHeading({ children }) {
  return (
    <h2 className="text-xl font-semibold text-slate-200">{children}</h2>
  );
}

function ExperienceEntry({ job }) {
  return (
    <Card className={CARD_CLASS}>
      <CardHeader className="pb-3">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div className="space-y-1">
            <CardTitle className="text-base leading-snug">{job.title}</CardTitle>
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
          <Badge variant="outline" className="text-xs">
            {CATEGORY_LABELS[job.category] ?? job.category}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
          <Badge variant="secondary" className="text-xs">
            <Calendar className="mr-1 inline size-3" />
            {formatDateRange(job.startDate, job.endDate, job.current)}
          </Badge>
          <span className="inline-flex items-center gap-1.5">
            <MapPin className="size-3.5" />
            {job.location}
          </span>
        </div>
        {job.highlights.length > 0 && (
          <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
            {job.highlights.map((highlight) => (
              <li key={highlight}>{highlight}</li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}

function EducationEntry({ entry }) {
  return (
    <Card className={CARD_CLASS}>
      <CardHeader className="pb-3">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div className="space-y-1">
            <CardTitle className="text-base leading-snug">
              {entry.degree}, {entry.field}
            </CardTitle>
            <CardDescription className="text-sm">
              <a
                href={entry.institutionUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-cyan-400 hover:underline"
              >
                {entry.institution}
                <ExternalLink className="size-3" />
              </a>
            </CardDescription>
          </div>
          <Badge variant="secondary" className="text-xs">
            <Calendar className="mr-1 inline size-3" />
            {formatYearRange(entry.startYear, entry.endYear)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        <p className="text-sm text-muted-foreground">{entry.specialization}</p>
        <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
          <MapPin className="size-3.5" />
          {entry.location}
        </span>
      </CardContent>
    </Card>
  );
}

export function ResumeView({
  profile,
  experience,
  earlierExperience,
  education,
  githubProfile,
  skills,
}) {
  const sortedExperience = sortExperience(experience);
  const sortedEducation = [...education].sort((a, b) => b.startYear - a.startYear);
  const topLanguages = skills.languages.filter((lang) => lang.percentage >= 1);

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-16 md:px-10 md:py-20">
      <header className="mb-10 space-y-6">
        <h1 className="text-4xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-slate-300 to-slate-500 md:text-5xl">
          Resume
        </h1>

        <Card className={CARD_CLASS}>
          <CardContent className="flex flex-col gap-6 pt-6 sm:flex-row sm:items-start">
            <img
              src={githubProfile.avatarUrl}
              alt={profile.name}
              className="size-24 shrink-0 rounded-full ring-2 ring-slate-700"
            />
            <div className="space-y-3">
              <div>
                <h2 className="text-2xl font-semibold text-slate-100">{profile.name}</h2>
                <p className="text-sm text-muted-foreground">{profile.headline}</p>
              </div>
              <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="size-4" />
                  {profile.location}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Briefcase className="size-4" />
                  {profile.totalExperience}
                </span>
              </div>
              <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
                <a
                  href={`mailto:${EMAIL}`}
                  className="inline-flex items-center gap-1.5 text-cyan-400 hover:underline"
                >
                  <Mail className="size-4" />
                  {EMAIL}
                </a>
                <a
                  href={profile.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-cyan-400 hover:underline"
                >
                  <ExternalLink className="size-4" />
                  LinkedIn
                </a>
                <a
                  href={githubProfile.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-cyan-400 hover:underline"
                >
                  <ExternalLink className="size-4" />
                  @{githubProfile.username}
                </a>
              </div>
            </div>
          </CardContent>
        </Card>
      </header>

      <section className="mb-10 space-y-4">
        <SectionHeading>Skills</SectionHeading>
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {skills.roles.map((role) => (
              <Badge key={role} variant="secondary">
                {role}
              </Badge>
            ))}
            {githubProfile.hireable && (
              <Badge variant="outline" className="border-cyan-500/40 text-cyan-400">
                Open to work
              </Badge>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            {topLanguages.map((lang) => (
              <Badge key={lang.name} variant="outline" className="text-xs">
                {lang.name}
              </Badge>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            {skills.tools.map((tool) => (
              <Badge key={tool} variant="outline" className="text-xs">
                {tool}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      <Separator className="mb-10 bg-slate-800" />

      <section className="mb-10 space-y-4">
        <SectionHeading>Experience</SectionHeading>
        <div className="relative space-y-4">
          <div
            className="absolute left-[11px] top-2 hidden h-[calc(100%-2rem)] w-px bg-slate-800 md:block"
            aria-hidden="true"
          />
          {sortedExperience.map((job) => (
            <div key={job.id} className="relative md:pl-8">
              <div
                className="absolute left-0 top-5 hidden size-[22px] rounded-full border-2 border-cyan-500/40 bg-slate-950 md:block"
                aria-hidden="true"
              />
              <ExperienceEntry job={job} />
            </div>
          ))}
        </div>
        {earlierExperience && (
          <details className="group rounded-lg border border-slate-800/60 bg-slate-950/30">
            <summary className="cursor-pointer list-none px-4 py-3 text-sm font-medium text-slate-300 transition-colors hover:text-slate-100 [&::-webkit-details-marker]:hidden">
              <span className="inline-flex items-center gap-2">
                <Briefcase className="size-4 text-muted-foreground" />
                Earlier experience — {earlierExperience.company} ({earlierExperience.period})
              </span>
            </summary>
            <div className="space-y-2 border-t border-slate-800/60 px-4 pb-3 pt-3">
              <p className="text-sm text-muted-foreground">{earlierExperience.summary}</p>
              <div className="flex flex-wrap gap-2">
                {earlierExperience.roles.map((role) => (
                  <Badge key={role} variant="outline" className="text-xs">
                    {role}
                  </Badge>
                ))}
              </div>
            </div>
          </details>
        )}
      </section>

      <Separator className="mb-10 bg-slate-800" />

      <section className="space-y-4">
        <SectionHeading>
          <span className="inline-flex items-center gap-2">
            <GraduationCap className="size-5" />
            Education
          </span>
        </SectionHeading>
        <div className="space-y-4">
          {sortedEducation.map((entry) => (
            <EducationEntry key={entry.id} entry={entry} />
          ))}
        </div>
      </section>
    </div>
  );
}
