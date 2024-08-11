import React, { useEffect, useState } from 'react';

import DesignTokens from 'DesignTokens';
import classNames from 'classnames';

import styles from './Calendar.module.css';

function AsciiCalendar() {
	const [datetime, setDatetime] = useState(new Date());
	const [day, setDay] = useState(new Date('01.01.1970').getDate());
	const [daysArray, setDaysArray] = useState<React.JSX.Element[]>([]);

	useEffect(() => {
		const calDatetimeTimer = setInterval(() => {
			setDatetime(new Date());
		}, 1000);

		return () => clearInterval(calDatetimeTimer);
	}, []);

	useEffect(() => {
		const renderDays = () => {
			const month = datetime.getMonth();
			const year = datetime.getFullYear();
			const firstDayOfMonth = new Date(year, month, 1);
			const lastDayOfMonth = new Date(year, month + 1, 0);
			const numberOfDays = lastDayOfMonth.getDate();
			const firstDayWeekday = firstDayOfMonth.getDay() - 1;
			const newDaysArray: React.JSX.Element[] = [];

			for (let i = 0; i < firstDayWeekday; i++) {
				if (i === 0) {
					newDaysArray.push(<span key={`empty-${i}`}>{'  '}</span>);
				} else {
					newDaysArray.push(<span key={`empty-${i}`}>{'    '}</span>);
				}
			}

			for (let i = 1; i <= numberOfDays; i++) {
				const isToday = i === datetime.getDate();
				newDaysArray.push(
					<span key={`day-${i}`} style={{ color: isToday ? DesignTokens.color.primary.value : undefined }}>
						{new Date(year, month, firstDayOfMonth.getDate() + i - 1).toLocaleString('en-US', { weekday: 'short' }) === 'Mon'
							? i.toString().padStart(2, ' ')
							: i.toString().padStart(4, ' ')}
						{(firstDayWeekday + i) % 7 === 0 && <br />}
					</span>
				);
			}

			setDaysArray(newDaysArray);
		};

		if (datetime.getDate() === day) {
			return;
		}

		setDay(datetime.getDate());

		renderDays();
	}, [datetime, day]);

	return (
		<div style={{ width: '230px' }}>
			<div style={{ color: DesignTokens.color.primary.value, textAlign: 'center', fontSize: '20px' }}>
				{datetime.toLocaleString('en', { month: 'long' })} {datetime.getFullYear()}
			</div>
			<pre style={{ color: DesignTokens.color.primary.value, textAlign: 'center', fontSize: '16px', margin: '0' }}>
				Mo {''} Tu {''} We {''} Th {''} Fr {''} Sa {''} Su
			</pre>
			<pre id="days" style={{ fontSize: '16px' }}>
				{daysArray}
			</pre>
		</div>
	);
}

export default function Calendar() {
	const [datetime, setDatetime] = useState(new Date());

	useEffect(() => {
		const datetimeTimer = setInterval(() => {
			setDatetime(new Date());
		}, 1000);

		return () => {
			clearInterval(datetimeTimer);
		};
	}, [datetime]);

	return (
		<div className={classNames(styles.calendar, 'console', 'unselectable')}>
			<div style={{ fontSize: '84px' }}>
				{datetime.toLocaleTimeString('en', { hour: 'numeric', hour12: false, minute: 'numeric' })}
			</div>
			<AsciiCalendar />
		</div>
	);
}
