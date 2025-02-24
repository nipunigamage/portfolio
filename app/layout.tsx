import type { Metadata } from 'next';
import { Manrope, Playfair_Display } from 'next/font/google';
import Lenis from '@/components/lenis';
import './globals.css';

const manrope = Manrope({
	variable: '--font-manrope',
	subsets: ['latin'],
});

const playfair = Playfair_Display({
	variable: '--font-playfair',
	subsets: ['latin'],
});

export const metadata: Metadata = {
	title: 'Nipuni Gamage',
	description: "I'm Nipuni Gamage, immersed in the exciting world of tech. From coding to graphic design, I'm exploring it all.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang='en'>
			<body className={`${playfair.variable} ${manrope.variable} antialiased`}>
				<Lenis>{children}</Lenis>
			</body>
		</html>
	);
}
