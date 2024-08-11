import React from 'react';

import ColoredText from '@/components/general/ColoredText';
import classNames from 'classnames';

import Neofetch from './Neofetch';
import styles from './Neofetch.module.css';

export default function NeofetchWrapper() {
	return (
		<div className={classNames(styles.neofetch, 'console', 'unselectable')}>
			<div style={{ paddingBottom: '16px' }}>
				<ColoredText>~ ➜</ColoredText> neofetch
			</div>
			<div
				style={{
					display: 'flex',
					justifyContent: 'center',
				}}
			>
				<Neofetch />
			</div>
		</div>
	);
}
