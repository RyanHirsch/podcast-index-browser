import { NextComponentType } from "next";
import { AppContext, AppInitialProps, AppProps } from "next/app";
import { Nav } from "../components/Nav";

import "../styles/globals.css";

const App: NextComponentType<AppContext, AppInitialProps, AppProps> = ({
	Component,
	pageProps,
}: AppProps) => {
	return (
		<>
			<Nav />
			<Component {...pageProps} />
		</>
	);
};

export default App;
