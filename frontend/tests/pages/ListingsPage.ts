import { type Locator, type Page } from "@playwright/test";
import Navbar from "./components/navbar";

class ListingsPage {
    private readonly _page: Page;
    readonly navbar: Navbar;

    constructor(page: Page) {
        this._page = page;
        this.navbar = new Navbar(page);
    }

    async goto() {
        await this._page.goto(
            `http://localhost:${process.env.FRONTEND_PORT || 5173}`,
        );
    }
}

export default ListingsPage;
