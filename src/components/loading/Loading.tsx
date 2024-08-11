import React from 'react';

import styles from './Loading.module.css';

export default function Loading() {
	return (
		<div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', color: '#FFFFFF99' }}>
			<div className={styles.loading}>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
			</div>
			<div style={{ fontSize: '28px' }}>Loading Z4nOS</div>
		</div>
	);
}
