// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	site: 'https://cmotion.org',
	integrations: [
		starlight({
			title: 'cmotion',
			description: 'A typed DSL for video, motion, and animation.',
			logo: { src: './src/assets/icon.svg', replacesTitle: false },
			favicon: '/favicon.svg',
			expressiveCode: {
				themes: ['github-light'],
				useDarkModeMediaQuery: false,
				themeCssRoot: ':root',
			},
			head: [
				{ tag: 'link', attrs: { rel: 'alternate icon', href: '/favicon.ico', sizes: 'any' } },
				{
					tag: 'script',
					content: `document.documentElement.dataset.theme = 'light'; try { localStorage.setItem('starlight-theme', 'light'); } catch(e) {}`,
				},
			],
			social: [
				{ icon: 'github', label: 'GitHub', href: 'https://github.com/taluvi-dev/cmotion' },
			],
			customCss: ['./src/styles/custom.css'],
			pagination: false,
			tableOfContents: { minHeadingLevel: 2, maxHeadingLevel: 3 },
			sidebar: [
				{ label: 'Overview', slug: 'index' },
				{ label: 'Roadmap', slug: 'roadmap' },
				{
					label: 'Language',
					items: [
						{ label: 'Grammar', slug: 'language/grammar' },
						{ label: 'Type system', slug: 'language/types' },
						{ label: 'Stdlib', slug: 'language/stdlib' },
						{ label: 'Diagnostics', slug: 'language/diagnostics' },
					],
				},
				{
					label: 'Implementation',
					items: [
						{ label: 'Reference interpreter', slug: 'impl/interpreter' },
						{ label: 'Backends', slug: 'impl/backends' },
					],
				},
			],
		}),
	],
});
