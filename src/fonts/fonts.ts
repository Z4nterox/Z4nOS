import localFont from 'next/font/local';

export const Segoe = localFont({
	src: [
		{
			path: '../fonts/Segoe UI.woff',
			weight: '400',
			style: 'normal',
		},
		{
			path: '../fonts/Segoe UI Italic.woff',
			weight: '400',
			style: 'italic',
		},
		{
			path: '../fonts/Segoe UI Bold.woff',
			weight: '700',
			style: 'normal',
		},
		{
			path: '../fonts/Segoe UI Bold Italic.woff',
			weight: '700',
			style: 'italic',
		},
	],
});

export const Symbols = localFont({
	src: '../fonts/Symbols.ttf',
});

export const Stargate = localFont({
	src: '../fonts/Stargate Address Glyphs.ttf',
});
