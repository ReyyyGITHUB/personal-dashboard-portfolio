"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import Link from "next/link";
import { BrandIcon } from "@/components/ui/icons/brand-icons";
import { focusRing } from "@/lib/ui";
import { type Project } from "@/data/portfolio-data";

import { type TechItem } from "@/lib/admin-data";

// 1. Definisikan tipe untuk Node Graph
type NodeType = "core" | "category" | "tech";

interface RadarNode {
  id: string;
  name: string;
  type: NodeType;
  group: string;
  x: number; // Koordinat asli di kanvas (1000x800 space)
  y: number;
  iconUrl: string; // URL icon gambar asli
  colorClassLight: string;
  colorClassDark: string;
  // Detail teknis
  level?: string;
  note?: string;
  confidence?: number; // 0-100
  projects?: string[]; // Slugs
}

// INITIAL_NODES telah dipindahkan ke CMS (portfolio-data.json)


// 3. Relasi Koneksi Garis (Parent ID -> Child ID - KONTRAS DIKENALKAN LEBIH TINGGI)
const RADAR_LINKS = [
  // Primary (Core ke Parent Kategori) - Kontras tinggi (Light: 80% opacity, Dark: 60% opacity)
  { from: "core", to: "frontend", isPrimary: true, colorLight: "stroke-[#3859f9]/80", colorDark: "stroke-[#3859f9]/60" },
  { from: "core", to: "backend", isPrimary: true, colorLight: "stroke-[#3c873a]/80", colorDark: "stroke-[#55c055]/60" },
  { from: "core", to: "styling", isPrimary: true, colorLight: "stroke-[#09687d]/80", colorDark: "stroke-[#429dff]/60" },
  { from: "core", to: "design", isPrimary: true, colorLight: "stroke-[#5b43b3]/85", colorDark: "stroke-[#c1b0ff]/65" },
  { from: "core", to: "iot", isPrimary: true, colorLight: "stroke-[#ff7614]/80", colorDark: "stroke-[#ff7614]/60" },
  { from: "core", to: "database", isPrimary: true, colorLight: "stroke-[#3ecf8e]/80", colorDark: "stroke-[#3ecf8e]/60" },
  
  // Secondary (Kategori ke Teknologi Konkret)
  { from: "frontend", to: "nextjs", isPrimary: false, colorLight: "stroke-[#3859f9]/70", colorDark: "stroke-[#3859f9]/50" },
  { from: "frontend", to: "react", isPrimary: false, colorLight: "stroke-[#3859f9]/70", colorDark: "stroke-[#3859f9]/50" },
  { from: "frontend", to: "htmlcss", isPrimary: false, colorLight: "stroke-[#3859f9]/70", colorDark: "stroke-[#3859f9]/50" },
  { from: "frontend", to: "astro", isPrimary: false, colorLight: "stroke-[#3859f9]/70", colorDark: "stroke-[#3859f9]/50" },
  { from: "frontend", to: "laravel", isPrimary: false, colorLight: "stroke-[#3859f9]/70", colorDark: "stroke-[#3859f9]/50" },

  { from: "backend", to: "expressjs", isPrimary: false, colorLight: "stroke-[#3c873a]/70", colorDark: "stroke-[#55c055]/50" },
  { from: "backend", to: "javascript", isPrimary: false, colorLight: "stroke-[#3c873a]/70", colorDark: "stroke-[#55c055]/50" },
  { from: "backend", to: "typescript", isPrimary: false, colorLight: "stroke-[#3c873a]/70", colorDark: "stroke-[#55c055]/50" },
  { from: "backend", to: "python", isPrimary: false, colorLight: "stroke-[#3c873a]/70", colorDark: "stroke-[#55c055]/50" },
  { from: "backend", to: "php", isPrimary: false, colorLight: "stroke-[#3c873a]/70", colorDark: "stroke-[#55c055]/50" },

  { from: "styling", to: "tailwind", isPrimary: false, colorLight: "stroke-[#09687d]/70", colorDark: "stroke-[#429dff]/50" },
  { from: "styling", to: "css", isPrimary: false, colorLight: "stroke-[#09687d]/70", colorDark: "stroke-[#429dff]/50" },
  { from: "styling", to: "shadcn", isPrimary: false, colorLight: "stroke-[#09687d]/70", colorDark: "stroke-[#429dff]/50" },
  { from: "styling", to: "reactbits", isPrimary: false, colorLight: "stroke-[#09687d]/70", colorDark: "stroke-[#429dff]/50" },
  { from: "styling", to: "bootstrap", isPrimary: false, colorLight: "stroke-[#09687d]/70", colorDark: "stroke-[#429dff]/50" },

  { from: "design", to: "figma", isPrimary: false, colorLight: "stroke-[#5b43b3]/70", colorDark: "stroke-[#c1b0ff]/50" },
  { from: "design", to: "canva", isPrimary: false, colorLight: "stroke-[#5b43b3]/70", colorDark: "stroke-[#c1b0ff]/50" },
  { from: "design", to: "claude-design", isPrimary: false, colorLight: "stroke-[#5b43b3]/70", colorDark: "stroke-[#c1b0ff]/50" },
  { from: "design", to: "stitch-ai", isPrimary: false, colorLight: "stroke-[#5b43b3]/70", colorDark: "stroke-[#c1b0ff]/50" },

  { from: "iot", to: "arduino", isPrimary: false, colorLight: "stroke-[#ff7614]/70", colorDark: "stroke-[#ff7614]/50" },
  { from: "iot", to: "esp32", isPrimary: false, colorLight: "stroke-[#ff7614]/70", colorDark: "stroke-[#ff7614]/50" },

  { from: "database", to: "mysql", isPrimary: false, colorLight: "stroke-[#3ecf8e]/70", colorDark: "stroke-[#3ecf8e]/50" },
  { from: "database", to: "supabase", isPrimary: false, colorLight: "stroke-[#3ecf8e]/70", colorDark: "stroke-[#3ecf8e]/50" },
  { from: "database", to: "firebase", isPrimary: false, colorLight: "stroke-[#3ecf8e]/70", colorDark: "stroke-[#3ecf8e]/50" },

  // Relasi Ekosistem Tambahan (Cross-link) - Kontras Sedang (Lighter)
  { from: "nextjs", to: "react", isCrossLink: true, colorLight: "stroke-gray-400/50", colorDark: "stroke-gray-800/35" },
  { from: "tailwind", to: "css", isCrossLink: true, colorLight: "stroke-gray-400/50", colorDark: "stroke-gray-800/35" },
  { from: "typescript", to: "javascript", isCrossLink: true, colorLight: "stroke-gray-400/50", colorDark: "stroke-gray-800/35" },
  { from: "arduino", to: "esp32", isCrossLink: true, colorLight: "stroke-gray-400/50", colorDark: "stroke-gray-800/35" },
  { from: "react", to: "reactbits", isCrossLink: true, colorLight: "stroke-gray-400/50", colorDark: "stroke-gray-800/35" },
  { from: "supabase", to: "firebase", isCrossLink: true, colorLight: "stroke-gray-400/50", colorDark: "stroke-gray-800/35" },
];

