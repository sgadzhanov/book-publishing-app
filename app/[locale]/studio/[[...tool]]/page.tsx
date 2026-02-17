'use client'

import { useParams } from 'next/navigation'
import { NextStudio } from 'next-sanity/studio'
import config from '@/sanity.config'

export default function StudioPage() {
  const params = useParams<{ locale: string }>()
  const locale = params?.locale ?? 'en'
  const localizedConfig = { ...config, basePath: `/${locale}/studio` }

  return (
    <NextStudio config={localizedConfig} scheme='light' />
  )
}
