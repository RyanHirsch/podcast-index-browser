import type { NowRequest, NowResponse } from "@vercel/node";

export default (_req: NowRequest, res: NowResponse): void => {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
	res.status(200).json({ name: "John Doe" });
};
