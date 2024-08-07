"use client"

import { atom, useAtom, useAtomValue } from "jotai"
import { Suspense, useMemo } from "react"
import { bundledLanguages, createHighlighter, type BundledLanguage } from "shiki"

type CodeProps = {
  code: string
  lang?: string
}

const theme = "monokai"
const defaultLang = "js"
const langs = [defaultLang]
const bundledLangs = Object.keys(bundledLanguages)

const highlighterAtom = atom(() => createHighlighter({ langs, themes: [theme] }))
const langsAtom = atom(langs)

function CodeSuspense({ code, lang = defaultLang }: CodeProps) {
  const highlighter = useAtomValue(highlighterAtom)
  const [langs, setLangs] = useAtom(langsAtom)

  const html = useMemo(() => {
    if (!langs.includes(lang) && bundledLangs.includes(lang as BundledLanguage))
      highlighter.loadLanguage(lang as BundledLanguage).then(() => setLangs(highlighter.getLoadedLanguages()))
    return highlighter.codeToHtml(code, { lang: langs.includes(lang) ? lang : defaultLang, theme })
  }, [highlighter, langs, setLangs, code, lang])

  return <div className="mfm-blockCode" dangerouslySetInnerHTML={{ __html: html }} />
}

const Code = (props: CodeProps) => (
  <Suspense
    fallback={
      <div className="mfm-blockCode">
        <pre>
          <code>{props.code}</code>
        </pre>
      </div>
    }>
    <CodeSuspense {...props} />
  </Suspense>
)

export default Code
