/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { NextPage } from "next";
import Head from "next/head";
import React, { useState } from "react";
import Inspector from "react-json-inspector";

import { config } from "../lib/config";

import "react-json-inspector/json-inspector.css";

const CertifiedPage: NextPage = () => {
	const [feedUrl, setFeedUrl] = useState<string>("http://mp3s.nashownotes.com/pc20rss.xml");
	const [results, setResults] = useState<any>(null);
	const [status, setStatus] = useState<"LOADING" | "LOADED" | "ERROR" | "IDLE">("IDLE");

	return (
		<div className="container mx-auto">
			<Head>
				<title>Podcast Index Browser &gt; Certified</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<header className="text-4xl mt-4 mb-12 text-purple-500 text-center">
				Check Feed Certification
			</header>
			<main>
				<form
					onSubmit={async (ev) => {
						ev.preventDefault();
						if (status !== "LOADING" && feedUrl.trim()) {
							setStatus("LOADING");
							try {
								const resp = await fetch(`${config.apiBase}/api/certify`, {
									headers: {
										"content-type": "application/json",
									},
									method: "POST",
									body: JSON.stringify({ feedUrl: feedUrl }),
								});
								// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
								const result = await resp.json();
								setResults(result.__phase);
								setStatus("LOADED");
							} catch (err) {
								setStatus("ERROR");
							}
						}
					}}
				>
					<header className="flex items-center">
						<div className="text-2xl text-purple-500 font-medium">Enter a feed url to check</div>
					</header>
					<div className="grid grid-cols-5">
						<input
							placeholder="http://mp3s.nashownotes.com/pc20rss.xml"
							className="col-span-4 border border-purple-500 px-1 leading-8"
							onChange={(ev) => setFeedUrl(ev.target.value)}
							value={feedUrl ?? ""}
						/>
						<button
							type="submit"
							className="bg-purple-500 hover:bg-purple-900 border border-purple-500 text-purple-100 font-medium px-4 py-1 ml-3"
						>
							Check Certification
						</button>
					</div>
				</form>
			</main>
			{results && status === "LOADED" ? <div>CERTIFIED!!</div> : null}
			{results && status === "LOADED" ? <Inspector data={results} /> : null}
		</div>
	);
};

export default CertifiedPage;
