'use client';

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';

export default function Home() {
	const [stars, setStars] = useState<{ x: number; y: number; size: number; color: string; duration: number; delay: number }[]>([]);
	const [shootingStars, setShootingStars] = useState<{ id: string; top: string; left: string }[]>([]);

	// Generate random stars
	useEffect(() => {
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
				top: Math.random() * 100 + '%',
				left: Math.random() * 100 + '%',
			};
			setShootingStars((prev) => [...prev, newStar]);

			// Remove the shooting star after its animation ends
			setTimeout(() => {
				setShootingStars((prev) => prev.filter((star) => star.id !== newStar.id));
			}, 3000); // Matches the animation duration
		};

		const shootingStarInterval = setInterval(addShootingStar, Math.random() * 4000 + 1000);

		generateStars();
		window.addEventListener('resize', generateStars);
		return () => {
			window.removeEventListener('resize', generateStars);
			clearInterval(shootingStarInterval);
		};
	}, []);

	// Function to generate a random star color
	const getRandomStarColor = () => {
		const hue = Math.random() < 0.8 ? Math.random() * 40 + 200 : Math.random() * 30 + 40; // 80% blue/white, 20% yellow
		const saturation = 50; // Vibrancy
		const lightness = Math.random() * 30 + 70; // Brightness
		return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
	};

	return (
		<div className='relative h-svh w-full overflow-hidden bg-gradient-to-br from-black via-neutral-900 to-stone-900'>
			<div className='absolute bottom-16 z-20 w-full text-center md:bottom-32 md:left-32 md:text-left'>
				<p className='px-4 font-extralight text-white'>Hi there, I&apos;m</p>
				<h1 className='font-playfair bg-gradient-to-tr from-white to-amber-50 bg-clip-text px-4 pb-8 text-4xl uppercase tracking-wide text-transparent md:text-6xl'>Nipuni Gamage</h1>
			</div>

			<div className='absolute z-10 mix-blend-overlay saturate-0'>
				<video autoPlay loop muted className='min-h-screen w-auto min-w-full object-cover'>
					<source src='clouds.mp4' type='video/mp4' />
				</video>
			</div>

			{/* Moon */}
			<div className='absolute right-8 top-16 size-12 rounded-full bg-amber-50 opacity-80 shadow-[0_0_64px_rgba(255,255,255,0.5)] md:right-1/4 md:top-1/4 md:size-16' />

			{/* Shooting Stars */}
			{shootingStars.map((star) => (
				<motion.div
					key={star.id}
					className='absolute bg-white'
					style={{
						top: star.top,
						left: star.left,
						width: '1px',
						height: '16px',
						borderRadius: '1px',
					}}
					initial={{ opacity: 1, rotate: 115, x: '0vw', y: '0vh' }}
					animate={{
						opacity: 0,
						x: '100vw',
						y: '100vh',
					}}
					transition={{
						duration: 6,
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
