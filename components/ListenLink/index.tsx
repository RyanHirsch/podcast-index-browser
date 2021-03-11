import { Link } from "../Link";

export interface ListenLinkProps {
	title: string;
	url: string;
}

export const ListenLink: React.FunctionComponent<ListenLinkProps> = (props) => {
	return (
		<Link
			href={props.url}
			className="flex items-center px-2 py-1 rounded-md hover:bg-purple-500"
			title={`Listen to ${props.title} on Podfriend`}
		>
			<div className="mr-1">Listen</div>
			<div className="w-4 h-4 rounded overflow-hidden">
				<img alt="Podfriend Logo" src="/podfriend.png" className="object-fill w-full h-full"></img>
			</div>
		</Link>
	);
};
