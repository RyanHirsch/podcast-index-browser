/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import type { VercelRequest, VercelResponse } from "@vercel/node";
import fetch from "node-fetch";

import { parseFeed } from "./_lib/parser";
import { allowCors } from "./_lib/wrapper";

async function handler(req: VercelRequest, res: VercelResponse): Promise<void> {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
	const feedUrl: string = req.body.feedUrl;

	if (!feedUrl) {
		res.status(400).send(`Missing feedUrl`);
		return;
	}

	try {
		const response = await fetch(feedUrl);
		const xml = await response.text();
		const feedObj = parseFeed(xml);

		if (!feedObj) {
			res.status(400).send(`Unable to parse feed`);
			return;
		}

		res.status(200).json(feedObj);
	} catch (err) {
		console.error(err);
		res.status(500).send("Boom");
	}
}

export default allowCors(handler);
