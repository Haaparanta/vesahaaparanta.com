"use client";
import React from "react";
import {
  Home,
  FileText,
  Briefcase,
  FolderGit2,
  Code,
  GraduationCap,
  Mail,
} from "lucide-react";
import { NavBar } from "./ui/navbar";

const navLinks = [
  { name: "Home", link: "/", icon: <Home size={18} /> },
  { name: "Resume", link: "/resume", icon: <FileText size={18} /> },
  { name: "Work Experience", link: "/jobs", icon: <Briefcase size={18} /> },
  { name: "Projects", link: "/projects", icon: <FolderGit2 size={18} /> },
  { name: "Skills", link: "/skills", icon: <Code size={18} /> },
  { name: "Education", link: "/education", icon: <GraduationCap size={18} /> },
  { name: "Contact", link: "/contact", icon: <Mail size={18} /> },
];

export const Navbar = () => {
  return <NavBar navItems={navLinks} />;
};
