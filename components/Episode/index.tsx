import { PIApiRecentEpisode } from "podcastdx-client/dist/src/types";
import FormattedHtml from "../FormattedHtml";

function formatTitle({
	season,
	episode,
	title,
}: {
	season: number;
	episode: number;
	title: string;
}): string {
	let str = "";
	if (season) {
		str += `Season ${season} `;
	}

	if (episode) {
		str += `Episode ${episode} `;
	}

	return `${str}${title}`;
}

const Episode: React.FunctionComponent<{ recent: PIApiRecentEpisode }> = ({ recent }) => {
	return (
		<div className="border-black border">
			<div>{formatTitle(recent)}</div>
			<div>{recent.feedTitle}</div>
			<FormattedHtml text={recent.description} />
			<a href={`https://web.podfriend.com/podcast/pi-${recent.feedId}/${recent.id}`}>
				<img src="/podfriend.png"></img>
			</a>
		</div>
	);
};

export default Episode;
