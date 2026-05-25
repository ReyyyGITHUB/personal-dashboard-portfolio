export default function Loading() {
  return (
    <div className="grid min-h-[min(580px,calc(100vh-140px))] w-full place-items-center">
      <div className="relative size-12">
        {/* Ring Luar: Putar lambat, warna primer tema dinamis */}
        <div className="absolute inset-0 animate-[spin_1.6s_linear_infinite] rounded-full border-4 border-transparent border-t-dashboard-primary" />
        {/* Ring Dalam: Putar cepat berlawanan arah, warna lime playful */}
        <div className="absolute inset-1.5 animate-[spin_1s_linear_infinite_reverse] rounded-full border-4 border-transparent border-t-lime-pop opacity-90" />
      </div>
    </div>
  );
}
