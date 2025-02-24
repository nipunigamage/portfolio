'use client';

import { ReactLenis } from 'lenis/react';
import { ReactNode } from 'react';

export default function Lenis({ children }: { children: ReactNode }) {
	return (
		<ReactLenis options={{ lerp: 0.25 }} root>
			{children}
		</ReactLenis>
	);
}
