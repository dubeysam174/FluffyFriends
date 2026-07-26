const GlassCard = ({ icon, title, subtitle, className }) => {
  return (
    <div
      className={`absolute flex items-center gap-3 rounded-2xl border border-white/30 bg-white/20 backdrop-blur-xl shadow-xl p-4 ${className}`}
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-500 text-white">
        {icon}
      </div>

      <div>
        <h3 className="font-semibold">{title}</h3>
        <p className="text-sm text-gray-600">{subtitle}</p>
      </div>
    </div>
  );
};

export default GlassCard;