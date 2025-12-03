import { expect } from "@playwright/test";
import { env } from "../env";


export class LoginPage {

    constructor(page){
        this.page = page
        this.uName = '#username'
        this.pass = '#password'
        this.loginBtn = '#submit'
        this.successMsg = '.post-title'
        this.logoutBtn = '.wp-block-button__link'
        this.errorMsg = '#error'
     }

     async openURL(){
        // await this.page.goto('https://practicetestautomation.com/practice-test-login/')
       await this.page.goto(env.BASE_URL);
     }

     async login(username,password){
        await this.page.locator(this.uName).fill(username)
        await this.page.locator(this.pass).fill(password)
        await this.page.locator(this.loginBtn).click()
     }

     async verifySuccessMessage() {
        await expect(this.page.locator(this.successMsg)).toHaveText('Logged In Successfully');
    }

    async verifyErrorMessage(message) {
        await expect(this.page.locator(this.errorMsg)).toHaveText(message);
    }
}