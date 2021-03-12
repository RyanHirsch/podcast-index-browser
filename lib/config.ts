function parseValue(val = ""): string {
	if (val.startsWith("b64")) {
		const encoded = val.substr(3);
		if (globalThis.btoa) {
			return btoa(encoded);
		} else {
			return Buffer.from(encoded, "base64").toString();
		}
	}
	return val;
}

export function getValue(key: string): string {
	return parseValue(process.env[`NEXT_${key}`]);
}

function processUrlVal(val: string): string {
	const parsed = val.replace(/\/$/, "");
	if (parsed.startsWith("http")) {
		return parsed;
	}

	if (/:\d+$/.test(parsed)) {
		return `http://${parsed}`;
	}

	return `https://${parsed}`;
}

export const config = {
	apiBase: processUrlVal(parseValue(process.env.NEXT_PUBLIC_API_BASE)),
	mixpanelToken: "975b17e3e364c0ad03cf4b3fa4f51812",
};
