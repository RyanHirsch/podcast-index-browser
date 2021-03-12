import { useEffect, useState } from "react";

interface BuilderProps {
	params: any[];
	onParams: (params: any[]) => void;
	method: string;
	// onMethod: (method: string) => void;
}

function getFirstParam<T>(params: T[]): T {
	return params.length ? params[0] : null;
}

const Builder: React.FunctionComponent<BuilderProps> = (props) => {
	const [url, setUrl] = useState("");

	useEffect(() => {
		setUrl(getFirstParam(props.params));
	}, [getFirstParam(props.params)]);

	return (
		<form
			onSubmit={(ev) => {
				ev.preventDefault();
				props.onParams([url]);
			}}
		>
			<header className="text-2xl text-purple-500 font-medium">
				Enter a raw api request below
			</header>
			<input
				placeholder="/podcasts/byfeedid?id=75075"
				className="w-2/3 border border-purple-500 px-1"
				onChange={(ev) => setUrl(ev.target.value)}
				value={url ?? ""}
			/>
		</form>
	);
};

export default Builder;
