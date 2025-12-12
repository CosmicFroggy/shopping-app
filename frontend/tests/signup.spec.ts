import { test, expect } from "@playwright/test";

import SignupPage from "./pages/SignupPage";
import ListingsPage from "./pages/ListingsPage";

// TODO: add this to config somewhere
const baseURL: string = `http://localhost:${process.env.FRONTEND_PORT || 5173}`;

test.describe("signup tests", () => {
    let signupPage: SignupPage;

    test.beforeEach(async ({ page }) => {
        signupPage = new SignupPage(page);
        await signupPage.goto();
    });

    // TODO: need some way to reset database each time? SKIPPING FOR NOW
    test.fixme("sign up", async ({ page }) => {
        // sign up as new user
        await signupPage.signup("newuser", "password123");

        // check navigation to home
        await expect(page).toHaveURL(baseURL + "/");
        const listingsPage: ListingsPage = new ListingsPage(page);

        // check that correct user is logged in
        await expect(listingsPage.navbar.accountButton).toBeVisible();
        await listingsPage.navbar.openAccountMenu();
        await expect(listingsPage.navbar.accountMenu.root).toBeVisible();
        await expect(listingsPage.navbar.accountMenu.usernameTag).toHaveText(
            "newuser",
        );
        await expect(listingsPage.navbar.accountMenu.roleTag).toHaveText(
            "USER",
        );
    });

    test("username already taken", async ({ page }) => {
        // attempt to sign up with username that is already taken
        await signupPage.signup("user", "password123");

        // check correct error message is visible
        await expect(signupPage.signupError).toBeVisible();
        await expect(signupPage.signupError).toHaveText(
            "Username already taken.",
        );
    });

    test("username must be entered", async ({ page }) => {
        // attempt to signup without entering username
        await signupPage.signup("", "password123");

        // check correct error message is visible
        await expect(signupPage.signupError).toBeVisible();
        await expect(signupPage.signupError).toHaveText(
            "Please enter username and password.",
        );
    });

    test("password must be entered", async ({ page }) => {
        // attempt to signup without entering password
        await signupPage.signup("newuser", "");

        // check correct error message is visible
        await expect(signupPage.signupError).toBeVisible();
        await expect(signupPage.signupError).toHaveText(
            "Please enter username and password.",
        );
    });

    test("username and password must be entered", async ({ page }) => {
        // attempt to signup without entering username or password
        await signupPage.signup("", "");

        // check correct error message is visible
        await expect(signupPage.signupError).toBeVisible();
        await expect(signupPage.signupError).toHaveText(
            "Please enter username and password.",
        );
    });

    test("navigate to login page", async ({ page }) => {
        // navigate to login page
        await signupPage.gotoLoginPage();

        // check navigation to login page
        await expect(page).toHaveURL(/login/);
    });
});
