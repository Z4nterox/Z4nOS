import React from 'react';

import ColoredText from '@/components/general/ColoredText';

export default function About() {
	return (
		<div>
			<p>
				I&apos;m a <ColoredText>full-stack developer</ColoredText> based in Germany.
			</p>
			<p>
				I hold a diploma in Computer Science from the Dresden University of Applied Sciences and currently work as a{' '}
				<ColoredText>Software Engineer</ColoredText> in the healthcare sector at a leading clinic specializing in cancer research.
			</p>
			<p>Beyond coding, here are a few things I enjoy:</p>
			<ul>
				<li>
					Exploring new <ColoredText>technologies</ColoredText>
				</li>
				<li>
					<ColoredText>Stories</ColoredText> in all their forms, be it books, films, and games
				</li>
				<li>
					Spending time in <ColoredText>nature</ColoredText> and going for walks
				</li>
				<li>
					<ColoredText>Traveling</ColoredText> around the world. Places I&apos;ve visited include:
					<ul>
						<li>Canada, USA</li>
						<li>England, Ireland, Scotland</li>
						<li>Finland, Norway, Sweden</li>
						<li>Spain, Corsica, Italy</li>
						<li>Iceland</li>
						<li>Namibia</li>
					</ul>
				</li>
				<li>
					<ColoredText>Milk chocolate</ColoredText>, peach <ColoredText>iced tea</ColoredText>, and{' '}
					<ColoredText>Earl Grey</ColoredText> with milk and two sugars
				</li>
			</ul>
		</div>
	);
}
