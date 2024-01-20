"use client"

import { FC, Suspense, useEffect, useMemo } from "react"
import { BUNDLED_LANGUAGES, Lang, getHighlighter, setWasm } from "shiki"
import { proxy, useSnapshot } from "valtio"
import { derive } from "valtio/utils"
import { $mfmConfig } from ".."
import { dirname, isServer } from "../utils"

type Props = {
  code: string
  lang?: string
}

const theme = "monokai"
const defaultLang = "js"
const langs: Lang[] = [defaultLang]
const bundledLangs = BUNDLED_LANGUAGES.map(lang => [lang.id, ...(lang.aliases ?? [])]).flat()

const derived = derive({
  highlighter: async get => {
    if (isServer) {
      const resolve = import.meta.resolve ?? require.resolve
      const base = dirname(resolve("shiki")) + "/../" // shiki/dist/index.js -> shiki/dist/../
      return getHighlighter({
        theme,
        langs,
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
        langs,
        paths: {
          languages: get($mfmConfig).assetsBase + "/languages",
        },
      })
    }
  },
})

const state = proxy({
  langs,
})

const CodeSuspense = ({ code, lang = defaultLang }: Props) => {
  const { highlighter } = useSnapshot(derived)
  const { langs } = useSnapshot(state)

  useEffect(() => {
    if (!langs.includes(lang as Lang) && bundledLangs.includes(lang)) {
      highlighter.loadLanguage(lang as Lang).then(() => {
        state.langs = highlighter.getLoadedLanguages()
      })
    }
  }, [highlighter, langs, lang])

  const html = useMemo(
    () => highlighter.codeToHtml(code, { lang: langs.includes(lang as Lang) ? lang : defaultLang }),
    [highlighter, langs, code, lang],
  )

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
