const USERNAME = "Haaparanta";
const OUTPUT_PATH = "data/github.json";
const CONCURRENCY = 5;

const EXCLUDED_REPOS = new Set([
  "Haaparanta",
  "COMP.SE.200-TestCourse",
  "Programming-2",
  "Programming-3",
  "Nysse",
  "Weatherize",
  "Tirakka",
  "DevOps",
  "SQL-course",
  "leRacoon",
]);

const ROLES = [
  "Software Engineer",
  "DevOps Engineer",
  "Frontend Developer",
  "Backend Developer",
  "Game Developer",
  "Mobile Developer",
  "Software Developer",
  "UI/UX Designer",
  "3D modeller",
];

type GitHubRepo = {
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  topics: string[];
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  size: number;
  license: { spdx_id: string } | null;
  created_at: string;
  updated_at: string;
  pushed_at: string;
  archived: boolean;
  has_pages: boolean;
  fork: boolean;
};

type GitHubUser = {
  login: string;
  name: string | null;
  bio: string | null;
  location: string | null;
  blog: string | null;
  avatar_url: string;
  hireable: boolean | null;
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
  html_url: string;
};

type ProjectCategory =
  | "hackathon"
  | "ai"
  | "game"
  | "web"
  | "tool"
  | "hardware"
  | "personal";

function githubHeaders(): HeadersInit {
  const headers: HeadersInit = {
    Accept: "application/vnd.github+json",
    "User-Agent": "vesahaaparanta.com-fetch",
  };
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }
  return headers;
}

async function githubFetch<T>(url: string): Promise<T> {
  const response = await fetch(url, { headers: githubHeaders() });
  if (!response.ok) {
    throw new Error(`GitHub API error ${response.status} for ${url}`);
  }
  return response.json() as Promise<T>;
}

async function mapConcurrent<T, R>(
  items: T[],
  limit: number,
  fn: (item: T) => Promise<R>
): Promise<R[]> {
  const results: R[] = [];
  let index = 0;

  async function worker() {
    while (index < items.length) {
      const current = index++;
      results[current] = await fn(items[current]);
    }
  }

  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, worker));
  return results;
}

