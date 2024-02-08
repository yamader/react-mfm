"use client"

import { atom, useAtomValue } from "jotai"
import { Suspense, use, useMemo } from "react"
import { bundledLanguages, getHighlighter, type BundledLanguage } from "shiki"

type CodeProps = {
  code: string
  lang?: string
}

const theme = "monokai"
const defaultLang = "js"
const bundledLangs = Object.keys(bundledLanguages)

const highlighterAtom = atom(() =>
  getHighlighter({
    langs: [defaultLang],
    themes: [theme],
  }),
)

function CodeSuspense({ code, lang = defaultLang }: CodeProps) {
  const highlighter = useAtomValue(highlighterAtom)
  const html = useMemo(async () => {
    if (!bundledLangs.includes(lang)) return highlighter.codeToHtml(code, { lang: defaultLang, theme })
    if (!highlighter.getLoadedLanguages().includes(lang)) await highlighter.loadLanguage(lang as BundledLanguage)
    return highlighter.codeToHtml(code, { lang, theme })
  }, [highlighter, code, lang])

  const __html = use(html)
  return <div className="mfm_blockCode" dangerouslySetInnerHTML={{ __html }} />
}

const Code = (props: CodeProps) => (
  <Suspense
    fallback={
      <div className="mfm_blockCode">
        <pre>
          <code>{props.code}</code>
        </pre>
      </div>
    }>
    <CodeSuspense {...props} />
  </Suspense>
)

export default Code
