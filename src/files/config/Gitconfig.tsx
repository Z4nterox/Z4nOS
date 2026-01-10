import React from 'react';

export default function Gitconfig() {
	return (
		<div style={{ fontFamily: 'monospace' }}>
			[user]
			<br />
			&nbsp;&nbsp;&nbsp;&nbsp;name = z4nterox
			<br />
			&nbsp;&nbsp;&nbsp;&nbsp;email = contact@z4nterox.dev
			<br />
			<br />
			[core]
			<br />
			&nbsp;&nbsp;&nbsp;&nbsp;editor = nvim
			<br />
			<br />
			[alias]
			<br />
			&nbsp;&nbsp;&nbsp;&nbsp;yolo = &apos;!git commit -m &quot;$(curl -s whatthecommit.com/index.txt)&quot;&apos;
			<br />
			&nbsp;&nbsp;&nbsp;&nbsp;undo = reset HEAD~1 --soft
			<br />
			&nbsp;&nbsp;&nbsp;&nbsp;please = push --force-with-lease
			<br />
			&nbsp;&nbsp;&nbsp;&nbsp;commend = commit --amend --no-edit
			<br />
			<br />
			[init]
			<br />
			&nbsp;&nbsp;&nbsp;&nbsp;defaultBranch = main
		</div>
	);
}
