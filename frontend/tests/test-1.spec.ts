import { test, expect } from "@playwright/test";

test("login", async ({ page }) => {
    const baseURL: string = `http://localhost:${process.env.FRONTEND_PORT}`;

    await page.goto(baseURL);
    await page.getByRole("textbox", { name: "Username" }).click();
    await page.getByRole("textbox", { name: "Username" }).fill("admin");
    await page.getByRole("textbox", { name: "Password" }).click();
    await page.getByRole("textbox", { name: "Password" }).fill("admin1234");
    await page.getByRole("button", { name: "Login" }).click();
    await page.waitForURL(baseURL);
    await page.getByRole("img", { name: "Logo" }).nth(1).click();
    await expect(page.getByRole("button", { name: "Log out" })).toBeVisible();
});
