"use client";

import { useEffect, useState } from "react";
import { BrandIcon } from "@/components/ui/icons/brand-icons";

type ReadmeSection = {
  aboutMe: string;
  socials: { img: string; href: string }[];
  techBadges: { img: string; alt: string }[];
};

const STATIC_FALLBACK: ReadmeSection = {
  aboutMe: "Software Engineering student (PPLG) passionate about web development. Learning React, Tailwindcss and exploring modern frameworks.",
  socials: [
    { img: "https://img.shields.io/badge/Instagram-%23E4405F.svg?logo=Instagram&logoColor=white", href: "https://instagram.com/@radityarayhannnn" },
    { img: "https://img.shields.io/badge/Email-D14836?logo=gmail&logoColor=white", href: "mailto:rayhanyogiswara133@gmail.com" }
  ],
  techBadges: [
    { img: "https://img.shields.io/badge/c++-%2300599C.svg?style=for-the-badge&logo=c%2B%2B&logoColor=white", alt: "C++" },
    { img: "https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white", alt: "HTML5" },
    { img: "https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E", alt: "JS" },
    { img: "https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54", alt: "Python" },
    { img: "https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white", alt: "Vercel" },
    { img: "https://img.shields.io/badge/netlify-%23000000.svg?style=for-the-badge&logo=netlify&logoColor=#00C7B7", alt: "Netlify" },
    { img: "https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB", alt: "Express" },
    { img: "https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white", alt: "Next" },
    { img: "https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white", alt: "Node" },
    { img: "https://img.shields.io/badge/react_native-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB", alt: "React Native" },
    { img: "https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB", alt: "React" },
    { img: "https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white", alt: "React Router" },
    { img: "https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white", alt: "Tailwind" },
    { img: "https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white", alt: "Vite" },
    { img: "https://img.shields.io/badge/mysql-4479A1.svg?style=for-the-badge&logo=mysql&logoColor=white", alt: "MySQL" },
    { img: "https://img.shields.io/badge/Framer-black?style=for-the-badge&logo=framer&logoColor=blue", alt: "Framer" },
    { img: "https://img.shields.io/badge/figma-%23F24E1E.svg?style=for-the-badge&logo=figma&logoColor=white", alt: "Figma" },
    { img: "https://img.shields.io/badge/Dribbble-EA4C89?style=for-the-badge&logo=dribbble&logoColor=white", alt: "Dribbble" }
  ]
};

export function GitHubReadmeCard() {
  const [readme, setReadme] = useState<ReadmeSection>(STATIC_FALLBACK);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchReadme() {
      try {
        const res = await fetch("https://raw.githubusercontent.com/ReyyyGITHUB/ReyyyGITHUB/main/README.md");
        if (!res.ok) throw new Error("Gagal mengambil README");
        const text = await res.text();

        // Parser Sederhana untuk mencocokkan data
        const aboutMeMatch = text.match(/him<br>💻\s*(.*?)(?=\n|##)/);
        const aboutText = aboutMeMatch ? aboutMeMatch[1].replace(/<br>/g, " ").trim() : STATIC_FALLBACK.aboutMe;

        setReadme({
          aboutMe: aboutText,
          socials: STATIC_FALLBACK.socials,
          techBadges: STATIC_FALLBACK.techBadges
        });
      } catch (err) {
        console.warn("Memakai offline fallback README:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchReadme();
  }, []);

  if (loading) {
    return (
      <article className="rounded-3xl border border-dashboard-outline-variant bg-[#111115] p-5 shadow-subtle animate-pulse space-y-4 min-h-[380px]">
        <div className="h-4 w-3/4 bg-white/10 rounded" />
        <div className="h-10 w-full bg-white/5 rounded-2xl" />
        <div className="h-20 w-full bg-white/5 rounded-2xl" />
      </article>
    );
  }

  return (
    <article className="rounded-3xl border border-dashboard-outline-variant bg-dashboard-surface-lowest p-5 shadow-subtle flex flex-col justify-between min-h-[380px] w-full max-w-full overflow-hidden min-w-0 select-none transition-transform hover:-translate-y-0.5">
      <div className="flex items-center gap-2 text-xs font-semibold tracking-[0.03em] text-dashboard-outline border-b border-dashboard-outline-variant/35 pb-2.5">
        <span className="grid size-9 place-items-center rounded-xl bg-lime-pop text-pitch-black">
          <BrandIcon name="github" className="size-5" />
        </span>
        <div>
          <p className="font-black text-dashboard-on-surface">README.md</p>
          <p className="text-[10px] text-dashboard-outline">Live profile feed</p>
        </div>
      </div>

      {/* Manual Scrollable README Area */}
      <div className="mt-3 flex-1 overflow-y-auto max-h-[220px] space-y-4 pr-1 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-dashboard-outline-variant/60 text-xs font-semibold leading-relaxed text-dashboard-on-surface-variant">
        
        {/* Intro */}
        <div className="space-y-1">
          <h4 className="font-black text-dashboard-on-surface text-sm">💫 About Me:</h4>
          <p className="bg-dashboard-surface-low/40 border border-dashboard-outline-variant/30 rounded-2xl p-3">
            {readme.aboutMe}
          </p>
        </div>

        {/* Socials */}
        <div className="space-y-1.5">
          <h4 className="font-black text-dashboard-on-surface">🌐 Socials:</h4>
          <div className="flex gap-2">
            {readme.socials.map((soc, i) => (
              <a key={i} href={soc.href} target="_blank" rel="noopener noreferrer" className="hover:scale-105 transition-transform">
                <img src={soc.img} alt="social" className="h-5" />
              </a>
            ))}
          </div>
        </div>

        {/* Tech Stack */}
        <div className="space-y-2">
          <h4 className="font-black text-dashboard-on-surface">💻 Tech Stack:</h4>
          <div className="flex flex-wrap gap-1.5">
            {readme.techBadges.map((badge, i) => (
              <img 
                key={i} 
                src={badge.img} 
                alt={badge.alt} 
                className="h-5.5 rounded object-contain max-w-[90px] filter brightness-95 hover:brightness-110 transition-all" 
              />
            ))}
          </div>
        </div>

        {/* Beautiful Image Placeholder (Center, radius 24px) */}
        <div className="space-y-2 border-t border-dashboard-outline-variant/30 pt-3">
          <h4 className="font-black text-dashboard-on-surface">📊 Stats Placeholder:</h4>
          <div className="flex justify-center py-2">
            <img 
              src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=350&q=80" 
              alt="Profile stats placeholder" 
              className="w-full max-w-[320px] h-auto rounded-[24px] border border-dashboard-outline-variant/35 object-cover aspect-[16/9]" 
            />
          </div>
        </div>
      </div>

      {/* Button footer to profile */}
      <div className="mt-3.5 border-t border-dashboard-outline-variant/35 pt-3">
        <a 
          href="https://github.com/ReyyyGITHUB" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex w-full items-center justify-center gap-1.5 rounded-xl bg-pitch-black dark:bg-ghost-white text-ghost-white dark:text-pitch-black py-2.5 text-xs font-black hover:scale-[1.01] transition-transform"
        >
          <BrandIcon name="github" className="size-3.5" />
          Kunjungi Profil GitHub
        </a>
      </div>
    </article>
  );
}
