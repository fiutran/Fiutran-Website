import createMDX from '@next/mdx';
import remarkGfm from 'remark-gfm';

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Every page is statically generated and exported as plain HTML into /out.
  output: 'export',
  trailingSlash: true,
  pageExtensions: ['ts', 'tsx', 'mdx'],
  images: { unoptimized: true },
  poweredByHeader: false,
};

const withMDX = createMDX({ options: { remarkPlugins: [remarkGfm] } });
export default withMDX(nextConfig);
