"use client";

import { Download } from "lucide-react";

interface DownloadSkillButtonProps {
  skillPath: string;
  filename?: string;
}

export default function DownloadSkillButton({ skillPath, filename }: DownloadSkillButtonProps) {
  return (
    <a
      href={skillPath}
      download={filename || skillPath.split("/").pop()}
      className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 border
        bg-ember/10 text-ember border-ember/20 hover:bg-ember hover:text-white hover:border-ember
        dark:bg-ember/10 dark:text-ember dark:border-ember/20 dark:hover:bg-ember dark:hover:text-white dark:hover:border-ember"
      aria-label="Download Claude Code skill"
    >
      <Download className="w-4 h-4" />
      <span>Download Skill</span>
    </a>
  );
}
