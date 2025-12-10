import { test, expect } from "@playwright/test";
import LoginPage from "./pages/LoginPage";
import ListingsPage from "./pages/ListingsPage";

const baseURL: string = `http://localhost:${process.env.FRONTEND_PORT || 5173}`;

test.describe("login tests", () => {
    test("login as admin", async ({ page }) => {
        const loginPage: LoginPage = new LoginPage(page);
        const listingsPage: ListingsPage = new ListingsPage(page);

        await loginPage.goto();
        await loginPage.login("admin", "admin1234");

        // check navigation to home
        await expect(page).toHaveURL(baseURL + "/");

        // check user logged in
        await expect(listingsPage.navbar.accountButton).toBeVisible();
        await listingsPage.navbar.openAccountMenu();
        await expect(listingsPage.navbar.accountMenu.root).toBeVisible();
        await expect(listingsPage.navbar.accountMenu.usernameTag).toHaveText(
            "admin",
        );
        await expect(listingsPage.navbar.accountMenu.roleTag).toHaveText(
            "ADMIN",
        );
    });
});
