const withPlugins = require('next-compose-plugins')
const withTranspilation = require('next-transpile-modules')([
  '@47ng/chakra-next'
])
const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/
})

const nextConfig = {
  pageExtensions: ['tsx', 'mdx'],
  experimental: {
    reactRefresh: true
  }
}

module.exports = withPlugins([withTranspilation, withMDX], nextConfig)
