import { useEffect, useState } from "react";
import { Link } from "../Link";

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
				props.onParams(url.trim() ? [url] : []);
			}}
		>
			<header className="flex items-center">
				<div className="text-2xl text-purple-500 font-medium">Enter a raw api request below</div>
				<div className="ml-2 text-purple-400">
					<Link href="https://podcastindex-org.github.io/docs-api">docs</Link>
				</div>
			</header>
			<input
				placeholder="/podcasts/byfeedid?id=75075"
				className="w-2/3 border border-purple-500 px-1 leading-8"
				onChange={(ev) => setUrl(ev.target.value)}
				value={url ?? ""}
			/>
			<button
				type="submit"
				className="bg-purple-500 hover:bg-purple-900 text-purple-100 font-medium px-4 py-1 ml-3"
			>
				Execute
			</button>
		</form>
	);
};

export default Builder;
