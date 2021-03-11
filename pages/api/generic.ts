/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import type { NowRequest, NowResponse } from "@vercel/node";
import { client } from "./_lib/index-client";

const supportedCalls = ["recentEpisodes", "categories"];

export default async (req: NowRequest, res: NowResponse): Promise<void> => {
	const method: string = Array.isArray(req.query?.method)
		? req.query?.method[0]
		: req.query?.method;

	if (!supportedCalls.includes(method)) {
		res.status(400).send(`Unsupported method ${method}`);
	} else {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const params: any = req.query.params ?? [];

		const result = await client[method](...params);
		res.status(200).json(result);
	}
};
