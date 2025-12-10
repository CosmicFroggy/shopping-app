import { test, expect } from "@playwright/test";
import LoginPage from "./pages/LoginPage";

// test.describe("login tests", () => {
//     let loginPage: LoginPage;

//     test.beforeEach(async ({ page }) => {
//         loginPage = new LoginPage(page);
//         await loginPage.goto();
//     });

//     test("login as admin", async ({ page }) => {
//         loginPage.login("admin", "admin1234");
//         // how do I check that we have logged in correctly?
//     });
// });
