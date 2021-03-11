import PodcastIndexClient from "podcastdx-client";
import { getValue } from "../../../lib/config";

export const client = new PodcastIndexClient({
	key: getValue("INDEX_API_KEY"),
	secret: getValue("INDEX_API_SECRET"),
	enableAnalytics: true,
});
