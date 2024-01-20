"use client"

import { atom, useAtom, useAtomValue } from "jotai"
import { atomWithDefault } from "jotai/utils"
import { FC, Suspense, useCallback, useMemo } from "react"
import { BUNDLED_LANGUAGES, Lang, getHighlighter, setWasm } from "shiki"
import { dirname, isServer } from "../utils"

type Props = {
  code: string
  lang?: string
}

const theme = "dark-plus"
const defaultLang = "js"
const bundledLangs = BUNDLED_LANGUAGES.map(lang => [lang.id, ...(lang.aliases ?? [])]).flat()

const highlighterAtom = atom(async () => {
  if (isServer) {
    const resolve = import.meta.resolve ?? require.resolve
    const base = dirname(resolve("shiki")) + "/../" // shiki/dist/index.js -> shiki/dist/../
    return getHighlighter({
      theme,
      langs: [defaultLang],
      paths: {
        themes: base + "themes",
        languages: base + "languages",
      },
    })
  } else {
    const [shiki, onig, themeJson] = await Promise.all([
      import("shiki"),
      import("vscode-oniguruma/release/onig.wasm"),
      import(`shiki/themes/${theme}.json`),
    ])
    setWasm(await fetch(onig.default))
    return shiki.getHighlighter({
      theme: themeJson.default,
      langs: [defaultLang],
    })
  }
})

const langsAtom = atomWithDefault<string[] | Promise<string[]>>(async get =>
  (await get(highlighterAtom)).getLoadedLanguages(),
)

const CodeSuspense = ({ code, lang = "js" }: Props) => {
  const highlighter = useAtomValue(highlighterAtom)
  const [langs, setLangs] = useAtom(langsAtom)

  const loadLang = useCallback(
    async (lang: string) => {
      if (!bundledLangs.includes(lang)) return
      await highlighter.loadLanguage(lang as Lang)
      setLangs(highlighter.getLoadedLanguages())
    },
    [highlighter, setLangs],
  )

  const html = useMemo(() => {
    if (!langs.includes(lang)) {
      loadLang(lang)
      return highlighter.codeToHtml(code, { lang: defaultLang })
    }
    return highlighter.codeToHtml(code, { lang })
  }, [highlighter, langs, loadLang, code, lang])

  return <div className="mfm_blockCode" dangerouslySetInnerHTML={{ __html: html }} />
}

const Code: FC<Props> = props => (
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
