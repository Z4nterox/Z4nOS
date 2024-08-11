import React, { useEffect, useState } from 'react';

import { Symbols } from '@/fonts/fonts';
import classNames from 'classnames';

import styles from './Weather.module.css';

export default function Weather() {
	const [datetime, setDatetime] = useState(new Date());
	const [weather, setWeather] = useState('');
	const [temp, setTemp] = useState(20.5);
	const [sunRise, setSunRise] = useState('05:00');
	const [sunSet, setSunSet] = useState('21:00');

	useEffect(() => {
		const seasonConfigs = {
			spring: {
				months: [2, 3, 4],
				sunrise: '06:30',
				sunset: '18:30',
				dayWeather: ['', '', '', ''],
				nightWeather: ['', '', '', ''],
				dayTemp: [0, 20],
				nightTemp: [0, 10],
			},
			summer: {
				months: [5, 6, 7],
				sunrise: '05:00',
				sunset: '21:00',
				dayWeather: ['', '', '', '', '', ''],
				nightWeather: ['', '', '', '', '', ''],
				dayTemp: [20, 36],
				nightTemp: [20, 26],
			},
			fall: {
				months: [8, 9, 10],
				sunrise: '06:30',
				sunset: '18:30',
				dayWeather: ['', '', '', '', ''],
				nightWeather: ['', '', '', '', ''],
				dayTemp: [0, 20],
				nightTemp: [0, 10],
			},
			winter: {
				months: [11, 0, 1],
				sunrise: '08:00',
				sunset: '16:00',
				dayWeather: ['', '', '', ''],
				nightWeather: ['', '', '', ''],
				dayTemp: [-10, 0],
				nightTemp: [-10, 0],
			},
		};

		const getTimeDate = (time: string) => new Date(`${datetime.toISOString().split('T')[0]}T${time}:00`);

		const updateWeather = () => {
			const month = datetime.getMonth();
			const season = Object.values(seasonConfigs).find((season) => season.months.includes(month));

			if (season) {
				const sunUp = getTimeDate(season.sunrise);
				const sunDown = getTimeDate(season.sunset);
				const isDaytime = datetime >= sunUp && datetime <= sunDown;

				setSunRise(season.sunrise);
				setSunSet(season.sunset);
				setWeather(
					isDaytime
						? season.dayWeather[Math.floor(Math.random() * season.dayWeather.length)]
						: season.nightWeather[Math.floor(Math.random() * season.nightWeather.length)]
				);
				setTemp(
					isDaytime
						? Math.random() * (season.dayTemp[1] - season.dayTemp[0]) + season.dayTemp[0]
						: Math.random() * (season.nightTemp[1] - season.nightTemp[0]) + season.nightTemp[0]
				);
			}
		};

		const weatherTimer = setInterval(() => setDatetime(new Date()), 5 * 60 * 1000);

		updateWeather();

		return () => clearInterval(weatherTimer);
	}, [datetime]);

	return (
		<div className={classNames(styles.weather, 'console', 'unselectable')}>
			<div className={Symbols.className} style={{ fontSize: '112px' }}>
				{weather}
			</div>
			<div style={{ fontSize: '52px', marginTop: '-16px' }}>{temp.toFixed(1)}°C</div>
			<div style={{ fontSize: '16px', marginTop: '20px' }}>
				<div>
					<span className={Symbols.className} style={{ fontSize: '24px' }}>
						瀞
					</span>{' '}
					&ensp; ~ &ensp; {sunRise}
				</div>
				<div style={{ marginTop: '4px' }}>
					<span className={Symbols.className} style={{ fontSize: '24px' }}>
						漢
					</span>{' '}
					&ensp; ~ &ensp; {sunSet}
				</div>
			</div>
		</div>
	);
}
