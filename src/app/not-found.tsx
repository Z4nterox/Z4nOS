'use client';

import React from 'react';

export default function E404() {
	return (
		<>
			<main className="kernelPanic">
				[ 2.119508] Kernel panic - 404 Not Found
				<br />
				[ 2.120821] CPU: 3 PID 1 COMM: init Not tainted 1.3.1-z4nos
				<br />
				[ 2.121862] Hardware name: Z4nOSBrowser LakeSky
				<br />
				[ 2.123169] Call Trace:
				<br />
				[ 2.123600]&emsp;dump_stack+0x64/0x88
				<br />
				[ 2.124172]&emsp;panic+0x112/0x2e8
				<br />
				[ 2.124699]&emsp;do_exit.cold+0x20/0xb1
				<br />
				[ 2.125301]&emsp;? handle_mm_fault+0xca/0x1f0
				<br />
				[ 2.125990]&emsp;do_group_exit+0x33/0xa0
				<br />
				[ 2.126604]&emsp;__x64_sys_exit_group+0x14/0x20
				<br />
				[ 2.127323]&emsp;do_syscall_64+0x49/0x90
				<br />
				[ 2.127939]&emsp;entry_SYSCALL_64_after_hwframe+0x44/0xa9
				<br />
				[ 2.128804] RIP: 0033:0x7fae746ff851
				<br />
				[ 2.129418] Code: 1f 84 00 00 00 00 00 66 90 f3 0f 1e fa be e7 00 00 00 ba 3c 00 00 00 eb 0d 90 d0 0f 05 58 3d 00 f0 ff ff
				77 1c e7 f7 d8 89 95 a7 f8 00 00 eb dd 0f 1f 44 00
				<br />
				[ 2.132619] RSP: 002b:00007ffc6f62f478 EFLAGS: 00000202 ORIG_RAX: 00000000000000e7
				<br />
				[ 2.133913] RAX: ffffffffffffffda RBX: 0000000000000000 RCX: 00007fae746ff851
				<br />
				[ 2.135130] RDX: 000000000000003c RSI: 00000000000000e7 RDI: 0000000000000001
				<br />
				[ 2.136348] RBP: 0000000000000000 R08: 00007fae73680250 R09: 000000000963cf85
				<br />
				[ 2.137566] R10: 000000000963cf85 R11: 0000000000000202 R12: 0000000000000000
				<br />
				[ 2.138786] R13: 0000000000000000 R14: 0000000e7364bf66 R15: 00007fae7470f140
				<br />
				[ 2.140047] Kernel Offset: 0x15200000 from 0xffffffff81000000 (relocation range: 0xffffffff80000000-0xffffffffbfffffff)
				<br />
				[ 2.141895] ---[ end Kernel panic - 404 Not Found ]---
				<br />_
			</main>
		</>
	);
}
