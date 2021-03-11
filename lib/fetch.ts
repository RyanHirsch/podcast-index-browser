/* eslint-disable @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-assignment */
import unfetch from "isomorphic-unfetch";

export default async function fetch<T>(
	input: RequestInfo,
	init?: RequestInit | undefined
): Promise<T> {
	const res = await unfetch(input, init);
	return res.json();
}
