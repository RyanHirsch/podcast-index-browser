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
	params: any[];
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
			props.setStatus("ERROR");
		} else if (!data) {
			props.setStatus("LOADING");
		} else {
			props.setStatus("LOADED");
		}
	}, [data, error]);

	useEffect(() => {
		props.setStatus("LOADING");
	}, []);

	return null;
};

export default MethodRunner;
