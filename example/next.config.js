export default {
  output: "export",
  webpack: config => {
    config.module.rules.push({
      test: /\.wasm$/,
      type: "asset",
    })
    return config
  },
}
