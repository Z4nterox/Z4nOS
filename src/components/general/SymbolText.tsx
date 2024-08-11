import React from 'react';

import { Symbols } from '@/fonts/fonts';
import classNames from 'classnames';

export default function SymbolText({ children, className }: { children: string; className?: string }) {
	return <span className={classNames(Symbols.className, className)}>{children}</span>;
}
