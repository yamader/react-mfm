declare module "*.wasm"
declare module "@twemoji/api" {
  const twemoji: import("@twemoji/api/index.d.ts").Twemoji
  export default twemoji
}
