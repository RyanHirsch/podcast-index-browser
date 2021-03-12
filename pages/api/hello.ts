import type { VercelRequest, VercelResponse } from "@vercel/node";

export default (_req: VercelRequest, res: VercelResponse): void => {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
	res.status(200).json({ name: "John Doe" });
};
