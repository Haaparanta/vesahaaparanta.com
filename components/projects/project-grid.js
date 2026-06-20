import { ExternalLink, GitFork, Star } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const CARD_CLASS =
  "border-slate-800/60 bg-slate-950/50 backdrop-blur-sm hover:border-cyan-500/30 transition-colors ring-slate-800/60";

function humanizeName(name) {
  return name.replace(/-/g, " ").replace(/\.com/g, ".com");
}

function formatCategory(category) {
  return category.charAt(0).toUpperCase() + category.slice(1);
}

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function ProjectCard({ project }) {
  const description =
    project.description?.trim() ||
    project.readmeExcerpt ||
    "No description provided";

  return (
    <Card className={CARD_CLASS}>
      <CardHeader>
        <div className="flex flex-wrap items-start justify-between gap-2">
          <CardTitle className="text-lg leading-snug">{humanizeName(project.name)}</CardTitle>
          <Badge variant="outline">{formatCategory(project.category)}</Badge>
        </div>
        <CardDescription className="line-clamp-3">{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {project.languageList.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {project.languageList.slice(0, 3).map((lang) => (
              <Badge key={lang} variant="secondary">
                {lang}
              </Badge>
            ))}
          </div>
        )}
        <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
          {project.stars > 0 && (
            <span className="inline-flex items-center gap-1">
              <Star className="size-3.5" />
              {project.stars}
            </span>
          )}
          {project.forks > 0 && (
            <span className="inline-flex items-center gap-1">
              <GitFork className="size-3.5" />
              {project.forks}
            </span>
          )}
          <span>Pushed {formatDate(project.pushedAt)}</span>
          {project.license && <span>{project.license}</span>}
        </div>
      </CardContent>
      <CardFooter className="gap-2 border-t border-slate-800/60 bg-transparent">
        <Button
          variant="outline"
          size="sm"
          render={
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
            />
          }
        >
          View on GitHub
          <ExternalLink className="size-3.5" />
        </Button>
        {project.homepage && (
          <Button
            variant="ghost"
            size="sm"
            render={
              <a
                href={project.homepage}
                target="_blank"
                rel="noopener noreferrer"
              />
            }
          >
            Live demo
            <ExternalLink className="size-3.5" />
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}

export function ProjectGrid({ profile, projects }) {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-16 md:px-10 md:py-20">
      <header className="mb-10 space-y-4">
        <h1 className="text-4xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-slate-300 to-slate-500 md:text-5xl">
          Projects
        </h1>
        <div className="flex flex-wrap items-center gap-4">
          <img
            src={profile.avatarUrl}
            alt={profile.name ?? profile.username}
            className="size-12 rounded-full ring-2 ring-slate-700"
          />
          <div className="space-y-1">
            <a
              href={profile.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg font-medium text-slate-200 hover:text-cyan-400 transition-colors"
            >
              @{profile.username}
            </a>
            <p className="text-sm text-muted-foreground">
              {projects.length} curated repositories from GitHub
            </p>
          </div>
        </div>
      </header>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard key={project.name} project={project} />
        ))}
      </div>
    </div>
  );
}
