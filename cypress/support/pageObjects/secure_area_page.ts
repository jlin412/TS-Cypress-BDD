/// <reference types="cypress" />
const elements = {
    logoutButton: () => cy.get('a.button').contains('Logout'),
    flashMsg: () => cy.get('#flash'),
}

class SecureAreaPage {
    static logout() {
        elements.logoutButton().click();
    }
    static verifyLoginMessage() {
        elements.flashMsg().invoke('text').then((text: string) => {
            expect(text).to.include('You logged into a secure area!');
        })
    }}
export default SecureAreaPage;