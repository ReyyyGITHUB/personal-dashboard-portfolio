"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { BrandIcon } from "@/components/ui/icons/brand-icons";

type GitHubCommit = {
  message: string;
  repo: string;
  url: string;
  pushedAt: string;
};

type GitHubCommitFeedClientProps = {
  initialCommits: GitHubCommit[];
  focusRing: string;
};

export function GitHubCommitFeedClient({ initialCommits, focusRing }: GitHubCommitFeedClientProps) {
  const [commits, setCommits] = useState<GitHubCommit[]>(initialCommits);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCommits() {
      try {
        const res = await fetch("https://api.github.com/users/ReyyyGITHUB/events/public");
        if (!res.ok) {
          throw new Error("Gagal mengambil data dari GitHub");
        }
        const events = await res.json();
        
        // Filter PushEvents dan map menjadi skema GitHubCommit
        const pushEvents = events.filter((e: any) => e.type === "PushEvent");
        const parsedCommits: GitHubCommit[] = pushEvents
          .flatMap((event: any) =>
            (event.payload.commits ?? []).map((commit: any) => ({
              message: commit.message.split("\n")[0],
              repo: event.repo.name.replace("ReyyyGITHUB/", ""),
              url: commit.url.replace("api.github.com/repos", "github.com").replace("/commits/", "/commit/"),
              pushedAt: event.created_at,
            }))
          )
          .slice(0, 3);

        if (parsedCommits.length > 0) {
          setCommits(parsedCommits);
        }
      } catch (err) {
        console.warn("GitHub API live fetch rate-limited/failed, falling back to local commits.", err);
        // Fallback dilakukan otomatis karena commits diinisialisasi dengan initialCommits
      } finally {
        setLoading(false);
      }
    }

    fetchCommits();
  }, [initialCommits]);

  function formatCommitDate(date: string) {
    try {
      return new Intl.DateTimeFormat("id-ID", {
        day: "numeric",
        month: "short",
      }).format(new Date(date));
    } catch {
      return "Hari ini";
    }
  }

  return (
    <article className="rounded-3xl border border-dashboard-outline-variant bg-dashboard-surface-low p-5 shadow-subtle flex flex-col h-full justify-between">
      <div>
        <p className="flex items-center gap-2 text-xs font-semibold tracking-[0.03em] text-dashboard-outline">
          <span className="grid size-9 place-items-center rounded-xl bg-[#2ea043] text-white">
            <BrandIcon name="github" className="size-5" />
          </span>
          Log ngoding
        </p>
        
        <div className="flex items-center gap-2 mt-3">
          <h2 className="text-xl font-bold tracking-[-0.02em]">Commit terbaru dari GitHub.</h2>
          {!loading && (
            <span className="flex size-2 items-center justify-center rounded-full bg-green-500 animate-pulse" title="Live update aktif" />
          )}
        </div>

        {loading ? (
          /* Shimmer Skeleton Premium */
          <div className="mt-4 space-y-3">
            {[1, 2, 3].map((idx) => (
              <div key={idx} className="block rounded-2xl border border-dashboard-outline-variant/60 bg-dashboard-surface-lowest/50 p-3 animate-pulse">
                <div className="h-4 w-3/4 rounded bg-dashboard-outline-variant/50 mb-2" />
                <div className="h-3 w-1/2 rounded bg-dashboard-outline-variant/30" />
              </div>
            ))}
          </div>
        ) : commits.length > 0 ? (
          <div className="mt-4 space-y-3">
            {commits.map((commit) => (
              <Link
                key={`${commit.repo}-${commit.url}`}
                href={commit.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`block rounded-2xl border border-dashboard-outline-variant bg-dashboard-surface-lowest p-3 transition-all hover:scale-[1.01] hover:border-dashboard-outline hover:bg-ghost-white dark:hover:bg-dashboard-surface-low ${focusRing}`}
              >
                <span className="block truncate text-sm font-bold tracking-[-0.02em]">{commit.message}</span>
                <span className="mt-1 block text-xs font-semibold text-dashboard-on-surface-variant">
                  {commit.repo} · {formatCommitDate(commit.pushedAt)}
                </span>
              </Link>
            ))}
          </div>
        ) : (
          <div className="mt-4 rounded-2xl border border-dashboard-outline-variant bg-dashboard-surface-lowest p-4">
            <p className="text-sm font-bold tracking-[-0.02em]">Activity belum publik.</p>
            <p className="mt-2 text-sm leading-6 text-dashboard-on-surface-variant">
              Kalau feed kosong, kemungkinan event GitHub belum kebaca atau repo masih privat.
            </p>
            <Link
              href="https://github.com/ReyyyGITHUB"
              target="_blank"
              rel="noopener noreferrer"
              className={`mt-3 inline-flex items-center gap-2 rounded-xl bg-pitch-black px-3 py-2 text-xs font-bold text-ghost-white dark:bg-ghost-white dark:text-pitch-black ${focusRing}`}
            >
              Cek GitHub
              <BrandIcon name="arrow-up-right" className="size-4" />
            </Link>
          </div>
        )}
      </div>

      {!loading && (
        <div className="mt-4 border-t border-dashboard-outline-variant/40 pt-3 flex justify-between items-center">
          <span className="text-[10px] font-bold text-dashboard-outline">API Status: Real-time Live</span>
          <Link
            href="https://github.com/ReyyyGITHUB"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10px] font-black text-dashboard-primary hover:underline"
          >
            Buka Profile →
          </Link>
        </div>
      )}
    </article>
  );
}
