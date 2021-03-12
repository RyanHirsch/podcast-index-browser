import * as mixpanel from "mixpanel-browser";
import { config } from "./config";

// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
mixpanel.init(config.mixpanelToken, { batch_requests: true });

mixpanel.register({
	environment: process.env.NODE_ENV,
});
export default mixpanel;
