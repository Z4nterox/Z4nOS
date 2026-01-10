import React from 'react';

import DesignTokens from 'DesignTokens';

export default function Rickroll() {
	return (
		<div>
			<a
				style={{ color: DesignTokens.color.primary.value }}
				href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
				target="_blank"
				rel="noopener noreferrer"
			>
				Data Vault Access
			</a>
		</div>
	);
}
