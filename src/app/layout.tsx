import type { Metadata } from 'next';

import React from 'react';

import { Segoe } from '@/fonts/fonts';

import '@/styles/globals.css';

export const metadata: Metadata = {
	title: 'Z4nOS',
	description: 'Personal website of Z4nterox',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={Segoe.className}>{children}</body>
		</html>
	);
}
