import React from "react";
import { Link } from "../Link";

interface NavProps {}

export const Nav: React.FunctionComponent<NavProps> = (_props) => {
	return (
		<nav>
			<ul>
				<li>
					<Link href="/">Home</Link>
				</li>
				<li>
					<Link href="/builder">Builder</Link>
				</li>
			</ul>
		</nav>
	);
};
