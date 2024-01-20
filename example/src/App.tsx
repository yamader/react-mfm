import Mfm from "react-mfm"
import "react-mfm/style.css"

const example = String.raw`react-mfm [search]
<center>
  **hello, world!**
  https://example.com:3000/hoge
</center>
\[
  (v\cdot\nabla)v
\]
`

const App = () => (
  <main>
    <h1>react-mfm demo</h1>
    <div style={{ border: "1px solid black" }}>
      <Mfm text={example} />
    </div>
  </main>
)

export default App
