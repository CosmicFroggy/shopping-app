import { type Locator, type Page } from "@playwright/test";
import Navbar from "./components/Navbar";

class ListingsPage {
    private readonly _page: Page;
    readonly navbar: Navbar;
    readonly listings: Locator;
    readonly nextButton: Locator;
    readonly previousButton: Locator;
    readonly firstButton: Locator;
    readonly lastButton: Locator;
    readonly sortingSelector: Locator;

    constructor(page: Page) {
        this._page = page;
        this.navbar = new Navbar(page);
        this.listings = page.getByTestId("listingCard");
        this.nextButton = page.getByRole("button", { name: "Next" });
        this.previousButton = page.getByRole("button", { name: "Previous" });
        this.firstButton = page.getByRole("button", { name: "First" });
        this.lastButton = page.getByRole("button", { name: "Last" });
        this.sortingSelector = page.getByTestId("sortingSelector");
    }

    async goto() {
        await this._page.goto(
            `http://localhost:${process.env.FRONTEND_PORT || 5173}`,
        );
    }
}

export default ListingsPage;
