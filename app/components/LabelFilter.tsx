"use client"

import { Search, X } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { useMemo, useState } from "react"
import { useTranslations } from "next-intl"

type FilterDropdownProps = {
  items: string[]
  itemCounts?: Record<string, number>
  queryParam: string
  placeholder?: string
  currentFilterLabel?: string
}

export default function FilterDropdown({
  items,
  itemCounts,
  queryParam,
  placeholder,
  currentFilterLabel
}: FilterDropdownProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const currentValue = searchParams.get(queryParam)
  const t = useTranslations("common")

  const [searchTerm, setSearchTerm] = useState('')
  const [isOpen, setIsOpen] = useState(false)

  // Filter items based on search
  const filteredItems = useMemo(() => {
    if (!searchTerm) return items.slice(0, 20) // Show first 20 by default
    return items.filter(item =>
      item.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [searchTerm, items])

  const handleSelect = (value: string | null) => {
    const params = new URLSearchParams(searchParams.toString())

    if (value === null) {
      // "All" button or clear
      params.delete(queryParam)
    } else if (currentValue === value) {
      // Deselect current
      params.delete(queryParam)
    } else {
      params.set(queryParam, value)
      params.delete('page')
    }

    const basePath = window.location.pathname
    router.replace(`${basePath}?${params.toString()}`, { scroll: false })
    setIsOpen(false)
    setSearchTerm('')
  }

  const clearFilter = () => {
    const params = new URLSearchParams(searchParams.toString())
    params.delete(queryParam)
    const basePath = window.location.pathname
    router.replace(`${basePath}?${params.toString()}`, { scroll: false })
  }

  return (
    <div className="w-full">
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 z-10" />
          <input
            type="text"
            placeholder={placeholder}
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value)
              setIsOpen(true)
            }}
            onFocus={() => setIsOpen(true)}
            className="w-full pl-10 pr-10 py-2 ring ring-stone-600 rounded-lg focus:outline-none focus:ring focus:ring-violet-500 text-sm"
          />
          {currentValue && !searchTerm && (
            <button
              onClick={clearFilter}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              aria-label={t("clearFilter")}
            >
              <X className="h-4 w-4" />
            </button>
          )}

          {/* Dropdown Results */}
          {isOpen && filteredItems.length > 0 && (
            <>
              {/* Backdrop */}
              <div
                className="fixed inset-0 z-10"
                onClick={() => setIsOpen(false)}
              />

              {/* Dropdown */}
              <div className="absolute z-20 w-full left-0 mt-1 bg-white border rounded-lg shadow-lg max-h-80 overflow-y-auto">
                {filteredItems.map(item => (
                  <button
                    key={item}
                    onClick={() => handleSelect(item)}
                    className={`w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center justify-between text-sm ${currentValue === item ? 'bg-violet-50 text-violet-700 font-medium' : ''
                      }`}
                  >
                    <span>{item}</span>
                    {itemCounts && (
                      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                        {itemCounts[item]}
                      </span>
                    )}
                  </button>
                ))}

                {searchTerm && filteredItems.length === 0 && (
                  <div className="px-4 py-3 text-sm text-gray-500 text-center">
                    {t("noResultsFound")}
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Current Selection */}
      {currentValue && !searchTerm && (
        <div className="flex items-center gap-2 mt-3">
          <span className="text-sm text-gray-600">{currentFilterLabel}</span>
          <span className="inline-flex items-center gap-2 px-3 py-1 bg-violet-200/60 rounded-full text-sm">
            {currentValue}
            <button
              onClick={clearFilter}
              className="hover:text-violet-700"
              aria-label={t("removeFilter")}
            >
              <X className="h-3 w-3" />
            </button>
          </span>
        </div>
      )}
    </div>
  )
}