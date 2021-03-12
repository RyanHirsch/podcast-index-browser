import NextLink from "next/link";

export interface LinkProps {
	title?: string;
	href: string;
	className?: string | string[];
}

export const Link: React.FunctionComponent<LinkProps> = (props) => {
	let className = "";
	if (props.className && Array.isArray(props.className)) {
		className += props.className.join(" ");
	} else if (props.className) {
		className += props.className;
	}

	if (props.href.startsWith("/") && !props.href.startsWith("//")) {
		return (
			<NextLink href={props.href}>
				<a className={className} title={props.title}>
					{props.children}
				</a>
			</NextLink>
		);
	}

	return (
		<a href={props.href} className={className} title={props.title}>
			{props.children}
		</a>
	);
};
