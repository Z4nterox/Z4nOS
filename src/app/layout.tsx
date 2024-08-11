import type { Metadata } from 'next';

import React from 'react';

import '@/styles/globals.css';

import { Segoe } from './fonts';

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
