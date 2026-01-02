import { type Locator, type Page } from "@playwright/test";
import Navbar from "./components/Navbar";

class SignupPage {
    private readonly _page: Page;
    readonly navbar: Navbar;
    readonly usernameTextBox: Locator;
    readonly passwordTextBox: Locator;
    readonly signupButton: Locator;
    readonly signupError: Locator;
    readonly loginLink: Locator;

    constructor(page: Page) {
        this._page = page;
        this.navbar = new Navbar(page);
        this.usernameTextBox = page.getByRole("textbox", { name: "Username" });
        this.passwordTextBox = page.getByRole("textbox", { name: "Password" });
        this.signupButton = page.getByRole("button", { name: "Sign Up" });
        this.signupError = page.getByTestId("signupError");
        this.loginLink = page.getByRole("link", { name: "Log in!" });
    }

    async goto(): Promise<void> {
        // TODO: move this link configuration to another file
        await this._page.goto(
            `http://localhost:${process.env.FRONTEND_PORT || 5173}/signup`,
        );
    }

    async gotoLoginPage(): Promise<void> {
        await this.loginLink.click();
    }

    async signup(username: string, password: string): Promise<void> {
        await this.usernameTextBox.fill(username);
        await this.passwordTextBox.fill(password);
        await this.signupButton.click();
    }
}

export default SignupPage;
