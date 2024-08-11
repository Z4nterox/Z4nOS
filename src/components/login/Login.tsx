'use client';

import React, { useEffect, useState } from 'react';

import ColoredText from '@/components/general/ColoredText';
import Loading from '@/components/loading/Loading';
import { isMobileOrTablet } from '@/utils/DeviceCheck';
import { motion } from 'framer-motion';

export default function Login({ setIsLoggedIn }: { setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>> }) {
	const [datetime, setDatetime] = useState<Date | null>(null);
	const [shouldFade, setShouldFade] = useState(false);

	useEffect(() => {
		const keyPressHandler = (event: KeyboardEvent) => {
			if (event.key === 'Enter') {
				setShouldFade(true);
			}
		};

		const tapHandler = () => {
			setShouldFade(true);
		};

		if (isMobileOrTablet()) {
			document.addEventListener('touchstart', tapHandler, false);
			return () => {
				document.removeEventListener('touchstart', tapHandler, false);
			};
		} else {
			document.addEventListener('keydown', keyPressHandler, false);
			return () => {
				document.removeEventListener('keydown', keyPressHandler, false);
			};
		}
	}, []);

	useEffect(() => {
		if (typeof window !== 'undefined') {
			setDatetime(new Date());

			const calDatetimeTimer = setInterval(() => {
				setDatetime(new Date());
			}, 1000);

			return () => {
				clearInterval(calDatetimeTimer);
			};
		}
	}, []);

	if (!datetime) {
		return (
			<div
				style={{
					width: '100%',
					height: '100%',
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					backgroundImage: 'url(/images/BackgroundLogin.jpg)',
					backgroundRepeat: 'no-repeat',
					backgroundSize: 'cover',
				}}
			>
				<Loading />
			</div>
		);
	}

	return (
		<div style={{ height: '100%', width: '100%', backgroundColor: '#000' }}>
			<motion.div
				style={{ height: '100%', width: '100%' }}
				initial={{ opacity: 1 }}
				animate={{ opacity: shouldFade ? 0 : 1 }}
				transition={{ duration: 1 }}
				onAnimationComplete={() => {
					if (shouldFade) setIsLoggedIn(true);
				}}
			>
				<div
					className={'unselectable'}
					style={{
						backgroundImage: 'url(/images/BackgroundLogin.jpg)',
						width: '100%',
						height: '100%',
						backgroundRepeat: 'no-repeat',
						backgroundSize: 'cover',
						display: 'flex',
						flexDirection: 'column',
						gap: '6rem',
						justifyContent: 'center',
						textAlign: 'center',
						color: '#fff',
					}}
				>
					<div>
						<div style={{ fontSize: '112px' }}>
							<b>
								{datetime.toLocaleTimeString('en', {
									hour: 'numeric',
									hour12: false,
									minute: 'numeric',
								})}
							</b>
						</div>
						<div style={{ fontSize: '20px' }}>
							{datetime.toLocaleDateString('en', { weekday: 'long' })}, {datetime.toLocaleDateString('en', { month: 'long' })}{' '}
							{datetime.getDate()}, {datetime.getFullYear()}
						</div>
					</div>

					<div>
						<div style={{ fontSize: '24px' }}>
							<ColoredText>z4nterox</ColoredText>
							@z4ntop
						</div>
						<motion.div
							initial={{ opacity: 1 }}
							animate={{ opacity: [1, 0, 1] }}
							transition={{
								duration: 6,
								repeat: Infinity,
								repeatType: 'loop',
							}}
							style={{ fontSize: '16px' }}
						>
							{isMobileOrTablet() ? (
								<div>
									<b>Tap on the screen</b> to login!
								</div>
							) : (
								<div>
									Press <b>Enter</b> to login!
								</div>
							)}
						</motion.div>
					</div>
				</div>
			</motion.div>
		</div>
	);
}
