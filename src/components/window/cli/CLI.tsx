import React, { ChangeEvent, KeyboardEvent, MutableRefObject, useEffect, useRef, useState } from 'react';

import ColoredText from '@/components/general/ColoredText';
import SymbolText from '@/components/general/SymbolText';
import About from '@/files/About';
import Contact from '@/files/Contact';
import Skills from '@/files/Skills';
import Todo from '@/files/Todo';
import Bashrc from '@/files/config/Bashrc';
import Gitconfig from '@/files/config/Gitconfig';
import Notes from '@/files/documents/Notes';
import Resume from '@/files/documents/Resume';
import Passwords from '@/files/secrets/Passwords';
import Rickroll from '@/files/secrets/Rickroll';
import { Stargate } from '@/fonts/fonts';
import { Segoe } from '@/fonts/fonts';
import classNames from 'classnames';
import { Interweave } from 'interweave';

import Neofetch from '../neofetch/Neofetch';
import styles from './CLI.module.css';
// eslint-disable-next-line import/no-namespace
import * as Command from './Commands';

interface FileItem {
	name: string;
	content?: React.ReactNode;
	isDirectory: boolean;
}

interface Dictionary<T> {
	[key: string]: T;
}

const fileStructure: Dictionary<FileItem[]> = {
	'/home/z4nterox': [
		{ name: '.bashrc', content: <Bashrc />, isDirectory: false },
		{ name: '.gitconfig', content: <Gitconfig />, isDirectory: false },
		{ name: '.secrets', isDirectory: true },
		{ name: 'documents', isDirectory: true },
	],
	'/home/z4nterox/.secrets': [
		{ name: 'passwords.txt', content: <Passwords />, isDirectory: false },
		{ name: 'important_file.txt', content: <Rickroll />, isDirectory: false },
	],
	'/home/z4nterox/documents': [
		{ name: 'notes.txt', content: <Notes />, isDirectory: false },
		{ name: 'resume.txt', content: <Resume />, isDirectory: false },
		{ name: 'skills.txt', content: <Skills />, isDirectory: false },
		{ name: 'todo.txt', content: <Todo />, isDirectory: false },
		{ name: 'about.txt', content: <About />, isDirectory: false },
		{ name: 'contact.txt', content: <Contact />, isDirectory: false },
	],
};

interface CLIProps {
	LogOut: () => void;
	Restart: () => void;
	PowerOff: () => void;
}

