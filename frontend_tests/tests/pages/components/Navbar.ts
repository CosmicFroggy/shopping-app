import { type Locator, type Page } from "@playwright/test";
import AccountMenu from "./AccountMenu";

class Navbar {
    private readonly _page: Page;
    readonly root: Locator;
    readonly accountButton: Locator;
    readonly accountMenu: AccountMenu;
    readonly homeLink: Locator;
    readonly createListingLink: Locator;

    constructor(page: Page) {
        this._page = page;
        this.root = page.getByTestId("navbarRoot");
        this.accountButton = page.getByRole("button", { name: "account" });
        this.accountMenu = new AccountMenu(page);
        this.homeLink = page.getByRole("link", { name: "Home" });
        this.createListingLink = page.getByRole("link", {
            name: "Create listing",
        });
    }

    async openAccountMenu(): Promise<void> {
        await this.accountButton.hover();
    }

    async gotoHome(): Promise<void> {
        await this.homeLink.click();
    }

    async gotoCreateListing(): Promise<void> {
        await this.createListingLink.click();
    }
}

export default Navbar;
