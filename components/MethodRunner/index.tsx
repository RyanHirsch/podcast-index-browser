import stringify from "json-stable-stringify";
import useSWR from "swr";
import queryString from "query-string";

import { config } from "../../lib/config";
import fetch from "../../lib/fetch";
import { useEffect } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function withQuery(url: string, params: Record<string, any>): string {
	return `${url}?${queryString.stringify(params)}`;
}

interface MethodRunnerProps {
	method: string;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	params?: Record<string, any>;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	setResults: (results: any) => void;
	setStatus: (status: "LOADING" | "ERROR" | "LOADED") => void;
}

const MethodRunner: React.FunctionComponent<MethodRunnerProps> = (props) => {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
	const { data, error } = useSWR<any, Error>(
		// eslint-disable-next-line @typescript-eslint/no-unsafe-call
		[`${config.apiBase}/api/generic`, stringify(props)],
		(url: string, params: string) => fetch(withQuery(url, JSON.parse(params)))
	);

	useEffect(() => {
		if (data) {
			props.setResults(data);
		}
	}, [data]);

	useEffect(() => {
		if (error) {
			console.log("status - error");
			props.setStatus("ERROR");
		} else if (!data) {
			console.log("status - loading");
			props.setStatus("LOADING");
		} else {
			console.log("status - loaded");
			props.setStatus("LOADED");
		}
	}, [data, error]);

	useEffect(() => {
		props.setStatus("LOADING");
	}, []);

	if (error) {
		console.error(error);
		return <div>API Call Failed</div>;
	}
	return null;
};

export default MethodRunner;