export default function CLI(props: CLIProps) {
	const [input, setInput] = useState<string>('');
	const [history, setHistory] = useState<{ command: string; output: React.ReactNode }[]>([]);
	const [commandHistory, setCommandHistory] = useState<string[]>([]);
	const [commandHistoryIndex, setCommandHistoryIndex] = useState<number>(-1);
	const [matches, setMatches] = useState<string[]>([]);
	const [matchIndex, setMatchIndex] = useState<number>(-1);
	const [startTime] = useState<Date>(new Date());

	const [currentPath, setCurrentPath] = useState<string>('/home/z4nterox');

	const terminalRef: MutableRefObject<HTMLDivElement | null> = useRef(null);
	const inputRef: MutableRefObject<HTMLInputElement | null> = useRef(null);

	useEffect(() => {
		inputRef.current!.focus();
	}, []);

	useEffect(() => {
		if (terminalRef.current) {
			terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
		}
	}, [history]);

	function TerminalString() {
		return <ColoredText>{currentPath.replace('/home/z4nterox', '~')} ➜</ColoredText>;
	}

	const commands: { [key: string]: string | ((...args: any[]) => React.ReactNode) | React.ReactNode } = {
		btw: (
			<div>
				I&apos;m using Arch <SymbolText></SymbolText>
			</div>
		),
		cat: (file?: string) => Command.cat(fileStructure, currentPath, file),
		cd: (directory?: string) => {
			return Command.cd(fileStructure, currentPath, setCurrentPath, directory) ?? null;
		},
		clear: () => null,
		codesolver: (problem: string) => Command.solver(problem),
		date: () => Command.date(),
		echo: (text?: string) => Command.echo(text),
		help: Command.help(),
		history: () => Command.history(commandHistory),
		logout: () => {
			props.LogOut();
			return null;
		},
		ls: (file?: string) => Command.ls(fileStructure, currentPath, file),
		man: (command?: string) => Command.man(command),
		mkdir: 'mkdir: Permission denied',
		nano: 'nano: Permission denied',
		neofetch: <Neofetch />,
		poweroff: () => {
			props.PowerOff();
			return null;
		},
		pwd: currentPath.replace('/home/z4nterox', '~'),
		reboot: () => {
			props.Restart();
			return null;
		},
		rm: (args?: string) => (args?.includes('-rf') ? Command.rm_rf() : 'rm: Permission denied'),
		source: <a href="https://github.com/Z4nterox/Z4nOS">https://github.com/Z4nterox/Z4nOS</a>,
		sudo: () => Command.sudo(),
		touch: 'touch: Permission denied',
		uptime: () => Command.uptime(startTime),
		vim: 'vim: Permission denied',
		whereami: (
			<div>
				<span className={Stargate.className}>bZEjKc</span> - Just drop by, gate&apos;s always open!
			</div>
		),
		whoami: 'z4nterox',
	};

	const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value.toLowerCase();
		setInput(value);
		setMatchIndex(-1);

		if (value) {
			const [command, ...args] = value.split(' ');
			let matchesArray: string[] = [];

			const argString = args.join(' ');

			if (['cd', 'cat', 'ls'].includes(command)) {
				matchesArray =
					fileStructure[currentPath]
						?.filter(
							(item) =>
								item.name.startsWith(argString) &&
								(command === 'ls' || (command === 'cd' ? item.isDirectory : !item.isDirectory))
						)
						.map((item) => `${command} ${item.name}`)
						.sort() || [];
			} else {
				matchesArray = Object.keys(commands)
					.filter((cmd) => cmd.startsWith(value))
					.sort();
			}

			if (matchesArray.length > 0) {
				setMatches(matchesArray);
			} else {
				setMatches([]);
			}
		} else {
			setMatches([]);
		}
	};

	const updateHistory = (newIndex: number) => {
		setCommandHistoryIndex(newIndex);
		const newInput = commandHistory[commandHistory.length - 1 - newIndex];
		setInput(newInput);
		setTimeout(() => inputRef.current!.setSelectionRange(newInput.length, newInput.length), 0);
	};

	const resetHistory = () => {
		setCommandHistoryIndex(-1);
		setInput('');
	};

	const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
		const { key } = event;

		switch (key) {
			case 'Enter':
				handleCommand(input);
				break;
			case 'ArrowUp':
				if (commandHistoryIndex < commandHistory.length - 1) {
					updateHistory(commandHistoryIndex + 1);
				}
				break;
			case 'ArrowDown':
				if (commandHistoryIndex > 0) {
					updateHistory(commandHistoryIndex - 1);
				} else {
					resetHistory();
				}
				break;
			case 'Tab':
				event.preventDefault();
				if (matches.length > 0) {
					const nextIndex = (matchIndex + 1) % matches.length;
					setMatchIndex(nextIndex);
					setInput(matches[nextIndex]);
				}
				break;
		}
	};

	const handleCommand = (input: string) => {
		const [command, ...args] = input.split(' ');
		const commandOutput = commands[command];

		let output;

		if (typeof commandOutput === 'string') {
			output = commandOutput;
		} else if (typeof commandOutput === 'function') {
			output = commandOutput(args.join(' '));
		} else if (commandOutput) {
			output = commandOutput;
		} else {
			output = `Command not found: ${command}`;
		}

		if (command === 'clear') {
			setHistory([]);
		} else {
			setHistory([
				...history,
				{
					command: `<a class="terminalString">${currentPath.replace('/home/z4nterox', '~')} ➜</a>&nbsp;` + input,
					output,
				},
			]);
		}

		setCommandHistory([...commandHistory, input]);
		setCommandHistoryIndex(-1);
		setInput('');
	};

	return (
		<div
			className={classNames(styles.cli, 'console')}
			style={{ overflowY: 'auto' }}
			onClick={() => {
				const selection = window.getSelection();
				if (!selection || selection.toString() === '') {
					inputRef.current!.focus();
				}
			}}
			onKeyDown={() => {}}
			tabIndex={0}
			role="textbox"
			ref={terminalRef}
		>
			<div>
				Welcome to the <ColoredText>Z4nOS</ColoredText> CLI.
			</div>
			<div style={{ marginBottom: '10px' }}>
				Unsure on how to continue? No problem: Start with the <i>help</i> command.
			</div>
			<div>
				{history.map((item, index) => (
					<div key={index}>
						<Interweave content={item.command} />
						<div>{item.output}</div>
					</div>
				))}
			</div>
			<div style={{ display: 'flex', alignItems: 'center' }}>
				<span>
					<TerminalString />
					&nbsp;
				</span>
				<div>
					<input
						className={Segoe.className}
						style={{
							background: 'transparent',
							border: 'none',
							color: '#FFF',
							outline: 'none',
							width: '100%',
							fontSize: '18px',
							padding: '0',
						}}
						ref={inputRef}
						type="text"
						value={input}
						onChange={handleInputChange}
						onKeyDown={handleKeyDown}
					/>
				</div>
			</div>
		</div>
	);
}
