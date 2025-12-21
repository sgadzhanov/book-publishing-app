
type BadgeProps = {
  badge: string
  index: number
  badgeColor: string
}

export default function Badge({
  badge,
  index,
  badgeColor,
}: BadgeProps) {
  return (
    <span
      key={badge}
      className={`${badgeColor} ?? "bg-slate-600"} text-white text-xs border border-slate-700 font-medium px-3 py-1 rounded-full shadow animate-[fade-in-up_0.4s_ease-out]`}
      style={{ animationDelay: `${index * 80}ms` }}
    >
      {badge}
    </span>
  )
}
