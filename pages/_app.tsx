import { NextComponentType } from "next";
import { AppContext, AppInitialProps, AppProps } from "next/app";

import "../styles/globals.css";

const App: NextComponentType<AppContext, AppInitialProps, AppProps> = ({
	Component,
	pageProps,
}: AppProps) => {
	return <Component {...pageProps} />;
};

export default App;
