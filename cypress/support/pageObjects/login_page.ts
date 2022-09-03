/// <reference types="cypress" />
const elements = {
    userNameField: () => cy.get('#username'),
    passwordField: () => cy.get('#password'),
    submitButton: () => cy.get('Button').contains('Login'),
    errorMessage: () => cy.get('#flash'),
    pageHeader: () => cy.get('h2')

}

class LoginPage {
    static enterUsername(username: string) {
        elements.userNameField().type(username);
    }

    static enterPassword(password: string) {
        elements.passwordField().type(password);
    }

    static submit() {
        elements.submitButton().click({ force: true });
    }

    static login(username: string, password: string) {
        if (username !== '') {
            this.enterUsername(username);
        }
        if (password !== '') {
            this.enterPassword(password);
        }
        this.submit();
    }

    static verifyErrorMessage(errorMsg: string) {
        elements.errorMessage().invoke('text').then((text: string) => {
            expect(text).to.include(errorMsg);
        })
    }

    static verifyOnLoginPage() {
        elements.pageHeader().invoke('text').then((text: string) => {
            expect(text).to.include('Login Page');
        })
    }
}
export default LoginPage;