const STACK_CATEGORIES = ["Frontend", "Backend", "Styling", "Design", "IoT", "Database"] as const;

function getNodeCenter(node: RadarNode) {
  let width = 120;
  let height = 40;

  if (node.type === "core") {
    width = 170;
    height = 48;
  } else if (node.type === "category") {
    width = 140;
    height = 40;
  }

  return {
    x: node.x + width / 2,
    y: node.y + height / 2,
  };
}

export function TechRadarCanvas({ allProjects, cmsTechItems = [] }: { allProjects: Project[], cmsTechItems?: TechItem[] }) {
  const containerRef = useRef<HTMLDivElement>(null);

  
  // Tema Website Aktif
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    if (typeof document !== "undefined") {
      setTheme(document.documentElement.classList.contains("dark") ? "dark" : "light");
    }

    const handleThemeChange = (e: Event) => {
      const customEvent = e as CustomEvent<"light" | "dark">;
      setTheme(customEvent.detail);
    };

    window.addEventListener("portfolio-theme-change", handleThemeChange);
    return () => window.removeEventListener("portfolio-theme-change", handleThemeChange);
  }, []);

  // Transform: translateX, translateY, scale (Pan & Zoom Kanvas Utama)
  const [transform, setTransform] = useState({ x: 0, y: 0, scale: 0.9 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const dragOffset = useRef({ x: 0, y: 0 });
  
  // DRAG-AND-DROP NODE INDIVIDUAL (TETAP SINKRON DENGAN DYNAMIC LINES)
  const [nodePositions, setNodePositions] = useState<RadarNode[]>(
    (cmsTechItems as unknown as RadarNode[]) || []
  );
  
  const [activeDragNodeId, setActiveDragNodeId] = useState<string | null>(null);
  const dragNodeOffset = useRef({ x: 0, y: 0 });

  // Seleksi, Hover & View Mode
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"canvas" | "list">("canvas");

  const selectedNode = nodePositions.find((node) => node.id === selectedNodeId);
  const hoveredNode = nodePositions.find((node) => node.id === hoveredNodeId);

  // Proyek yang menggunakan teknologi terpilih
  const activeDetailNode = selectedNode || hoveredNode;
  const relatedProjects = activeDetailNode?.projects 
    ? allProjects.filter((p) => activeDetailNode.projects?.includes(p.slug))
    : [];

  // Posisikan kanvas di tengah viewport saat pertama mount
  useEffect(() => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.width / 2 - 600;
      const centerY = rect.height / 2 - 450;
      setTransform({ x: centerX, y: centerY, scale: 0.9 });
    }
  }, [viewMode]);

  // Listener tombol Esc untuk menutup panel detail
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedNodeId(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Handler Pan Kanvas
  function handlePointerDown(e: React.PointerEvent<HTMLDivElement>) {
    if (e.button !== 0) return;
    if (activeDragNodeId) return;
    setIsDragging(true);
    dragStart.current = { x: e.clientX, y: e.clientY };
    dragOffset.current = { x: transform.x, y: transform.y };
    containerRef.current?.setPointerCapture(e.pointerId);
    
    // Clear selection when clicking canvas background
    setSelectedNodeId(null);
  }

  function handlePointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (!isDragging) return;
    const dx = e.clientX - dragStart.current.x;
    const dy = e.clientY - dragStart.current.y;
    
    setTransform((prev) => ({
      ...prev,
      x: dragOffset.current.x + dx,
      y: dragOffset.current.y + dy,
    }));
  }

  function handlePointerUp(e: React.PointerEvent<HTMLDivElement>) {
    if (isDragging) {
      setIsDragging(false);
      containerRef.current?.releasePointerCapture(e.pointerId);
    }
  }

  // Zoom
  function handleWheel(e: React.WheelEvent<HTMLDivElement>) {
    e.preventDefault();
    const zoomIntensity = 0.05;
    const minScale = 0.4;
    const maxScale = 1.8;

    let newScale = transform.scale + (e.deltaY < 0 ? zoomIntensity : -zoomIntensity);
    newScale = Math.max(minScale, Math.min(maxScale, newScale));

    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      const scaleRatio = newScale / transform.scale;
      
      const newX = mouseX - (mouseX - transform.x) * scaleRatio;
      const newY = mouseY - (mouseY - transform.y) * scaleRatio;

      setTransform({
        x: newX,
        y: newY,
        scale: newScale,
      });
    }
  }

  // Zoom In/Out
  function zoomIn() {
    setTransform((prev) => {
      const nextScale = Math.min(1.8, prev.scale + 0.15);
      return { ...prev, scale: nextScale };
    });
  }

  function zoomOut() {
    setTransform((prev) => {
      const nextScale = Math.max(0.4, prev.scale - 0.15);
      return { ...prev, scale: nextScale };
    });
  }

  // Reset
  function resetView() {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.width / 2 - 600;
      const centerY = rect.height / 2 - 450;
      setTransform({ x: centerX, y: centerY, scale: 0.9 });
    }
    setNodePositions((cmsTechItems as unknown as RadarNode[]) || []);
  }

  // Handler Drag individual node
  function handleNodePointerDown(e: React.PointerEvent<HTMLButtonElement>, nodeId: string) {
    e.stopPropagation();
    setActiveDragNodeId(nodeId);

    const clientXInCanvas = (e.clientX - transform.x) / transform.scale;
    const clientYInCanvas = (e.clientY - transform.y) / transform.scale;
    
    const node = nodePositions.find((n) => n.id === nodeId);
    if (node) {
      dragNodeOffset.current = {
        x: clientXInCanvas - node.x,
        y: clientYInCanvas - node.y,
      };
    }
    e.currentTarget.setPointerCapture(e.pointerId);
  }

  function handleNodePointerMove(e: React.PointerEvent<HTMLButtonElement>, nodeId: string) {
    if (activeDragNodeId !== nodeId) return;
    e.stopPropagation();

    const clientXInCanvas = (e.clientX - transform.x) / transform.scale;
    const clientYInCanvas = (e.clientY - transform.y) / transform.scale;

    const newX = clientXInCanvas - dragNodeOffset.current.x;
    const newY = clientYInCanvas - dragNodeOffset.current.y;

    const boundedX = Math.max(0, Math.min(1200, newX));
    const boundedY = Math.max(0, Math.min(900, newY));

    setNodePositions((prev) =>
      prev.map((node) => (node.id === nodeId ? { ...node, x: boundedX, y: boundedY } : node))
    );
  }

  function handleNodePointerUp(e: React.PointerEvent<HTMLButtonElement>, nodeId: string) {
    if (activeDragNodeId === nodeId) {
      e.stopPropagation();
      setActiveDragNodeId(null);
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
  }

  // Handle Klik Node (MURNI MEMILIH NODE, TANPA MEMAKSA GESER KAMERA/RESET FOKUS!)
  function handleNodeClick(e: React.MouseEvent, nodeId: string) {
    e.stopPropagation();
    if (isDragging) return;
    setSelectedNodeId((prev) => (prev === nodeId ? null : nodeId));
  }

  return (
    <div className="flex flex-col gap-5 w-full">
      {/* CSS untuk Animasi Aliran Listrik */}
      <style>{`
        @keyframes dash-flow {
          to {
            stroke-dashoffset: -20;
          }
        }
        .animated-dash-line {
          stroke-dasharray: 6 5;
          animation: dash-flow 4.5s linear infinite;
        }
        .animated-dash-cross {
          stroke-dasharray: 4 4;
          animation: dash-flow 8s linear infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .animated-dash-line, .animated-dash-cross {
            animation: none;
          }
        }
      `}</style>

      {/* 6. Header Kanvas & Pilihan Tampilan */}
      <div className="flex flex-wrap items-center justify-between gap-4 px-1">
        <div>
          <span className="inline-flex rounded-full border border-dashboard-outline-variant bg-dashboard-surface-low px-3 py-1 text-xs font-bold text-dashboard-on-surface-variant">
            Interactive playground
          </span>
          <h2 className="mt-2.5 text-2xl font-black tracking-[-0.04em] sm:text-3xl">
            Sistem Relasi Stack
          </h2>
          <p className="mt-1 text-sm text-dashboard-on-surface-variant">
            Seret node individual untuk memindahkannya secara instan. Garis relasi SVG akan mengikuti tanpa lag.
          </p>
        </div>

        <div className="flex gap-2 rounded-xl bg-dashboard-surface-low p-1 border border-dashboard-outline-variant">
          <button
            type="button"
            onClick={() => setViewMode("canvas")}
            className={`flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-black transition-colors ${
              viewMode === "canvas"
                ? "bg-pitch-black text-ghost-white shadow-subtle dark:bg-ghost-white dark:text-pitch-black"
                : "text-dashboard-on-surface-variant hover:text-dashboard-on-surface"
            }`}
          >
            <BrandIcon name="stack" className="size-4" />
            Kanvas Node
          </button>
          <button
            type="button"
            onClick={() => setViewMode("list")}
            className={`flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-black transition-colors ${
              viewMode === "list"
                ? "bg-pitch-black text-ghost-white shadow-subtle dark:bg-ghost-white dark:text-pitch-black"
                : "text-dashboard-on-surface-variant hover:text-dashboard-on-surface"
            }`}
          >
            <BrandIcon name="projects" className="size-4" />
            Daftar Klasik
          </button>
        </div>
      </div>

      {viewMode === "canvas" ? (
        <div 
          className={`relative w-full rounded-[2.25rem] border shadow-subtle min-h-[640px] lg:min-h-[720px] overflow-hidden transition-colors duration-300 ${
            theme === "dark" 
              ? "bg-[#101014] border-white/10" 
              : "bg-[#f4f3ef] border-dashboard-outline-variant"
          }`}
        >
          {/* A. Grid Kanvas Interaktif */}
          <div
            ref={containerRef}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerLeave={() => {
              handlePointerUp;
              setHoveredNodeId(null);
            }}
            onWheel={handleWheel}
            className={`absolute inset-0 select-none ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}
            style={{ touchAction: "none" }}
          >
            {/* Inner kanvas yang ditransformasikan */}
            <div
              className="absolute w-[1200px] h-[900px] origin-top-left transition-transform duration-100 ease-out"
              style={{
                transform: `translate3d(${transform.x}px, ${transform.y}px, 0) scale(${transform.scale})`,
                backgroundImage: theme === "dark"
                  ? `linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)`
                  : `linear-gradient(to right, rgba(0,0,0,0.07) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.07) 1px, transparent 1px)`,
                backgroundSize: "40px 40px",
              }}
            >
              {/* Garis-garis Relasi SVG */}
              <svg className="absolute inset-0 pointer-events-none size-full z-0 overflow-visible">
                {RADAR_LINKS.map((link, i) => {
                  const fromNode = nodePositions.find((n) => n.id === link.from);
                  const toNode = nodePositions.find((n) => n.id === link.to);

                  if (!fromNode || !toNode) return null;

                  const p1 = getNodeCenter(fromNode);
                  const p2 = getNodeCenter(toNode);

                  let lineClass = "";
                  if (!link.isPrimary && !link.isCrossLink) {
                    lineClass = "animated-dash-line";
                  } else if (link.isCrossLink) {
                    lineClass = "animated-dash-cross";
                  }

                  const strokeWidth = link.isCrossLink ? 0.7 : 1.2;

                  return (
                    <line
                      key={`${link.from}-${link.to}-${i}`}
                      x1={p1.x}
                      y1={p1.y}
                      x2={p2.x}
                      y2={p2.y}
                      className={`${theme === "dark" ? link.colorDark : link.colorLight} ${lineClass} transition-colors duration-300`}
                      style={{ strokeWidth }}
                    />
                  );
                })}
              </svg>

              {/* Tampilan Node Card Div dengan Custom Hover & Click Popover Tooltips */}
              {nodePositions.map((node) => {
                const isSelected = selectedNodeId === node.id;
                const isHovered = hoveredNodeId === node.id;
                
                let width = 120;
                let height = 40;
                let sizeClass = "w-[120px] h-[40px] text-xs";
                
                if (node.type === "core") {
                  width = 170;
                  height = 48;
                  sizeClass = "w-[170px] h-[48px] text-sm";
                } else if (node.type === "category") {
                  width = 140;
                  height = 40;
                  sizeClass = "w-[140px] h-[40px] text-xs";
                }

                const isInteract = isSelected || isHovered;
                let activeStyle = "";
                if (isInteract) {
                  if (node.id === "core") activeStyle = "ring-2 ring-[#cbd810] border-[#cbd810] scale-[1.04]";
                  else if (node.group === "Frontend" || node.id === "frontend") activeStyle = "ring-2 ring-[#3859f9] border-[#3859f9] scale-[1.04]";
                  else if (node.group === "Backend" || node.id === "backend") activeStyle = "ring-2 ring-[#3c873a] border-[#3c873a] scale-[1.04]";
                  else if (node.group === "Styling" || node.id === "styling") activeStyle = "ring-2 ring-[#429dff] border-[#429dff] scale-[1.04]";
                  else if (node.group === "Design" || node.id === "design") activeStyle = "ring-2 ring-[#c1b0ff] border-[#c1b0ff] scale-[1.04]";
                  else if (node.group === "IoT" || node.id === "iot") activeStyle = "ring-2 ring-[#ff7614] border-[#ff7614] scale-[1.04]";
                  else if (node.group === "Database" || node.id === "database") activeStyle = "ring-2 ring-[#3ecf8e] border-[#3ecf8e] scale-[1.04]";
                }

                const colorClass = theme === "dark" ? node.colorClassDark : node.colorClassLight;

                // Penentuan posisi tooltip secara dinamis:
                // Jika node di area atas canvas (y < 350), popover muncul di bawah. Jika area bawah, popover muncul di atas.
                const isUpperHalf = node.y < 350;
                const tooltipClass = isUpperHalf 
                  ? "absolute top-[calc(100%+10px)] left-1/2 -translate-x-1/2" 
                  : "absolute bottom-[calc(100%+10px)] left-1/2 -translate-x-1/2";
                
                const arrowClass = isUpperHalf
                  ? "absolute top-[-5px] left-1/2 -translate-x-1/2 size-2.5 rotate-45 border-l border-t border-dashboard-outline-variant/85 bg-dashboard-surface-lowest"
                  : "absolute bottom-[-5px] left-1/2 -translate-x-1/2 size-2.5 rotate-45 border-r border-b border-dashboard-outline-variant/85 bg-dashboard-surface-lowest";

                return (
                  <div
                    key={node.id}
                    className={`absolute flex items-center justify-center transition-all duration-200 ${isInteract ? "z-40" : "z-10"}`}
                    style={{ 
                      left: node.x, 
                      top: node.y,
                      width: width,
                      height: height
                    }}
                  >
                    <button
                      type="button"
                      onPointerDown={(e) => handleNodePointerDown(e, node.id)}
                      onPointerMove={(e) => handleNodePointerMove(e, node.id)}
                      onPointerUp={(e) => handleNodePointerUp(e, node.id)}
                      onClick={(e) => handleNodeClick(e, node.id)}
                      onMouseEnter={() => !isDragging && activeDragNodeId === null && setHoveredNodeId(node.id)}
                      onMouseLeave={() => setHoveredNodeId(null)}
                      className={`w-full h-full flex items-center gap-2 rounded-2xl border px-3 py-1.5 font-bold transition-colors duration-200 shadow-subtle cursor-grab active:cursor-grabbing select-none ${colorClass} ${activeStyle}`}
                      style={{ touchAction: "none" }}
                    >
                      <span className="flex items-center justify-center shrink-0 size-5 overflow-hidden rounded-md bg-transparent">
                        <img 
                          src={node.iconUrl} 
                          alt="" 
                          className="size-4 object-contain filter dark:brightness-100" 
                          onError={(e) => {
                            e.currentTarget.style.display = "none";
                          }}
                        />
                      </span>
                      <span className="truncate tracking-[-0.01em]">{node.name}</span>
                    </button>

                    {/* Popover Detail Tooltip Premium */}
                    {isInteract && (
                      <div 
                        className={`z-50 w-[260px] rounded-2xl border p-4 shadow-subtle backdrop-blur-md transition-opacity duration-200 bg-dashboard-surface-lowest/95 text-dashboard-on-surface border-dashboard-outline-variant/85 animate-fadeIn ${tooltipClass} ${
                          isSelected ? "pointer-events-auto" : "pointer-events-none"
                        }`}
                      >
                        <div className="space-y-2.5">
                          <div className="flex items-center gap-2.5">
                            <span className="grid size-7 shrink-0 place-items-center rounded-lg border border-dashboard-outline-variant/60 bg-dashboard-surface-low/85">
                              <img src={node.iconUrl} alt="" className="size-4.5 object-contain" />
                            </span>
                            <div className="min-w-0">
                              <h4 className="font-black text-xs tracking-[-0.01em] truncate">
                                {node.name}
                              </h4>
                              <div className="flex flex-wrap items-center gap-1 mt-0.5">
                                <span className="rounded px-1.5 py-0.5 text-[8px] font-black uppercase tracking-[0.06em] bg-dashboard-surface-low text-dashboard-outline">
                                  {node.group}
                                </span>
                                {node.level && (
                                  <span className={`rounded px-1.5 py-0.5 text-[8px] font-bold ${
                                    theme === "dark" ? "bg-[#cbd810]/20 text-[#cbd810]" : "bg-[#cbd810]/25 text-[#5f6f24]"
                                  }`}>
                                    {node.level}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                          <p className="text-[10px] font-semibold leading-relaxed border-t border-dashboard-outline-variant/40 pt-2 text-dashboard-on-surface-variant">
                            {node.note}
                          </p>
                          {isSelected && relatedProjects.length > 0 && (
                            <div className="space-y-1.5 border-t border-dashboard-outline-variant/40 pt-2">
                              <span className="text-[8px] font-black uppercase tracking-[0.06em] text-dashboard-outline block">
                                Proyek Terkait
                              </span>
                              <div className="grid gap-0.5">
                                {relatedProjects.map((p) => (
                                  <Link 
                                    key={p.slug} 
                                    href={`/projects/${p.slug}`} 
                                    className="block rounded-lg px-2.5 py-1 text-[10px] font-bold truncate bg-dashboard-surface-low hover:bg-dashboard-surface-lowest text-dashboard-on-surface border border-dashboard-outline-variant/20 hover:border-dashboard-outline transition-colors"
                                  >
                                    {p.title} →
                                  </Link>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                        {/* CSS Arrow */}
                        <div className={arrowClass} />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* C. Kontrol Overlay Pojok Kiri Bawah */}
          <div 
            className={`absolute bottom-6 left-6 z-20 flex items-center gap-1.5 rounded-2xl border p-1.5 shadow-subtle backdrop-blur-sm transition-colors duration-300 ${
              theme === "dark" 
                ? "border-white/10 bg-[#17171d]/90 text-white" 
                : "border-dashboard-outline-variant bg-[#ffffff]/90 text-pitch-black"
            }`}
          >
            <button
              type="button"
              onClick={zoomIn}
              title="Zoom In"
              className={`grid size-9 place-items-center rounded-xl font-bold transition-transform hover:-translate-y-0.5 border ${focusRing} ${
                theme === "dark"
                  ? "bg-[#202027] text-white hover:bg-[#2c2c35] border-white/5"
                  : "bg-dashboard-surface-low text-pitch-black hover:bg-[#ffffff] border-dashboard-outline-variant/60"
              }`}
            >
              +
            </button>
            <button
              type="button"
              onClick={zoomOut}
              title="Zoom Out"
              className={`grid size-9 place-items-center rounded-xl font-bold transition-transform hover:-translate-y-0.5 border ${focusRing} ${
                theme === "dark"
                  ? "bg-[#202027] text-white hover:bg-[#2c2c35] border-white/5"
                  : "bg-dashboard-surface-low text-pitch-black hover:bg-[#ffffff] border-dashboard-outline-variant/60"
              }`}
            >
              -
            </button>
            <button
              type="button"
              onClick={resetView}
              title="Pusatkan Kanvas & Reset Node"
              className={`flex items-center gap-1 px-3 py-2 h-9 rounded-xl text-xs font-black transition-transform hover:-translate-y-0.5 border ${focusRing} ${
                theme === "dark"
                  ? "bg-[#202027] text-white hover:bg-[#2c2c35] border-white/5"
                  : "bg-dashboard-surface-low text-pitch-black hover:bg-[#ffffff] border-dashboard-outline-variant/60"
              }`}
            >
              <BrandIcon name="status" className="size-3.5" />
              Reset Layout
            </button>
          </div>
        </div>
      ) : (
        /* C. TAMPILAN DAFTAR KLASIK SECTION GRID (DIKELOMPOKKAN PER KATEGORI!) */
        <div className="space-y-10 w-full animate-fadeIn">
          {STACK_CATEGORIES.map((category) => {
            const categoryItems = nodePositions.filter(
              (n) => n.type === "tech" && n.group === category
            );

            if (categoryItems.length === 0) return null;

            // Dapatkan warna bullet sesuai kategori untuk estetika premium
            let bulletColor = "bg-[#cbd810]";
            if (category === "Frontend") bulletColor = "bg-[#3859f9]";
            else if (category === "Backend") bulletColor = "bg-[#3c873a]";
            else if (category === "Styling") bulletColor = "bg-[#429dff]";
            else if (category === "Design") bulletColor = "bg-[#c1b0ff]";
            else if (category === "IoT") bulletColor = "bg-[#ff7614]";
            else if (category === "Database") bulletColor = "bg-[#3ecf8e]";

            return (
              <section key={category} className="space-y-4">
                <h3 className="text-xl font-black tracking-[-0.04em] flex items-center gap-2 border-b border-dashboard-outline-variant pb-2 text-dashboard-on-surface">
                  <span className={`size-3 rounded-full ${bulletColor} shrink-0`} />
                  {category}
                </h3>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {categoryItems.map((item) => {
                    const nodeProjects = allProjects.filter((p) => item.projects?.includes(p.slug));
                    
                    return (
                      <article
                        key={item.id}
                        className="rounded-[2rem] border border-dashboard-outline-variant bg-dashboard-surface-lowest p-5 shadow-subtle flex flex-col justify-between min-h-[220px]"
                      >
                        <div>
                          <div className="flex items-center justify-between gap-3">
                            <span className="flex items-center gap-2.5 font-black text-dashboard-on-surface text-lg tracking-[-0.02em]">
                              <span className="grid size-9 place-items-center rounded-xl bg-dashboard-surface-low border border-dashboard-outline-variant">
                                <img src={item.iconUrl} alt="" className="size-5 object-contain" />
                              </span>
                              {item.name}
                            </span>
                            <span className="rounded-full bg-dashboard-surface-low px-2.5 py-1 text-xs font-bold text-dashboard-on-surface-variant">
                              {item.level}
                            </span>
                          </div>
                          <p className="mt-3 text-sm font-semibold leading-relaxed text-dashboard-on-surface-variant">
                            {item.note}
                          </p>
                        </div>

                        <div className="mt-4 border-t border-dashboard-outline-variant pt-4">
                          {nodeProjects.length > 0 ? (
                            <div className="flex flex-wrap gap-1.5 items-center">
                              <span className="text-[10px] font-bold text-dashboard-outline mr-1">Proyek:</span>
                              {nodeProjects.map((p) => (
                                <Link
                                  key={p.slug}
                                  href={`/projects/${p.slug}`}
                                  className={`rounded-full bg-dashboard-surface-low border border-dashboard-outline-variant px-2.5 py-0.5 text-[10px] font-black text-dashboard-on-surface transition-colors hover:border-dashboard-outline ${focusRing}`}
                                >
                                  {p.title}
                                </Link>
                              ))}
                            </div>
                          ) : (
                            <p className="text-[10px] italic text-dashboard-outline">Belum ada proyek terdaftar</p>
                          )}
                        </div>
                      </article>
                    );
                  })}
                </div>
              </section>
            );
          })}
        </div>
      )}
    </div>
  );
}
