import { Metadata } from "next"
import Mfm from "react-mfm"

export const metadata: Metadata = {
  title: "react-mfm demo (RSC)",
}

const text = `**hello, world**

This is a _test_ page for RSC.

Block code, Custom Emoji, Function, Formula, Hashtag, URL, Link, Mention and Search are client components.
In contrast, **Bold**, <small>Small</small>, _Italic_, ~~Strike~~, \`Inline Code\`,
<center>Center</center>
> and Quote
are server components.`

// Composition含めRSCだけなんだよ 本当だよ

export default function RscPage() {
  return (
    <>
      <h2>RSC</h2>
      <div className="box">
        <Mfm text={text} />
      </div>
    </>
  )
}
