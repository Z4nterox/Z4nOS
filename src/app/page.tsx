'use client';

import React, { useEffect, useState } from 'react';

import Login from '@/components/login/Login';
import LowBattery from '@/components/low-battery/LowBattery';
import Power from '@/components/power/Power';
import Window from '@/components/window/Window';

export default function Home() {
	const [battery, setBattery] = useState<number>(100);
	const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
	const [isPoweredOn, setIsPoweredOn] = useState<boolean>(true);
	const [isRestart, setIsRestart] = useState<boolean>(false);

	useEffect(() => {
		const batteryTimer = setInterval(() => {
			if (battery > 0) {
				setBattery(battery - 0.2);
			}
		}, 15 * 1000);

		return () => {
			clearInterval(batteryTimer);
		};
	}, [battery]);

	function LogOut() {
		setIsLoggedIn(false);
	}

	function Restart() {
		setIsLoggedIn(false);

		setTimeout(() => {
			setIsRestart(true);
			setIsPoweredOn(false);
		}, 0.5 * 1000);
	}

	function PowerOff() {
		setIsLoggedIn(false);

		setTimeout(() => {
			setIsPoweredOn(false);
		}, 0.5 * 1000);
	}

	if (!isPoweredOn) {
		return (
			<main style={{ width: '100%', height: '100%' }}>
				<Power isRestart={isRestart} setIsRestart={setIsRestart} setIsPoweredOn={setIsPoweredOn} />
			</main>
		);
	}

	if (battery == 0) {
		return (
			<main style={{ width: '100%', height: '100%' }}>
				<LowBattery />
			</main>
		);
	}

	if (!isLoggedIn) {
		return (
			<main style={{ width: '100%', height: '100%' }}>
				<Login setIsLoggedIn={setIsLoggedIn} />
			</main>
		);
	}

	return (
		<main style={{ width: '100%', height: '100%' }}>
			<Window battery={battery} LogOut={LogOut} Restart={Restart} PowerOff={PowerOff} />
		</main>
	);
}
