import React, { useState } from 'react';
import { useSpring, animated, config } from '@react-spring/web';
import Layout from '../components/layout';
import Head from 'next/head';

function Text() {
	const [flip, setFlip] = useState(false);
	const props = useSpring({
		to: { opacity: 1 },
		from: { opacity: 0 },
		reset: true,
		reverse: flip,
		delay: 200,
		config: config.molasses,
		onRest: () => setFlip(!flip),
	});

	return (
		<animated.h1 className="text-3xl font-semibold dark:text-white" style={props}>
			hello
		</animated.h1>
	);
}

function SVG() {
	const [flip, setFlip] = useState(false);
	const { x } = useSpring({
		reset: true,
		reverse: flip,
		from: { x: 0 },
		x: 1,
		delay: 200,
		config: config.molasses,
		onRest: () => setFlip(!flip),
	});

	const POINTS = '23,37 35,44 32,28 44,17 29,15 23,1 16,15 1,17 12,28 9,44';

	return (
		<animated.svg
			style={{ margin: 20, width: 80, height: 80, backgroundColor: 'seashell' }}
			viewBox="0 0 45 45"
			strokeWidth="2"
			fill="white"
			stroke="rgb(45, 55, 71)"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeDasharray={156}
			strokeDashoffset={x.to((x) => (1 - x) * 156)}
		>
			<polygon points={POINTS} />
		</animated.svg>
	);
}

function Number() {
	const [flip, setFlip] = useState(false);
	const { number } = useSpring({
		reset: true,
		reverse: flip,
		from: { number: 0 },
		number: 1,
		delay: 200,
		config: config.molasses,
		onRest: () => setFlip(!flip),
	});

	return (
		<animated.div className="text-3xl font-semibold dark:text-white">
			{number.to((n) => n.toFixed(2))}
		</animated.div>
	);
}
export default function Spring() {
	return (
		<Layout>
			<Head>
				<title>Spring Cookie</title>
			</Head>
			<div className="grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-5 place-items-center gap-2">
				<Text />
				<SVG />
				<Number />
			</div>
		</Layout>
	);
}
