import React from 'react';

import SymbolText from '@/components/general/SymbolText';
import { motion } from 'framer-motion';

export default function LowBattery() {
	return (
		<div
			className={'unselectable'}
			style={{
				width: '100%',
				height: '100%',
				backgroundColor: '#000',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				textAlign: 'center',
			}}
		>
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: [0, 1, 0] }}
				transition={{
					duration: 10,
					delay: 1,
					repeat: Infinity,
					repeatType: 'loop',
				}}
				style={{ color: 'var(--color-error)', fontSize: '96px', opacity: ' 0%' }}
			>
				<SymbolText></SymbolText>
				<div style={{ fontSize: '48px' }}>Please reload while Z4nOS is recharging.</div>
			</motion.div>
		</div>
	);
}
