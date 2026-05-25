import { notFound } from "next/navigation";
import { ProjectDetailShell } from "@/features/projects/project-detail-shell";
import { getProject, getRelatedProjects, projects } from "@/data/portfolio-data";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) notFound();

  const relatedProjects = getRelatedProjects(project.slug);

  return <ProjectDetailShell project={project} relatedProjects={relatedProjects} />;
}
