import React from 'react';

export default function ColoredText({ children }: { children: string | string[] }) {
	return <span style={{ color: 'var(--color-primary)', fontWeight: 'bold' }}>{children}</span>;
}
