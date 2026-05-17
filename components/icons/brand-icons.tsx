export type BrandIconName =
  | "arrow-up-right"
  | "contact"
  | "cv"
  | "github"
  | "home"
  | "instagram"
  | "journey"
  | "linkedin"
  | "mail"
  | "now"
  | "preview"
  | "projects"
  | "stack"
  | "status"
  | "threads"
  | "whatsapp";

type BrandIconProps = {
  name: BrandIconName;
  className?: string;
};

export function BrandIcon({ name, className = "size-5" }: BrandIconProps) {
  const iconProps = {
    className,
    "aria-hidden": true,
    fill: "none",
    stroke: "currentColor",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    strokeWidth: 1.8,
    viewBox: "0 0 24 24",
  };

  if (name === "github") {
    return (
      <svg {...iconProps} fill="currentColor" stroke="none" viewBox="0 0 24 24">
        <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.2-3.37-1.2-.45-1.16-1.1-1.47-1.1-1.47-.9-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.82.09-.65.35-1.08.63-1.33-2.22-.25-4.55-1.1-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02A9.56 9.56 0 0 1 12 5.98c.85 0 1.7.11 2.5.33 1.9-1.29 2.74-1.02 2.74-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.85-2.34 4.69-4.57 4.94.36.31.68.92.68 1.86v2.76c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" />
      </svg>
    );
  }

  if (name === "whatsapp") {
    return (
      <svg {...iconProps} viewBox="0 0 24 24">
        <path d="M5.3 18.7 6 15.9a7.5 7.5 0 1 1 2.4 2.3l-3.1.5Z" />
        <path d="M9.3 8.8c.2-.4.4-.4.7-.4h.5c.2 0 .4.1.5.4l.5 1.2c.1.3.1.5-.1.7l-.4.5c.5 1 1.3 1.8 2.4 2.4l.6-.5c.2-.2.4-.2.7-.1l1.2.6c.3.1.4.3.4.6v.4c0 .4-.2.6-.5.8-.7.4-1.7.4-3-.2a7.6 7.6 0 0 1-3.9-3.9c-.6-1.3-.6-2.3-.2-3Z" />
      </svg>
    );
  }

  if (name === "linkedin") {
    return (
      <svg {...iconProps} viewBox="0 0 24 24">
        <path d="M6.5 10v7.5" />
        <path d="M10.5 17.5V10" />
        <path d="M10.5 13.2c0-1.8 1.1-3.2 2.9-3.2s3.1 1.2 3.1 3.5v4" />
        <path d="M6.5 6.5v.01" />
        <rect width="16" height="16" x="4" y="4" rx="3" />
      </svg>
    );
  }

  if (name === "instagram") {
    return (
      <svg {...iconProps} viewBox="0 0 24 24">
        <rect width="15" height="15" x="4.5" y="4.5" rx="4" />
        <circle cx="12" cy="12" r="3.2" />
        <path d="M16.5 7.5v.01" />
      </svg>
    );
  }

  if (name === "threads") {
    return (
      <svg {...iconProps} viewBox="0 0 24 24">
        <path d="M15.8 10.5c-.4-2-1.8-3.2-3.8-3.2-2.6 0-4.4 2-4.4 4.7s1.8 4.7 4.5 4.7c2.3 0 4-1.4 4-3.3 0-1.6-1.2-2.6-3.4-2.6h-1.4" />
        <path d="M11.2 13.2c0 .9.7 1.4 1.6 1.4 1 0 1.7-.6 1.7-1.4 0-.9-.7-1.4-1.7-1.4-.9 0-1.6.5-1.6 1.4Z" />
        <path d="M18.8 8.2A8 8 0 1 0 20 12" />
      </svg>
    );
  }

  if (name === "cv") {
    return (
      <svg {...iconProps} viewBox="0 0 24 24">
        <path d="M7 3.5h6l4 4v13H7z" />
        <path d="M13 3.5v4h4" />
        <path d="M9.5 13h5" />
        <path d="M9.5 16h3.5" />
      </svg>
    );
  }

  if (name === "arrow-up-right") {
    return (
      <svg {...iconProps} viewBox="0 0 24 24">
        <path d="M7 17 17 7" />
        <path d="M9 7h8v8" />
      </svg>
    );
  }

  if (name === "home") {
    return (
      <svg {...iconProps} viewBox="0 0 24 24">
        <path d="m4 11 8-7 8 7" />
        <path d="M6.5 10v9h11v-9" />
        <path d="M10 19v-5h4v5" />
      </svg>
    );
  }

  if (name === "projects") {
    return (
      <svg {...iconProps} viewBox="0 0 24 24">
        <rect width="7" height="7" x="4" y="4" rx="1.5" />
        <rect width="7" height="7" x="13" y="4" rx="1.5" />
        <rect width="7" height="7" x="4" y="13" rx="1.5" />
        <rect width="7" height="7" x="13" y="13" rx="1.5" />
      </svg>
    );
  }

  if (name === "journey") {
    return (
      <svg {...iconProps} viewBox="0 0 24 24">
        <path d="M6 5v14" />
        <path d="M6 7h9l-2 3 2 3H6" />
      </svg>
    );
  }

  if (name === "stack") {
    return (
      <svg {...iconProps} viewBox="0 0 24 24">
        <path d="m12 3 8 4-8 4-8-4z" />
        <path d="m4 12 8 4 8-4" />
        <path d="m4 17 8 4 8-4" />
      </svg>
    );
  }

  if (name === "contact") {
    return (
      <svg {...iconProps} viewBox="0 0 24 24">
        <path d="M4.5 6.5h15v11h-15z" />
        <path d="m5 7 7 5.5L19 7" />
      </svg>
    );
  }

  if (name === "status") {
    return (
      <svg {...iconProps} viewBox="0 0 24 24">
        <path d="M12 3.5v3" />
        <path d="M12 17.5v3" />
        <path d="M3.5 12h3" />
        <path d="M17.5 12h3" />
        <circle cx="12" cy="12" r="4.5" />
      </svg>
    );
  }

  if (name === "now") {
    return (
      <svg {...iconProps} viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="8" />
        <path d="M12 7.5V12l3 2" />
      </svg>
    );
  }

  if (name === "preview") {
    return (
      <svg {...iconProps} viewBox="0 0 24 24">
        <path d="M3.5 12s3-5 8.5-5 8.5 5 8.5 5-3 5-8.5 5-8.5-5-8.5-5Z" />
        <circle cx="12" cy="12" r="2.5" />
      </svg>
    );
  }

  return (
    <svg {...iconProps} viewBox="0 0 24 24">
      <path d="M4.5 6.5h15v11h-15z" />
      <path d="m5 7 7 5.5L19 7" />
    </svg>
  );
}
