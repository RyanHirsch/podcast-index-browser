/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import type { VercelRequest, VercelResponse } from "@vercel/node";
import { client } from "./_lib/index-client";
import { allowCors } from "./_lib/wrapper";

const supportedCalls = ["recentEpisodes", "categories", "raw"];

async function handler(req: VercelRequest, res: VercelResponse): Promise<void> {
	const method: string = Array.isArray(req.query?.method)
		? req.query?.method[0]
		: req.query?.method;

	if (!supportedCalls.includes(method)) {
		res.status(400).send(`Unsupported method ${method}`);
	} else {
		const params = req.query.params as string;
		const parsed = parse(params);

		const result = await client[method](...asArray(parsed));
		res.status(200).json(result);
	}
}

export default allowCors(handler);

function asArray(arg: any): any[] {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-return
	return Array.isArray(arg) ? arg : [arg];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function parse(val: any): any {
	try {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-return
		return JSON.parse(val);
	} catch (err) {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-return
		return val;
	}
}
