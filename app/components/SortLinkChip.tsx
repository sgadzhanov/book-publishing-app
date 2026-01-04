"use client"

import Link from "next/link"
import { usePathname, useSearchParams } from "next/navigation"

type SortLinkChipProps = {
  to: string
  label: string
  sort?: string
}

export default function SortLinkChip({ to, sort, label }: SortLinkChipProps) {
  const searchParams = useSearchParams()
  const pathname = usePathname()

  const param = searchParams.get("sort")

  const nextHref = param === to ? pathname : `${pathname}?sort=${to}`

  return (
    <Link
      href={nextHref}
      className={`px-3 py-1.5 rounded-full border transition-colors ${sort === to
          ? "bg-violet-400 text-white border-violet-400"
          : "text-slate-600 hover:bg-slate-100 hover:text-slate-800"}`}
    >
      {label}
    </Link>
  )
}
