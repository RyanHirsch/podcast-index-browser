/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from "react";
import { render, screen } from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from "msw/node";

import { config } from "../lib/config";
import Home from "../pages/index";
import { recentEpisodes } from "./fixtures";

const server = setupServer(
	rest.get(`${config.apiBase}/api/recent`, (_req, res, ctx) => {
		return res(ctx.json(recentEpisodes));
	})
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("displays greeting", () => {
	render(<Home />);
	expect(screen.getByTestId("hello-world")).toHaveTextContent("Hello There!");
});

test("displays response", async () => {
	render(<Home />);
	expect(await screen.findByTestId("result")).toHaveTextContent("Johnny");
});
