/** @type {import("next").NextConfig} */
export default {
  basePath: process.env.NEXT_PUBLIC_BASE_PATH,
  output: "export",
  webpack: config => {
    config.module.rules.push({
      test: /\.wasm$/,
      type: "asset",
    })
    return config
  },
}
