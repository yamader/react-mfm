"use client"

import { atom, useAtomValue } from "jotai"
import "katex/dist/katex.min.css"
import { FC, Suspense, useMemo } from "react"

type Props = {
  formula: string
  block?: boolean
}

const katexAtom = atom(async () => (await import("katex")).default)

function FormulaSuspense({ formula, block }: Props) {
  const { renderToString } = useAtomValue(katexAtom)
  const html = useMemo(
    () =>
      renderToString(formula, {
        displayMode: block,
        throwOnError: false,
      }),
    [renderToString, formula, block],
  )

  return block ? (
    <div dangerouslySetInnerHTML={{ __html: html }} />
  ) : (
    <span dangerouslySetInnerHTML={{ __html: html }} />
  )
}

const Formula: FC<Props> = props => (
  <Suspense fallback={props.block ? <div>{props.formula}</div> : <span>{props.formula}</span>}>
    <FormulaSuspense {...props} />
  </Suspense>
)

export default Formula
