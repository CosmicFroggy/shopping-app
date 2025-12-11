import { test, expect } from "@playwright/test";
import LoginPage from "./pages/LoginPage";
import ListingsPage from "./pages/ListingsPage";

const baseURL: string = `http://localhost:${process.env.FRONTEND_PORT || 5173}`;

test.describe("login tests", () => {
    let loginPage: LoginPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.goto();
    });

    test("login as admin", async ({ page }) => {
        // attempt to login as admin
        await loginPage.login("admin", "admin1234");

        // check navigation to home
        await expect(page).toHaveURL(baseURL + "/");
        const listingsPage: ListingsPage = new ListingsPage(page);

        // check tat correct user logged in
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
        // attempt to login as basic user
        await loginPage.login("user", "user1234");

        // check navigation to home
        await expect(page).toHaveURL(baseURL + "/");
        const listingsPage: ListingsPage = new ListingsPage(page);

        // check that correct user logged in
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

    test("login with invalid credentials", async ({ page }) => {
        // attempt to login with invalid credentials
        await loginPage.login("invaliduser", "invalidpassword");

        // check that correct error message shows
        await expect(loginPage.loginError).toBeVisible();
        await expect(loginPage.loginError).toHaveText("Invalid credentials.");
    });

    test("navigate to sign up page", async ({ page }) => {
        // navigate to sign up page
        await loginPage.gotoSignupPage();

        // check navigation to signup page
        await expect(page).toHaveURL(/signup/);
    });
});
