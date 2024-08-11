import Image from 'next/image';

import React, { useEffect, useState } from 'react';

import SymbolText from '@/components/general/SymbolText';
import DesignTokens from 'DesignTokens';
import axios from 'axios';
import classNames from 'classnames';

import styles from './PowerMenu.module.css';

interface PowerMenuProps {
	LogOut: () => void;
	Restart: () => void;
	PowerOff: () => void;
}

export default function PowerMenu(props: PowerMenuProps) {
	const [avatarURL, setAvatarURL] = useState<string | undefined>(undefined);

	useEffect(() => {
		const fechAvatarURL = async () => {
			const response = await axios.get('https://api.github.com/users/Z4nterox');
			setAvatarURL(response.data.avatar_url as string);
		};

		fechAvatarURL();
	}, []);

	return (
		<div className={classNames(styles.powerMenu, 'console', 'unselectable')} style={{ fontSize: '36px' }}>
			<a href="https://github.com/Z4nterox" target="_blank" rel="noopener noreferrer" style={{ height: '48px', width: '48px' }}>
				<Image
					style={{ width: '48px', height: '48px', borderRadius: DesignTokens.size.borderRadius.value }}
					src={avatarURL ? avatarURL : '/images/FallbackAvatar.png'}
					alt="GithubAvatar"
					width={55}
					height={55}
				/>
			</a>
			<div
				onClick={props.PowerOff}
				onKeyDown={() => {}}
				onMouseDown={() => {}}
				role="button"
				tabIndex={-1}
				style={{ cursor: 'pointer' }}
			>
				<SymbolText className="powerButton">襤</SymbolText>
			</div>
			<div
				onClick={props.Restart}
				onKeyDown={() => {}}
				onMouseDown={() => {}}
				role="button"
				tabIndex={-1}
				style={{ cursor: 'pointer' }}
			>
				<SymbolText className="restartButton">ﰇ</SymbolText>
			</div>
			<div
				onClick={props.LogOut}
				onKeyDown={() => {}}
				onMouseDown={() => {}}
				role="button"
				tabIndex={-1}
				style={{ cursor: 'pointer' }}
			>
				<SymbolText className="logoutButton"></SymbolText>
			</div>
			<SymbolText className="settingsButton">漣</SymbolText>
		</div>
	);
}
