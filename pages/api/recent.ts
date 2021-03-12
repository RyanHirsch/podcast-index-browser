import type { NowRequest, NowResponse } from "@vercel/node";
import { client } from "./_lib/index-client";
import { allowCors } from "./_lib/wrapper";

async function handler(_req: NowRequest, res: NowResponse): Promise<void> {
	const max = 10;

	const recentNewFeeds = await client.recentNewFeeds({ max });

	const [recentFeeds, episodes, newFeeds] = await Promise.all([
		client.recentFeeds({ max }),
		client.recentEpisodes({ max }),
		Promise.all(
			recentNewFeeds.feeds.map((feed) => client.podcastById(feed.id).then((f) => f.feed))
		),
	]);
	res.status(200).json({
		recentFeeds: recentFeeds.feeds,
		episodes: episodes.items,
		newFeeds,
	});
}

export default allowCors(handler);
