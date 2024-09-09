/** @type {import('next').NextConfig} */

const nextConfig = {
	trailingSlash: true,
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'web-stroy.net',
				port: '',
				pathname: '/cms/media/**',
			},
			{
				protocol: 'http',
				hostname: '127.0.0.1',
				port: '8000',
				pathname: '/media/**',
			},
		],
	},
}

export default nextConfig
