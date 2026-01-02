import { type Locator, type Page } from "@playwright/test";

class AccountMenu {
    private readonly _page: Page;
    readonly root: Locator;
    readonly logoutButton: Locator;
    readonly usernameTag: Locator;
    readonly roleTag: Locator;

    constructor(page: Page) {
        this._page = page;
        this.root = page.getByTestId("accountMenuRoot");
        this.logoutButton = page.getByRole("button", { name: "Log out" });
        this.usernameTag = page.getByTestId("currentUser");
        this.roleTag = page.getByTestId("currentUserRole");
    }

    async logout(): Promise<void> {
        this.logoutButton.click();
    }
}

export default AccountMenu;
