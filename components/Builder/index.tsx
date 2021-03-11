import stringify from "json-stable-stringify";
import useSWR from "swr";
import queryString from "query-string";
import ReactJson from "react-json-view";

import { config } from "../../lib/config";
import fetch from "../../lib/fetch";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function withQuery(url: string, params: Record<string, any>): string {
	return `${url}?${queryString.stringify(params)}`;
}

const method = "recentEpisodes";

const Episode: React.FunctionComponent = () => {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
	const { data, error } = useSWR<any, Error>(
		// eslint-disable-next-line @typescript-eslint/no-unsafe-call
		[`${config.apiBase}/api/generic`, stringify({ method })],
		(url: string, params: string) => fetch(withQuery(url, JSON.parse(params)))
	);

	if (error) {
		console.error(error);
		return <div>API Call Failed</div>;
	}

	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
	return <ReactJson src={data} />;
};

export default Episode;
