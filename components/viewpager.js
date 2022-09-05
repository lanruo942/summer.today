import React, { useEffect, useRef, useState } from 'react';
import clamp from 'lodash-es/clamp';
import shuffle from 'lodash-es/shuffle';
import { useSprings, animated } from '@react-spring/web';
import useMeasure from 'react-use-measure';
import { useDrag } from '@use-gesture/react';
import styles from '../styles/Home.module.css';
import axios from 'axios';

function Viewpager() {
	const [prov, setProv] = useState([]);
	const index = useRef(0);
	const [ref, { width }] = useMeasure();
	const [props, api] = useSprings(
		prov.length,
		(i) => ({
			x: i * width,
			scale: width === 0 ? 0 : 1,
			display: 'block',
		}),
		[width]
	);

	const bind = useDrag(
		({ active, movement: [mx], direction: [xDir], distance, cancel }) => {
			if (active && distance[0] > width / 2) {
				index.current = clamp(
					index.current + (xDir > 0 ? -1 : 1),
					0,
					prov.length - 1
				);
				cancel();
			}
			api.start((i) => {
				if (i < index.current - 1 || i > index.current + 1)
					return { display: 'none' };
				const x = (i - index.current) * width + (active ? mx : 0);
				const scale = active ? 1 - distance[0] / width / 2 : 1;
				return { x, scale, display: 'block' };
			});
		}
	);

	useEffect(() => {
		const getData = async () => {
			const response = await axios.get('/api/getData');
			setProv(shuffle(response.data));
		};

		getData();
	}, []);

	return (
		<div ref={ref} className={styles.wrapper}>
			{props.map(({ x, display, scale }, i) => (
				<animated.div
					className={styles.page}
					{...bind()}
					key={i}
					style={{ display, x, touchAction: 'none' }}
				>
					<animated.div style={{ scale }}>
						<article className="relative h-full">
							<section className="absolute top-1/2 left-1/2 w-80 -mt-[85px] -ml-[160px] leading-7 text-sm font-extralight dark:text-white">
								<p className="whitespace-pre-line text-justify">
									{prov[i].content}
								</p>
								<p className="text-right">{prov[i].provenance}</p>
							</section>
						</article>
					</animated.div>
				</animated.div>
			))}
		</div>
	);
}

export default Viewpager;
