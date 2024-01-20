"use client"

import "katex/dist/katex.min.css"
import { FC, Suspense, useMemo } from "react"
import { proxy, useSnapshot } from "valtio"

type Props = {
  formula: string
  block?: boolean
}

const state = proxy({
  katex: import("katex").then(m => m.default),
})

const FormulaSuspense = ({ formula, block }: Props) => {
  const { renderToString } = useSnapshot(state).katex
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
