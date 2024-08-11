import React from 'react';

import ColoredText from '@/components/general/ColoredText';
import DesignTokens from 'DesignTokens';

interface FileItem {
	name: string;
	content?: JSX.Element;
	isDirectory: boolean;
}

interface Dictionary<T> {
	[key: string]: T;
}

export function cat(fileStructure: Dictionary<FileItem[]>, currentPath: string, file?: string) {
	if (!file) {
		return 'cat: missing file operand';
	} else {
		return (
			<>{fileStructure[currentPath]?.find((item) => item.name === file)?.content || `cat: '${file}': No such file or directory`}</>
		);
	}
}

export function cd(currentPath: string, setPathState: React.Dispatch<React.SetStateAction<string>>, directory?: string) {
	if (!directory) {
		setPathState('/home/z4nterox');
	} else if (directory === '.') {
		return;
	} else if (directory === '..') {
		if (currentPath === '/home/z4nterox') {
			return;
		} else {
			setPathState((prev) => prev.slice(0, prev.lastIndexOf('/')));
		}
	} else {
		setPathState((prev) => (prev === '/' ? prev + directory : prev + '/' + directory));
	}
}

function listFiles(items: FileItem[]) {
	return (
		<>
			{items
				.sort((fileA, fileB) => fileA.name.localeCompare(fileB.name))
				.map((item) =>
					item.isDirectory ? (
						<span key={item.name} style={{ marginRight: '16px' }}>
							<ColoredText>{item.name}/</ColoredText>
						</span>
					) : (
						<span key={item.name} style={{ marginRight: '16px' }}>
							{item.name}
						</span>
					)
				)}
		</>
	);
}

export function ls(fileStructure: Dictionary<FileItem[]>, currentPath: string, path?: string) {
	if (path) {
		if (!fileStructure[currentPath + '/' + path] && !fileStructure[currentPath].find((item) => item.name === path)) {
			return `ls: cannot access '${path}': No such file or directory`;
		} else if (fileStructure[currentPath].find((item) => item.name === path)?.isDirectory) {
			return <>{listFiles(fileStructure[currentPath + '/' + path])}</>;
		} else {
			return <>{path}</>;
		}
	} else {
		return <>{listFiles(fileStructure[currentPath])}</>;
	}
}

export function help() {
	return (
		<span>
			<ColoredText>btw</ColoredText> - the only linux distro
			<br />
			<ColoredText>cat [FILE]</ColoredText> - print files on the standard output
			<br />
			<ColoredText>cd [DIRECTORY]</ColoredText> - change the working directory
			<br />
			<ColoredText>clear</ColoredText> - clear the terminal screen
			<br />
			<ColoredText>codesolver [QUERY]</ColoredText> - solves any code related problem
			<br />
			<ColoredText>help</ColoredText> - shows this text
			<br />
			<ColoredText>logout</ColoredText> - end session on the system
			<br />
			<ColoredText>ls</ColoredText> - list directory contents
			<br />
			<ColoredText>neofetch</ColoredText> - command-line system information tool
			<br />
			<ColoredText>poweroff</ColoredText> - power-off the system
			<br />
			<ColoredText>pwd</ColoredText> - print name of current/working directory
			<br />
			<ColoredText>reboot</ColoredText> - reboot the system
			<br />
			<ColoredText>source</ColoredText> - link to the source code of this project
			<br />
			<ColoredText>whereami</ColoredText> - location of the system
			<br />
			<ColoredText>whoami</ColoredText> - print effective userid
		</span>
	);
}

export function solver(problem: string) {
	const link = 'https://stackoverflow.com/search?q=' + problem.replace(' ', '+');

	return (
		<a style={{ color: DesignTokens.color.primary.value }} href={link} target="_blank" rel="noopener noreferrer">
			Solution
		</a>
	);
}
