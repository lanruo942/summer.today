import styles from '../styles/Home.module.css';
import Viewpager from '../components/viewpager';
import Head from 'next/head';
import Layout from '../components/layout';

export default function Home() {
	return (
		<Layout>
			<Head>
				<title>雨過天陰</title>
			</Head>
			<div className={styles.container}>
				<Viewpager />
			</div>
		</Layout>
	);
}
