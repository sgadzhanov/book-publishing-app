import Link from "next/link"

type BreadcrumbsProps = {
  primaryLabel: string
  title: string
}

export default function Breadcrumbs({
  primaryLabel,
  title,
}: BreadcrumbsProps) {
  return (
    <nav className="text-sm text-slate-500 mt-6 mb-2">
      <Link href="/books" className="hover:text-slate-800">
        Books
      </Link>
      {primaryLabel && (
        <>
          {" / "}
          <Link
            href={`/books?label=${encodeURIComponent(primaryLabel)}`}
            className="hover:text-slate-800"
          >
            {primaryLabel}
          </Link>
        </>
      )}
      {" / "}
      <span className="text-slate-700">{title}</span>
    </nav>
  )
}
