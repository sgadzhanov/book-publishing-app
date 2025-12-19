type MissionAndValueItemProps = {
  icon: string
  title: string
  description: string
}

export default function MissionAndValueItem({
  icon,
  title,
  description,
}: MissionAndValueItemProps) {

  return (
    <div className="flex flex-col gap-4">
      <span className="material-symbols-outlined text-3xl text-violet-600">
        {icon}
      </span>
      <h3 className="text-xl font-semibold">
        {title}
      </h3>
      <p className="text-slate-600">
        {description}
      </p>
    </div>
  )
}
