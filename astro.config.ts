import solidJs from '@astrojs/solid-js';
import tailwind from '@astrojs/tailwind';
import icon from 'astro-icon';
import { defineConfig, envField } from 'astro/config';

import vercel from '@astrojs/vercel/serverless';

// https://astro.build/config
export default defineConfig({
	integrations: [tailwind({ applyBaseStyles: false }), icon(), solidJs()],
	// Update to your storefront URL
	site: 'https://storefront-five-navy.vercel.app/',
	output: 'server',
	adapter: vercel(),
	vite: {
		build: {
			assetsInlineLimit(filePath) {
				return filePath.endsWith('css');
			},
		},
		ssr: {
			noExternal: ['@strifeapp/strife'],
		},
	},
	image: {
		// Update to your own image domains
		domains: [
			'localhost',
			'shop-next.astro.build',
			'shop.astro.build',
			'main--astro-swag-shop.netlify.app',
		],
	},
	experimental: {
		env: {
			schema: {
				STRIPE_SECRET_KEY: envField.string({
					context: 'server',
					access: 'secret',
					// This is a random test key
					default:
						'sk_test_51QBbzCKFlMCeKKbVTplO5C6zCO0qjXwjnBlLUScVeapmfyzlkCFVjKYqbTk9UpvHMZtjvHlrs0LxWtEn3ijD4Hxr00ASkbQaJ3',
				}),
				FATHOM_SITE_ID: envField.string({
					context: 'client',
					access: 'public',
					optional: true,
				}),
				GOOGLE_GEOLOCATION_SERVER_KEY: envField.string({
					context: 'server',
					access: 'secret',
					optional: true,
				}),
				GOOGLE_MAPS_BROWSER_KEY: envField.string({
					context: 'client',
					access: 'public',
					optional: true,
				}),
				LOOPS_API_KEY: envField.string({
					context: 'server',
					access: 'secret',
					optional: true,
				}),
				LOOPS_SHOP_TRANSACTIONAL_ID: envField.string({
					context: 'server',
					access: 'public',
					optional: true,
				}),
				LOOPS_FULFILLMENT_TRANSACTIONAL_ID: envField.string({
					context: 'server',
					access: 'public',
					optional: true,
				}),
				LOOPS_FULFILLMENT_EMAIL: envField.string({
					context: 'server',
					access: 'public',
					optional: true,
				}),
				// Used by the Astro team for our internal backend
				SHOP_API_URL: envField.string({
					context: 'server',
					access: 'public',
					optional: true,
				}),
				SHOP_API_KEY: envField.string({
					context: 'server',
					access: 'secret',
					optional: true,
				}),
				US_SHIPPING_RATE_ID: envField.string({
					context: 'server',
					access: 'secret',
					optional: true,
				}),
				INTERNATIONAL_SHIPPING_RATE_ID: envField.string({
					context: 'server',
					access: 'secret',
					optional: true,
				}),
			},
		},
	},
});
