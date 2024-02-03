"use client"

import { atom, useAtomValue } from "jotai"
import "katex/dist/katex.min.css"
import { Suspense, useMemo } from "react"

type FormulaProps = {
  formula: string
  block?: boolean
}

const katexAtom = atom(async () => (await import("katex")).default)

function FormulaSuspense({ formula, block }: FormulaProps) {
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

const Formula = (props: FormulaProps) => (
  <Suspense fallback={props.block ? <div>{props.formula}</div> : <span>{props.formula}</span>}>
    <FormulaSuspense {...props} />
  </Suspense>
)

export default Formula
