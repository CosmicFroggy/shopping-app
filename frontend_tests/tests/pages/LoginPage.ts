import { type Locator, type Page } from "@playwright/test";
import Navbar from "./components/Navbar";

class LoginPage {
    private readonly _page: Page;
    readonly navbar: Navbar;
    readonly usernameTextBox: Locator;
    readonly passwordTextBox: Locator;
    readonly loginButton: Locator;
    readonly loginError: Locator;
    readonly signupLink: Locator;

    constructor(page: Page) {
        this._page = page;
        this.navbar = new Navbar(page);
        this.usernameTextBox = page.getByRole("textbox", { name: "Username" });
        this.passwordTextBox = page.getByRole("textbox", { name: "Password" });
        this.loginButton = page.getByRole("button", { name: "Login" });
        this.loginError = page.getByTestId("loginError");
        this.signupLink = page.getByRole("link", { name: "Sign up!" });
    }

    async goto(): Promise<void> {
        // TODO: move this link configuration to another file
        await this._page.goto(
            `http://localhost:${process.env.FRONTEND_PORT || 5173}/login`,
        );
    }

    async gotoSignupPage(): Promise<void> {
        await this.signupLink.click();
    }

    async login(username: string, password: string): Promise<void> {
        await this.usernameTextBox.fill(username);
        await this.passwordTextBox.fill(password);
        await this.loginButton.click();
    }
}

export default LoginPage;
