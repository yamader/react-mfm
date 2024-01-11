"use client"

import { atom, useAtomValue } from "jotai"
import { FC, Suspense, useMemo } from "react"

type Props = {
  code: string
  lang?: string
  inline?: boolean
}

const highlighterAtom = atom(async get => {
  const shiki = (await import("shiki")).default
  return shiki.getHighlighter({
    theme: "dark-plus",
    langs: ["js"],
  })
})

const CodeSuspense = ({ code, lang }: Props) => {
  const highlighter = useAtomValue(highlighterAtom)
  const html = useMemo(() => highlighter.codeToHtml(code, { lang }), [highlighter, code, lang])

  // todo: fetchLanguage
  return <code dangerouslySetInnerHTML={{ __html: html }} />
}

const Code: FC<Props> = props =>
  props.inline ? (
    <code>{props.code}</code>
  ) : (
    <Suspense fallback={<code>{props.code}</code>}>
      <CodeSuspense {...props} />
    </Suspense>
  )

export default Code
