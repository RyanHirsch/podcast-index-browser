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

	return (
		<a href={props.href} className={className} title={props.title}>
			{props.children}
		</a>
	);
};
