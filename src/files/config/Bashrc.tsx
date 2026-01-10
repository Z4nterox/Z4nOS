import React from 'react';

export default function Bashrc() {
	return (
		<div style={{ fontFamily: 'monospace' }}>
			<span style={{ color: '#888' }}># If not running interactively, don&apos;t do anything</span>
			<br />
			[[ $- != *i* ]] &amp;&amp; return
			<br />
			<br />
			<span style={{ color: '#888' }}># Aliases</span>
			<br />
			alias ls=&apos;ls --color=auto&apos;
			<br />
			alias ll=&apos;ls -la&apos;
			<br />
			alias grep=&apos;grep --color=auto&apos;
			<br />
			alias vim=&apos;nvim&apos;
			<br />
			alias please=&apos;sudo&apos;
			<br />
			alias yeet=&apos;rm -rf&apos;
			<br />
			alias shrug=&apos;echo &quot;¯\\_(ツ)_/¯&quot;&apos;
			<br />
			<br />
			<span style={{ color: '#888' }}># Because I always forget</span>
			<br />
			alias :q=&apos;exit&apos;
			<br />
			alias :wq=&apos;exit&apos;
		</div>
	);
}
