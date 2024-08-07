# react-mfm

## Usage

See `example/`.

```tsx
import Mfm from "react-mfm"
import "react-mfm/style.css"
import "katex/dist/katex.min.css" // to support Formula

const text = \`
  <center>
    **hello, world**
  </center>
\`.trim()

export default function Page() {
  return <Mfm text={text} />
}
```