function stripMarkdown(text: string): string {
  return text
    .replace(/^#+\s+/gm, "")
    .replace(/\*\*(.*?)\*\*/g, "$1")
    .replace(/\*(.*?)\*/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/\n+/g, " ")
    .trim();
}

function excerptReadme(content: string, maxLength = 300): string | null {
  const cleaned = stripMarkdown(content);
  if (!cleaned) return null;
  return cleaned.length > maxLength ? `${cleaned.slice(0, maxLength).trim()}…` : cleaned;
}

function inferCategory(
  name: string,
  description: string | null,
  language: string | null,
  languages: Record<string, number>,
  readmeExcerpt: string | null
): ProjectCategory {
  const haystack = `${name} ${description ?? ""} ${readmeExcerpt ?? ""}`.toLowerCase();

  if (/hack|junction|bridg3|hacknight|aalto ai|ai-for-good/.test(haystack)) {
    return "hackathon";
  }
  if (/ai|dalle|buildingai|computer vision|open-source-lab|machine learning|ml/.test(haystack)) {
    return "ai";
  }
  if (/game|orkgame|ticket|mafia|gdscript|godot/.test(haystack) || language === "GDScript") {
    return "game";
  }
  if (/\.com|website|next\.?js|react|decaydetectives|vesahaaparanta/.test(haystack)) {
    return "web";
  }
  if (/generator|bot|art|infinite-craft/.test(haystack)) {
    return "tool";
  }
  if (/neopixel|pico|raspberry|hardware|display/.test(haystack)) {
    return "hardware";
  }
  if (languages["JavaScript"] || languages["TypeScript"]) {
    return "web";
  }
  return "personal";
}

function inferTools(
  projects: Array<{ languages: Record<string, number>; description: string | null; readmeExcerpt: string | null; name: string }>
): string[] {
  const tools = new Set<string>();
  const haystack = projects
    .map((p) => `${p.name} ${p.description ?? ""} ${p.readmeExcerpt ?? ""} ${Object.keys(p.languages).join(" ")}`)
    .join(" ")
    .toLowerCase();

  const toolRules: Array<[RegExp, string]> = [
    [/next\.?js|nextjs/, "Next.js"],
    [/react/, "React"],
    [/typescript/, "TypeScript"],
    [/framer motion|framer-motion/, "Framer Motion"],
    [/godot|gdscript/, "Godot"],
    [/docker/, "Docker"],
    [/jupyter/, "Jupyter"],
    [/raspberry|pico|neopixel/, "Raspberry Pi Pico"],
    [/python/, "Python"],
    [/firebase/, "Firebase"],
    [/tailwind/, "Tailwind CSS"],
    [/opencv|computer vision/, "OpenCV"],
    [/android/, "Android"],
  ];

  for (const [pattern, label] of toolRules) {
    if (pattern.test(haystack)) tools.add(label);
  }

  return Array.from(tools).sort();
}

function buildDomains(projects: Array<{ name: string; category: ProjectCategory }>) {
  const domainMap: Record<string, string[]> = {
    "AI / ML": [],
    Hackathons: [],
    "Web Development": [],
    "Game Development": [],
    "DevOps / Infrastructure": [],
    "Computer Vision": [],
    Tools: [],
    Hardware: [],
  };

  for (const project of projects) {
    const { name, category } = project;
    const lower = name.toLowerCase();

    if (category === "hackathon") domainMap.Hackathons.push(name);
    if (category === "ai" || /ai|dalle|buildingai|open-source-lab/.test(lower)) {
      domainMap["AI / ML"].push(name);
    }
    if (category === "web" || /\.com|website|decaydetectives|vesahaaparanta/.test(lower)) {
      domainMap["Web Development"].push(name);
    }
    if (category === "game" || /game|ork|ticket|mafia/.test(lower)) {
      domainMap["Game Development"].push(name);
    }
    if (/realtime|devops|screen sharing|infra/.test(lower)) {
      domainMap["DevOps / Infrastructure"].push(name);
    }
    if (/computer vision|opencv|vision/.test(lower)) {
      domainMap["Computer Vision"].push(name);
    }
    if (category === "tool") domainMap.Tools.push(name);
    if (category === "hardware") domainMap.Hardware.push(name);
  }

  return Object.entries(domainMap)
    .filter(([, repos]) => repos.length > 0)
    .map(([name, repos]) => ({ name, repos: [...new Set(repos)] }));
}

async function fetchReadmeExcerpt(repoName: string): Promise<string | null> {
  try {
    const data = await githubFetch<{ content: string }>(
      `https://api.github.com/repos/${USERNAME}/${repoName}/readme`
    );
    const decoded = Buffer.from(data.content, "base64").toString("utf-8");
    return excerptReadme(decoded);
  } catch {
    return null;
  }
}

async function fetchLanguages(repoName: string): Promise<Record<string, number>> {
  try {
    return await githubFetch<Record<string, number>>(
      `https://api.github.com/repos/${USERNAME}/${repoName}/languages`
    );
  } catch {
    return {};
  }
}

async function main() {
  console.log(`Fetching GitHub data for @${USERNAME}...`);

  let profile: GitHubUser;
  let repos: GitHubRepo[];

  try {
    [profile, repos] = await Promise.all([
      githubFetch<GitHubUser>(`https://api.github.com/users/${USERNAME}`),
      githubFetch<GitHubRepo[]>(
        `https://api.github.com/users/${USERNAME}/repos?sort=updated&per_page=100`
      ),
    ]);
  } catch (error) {
    const fallback = Bun.file(OUTPUT_PATH);
    if (await fallback.exists()) {
      console.warn(`GitHub fetch failed, using existing ${OUTPUT_PATH}:`, error);
      return;
    }
    throw error;
  }

  const curatedRepos = repos
    .filter((repo) => !repo.fork && !EXCLUDED_REPOS.has(repo.name))
    .sort((a, b) => new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime());

  console.log(`Enriching ${curatedRepos.length} curated repos...`);

  const enriched = await mapConcurrent(curatedRepos, CONCURRENCY, async (repo) => {
    const [languages, readmeExcerpt] = await Promise.all([
      fetchLanguages(repo.name),
      fetchReadmeExcerpt(repo.name),
    ]);

    const languageList = Object.entries(languages)
      .sort(([, a], [, b]) => b - a)
      .map(([lang]) => lang);

    const category = inferCategory(
      repo.name,
      repo.description,
      repo.language,
      languages,
      readmeExcerpt
    );

    return {
      name: repo.name,
      description: repo.description,
      url: repo.html_url,
      homepage: repo.homepage || null,
      primaryLanguage: repo.language,
      languages,
      languageList,
      topics: repo.topics ?? [],
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      openIssues: repo.open_issues_count,
      size: repo.size,
      license: repo.license?.spdx_id ?? null,
      createdAt: repo.created_at.slice(0, 10),
      updatedAt: repo.updated_at.slice(0, 10),
      pushedAt: repo.pushed_at.slice(0, 10),
      archived: repo.archived,
      hasPages: repo.has_pages,
      category,
      readmeExcerpt,
    };
  });

  const languageTotals = new Map<string, { totalBytes: number; repoCount: number }>();
  for (const project of enriched) {
    for (const [lang, bytes] of Object.entries(project.languages)) {
      const current = languageTotals.get(lang) ?? { totalBytes: 0, repoCount: 0 };
      languageTotals.set(lang, {
        totalBytes: current.totalBytes + bytes,
        repoCount: current.repoCount + 1,
      });
    }
  }

  const totalBytes = Array.from(languageTotals.values()).reduce((sum, lang) => sum + lang.totalBytes, 0);
  const languages = Array.from(languageTotals.entries())
    .map(([name, stats]) => ({
      name,
      repoCount: stats.repoCount,
      totalBytes: stats.totalBytes,
      percentage: totalBytes > 0 ? Math.round((stats.totalBytes / totalBytes) * 100) : 0,
    }))
    .sort((a, b) => b.totalBytes - a.totalBytes);

  const output = {
    fetchedAt: new Date().toISOString(),
    profile: {
      username: profile.login,
      name: profile.name,
      bio: profile.bio,
      location: profile.location,
      blog: profile.blog,
      avatarUrl: profile.avatar_url,
      hireable: profile.hireable,
      publicRepos: profile.public_repos,
      followers: profile.followers,
      following: profile.following,
      memberSince: profile.created_at.slice(0, 10),
      url: profile.html_url,
    },
    projects: enriched,
    skills: {
      languages,
      domains: buildDomains(enriched),
      tools: inferTools(enriched),
      roles: ROLES,
    },
  };

  await Bun.write(OUTPUT_PATH, JSON.stringify(output, null, 2));
  console.log(`Wrote ${OUTPUT_PATH} (${enriched.length} projects)`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
