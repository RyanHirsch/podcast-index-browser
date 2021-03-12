/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { useEffect, useState } from "react";
import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import stringify from "json-stable-stringify";
import Inspector from "react-json-inspector";

import MethodRunner from "../components/MethodRunner";
import Builder from "../components/Builder";

import "react-json-inspector/json-inspector.css";
import mixpanel from "../lib/mixpanel";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Any = any;
type JsonObject = Record<string, Any>;

enum SupportedMethods {
	RecentEpisodes = "recentEpisodes",
	Categories = "categories",
	Search = "search",
	Raw = "raw",
}

interface MethodConfig {
	description: string;
	validator: (params: Any[]) => boolean;
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
	[
		SupportedMethods.Raw,
		{
			description: "Makes a raw request to Podcast Index",
			validator: (params) => params.length > 0,
		},
	],
]);

const BuilderPage: NextPage = () => {
	const [results, setResults] = useState<JsonObject>(null);
	const [method, setMethod] = useState<SupportedMethods>(SupportedMethods.Raw);
	const [status, setStatus] = useState<"LOADING" | "LOADED" | "ERROR">(null);
	const [params, setParams] = useState<Any[]>([]);
	const [isValid, setIsValid] = useState<boolean>(false);

	const router = useRouter();

	useEffect(() => {
		mixpanel.track("Viewed Page");
	}, []);

	useEffect(() => {
		if (router.query.method) {
			setMethod(router.query.method as SupportedMethods);
		}

		if (router.query.params) {
			setParams(JSON.parse(router.query.params as string));
		}
	}, [router.query?.method, router.query?.params]);

	useEffect(() => {
		if (!method || !isValid) {
			setStatus(null);
		}
	}, [method, isValid]);

	useEffect(() => {
		if (method) {
			const valid = supportedMethods.get(method).validator(params);
			setIsValid(valid);

			if (valid) {
				void router.push(
					`/builder?method=${method}&params=${encodeURIComponent(JSON.stringify(params))}`,
					null,
					{ shallow: true }
				);
			}
		} else {
			setIsValid(false);
		}
	}, [method, stringify(params)]);

	return (
		<div className="container mx-auto">
			<Head>
				<title>Podcast Index Browser &gt; Builder</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<header className="text-4xl mt-4 mb-12 text-purple-500 text-center">
				Welcome to Podcast Index Builder
			</header>
			<main>
				<section className="my-4">
					<Builder onParams={setParams} params={params ?? []} method={method} />
				</section>

				{/* <div>
					{Array.from(supportedMethods.entries()).map(([key, val]) => (
						<button key={key} title={val.description} onClick={() => setMethod(key)}>
							{key}
						</button>
					))}
				</div> */}
				{isValid ? (
					<MethodRunner
						method={method}
						params={params}
						setResults={setResults}
						setStatus={setStatus}
					/>
				) : null}
				{status ? <div className="my-4">Results {status}</div> : null}
				{method && (!status || !params) ? (
					<div>
						The input above accepts any podcast index endpoint. You can enter things like
						`/categories/list` or `/search/byterm?q=podcasting 2.0` and then hit enter to trigger a
						search
					</div>
				) : null}
				{results && status === "LOADED" ? <Inspector data={results} /> : null}
			</main>
		</div>
	);
};

export default BuilderPage;
