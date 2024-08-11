import Image from 'next/image';

import React, { useEffect, useState } from 'react';

import ColoredText from '@/components/general/ColoredText';
import Bowser from 'bowser';

import styles from './Neofetch.module.css';

function ColorField({ color }: { color: string }) {
	return <div className={styles.colorField} style={{ backgroundColor: color }} />;
}

export default function Neofetch() {
	const [hostName, setHostName] = useState<string>('Chrome 127.0.0.0');
	const [kernel, setKernel] = useState<string>('Windows NT 10.0 10');
	const [resolution, setResolution] = useState<string>('1920x1080');

	useEffect(() => {
		setHostName(Bowser.parse(window.navigator.userAgent).browser.name + ' ' + Bowser.parse(window.navigator.userAgent).browser.version);
		setKernel(
			Bowser.parse(window.navigator.userAgent).os.name +
				' ' +
				Bowser.parse(window.navigator.userAgent).os.version +
				' ' +
				Bowser.parse(window.navigator.userAgent).os.versionName
		);
		setResolution(window.screen.width + 'x' + window.screen.height);
	}, []);

	return (
		<div className={styles.neofetchOutput}>
			<Image className={styles.symbol} src={'/images/Z4nOS.png'} alt="" width={280} height={280} draggable={false} />
			<div>
				<ColoredText>z4nterox</ColoredText>@<ColoredText>z4ntop</ColoredText> <br />
				<ColoredText>--------------------</ColoredText> <br />
				<ColoredText>OS: </ColoredText>Z4nOS x86_64 <br />
				<ColoredText>Host:</ColoredText> {hostName} <br />
				<ColoredText>Kernel:</ColoredText> {kernel} <br />
				<ColoredText>Uptime:</ColoredText> 2 hours, 46 seconds <br />
				<ColoredText>Packages:</ColoredText> 31 (z4nman) <br />
				<ColoredText>Shell:</ColoredText> zsh 5.8 <br />
				<ColoredText>Resolution:</ColoredText> {resolution} <br />
				<ColoredText>WM:</ColoredText> i3 <br />
				<ColoredText>WM Theme:</ColoredText> Breeze [GTK3] <br />
				<ColoredText>Icons:</ColoredText> Breeze [GTK3] <br />
				<ColoredText>Terminal:</ColoredText> alacritty <br />
				<ColoredText>CPU:</ColoredText> Intel i5-8265U (8) @ 3.9GHz <br />
				<ColoredText>GPU:</ColoredText> Intel HD Graphics 620 <br />
				<ColoredText>Memory:</ColoredText> 673MiB / 15783MiB <br />
				<div className={styles.colorFieldContainer}>
					<div className={styles.colorFieldRow}>
						<ColorField color="#C50F1F" />
						<ColorField color="#13A10E" />
						<ColorField color="#C19C00" />
						<ColorField color="#0037DA" />
						<ColorField color="#881798" />
						<ColorField color="#3A96DD" />
						<ColorField color="#CCCCCC" />
					</div>
					<div className={styles.colorFieldRow}>
						<ColorField color="#E74856" />
						<ColorField color="#16C60C" />
						<ColorField color="#F9F1A5" />
						<ColorField color="#3B78FF" />
						<ColorField color="#B4009E" />
						<ColorField color="#61D6D6" />
						<ColorField color="#F2F2F2" />
					</div>
				</div>
			</div>
		</div>
	);
}
