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

        //TODO: also check that admin permissions is correct, i.e that create and delete listings buttons are there, or is this a separate test?
    });

    test("login as basic user", async ({ page }) => {
        const loginPage: LoginPage = new LoginPage(page);
        const listingsPage: ListingsPage = new ListingsPage(page);

        await loginPage.goto();
        await loginPage.login("user", "user1234");

        // check navigation to home
        await expect(page).toHaveURL(baseURL + "/");

        // check user logged in
        await expect(listingsPage.navbar.accountButton).toBeVisible();
        await listingsPage.navbar.openAccountMenu();
        await expect(listingsPage.navbar.accountMenu.root).toBeVisible();
        await expect(listingsPage.navbar.accountMenu.usernameTag).toHaveText(
            "user",
        );
        await expect(listingsPage.navbar.accountMenu.roleTag).toHaveText(
            "USER",
        );

        //TODO: also check that basic user permissions are correct, i.e that create and delete listings buttons are not there, or is this a separate test?
    });
});
