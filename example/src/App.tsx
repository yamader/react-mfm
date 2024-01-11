import Mfm from "react-mfm"
import "react-mfm/style.css"

const example = `react-mfm [search]
<center>
**hello, world!**
https://example.com/hoge
\\(1 + 1 = 2\\)
</center>`

const App = () => (
  <main>
    <h1>react-mfm demo</h1>
    <div style={{ border: "1px solid black" }}>
      <Mfm text={example} />
    </div>
  </main>
)

export default App
