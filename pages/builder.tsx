/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { useEffect, useState } from "react";
import { NextPage } from "next";
import Head from "next/head";

import MethodRunner from "../components/MethodRunner";
import ReactJson from "react-json-view";
import stringify from "json-stable-stringify";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type JsonObject = Record<string, any>;

enum SupportedMethods {
	RecentEpisodes = "recentEpisodes",
	Categories = "categories",
	Search = "search",
}

interface MethodConfig {
	description: string;
	validator: (params: JsonObject) => boolean;
}

const supportedMethods = new Map<SupportedMethods, MethodConfig>([
	[
		SupportedMethods.RecentEpisodes,
		{ description: "Get a list of recently scraped episodes", validator: () => true },
	],
	[
		SupportedMethods.Categories,
		{ description: "Get a list of all categories and their IDs", validator: () => true },
	],
	[SupportedMethods.Search, { description: "", validator: () => false }],
]);

const BuilderPage: NextPage = () => {
	const [results, setResults] = useState<JsonObject>(null);
	const [method, setMethod] = useState<SupportedMethods>(null);
	const [status, setStatus] = useState<"LOADING" | "LOADED" | "ERROR">(null);
	const [params] = useState<JsonObject>(null);
	const [isValid, setIsValid] = useState<boolean>(false);

	useEffect(() => {
		if (!method || !isValid) {
			console.log("reset status");
			setStatus(null);
		}
	}, [method, isValid]);

	useEffect(() => {
		if (method) {
			setIsValid(supportedMethods.get(method).validator(params));
		} else {
			setIsValid(false);
		}
	}, [method, stringify(params)]);

	return (
		<div className="container">
			<Head>
				<title>Podcast Index Browser</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<div>
				<div>
					{Array.from(supportedMethods.entries()).map(([key, val]) => (
						<button key={key} title={val.description} onClick={() => setMethod(key)}>
							{key}
						</button>
					))}
				</div>
				{method && isValid ? (
					<MethodRunner method={method} setResults={setResults} setStatus={setStatus} />
				) : null}
				{status}
				{results ? <ReactJson src={results} /> : null}
			</div>
		</div>
	);
};

export default BuilderPage;
