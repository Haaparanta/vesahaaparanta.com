import { MapPin, Users, GitBranch, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const CARD_CLASS =
  "border-slate-800/60 bg-slate-950/50 backdrop-blur-sm ring-slate-800/60";

function languageBadgeClass(percentage) {
  if (percentage >= 30) return "text-sm px-3 py-1";
  if (percentage >= 15) return "text-xs px-2.5 py-0.5";
  return "text-xs px-2 py-0.5 opacity-80";
}

export function SkillsDisplay({ profile, skills }) {
  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-16 md:px-10 md:py-20">
      <header className="mb-10">
        <h1 className="text-4xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-slate-300 to-slate-500 md:text-5xl">
          Skills
        </h1>
      </header>

      <section className="mb-10">
        <Card className={CARD_CLASS}>
          <CardContent className="flex flex-col gap-6 pt-6 sm:flex-row sm:items-center">
            <img
              src={profile.avatarUrl}
              alt={profile.name ?? profile.username}
              className="size-20 rounded-full ring-2 ring-slate-700"
            />
            <div className="space-y-3">
              <div>
                <h2 className="text-2xl font-semibold">{profile.name}</h2>
                <a
                  href={profile.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-cyan-400 hover:underline"
                >
                  @{profile.username}
                </a>
              </div>
              {profile.bio && (
                <p className="text-sm text-muted-foreground">{profile.bio}</p>
              )}
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                {profile.location && (
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin className="size-4" />
                    {profile.location}
                  </span>
                )}
                <span className="inline-flex items-center gap-1.5">
                  <Calendar className="size-4" />
                  Member since {profile.memberSince}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Users className="size-4" />
                  {profile.followers} followers
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <GitBranch className="size-4" />
                  {profile.publicRepos} public repos
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      <Separator className="mb-10 bg-slate-800" />

      <section className="mb-10 space-y-4">
        <h2 className="text-xl font-semibold text-slate-200">Roles</h2>
        <div className="flex flex-wrap gap-2">
          {skills.roles.map((role) => (
            <Badge key={role} variant="secondary">
              {role}
            </Badge>
          ))}
          {profile.hireable && (
            <Badge variant="outline" className="border-cyan-500/40 text-cyan-400">
              Open to work
            </Badge>
          )}
        </div>
      </section>

      <Separator className="mb-10 bg-slate-800" />

      <section className="mb-10 space-y-4">
        <h2 className="text-xl font-semibold text-slate-200">Languages</h2>
        <p className="text-sm text-muted-foreground">
          Weighted by bytes across curated repositories
        </p>
        <div className="flex flex-wrap gap-2">
          {skills.languages.map((lang) => (
            <Badge
              key={lang.name}
              variant="secondary"
              className={languageBadgeClass(lang.percentage)}
            >
              {lang.name} · {lang.percentage}%
            </Badge>
          ))}
        </div>
      </section>

      <Separator className="mb-10 bg-slate-800" />

      <section className="mb-10 space-y-4">
        <h2 className="text-xl font-semibold text-slate-200">Domains</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {skills.domains.map((domain) => (
            <Card key={domain.name} className={CARD_CLASS}>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">{domain.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-1.5">
                  {domain.repos.map((repo) => (
                    <Badge key={repo} variant="outline" className="text-xs">
                      {repo}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <Separator className="mb-10 bg-slate-800" />

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-slate-200">Tools & Frameworks</h2>
        <div className="flex flex-wrap gap-2">
          {skills.tools.map((tool) => (
            <Badge key={tool} variant="outline">
              {tool}
            </Badge>
          ))}
        </div>
      </section>
    </div>
  );
}
