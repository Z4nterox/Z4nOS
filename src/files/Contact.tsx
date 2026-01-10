import React from 'react';

export default function Contact() {
	return (
		<div>
			Get in contact:
			<br />
			<ul>
				<li>
					<a
						style={{ color: 'var(--color-primary)' }}
						href="https://github.com/Z4nterox"
						target="_blank"
						rel="noopener noreferrer"
					>
						{' '}
						Github{' '}
					</a>
				</li>
				<li>
					<a style={{ color: 'var(--color-primary)' }} href="https://discord.com/" target="_blank" rel="noopener noreferrer">
						{' '}
						Discord:{' '}
					</a>
					z4nterox
				</li>
				<li>
					<a style={{ color: 'var(--color-primary)' }} href="mailto:contact@z4nterox.dev">
						contact@z4nterox.dev
					</a>
				</li>
			</ul>
		</div>
	);
}
