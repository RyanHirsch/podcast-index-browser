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
		{
			name: "Phase 3",
			status: PhaseStatus.Open,
			url: "https://github.com/Podcastindex-org/podcast-namespace#phase-3-open",
			tags: [
				"license",
				"id",
				"social",
				"category",
				"contentRating",
				"previousUrl",
				"alternateEnclosure",
				"indexers",
				"images",
				"contact",
				"value",
				"valueRecipient",
			],
		},
	];

	const hasPhaseTag = (phase: PhaseDef, tag: string): boolean => {
		const [phaseNum] = /(\d+)$/.exec(phase.name);
		return (props.phases[phaseNum] ?? []).includes(tag);
	};

	return (
		<div className="my-8">
			<div className="flex justify-center">
				<div className="mx-12 flex flex-col text-center border-4 border-purple-900 rounded w-56">
					<header className="bg-purple-900 text-purple-50 py-1 pb-2 flex align-middle justify-center font-semibold">
						CORS
					</header>
					<ul className="px-3 py-4 mx-2">
						{Object.entries(props.cors).map(([name, support]) => {
							const color = support ? "text-purple-900" : "text-purple-300";
							return (
								<li key={name} className="flex my-1">
									<svg
										className={`w-6 h-6 mr-2 ${color}`}
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
									<div className={`${color}`}>{name}</div>
								</li>
							);
						})}
					</ul>
				</div>
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
								const color = hasPhaseTag(phase, tag) ? "text-purple-900" : "text-purple-300";
								return (
									<li key={tag} className="flex my-1">
										<svg
											className={`w-6 h-6 mr-2 ${color}`}
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
										<div className={`${color}`}>{tag}</div>
									</li>
								);
							})}
						</ul>
					</div>
				))}
			</div>
			<footer className="text-center mt-3 text-purple-700">
				See{" "}
				<Link href="https://github.com/Podcastindex-org/podcast-namespace#element-list">
					podcast-namespace
				</Link>{" "}
				for more information
			</footer>
		</div>
	);
};
