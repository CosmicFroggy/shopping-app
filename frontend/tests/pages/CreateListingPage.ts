import { Locator, Page } from "@playwright/test";
import Navbar from "./components/navbar";

class CreateListingPage {
    private readonly _page: Page;
    readonly navbar: Navbar;
    readonly nameTextBox: Locator;
    readonly descriptionTextBox: Locator;
    readonly priceInput: Locator;
    readonly createListingButton: Locator;

    constructor(page: Page) {
        this._page = page;
        this.navbar = new Navbar(page);
        this.nameTextBox = page.getByRole("textbox", { name: "Name" });
        this.descriptionTextBox = page.getByRole("textbox", {
            name: "Description",
        });
        this.priceInput = page.getByTestId("priceInput");
        this.createListingButton = page.getByRole("button", {
            name: "Create Listing",
        });
    }

    async goto(): Promise<void> {
        await this._page.goto(
            `http://localhost:${process.env.FRONTEND_PORT || 5173}/create`,
        );
    }

    async createListing(
        name: string,
        description: string,
        price: string,
    ): Promise<void> {
        await this.nameTextBox.fill(name);
        await this.descriptionTextBox.fill(description);
        await this.priceInput.fill(price);
        await this.createListingButton.click();
    }
}

export default CreateListingPage;
