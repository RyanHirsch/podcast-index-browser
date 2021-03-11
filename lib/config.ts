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

export const config = {
	apiBase: getValue("PUBLIC_API_BASE"),
};
