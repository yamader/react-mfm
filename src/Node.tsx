import { MfmNode } from "mfm-js"
import { ReactNode } from "react"
import { MfmBasicProps } from "."
import A from "./components/A"
import Code from "./components/Code"
import CustomEmoji from "./components/CustomEmoji"
import Emoji from "./components/Emoji"
import Formula from "./components/Formula"
import Hashtag from "./components/Hashtag"
import Mention from "./components/Mention"
import Search from "./components/Search"
import { composeFnStyle } from "./fn"
import { intersperse } from "./utils"

const SingleNode = ({ node, ...props }: MfmBasicProps & { node: MfmNode }) => {
  switch (node.type) {
    case "quote":
      return node.props?.nowrap ? (
        <span className="mfm_quote">
          <Node nodes={node.children} nyaize={false} />
        </span>
      ) : (
        <div className="mfm_quote">
          <Node nodes={node.children} nyaize={false} />
        </div>
      )

    case "search":
      return <Search {...node.props} />

    case "blockCode":
      return <Code code={node.props.code} lang={node.props.lang ?? undefined} />

    case "mathBlock":
      return <Formula formula={node.props.formula} block />

    case "center":
      return (
        <div style={{ textAlign: "center" }}>
          <Node nodes={node.children} {...props} />
        </div>
      )

    case "unicodeEmoji":
      return <Emoji {...node.props} />

    case "emojiCode":
      return <CustomEmoji {...node.props} />

    case "bold":
      return (
        <b>
          <Node nodes={node.children} {...props} />
        </b>
      )

    case "small":
      return (
        <small className="mfm_small">
          <Node nodes={node.children} {...props} />
        </small>
      )

    case "italic":
      return (
        <i style={{ fontStyle: "oblique" }}>
          <Node nodes={node.children} {...props} />
        </i>
      )

    case "strike":
      return (
        <del>
          <Node nodes={node.children} {...props} />
        </del>
      )

    case "inlineCode":
      return <Code code={node.props.code} inline />

    case "mathInline":
      return <Formula formula={node.props.formula} />

    case "mention":
      return <Mention {...node.props} />

    case "hashtag":
      return <Hashtag {...node.props} />

    case "url": {
      const scheme = node.props.url.split(":")[0] + ":"
      const body = node.props.url.slice(scheme.length)
      const res: ReactNode[] = [scheme]

      if (body.startsWith("//")) {
        res.push("//")
        let auth = body.slice(2).split("/")[0]
        const authlen = auth.length
        if (auth.includes("@")) {
          const userinfo = auth.split("@")[0] + "@"
          res.push(userinfo)
          auth = auth.slice(userinfo.length)
        }
        const [host, ...port] = auth.split(":")
        res.push(<span className="mfm_url_host">{host}</span>)
        if (port.length) res.push(port.join(":"))
        res.push(body.slice(2 + authlen))
      } else res.push(body)

      return (
        <A href={node.props.url} rel="nofollow noopener">
          {res}
        </A>
      )
    }

    case "link":
      return (
        <A href={node.props.url} rel="nofollow noopener">
          <Node nodes={node.children} {...props} nyaize={false} />
        </A>
      )

    case "fn":
      return (
        <span style={composeFnStyle(node.props.name, props.scale)}>
          <Node nodes={node.children} {...props} />
        </span>
      )

    case "plain":
      return (
        <span>
          <Node nodes={node.children} {...props} nyaize={false} />
        </span>
      )

    case "text": {
      const orig = node.props.text.replace(/\r\n?/g, "\n")
      const text = props.nyaize ? orig : orig // todo: nyaize
      return props.plain ? text.replace(/\n/g, " ") : intersperse<ReactNode>(text.split("\n"), <br />)
    }
  }
}

const Node = ({ nodes, ...props }: MfmBasicProps & { nodes?: MfmNode[] }) => (
  <>{nodes && nodes.map((node, i) => <SingleNode {...props} node={node} key={i} />)}</>
)

export default Node
