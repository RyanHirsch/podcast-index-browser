export function generatePodfriendUrl({
	feedId,
	episodeId,
}: {
	feedId: number | string;
	episodeId?: number | string;
}): string {
	if (episodeId) {
		return `https://web.podfriend.com/podcast/pi-${feedId}/${episodeId}`;
	}
	return `https://web.podfriend.com/podcast/pi-${feedId}`;
}
