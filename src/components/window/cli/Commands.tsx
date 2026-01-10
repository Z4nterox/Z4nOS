import React from 'react';

import ColoredText from '@/components/general/ColoredText';

interface FileItem {
	name: string;
	content?: React.ReactNode;
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

export function cd(
	fileStructure: Dictionary<FileItem[]>,
	currentPath: string,
	setPathState: React.Dispatch<React.SetStateAction<string>>,
	directory?: string
) {
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
		const item = fileStructure[currentPath]?.find((item) => item.name === directory);
		if (!item) {
			return `cd: '${directory}': No such file or directory`;
		} else if (!item.isDirectory) {
			return `cd: '${directory}': Not a directory`;
		} else {
			setPathState((prev) => (prev === '/' ? prev + directory : prev + '/' + directory));
		}
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

export function echo(text?: string) {
	return text || '';
}

export function date() {
	return new Date().toLocaleString('en-US', {
		weekday: 'short',
		year: 'numeric',
		month: 'short',
		day: 'numeric',
		hour: '2-digit',
		minute: '2-digit',
		second: '2-digit',
	});
}

export function uptime(startTime: Date) {
	const now = new Date();
	const diff = now.getTime() - startTime.getTime();

	const seconds = Math.floor(diff / 1000) % 60;
	const minutes = Math.floor(diff / (1000 * 60)) % 60;
	const hours = Math.floor(diff / (1000 * 60 * 60));

	return `up ${hours} hours, ${minutes} minutes, ${seconds} seconds`;
}

export function sudo() {
	return "Nice try, but you're not in the sudoers file. This incident will be reported.";
}

export function rm_rf() {
	return 'Permission denied. Did you really think that would work?';
}

export function man(command?: string) {
	if (!command) {
		return "What manual page do you want? Try 'help' for a list of commands.";
	}
	return `No manual entry for ${command}. Try 'help' instead.`;
}

export function history(commandHistory: string[]) {
	if (commandHistory.length === 0) {
		return 'No commands in history.';
	}
	return (
		<>
			{commandHistory.map((cmd, index) => (
				<div key={index}>
					{index + 1} {cmd}
				</div>
			))}
		</>
	);
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
			<ColoredText>date</ColoredText> - display the current date and time
			<br />
			<ColoredText>echo [TEXT]</ColoredText> - display a line of text
			<br />
			<ColoredText>help</ColoredText> - shows this text
			<br />
			<ColoredText>history</ColoredText> - display command history
			<br />
			<ColoredText>logout</ColoredText> - end session on the system
			<br />
			<ColoredText>ls</ColoredText> - list directory contents
			<br />
			<ColoredText>man [COMMAND]</ColoredText> - display manual pages
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
			<ColoredText>sudo [COMMAND]</ColoredText> - execute a command as superuser
			<br />
			<ColoredText>uptime</ColoredText> - show how long the system has been running
			<br />
			<ColoredText>whereami</ColoredText> - location of the system
			<br />
			<ColoredText>whoami</ColoredText> - print effective userid
		</span>
	);
}

export function solver(problem: string) {
	const link = 'https://stackoverflow.com/search?q=' + encodeURIComponent(problem);

	return (
		<a style={{ color: 'var(--color-primary)' }} href={link} target="_blank" rel="noopener noreferrer">
			Solution
		</a>
	);
}
