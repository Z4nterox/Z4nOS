import React from 'react';

import Calendar from '@/components/window/calendar/Calendar';
import CLI from '@/components/window/cli/CLI';
import NeofetchWrapper from '@/components/window/neofetch/NeofetchWrapper';
import PowerMenu from '@/components/window/power-menu/PowerMenu';
import Statusbar from '@/components/window/statusbar/Statusbar';
import Weather from '@/components/window/weather/Weather';

import styles from './Window.module.css';

interface WindowProps {
	battery: number;
	LogOut: () => void;
	Restart: () => void;
	PowerOff: () => void;
}

export default function Window(props: WindowProps) {
	return (
		<>
			<div className={styles.window}>
				<PowerMenu LogOut={props.LogOut} Restart={props.Restart} PowerOff={props.PowerOff} />
				<Calendar />
				<CLI LogOut={props.LogOut} Restart={props.Restart} PowerOff={props.PowerOff} />
				<NeofetchWrapper />
				<Weather />
			</div>
			<div style={{ width: '100%', height: '20px' }}>
				<Statusbar battery={props.battery} />
			</div>
		</>
	);
}
