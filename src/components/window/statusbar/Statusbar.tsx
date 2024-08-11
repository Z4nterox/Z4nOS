import React, { useEffect, useState } from 'react';

import SymbolText from '@/components/general/SymbolText';
import { isMobileOrTablet } from '@/utils/DeviceCheck';
import DesignTokens from 'DesignTokens';
import classNames from 'classnames';

import styles from './Statusbar.module.css';

interface StatusItemProps {
	className: string;
	icon?: string;
	text: string;
	color?: string;
	hideSeparator?: boolean;
}

const StatusItem = (props: StatusItemProps) => (
	<div className={props.className}>
		<div style={{ display: 'flex', flexDirection: 'row', gap: '8px' }}>
			<span style={{ color: props.color ? props.color : '' }}>
				{props.icon && <SymbolText>{props.icon}</SymbolText>} {props.text}
			</span>
			{props.hideSeparator ? '' : '|'}
		</div>
	</div>
);

export default function Statusbar({ battery }: { battery: number }) {
	const [ip] = useState(
		() =>
			`${Math.floor(Math.random() * 254) + 1}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`
	);
	const [wifi, setWifi] = useState(62 - Math.random() * 4);
	const [wifiState, setWifiState] = useState('down');
	const [ethernetState, setEthernetState] = useState('down');
	const [batteryIcon, setBatteryIcon] = useState('');
	const [batteryTime, setBatteryTime] = useState('08:00');
	const [cpu, setCPU] = useState(20);
	const [cpuTempIcon, setCPUTempIcon] = useState('');
	const [cpuTemp, setCPUTemp] = useState(0);
	const [datetime, setDatetime] = useState<Date | null>(null);

	useEffect(() => {
		const updateConnection = () => {
			if (isMobileOrTablet()) {
				setWifi(62 - Math.random() * 4);
				setWifiState(`(${wifi.toFixed(0)}% at Network) ${ip}`);
			} else {
				setEthernetState(`${ip} (1000 Mbit/s)`);
			}
		};
		updateConnection();
		const connTimer = setInterval(updateConnection, 90 * 1000);

		return () => clearInterval(connTimer);
	}, [wifi, ip]);

	useEffect(() => {
		const updateDatetime = () => setDatetime(new Date());
		updateDatetime();
		const datetimeTimer = setInterval(updateDatetime, 1000);

		return () => clearInterval(datetimeTimer);
	}, []);

	useEffect(() => {
		const timeLeft = ((battery / 0.2) * 15) / 60;
		const hours = Math.floor(timeLeft / 60);
		const minutes = Math.floor(timeLeft % 60)
			.toString()
			.padStart(2, '0');

		const icons = ['', '', '', '', '', '', '', '', '', ''];
		setBatteryIcon(icons[Math.floor(battery / 10)]);
		setBatteryTime(`${hours}:${minutes}`);
	}, [battery]);

	useEffect(() => {
		const cpuTimer = setInterval(() => {
			setCPU((prevCPU) => Math.max(0, Math.min(100, prevCPU + (Math.random() >= 0.5 ? 1 : -1))));
		}, 4000);

		return () => clearInterval(cpuTimer);
	}, []);

	useEffect(() => {
		const newCPUTemp = 35 - Math.random() * 6;
		setCPUTemp(newCPUTemp);
		setCPUTempIcon(newCPUTemp >= 80 ? '' : newCPUTemp >= 60 ? '' : newCPUTemp >= 40 ? '' : newCPUTemp >= 20 ? '' : '');
	}, []);

	useEffect(() => {
		const cpuTempTimer = setInterval(() => {
			let newCPUTemp = 0;
			if (cpu > 20) {
				newCPUTemp = (cpu - 20) * 0.6 + 35 - Math.random() * 6;
			} else {
				newCPUTemp = 35 - Math.random() * 6;
			}

			setCPUTemp(newCPUTemp);
			setCPUTempIcon(newCPUTemp >= 80 ? '' : newCPUTemp >= 60 ? '' : newCPUTemp >= 40 ? '' : newCPUTemp >= 20 ? '' : '');
		}, 7000);

		return () => clearInterval(cpuTempTimer);
	}, [cpu, cpuTemp]);

	if (!datetime) {
		return null;
	}

	return (
		<div className={classNames(styles.statusbar, 'unselectable')}>
			<div className={styles.blockPages}>
				<span style={{ color: '#FFF' }}>1</span>
				<span style={{ color: '#FFFFFF77' }}>2</span>
				<span style={{ color: '#FFFFFF77' }}>3</span>
			</div>
			<div className={styles.blockStatus}>
				<StatusItem
					className={styles.blockStatusWifi}
					icon=""
					text={wifiState}
					color={wifiState === 'down' ? DesignTokens.color.error.value : DesignTokens.color.success.value}
				/>
				<StatusItem
					className={styles.blockStatusEthernet}
					icon=""
					text={ethernetState}
					color={ethernetState === 'down' ? DesignTokens.color.error.value : DesignTokens.color.success.value}
				/>
				<StatusItem
					className={styles.blockStatusBattery}
					icon={batteryIcon}
					text={`${battery.toFixed(1)}% ${batteryTime}`}
					color={battery > 40 ? '#FFF' : battery > 15 ? DesignTokens.color.warning.value : DesignTokens.color.error.value}
				/>
				<StatusItem className={styles.blockStatusSound} icon="" text="muted (50%)" color={DesignTokens.color.warning.value} />
				<StatusItem
					className={styles.blockStatusCPULoad}
					icon="﬙"
					text={`${cpu}%`}
					color={cpu < 85 ? '#FFF' : DesignTokens.color.error.value}
				/>
				<StatusItem
					className={styles.blockStatusCPUTemp}
					icon={cpuTempIcon}
					text={`${cpuTemp.toFixed(1)} °C`}
					color={cpuTemp < 80 ? '#FFF' : DesignTokens.color.error.value}
				/>
				<StatusItem
					className={styles.blockStatusDatetime}
					icon=""
					text={`${datetime.getDate()}.${datetime.getMonth() + 1}.${datetime.getFullYear()} `}
					hideSeparator
				/>
				<StatusItem
					className={styles.blockStatusDatetime}
					icon=""
					text={datetime.toLocaleTimeString('en', { hour: 'numeric', hour12: false, minute: 'numeric', second: 'numeric' })}
				/>
				<StatusItem className={styles.blockStatusCopyright} text="© 2024 Z4nterox" hideSeparator />
			</div>
		</div>
	);
}
