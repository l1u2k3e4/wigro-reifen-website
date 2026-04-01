// src/hooks/useDocumentMeta.ts
// Setzt dynamisch Title, Meta-Description, OG-Tags, Canonical, Robots pro Route

import { useEffect } from 'react'

interface DocumentMetaOptions {
  title: string
  description: string
  canonical: string
  robots?: string
  ogTitle?: string
  ogDescription?: string
  ogImage?: string
  ogUrl?: string
}

function setMeta(attrName: string, attrValue: string, content: string) {
  let el = document.querySelector(
    `meta[${attrName}="${attrValue}"]`
  ) as HTMLMetaElement | null
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attrName, attrValue)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function setLink(rel: string, href: string) {
  let el = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

export function useDocumentMeta({
  title,
  description,
  canonical,
  robots = 'index, follow',
  ogTitle,
  ogDescription,
  ogImage = 'https://wigro-reifen.de/og-image.webp',
  ogUrl,
}: DocumentMetaOptions) {
  useEffect(() => {
    document.title = title

    setMeta('name', 'description', description)
    setMeta('name', 'robots', robots)
    setLink('canonical', canonical)

    setMeta('property', 'og:title', ogTitle ?? title)
    setMeta('property', 'og:description', ogDescription ?? description)
    setMeta('property', 'og:image', ogImage)
    setMeta('property', 'og:url', ogUrl ?? canonical)
    setMeta('property', 'og:locale', 'de_DE')
    setMeta('property', 'og:site_name', 'WIGRO Reifen')
    setMeta('property', 'og:type', 'website')
  }, [title, description, canonical, robots, ogTitle, ogDescription, ogImage, ogUrl])
}
