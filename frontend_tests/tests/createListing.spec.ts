import { test, expect } from "@playwright/test";
import LoginPage from "./pages/LoginPage";
import CreateListingPage from "./pages/CreateListingPage";
import ListingsPage from "./pages/ListingsPage";

// TODO: add this to config somewhere
const baseURL: string = `http://localhost:${process.env.FRONTEND_PORT || 5173}`;

test.describe("create listing tests", () => {
    let createListingPage: CreateListingPage;
    let listingsPage: ListingsPage;

    test.beforeEach(async ({ page }) => {
        const loginPage: LoginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.login("admin", "admin1234");
        await expect(page).toHaveURL(baseURL + "/");
        listingsPage = new ListingsPage(page);
        await listingsPage.navbar.gotoCreateListing(); // TODO: if you navigate to url directly it loses auth, fix this!
        await expect(page).toHaveURL(/create/);
        createListingPage = new CreateListingPage(page);
    });

    // TODO: this test will break unless we reset the database after each test. Or we could give each test item a randomised name? uuid?
    test.fixme("create listing", async ({ page }) => {
        // create a test listing
        await createListingPage.createListing(
            "test name",
            "test description",
            "123.45",
        );

        // check navigation back to home page
        await expect(page).toHaveURL(baseURL + "/");
        const listingsPage: ListingsPage = new ListingsPage(page);

        // navigate to last page of listings
        if (await listingsPage.lastButton.isEnabled()) {
            await listingsPage.lastButton.click();
        }

        // check if listing was created
        await expect(
            listingsPage.listings.filter({
                has: page.getByRole("heading", { name: "test name" }),
            }),
        ).toHaveCount(1);
    });
});
