import Link from "next/link"

type BreadcrumbLink = {
  label: string
  href?: string
}

type BreadcrumbProps = {
  items: BreadcrumbLink[]
}

export default function Breadcrumbs({ items }: BreadcrumbProps) {
  return (
    <nav className="text-sm text-slate-500 mt-6 mb-2">
      <ol className="flex flex-wrap items-center gap-1">
        {items.map((item, index) => (
          <li className="flex items-center gap-1" key={index}>
            {item.href ? (
              <Link className="hover:text-slate-800" href={item.href}>{item.label}</Link>
            ) : (
              <span className="text-slate-700">{item.label}</span>
            )}
            {index < items.length - 1 && <span>/</span>}
          </li>
        ))}
      </ol>
    </nav>
  )
}
