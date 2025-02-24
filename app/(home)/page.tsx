'use client';

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';

export default function Home() {
	const [stars, setStars] = useState<{ x: number; y: number; size: number; color: string; duration: number; delay: number }[]>([]);
	const [shootingStars, setShootingStars] = useState<{ id: string; top: string; left: string }[]>([]);
	const [rotationAngle, setRotationAngle] = useState(115);

	// Generate random stars
	useEffect(() => {
		const handleResize = () => {
			const width = window.innerWidth;
			const height = window.innerHeight;
			const angle = findAngle(height, width);
			setRotationAngle(180 - angle);
		};

		const generateStars = () => {
			const starCount = window.innerWidth < 768 ? 16 : 32; // Reduce stars on mobile
			const newStars = Array.from({ length: starCount }, () => ({
				x: Math.random() * window.innerWidth,
				y: Math.random() * window.innerHeight,
				size: Math.random() * 3 + 1,
				color: getRandomStarColor(),
				duration: Math.random() * 4 + 1,
				delay: Math.random() * 2,
			}));
			setStars(newStars);
		};

		// Add shooting stars at random intervals
		const addShootingStar = () => {
			const newStar = {
				id: Math.random().toString(36).substring(2, 9),
				top: Math.random() * rotationAngle + '%',
				left: Math.random() * rotationAngle + '%',
			};
			setShootingStars((prev) => [...prev, newStar]);

			setTimeout(() => {
				setShootingStars((prev) => prev.filter((star) => star.id !== newStar.id));
			}, 3000);
		};

		const shootingStarInterval = setInterval(addShootingStar, Math.random() * 4000 + 1000);

		generateStars();
		handleResize();
		window.addEventListener('resize', generateStars);
		return () => {
			window.removeEventListener('resize', generateStars);
			clearInterval(shootingStarInterval);
		};
	}, []);

	// Function to generate a random star color
	const getRandomStarColor = () => {
		const hue = Math.random() < 0.8 ? Math.random() * 40 + 200 : Math.random() * 30 + 40;
		const saturation = 50;
		const lightness = Math.random() * 30 + 70;
		return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
	};

	const findAngle = (opposite: number, adjacent: number) => {
		return Math.atan(opposite / adjacent) * (180 / Math.PI);
	};

	return (
		<div className='relative h-svh w-full overflow-hidden bg-gradient-to-br from-black via-neutral-900 to-stone-900'>
			<div className='absolute bottom-16 z-20 w-full text-center md:bottom-32 md:left-32 md:text-left'>
				<p className='px-4 font-extralight text-white'>Hi there, I&apos;m</p>
				<h1 className='font-playfair bg-gradient-to-tr from-white to-amber-50 bg-clip-text px-4 pb-8 text-4xl uppercase tracking-wide text-transparent md:text-6xl'>Nipuni Gamage</h1>
			</div>

			<div className='absolute z-10 mix-blend-soft-light saturate-0'>
				<video autoPlay loop muted className='min-h-screen w-auto min-w-full object-cover'>
					<source src='clouds.mp4' type='video/mp4' />
				</video>
			</div>

			<div className='absolute flex h-full w-full items-center justify-center'>
				<div className='z-50 size-96 bg-[url(/clouds1.png)]' />
			</div>

			{/* Moon */}
			<div className='absolute right-8 top-16 size-12 rounded-full bg-amber-50 opacity-80 shadow-[0_0_64px_rgba(255,255,255,0.5)] md:right-1/4 md:top-1/4 md:size-16' />

			{/* Shooting Stars */}
			{shootingStars.map((star) => (
				<motion.div
					key={star.id}
					className='absolute z-10 bg-gradient-to-t from-white to-transparent'
					style={{
						top: star.top,
						left: star.left,
						width: '24px',
						height: '1px',
						borderRadius: '1px',
						boxShadow: '0 0 8px 1px rgba(255, 255, 255, 0.75)',
						filter: 'blur(0.5px)',
					}}
					initial={{
						opacity: 1,
						rotate: 180 - rotationAngle,
						x: '0vw',
						y: '0vh',
					}}
					animate={{
						opacity: 0,
						x: '100vw',
						y: '100vh',
					}}
					transition={{
						duration: window.innerWidth < 768 ? 2 : 3,
						ease: 'linear',
					}}
				/>
			))}

			{/* Stars */}
			{stars.map((star, index) => (
				<motion.div
					key={index}
					className='absolute rounded-full bg-white'
					style={{ top: star.y, left: star.x, width: star.size, height: star.size, backgroundColor: star.color }}
					initial={{ opacity: 0.2 }}
					animate={{ opacity: [0.2, 1, 0.2] }}
					transition={{
						duration: star.duration, // Randomized duration
						delay: star.delay, // Randomized delay
						repeat: Infinity,
						repeatType: 'mirror',
					}}
				/>
			))}
		</div>
	);
}
