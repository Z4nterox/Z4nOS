import React from 'react';

import DesignTokens from 'DesignTokens';

export default function Contact() {
	return (
		<div>
			Get in contact:
			<br />
			<ul>
				<li>
					<a
						style={{ color: DesignTokens.color.primary.value }}
						href="https://github.com/Z4nterox"
						target="_blank"
						rel="noopener noreferrer"
					>
						{' '}
						Github{' '}
					</a>
				</li>
				<li>
					<a
						style={{ color: DesignTokens.color.primary.value }}
						href="https://discord.com/"
						target="_blank"
						rel="noopener noreferrer"
					>
						{' '}
						Discord:{' '}
					</a>
					z4nterox
				</li>
				<li>
					<a style={{ color: DesignTokens.color.primary.value }} href="mailto:email@example.com">
						contact@z4nterox.dev
					</a>
				</li>
			</ul>
		</div>
	);
}
