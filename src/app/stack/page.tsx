import { projects, techItems } from "@/data/portfolio-data";
import { TechRadarCanvas } from "@/components/tech-radar-canvas";

export default function StackPage() {
  return (
    <div className="mx-auto w-full max-w-[1200px] px-5 py-5 sm:px-6 lg:px-10 lg:py-8 space-y-6">
      {/* Container utama untuk tech radar canvas interaktif */}
      <section className="w-full home-shell">
        <TechRadarCanvas allProjects={projects} cmsTechItems={techItems} />
      </section>
    </div>
  );
}

