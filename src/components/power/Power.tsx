import React, { useEffect } from 'react';

import SymbolText from '@/components/general/SymbolText';
import DesignTokens from 'DesignTokens';
import { motion } from 'framer-motion';

interface Props {
	isRestart: boolean;
	setIsRestart: React.Dispatch<React.SetStateAction<boolean>>;
	setIsPoweredOn: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Power(props: Props) {
	const [showUnderline, setShowUnderline] = React.useState<boolean>(true);
	const [showPowerButton, setShowPowerButton] = React.useState<boolean>(false);
	const [showRestart, setShowRestart] = React.useState<boolean>(false);
	const [showLineLinux, setShowLineLinux] = React.useState<boolean>(false);
	const [showLineRamdisk, setShowLineRamdisk] = React.useState<boolean>(false);
	const [showLineVersion, setShowLineVersion] = React.useState<boolean>(false);
	const [showLineMemory, setShowLineMemory] = React.useState<boolean>(false);

	function delay(ms: number) {
		return new Promise((resolve) => setTimeout(resolve, ms));
	}

	async function handleSwitchPower() {
		setShowPowerButton(false);
		setShowUnderline(true);
		setShowLineLinux(true);

		await delay(1000);
		setShowLineRamdisk(true);

		await delay(2000);
		setShowLineLinux(false);
		setShowLineRamdisk(false);
		setShowLineVersion(true);

		await delay(1000);
		setShowLineMemory(true);

		await delay(1000);
		setShowLineVersion(false);
		setShowLineMemory(false);

		await delay(2000);
		props.setIsRestart(false);
		props.setIsPoweredOn(true);
	}

	useEffect(() => {
		setTimeout(() => {
			if (!props.isRestart) {
				setShowUnderline(false);
				setShowPowerButton(true);
			} else {
				setShowRestart(true);

				setTimeout(() => {
					setShowRestart(false);
					handleSwitchPower();
				}, 2 * 1000);
			}
		}, 3 * 1000);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [props]);

	return (
		<div
			style={{
				height: '100%',
				width: '100%',
				backgroundImage: "url('/images/ForestBG.jpeg')",
				backgroundRepeat: 'no-repeat',
				backgroundSize: 'cover',
			}}
		>
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 1 }}
				className={'unselectable'}
				style={{ backgroundColor: '#000', width: '100%', height: '100%', color: '#fff' }}
			>
				<div style={{ display: showRestart ? 'block' : 'none' }}>Restarting ...</div>
				<div style={{ display: showLineLinux ? 'block' : 'none' }}>
					Loading Linux linux ...
					<br />
				</div>
				<div style={{ display: showLineRamdisk ? 'block' : 'none' }}>
					Loading initial ramdisk ...
					<br />
				</div>
				<div style={{ display: showLineVersion ? 'block' : 'none' }}>
					Starting version 1.3.1-z4nos
					<br />
				</div>
				<div style={{ display: showLineMemory ? 'block' : 'none' }}>
					p_z4nos: clean, 54425/206975 files, 57395285/2058448295 blocks
					<br />
				</div>
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: [0, 1, 0] }}
					transition={{
						duration: 0.5,
						repeat: Infinity,
						delay: 1,
						repeatType: 'loop',
					}}
					style={{ display: showUnderline ? 'block' : 'none' }}
				>
					_
				</motion.div>
				<div
					style={{
						height: '100%',
						width: '100%',
						display: showPowerButton ? 'flex' : 'none',
						alignItems: 'center',
						justifyContent: 'center',
					}}
				>
					<motion.div
						initial={{ opacity: 1 }}
						animate={{ opacity: [1, 0, 1] }}
						transition={{
							duration: 5,
							repeat: Infinity,
							repeatType: 'loop',
						}}
						onClick={() => handleSwitchPower()}
						onKeyDown={() => {}}
						onMouseDown={() => {}}
						role="button"
						tabIndex={0}
						style={{ lineHeight: '0.5', color: DesignTokens.color.primary.value, cursor: 'pointer' }}
					>
						<motion.div whileHover={{ fontSize: '112px' }} whileTap={{ fontSize: '100px' }} style={{ fontSize: '96px' }}>
							<SymbolText>襤</SymbolText>
						</motion.div>
					</motion.div>
				</div>
			</motion.div>
		</div>
	);
}
