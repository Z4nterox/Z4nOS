import React from 'react';

export default function Notes() {
	return (
		<div>
			<ul>
				<li>tabs {'>'} spaces</li>
				<li>Don&apos;t say again: &quot;Let me just quickly fix that bug...&quot;</li>
				<li>&quot;It works on my machine&quot;; Thanks Todd, that explained everything -.-</li>
				<li>Write better commit messages than &quot;fixed stuff&quot;</li>
				<li>Read the documentation BEFORE asking ChatGPT. Leads to fewer headaches</li>
				<li>
					Never, ever, commit any passwords
					<span style={{ marginLeft: 50 }}>
						Edit: <i>F*ck!</i>
					</span>
				</li>
			</ul>
		</div>
	);
}
