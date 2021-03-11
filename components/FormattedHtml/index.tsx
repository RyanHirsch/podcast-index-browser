import TurndownService from "turndown";
import ReactMarkdown from "react-markdown";

const turndownService = new TurndownService();

const FormattedHtml: React.FunctionComponent<{ text: string }> = ({ text }) => {
	const markdown = turndownService.turndown(text);
	return <ReactMarkdown>{markdown}</ReactMarkdown>;
};

export default FormattedHtml;
