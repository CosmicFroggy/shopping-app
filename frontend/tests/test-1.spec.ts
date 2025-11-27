import { test, expect } from "@playwright/test";

test("login", async ({ page }) => {
    await page.goto("http://localhost:5173");
    await page.getByRole("textbox", { name: "Username" }).click();
    await page.getByRole("textbox", { name: "Username" }).fill("admin");
    await page.getByRole("textbox", { name: "Password" }).click();
    await page.getByRole("textbox", { name: "Password" }).fill("admin1234");
    await page.getByRole("button", { name: "Login" }).click();
    await page.waitForURL("http://localhost:5173");
    await page.getByRole("img", { name: "Logo" }).nth(1).click();
    await expect(page.getByRole("button", { name: "Log out" })).toBeVisible();
});
