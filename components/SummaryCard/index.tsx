import React from "react";
import { pick } from "ramda";

import FormattedHtml from "../FormattedHtml";
import { ListenLink } from "../ListenLink";
import { generatePodfriendUrl } from "../ListenLink/utils";

interface SummaryCardProps {
	description: string;
	feedId: number;
	image: string;
	title: string;
	episodeId?: number;
}

export const SummaryCard: React.FunctionComponent<SummaryCardProps> = (props) => {
	return (
		<div className="mx-1 my-4 px-3 py-4 flex-col bg-purple-100 shadow-sm rounded-md">
			<header className="flex items-center mb-1">
				<img className="rounded-lg object-cover w-10 h-10 mr-2" src={props.image} />
				<div className="font-medium text-lg">{props.title}</div>
			</header>
			<div className="mb-2">
				<FormattedHtml text={props.description} />
			</div>
			<footer className="flex justify-between">
				<div></div>
				<ListenLink
					title={props.title}
					url={generatePodfriendUrl(pick(["feedId", "episodeId"], props))}
				/>
			</footer>
		</div>
	);
};
