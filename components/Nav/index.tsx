import React from "react";
import { Link } from "../Link";

interface NavProps {}

export const Nav: React.FunctionComponent<NavProps> = (_props) => {
	const items = [
		["Home", "/"],
		["Builder", "/builder"],
	];
	return (
		<nav className="bg-purple-500 px-3 py-2">
			<ul className="flex">
				{items.map(([name, url]) => (
					<li key={url} className="mx-2 text-xl">
						<Link href={url} className="text-purple-100 hover:bg-purple-700 px-3 py-2">
							{name}
						</Link>
					</li>
				))}
			</ul>
		</nav>
	);
};
