import React from "react";
import { Link } from "../Link";

enum PhaseStatus {
	Open = "open",
	Closed = "closed",
}

interface PhaseDef {
	name: string;
	status: PhaseStatus;
	url: string;
	tags: string[];
}

interface PhaseCertificationProps {
	phases: Record<string, string[]>;
	cors: Record<string, boolean>;
}

const No: React.FunctionComponent<{ className?: string }> = (props) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			stroke="currentColor"
			className={props.className ?? ""}
		>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth={2}
				d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
			/>
		</svg>
	);
};
const Yes: React.FunctionComponent<{ className?: string }> = (props) => {
	return (
		<svg
			className={props.className ?? ""}
			fill="none"
			stroke="currentColor"
			viewBox="0 0 24 24"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="2"
				d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
			></path>
		</svg>
	);
};

export const PhaseCertification: React.FunctionComponent<PhaseCertificationProps> = (props) => {
	const phases: PhaseDef[] = [
		{
			name: "Phase 1",
			status: PhaseStatus.Closed,
			url: "https://github.com/Podcastindex-org/podcast-namespace#phase-1-closed-on-111520",
			tags: ["locked", "transcript", "funding", "chapters", "soundbite"],
		},
		{
			name: "Phase 2",
			status: PhaseStatus.Closed,
			url: "https://github.com/Podcastindex-org/podcast-namespace#phase-2-closed-on-13121",
			tags: ["person", "location", "season", "episode"],
		},
		// {
		// 	name: "Phase 3",
		// 	status: PhaseStatus.Open,
		// 	url: "https://github.com/Podcastindex-org/podcast-namespace#phase-3-open",
		// 	tags: [
		// 		"license",
		// 		"id",
		// 		"social",
		// 		"category",
		// 		"contentRating",
		// 		"previousUrl",
		// 		"alternateEnclosure",
		// 		"indexers",
		// 		"images",
		// 		"contact",
		// 		"value",
		// 		"valueRecipient",
		// 	],
		// },
	];

	const hasPhaseTag = (phase: PhaseDef, tag: string): boolean => {
		const [phaseNum] = /(\d+)$/.exec(phase.name);
		return (props.phases[phaseNum] ?? []).includes(tag);
	};

	return (
		<>
			<section className="my-8">
				<div className="flex justify-center">
					{phases.map((phase) => (
						<div
							className="mx-12 flex flex-col text-center border-4 border-purple-900 rounded w-56"
							key={phase.name}
						>
							<header className="bg-purple-900 text-purple-50 py-1 pb-2 flex align-middle justify-center font-semibold">
								<Link href={phase.url}>{phase.name}</Link>
								{phase.status === PhaseStatus.Open ? <div className="text-xs mx-1">*</div> : null}
							</header>
							<ul className="px-3 py-4 mx-2">
								{phase.tags.map((tag) => {
									const iconSize = "w-6 h-6 mr-2";
									const color = hasPhaseTag(phase, tag) ? "text-purple-900" : "text-purple-400";
									return (
										<li key={tag} className="flex my-1">
											{hasPhaseTag(phase, tag) ? (
												<Yes className={`${iconSize} ${color}`} />
											) : (
												<div className={iconSize} />
											)}
											<div className={`${color}`}>{tag}</div>
										</li>
									);
								})}
							</ul>
						</div>
					))}
				</div>
				<footer className="text-center mt-3 text-purple-900">
					<div>
						See{" "}
						<Link
							href="https://github.com/Podcastindex-org/podcast-namespace#element-list"
							className="underline"
						>
							podcast-namespace
						</Link>{" "}
						for more information. Phase 3 implementation is still pending.
					</div>
				</footer>
			</section>
			<section className="my-12 flex flex-col items-center">
				<header className="text-center my-4 max-w-5xl text-purple-900">
					The resource checks below help determine how compatible a podcast feed is with the rest of
					the web-based podcasting ecosystem. They do not impact the certification of a podcast,
					merely a way to help understand how to be most compatible with all community projects.
				</header>
				<ResourceChecks checks={props.cors} />

				<footer className="text-center mt-3 text-purple-900">
					<div>
						There is a known issue with some hosts (such as libsyn) for enclosure CORS detection due
						to redirects.
					</div>
				</footer>
			</section>
		</>
	);
};

const ResourceChecks: React.FunctionComponent<{ checks: Record<string, boolean> }> = (props) => {
	type SupportedType = { name: string; isSupported: boolean };
	type SupportGroup = { title: string; items: SupportedType[] };

	const [helpText, setHelpText] = React.useState<string>(null);

	const transformed: SupportedType[] = Object.entries(props.checks).map(([name, support]) => ({
		name,
		isSupported: support,
	}));

	function getItems(namePrefix: string, items: SupportedType[]): SupportedType[] {
		return items
			.filter((x) => x.name.startsWith(namePrefix))
			.map((x) => ({ name: x.name.replace(namePrefix, ""), isSupported: x.isSupported }));
	}

	const groups: SupportGroup[] = [
		{
			title: "HTTPS",

			items: getItems("https", transformed),
		},
		{
			title: "CORS",

			items: getItems("cors", transformed),
		},
		{
			title: "Hotlink",
			items: getItems("hotlink", transformed),
		},
	];

	return (
		<>
			<div className="flex justify-center">
				{groups.map(({ title, items }) => (
					<div
						key={title}
						className="mx-12 flex flex-col text-center border-4 border-purple-900 rounded w-64"
					>
						<header className="bg-purple-900 text-purple-50 py-1 pb-2 flex align-middle justify-center font-semibold">
							<button
								type="button"
								className="flex w-full justify-center"
								onClick={() => setHelpText(title)}
							>
								{title}{" "}
								<svg
									className="w-5 ml-2"
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
									/>
								</svg>
							</button>
						</header>
						<ul className="px-3 py-4 mx-2">
							{items.map(({ name, isSupported }) => {
								const color = isSupported ? "text-purple-900" : "text-purple-400";
								const Icon = isSupported ? Yes : No;

								return (
									<li key={name} className="flex my-1">
										<Icon className={`w-6 h-6 mr-2 ${color}`}></Icon>
										<div className={`${color}`}>{name}</div>
									</li>
								);
							})}
						</ul>
					</div>
				))}
			</div>
			<div className="h-36 py-4 max-w-5xl w-full text-purple-900">
				<GetHelp selected={helpText} />
			</div>
		</>
	);
};

const GetHelp: React.FunctionComponent<{ selected: string }> = (props) => {
	switch ((props.selected ?? "").toLowerCase()) {
		case "https":
			return (
				<p>
					Ensures your feed&apos;s resources are accessible on secure sites without mixed content
					warnings.
				</p>
			);

		case "cors":
			return (
				<p>
					Ensures your feed and its resources are able to be directly fetched from other sites
					without the need for a proxy. To enable this you need to adjust the headers returned to
					include "Access-Control-Allow-Origin". Please see{" "}
					<Link href="https://enable-cors.org/" className="underline">
						enable CORS
					</Link>
					. CORS failure on episode enclosure will not prevent a site from directly playing a
					podcast, but will prohibit advanced features like skipping silences, boosting volume,
					showing waveforms, and other features.
				</p>
			);

		case "hotlink":
			return <p>Ensures your images can be directly embedded by other sites.</p>;

		default:
			return null;
	}

	return <div>{props.selected}</div>;
};
