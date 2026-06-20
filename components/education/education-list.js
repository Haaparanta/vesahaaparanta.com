import { Calendar, ExternalLink, GraduationCap, MapPin } from "lucide-react";
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

function formatYearRange(startYear, endYear) {
  return `${startYear} – ${endYear}`;
}

function EducationCard({ entry }) {
  return (
    <Card className={CARD_CLASS}>
      <CardHeader>
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div className="space-y-1">
            <CardTitle className="text-lg leading-snug">
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
                <ExternalLink className="size-3.5" />
              </a>
            </CardDescription>
          </div>
          <Badge variant="secondary">
            <Calendar className="mr-1 inline size-3.5" />
            {formatYearRange(entry.startYear, entry.endYear)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm text-muted-foreground">{entry.specialization}</p>
        <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
          <MapPin className="size-3.5" />
          {entry.location}
        </span>
      </CardContent>
    </Card>
  );
}

export function EducationList({ education }) {
  const sortedEducation = [...education].sort((a, b) => b.startYear - a.startYear);

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-16 md:px-10 md:py-20">
      <header className="mb-10 space-y-2">
        <h1 className="text-4xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-slate-300 to-slate-500 md:text-5xl">
          Education
        </h1>
        <p className="flex items-center gap-2 text-sm text-muted-foreground">
          <GraduationCap className="size-4" />
          Software, web and cloud technologies
        </p>
      </header>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {sortedEducation.map((entry) => (
          <EducationCard key={entry.id} entry={entry} />
        ))}
      </div>
    </div>
  );
}
