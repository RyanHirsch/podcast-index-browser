import React, { useEffect } from "react";
import { NextPage, GetServerSideProps, InferGetServerSidePropsType } from "next";
import Head from "next/head";
import useSWR from "swr";

import fetch from "../lib/fetch";
import { config } from "../lib/config";
import { PIApiRecentEpisode, PIApiNewFeed, PIApiPodcast } from "podcastdx-client/dist/src/types";
import { SummaryCard } from "../components/SummaryCard";
import mixpanel from "../lib/mixpanel";

interface IndexPageProps {
	data: {
		recentFeeds: PIApiNewFeed[];
		newFeeds: PIApiPodcast[];
		episodes: PIApiRecentEpisode[];
	};
}

const IndexPage: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = (props) => {
	const initialData = props.data;
	const { data, error } = useSWR<IndexPageProps["data"], Error>(
		`${config.apiBase}/api/recent`,
		fetch,
		{ initialData }
	);

	useEffect(() => {
		mixpanel.track("Viewed Page");
	}, []);

	return (
		<div className="container mx-auto">
			<Head>
				<title>Podcast Index Browser</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<header className="text-4xl mt-4 mb-12 text-purple-500 text-center">
				Welcome to Podcast Index Browser
			</header>
			<div>
				{data ? (
					<main className="grid grid-cols-3 gap-5">
						<section>
							<header className="text-2xl text-purple-500 font-medium">New Episodes</header>
							{data.episodes.map((ep) => (
								<SummaryCard
									key={ep.id}
									title={ep.title}
									description={ep.description}
									feedId={ep.feedId}
									episodeId={ep.id}
									image={ep.image || ep.feedImage}
								></SummaryCard>
							))}
						</section>
						<section>
							<header className="text-2xl text-purple-500 font-medium">
								Recently Updated Feeds
							</header>
							{data.recentFeeds.map((recentFeed) => (
								<SummaryCard
									key={recentFeed.id}
									title={recentFeed.title}
									description={recentFeed.description}
									feedId={recentFeed.id}
									image={recentFeed.image}
								/>
							))}
						</section>
						<section>
							<header className="text-2xl text-purple-500 font-medium">New Feeds</header>
							{data.newFeeds.map((recentFeed) => (
								<SummaryCard
									key={recentFeed.id}
									title={recentFeed.title}
									description={recentFeed.description}
									feedId={recentFeed.id}
									image={recentFeed.image}
								></SummaryCard>
							))}
						</section>
					</main>
				) : error ? (
					<pre>{JSON.stringify(error)}</pre>
				) : null}
			</div>
		</div>
	);
};

export default IndexPage;

export const getServerSideProps: GetServerSideProps<IndexPageProps> = async (_context) => {
	const data = await fetch<IndexPageProps["data"]>(`${config.apiBase}/api/recent`);

	return {
		props: { data },
	};
};
