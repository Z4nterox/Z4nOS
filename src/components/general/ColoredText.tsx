import React from 'react';

import DesignTokens from 'DesignTokens';

export default function ColoredText({ children }: { children: string | string[] }) {
	return <span style={{ color: DesignTokens.color.primary.value, fontWeight: 'bold' }}>{children}</span>;
}
