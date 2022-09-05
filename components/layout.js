import { useEffect } from 'react';
import Head from 'next/head';

export default function Layout({ children }) {
	useEffect(() => {
		if (
			localStorage.theme === 'dark' ||
			(!('theme' in localStorage) &&
				window.matchMedia('(prefers-color-scheme: dark)').matches)
		) {
			document.documentElement.classList.add('dark');
		} else {
			document.documentElement.classList.remove('dark');
		}
	}, []);

	return (
		<div className="dark:bg-[#000] h-screen container">
			<Head>
				<link rel="icon" href="/favicon.ico" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<meta charSet="utf-8" />
			</Head>
			<main>{children}</main>
		</div>
	);
}
