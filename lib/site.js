import careerData from "@/data/career.json";

export const siteConfig = {
  name: careerData.profile.name,
  headline: careerData.profile.headline,
  location: careerData.profile.location,
  url: "https://vesahaaparanta.com",
  email: "vesahaaparanta@hotmail.fi",
  linkedinUrl: careerData.profile.linkedinUrl,
  description: `${careerData.profile.headline}. Portfolio, resume, projects, and contact information.`,
};
