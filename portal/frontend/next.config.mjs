/** @type {import('next').NextConfig} */

const nextConfig = {
	trailingSlash: true,
	images: {
		remotePatterns: [
			{
				protocol: 'http',
				hostname: '127.0.0.1',
				pathname: '/media/**',
			},
			{
				protocol: 'http',
				hostname: 'portal-backend',
				pathname: '/media/**',
			},
		],
	},
}

export default nextConfig