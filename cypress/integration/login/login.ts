import LoginPage from '../../support/pageObjects/login_page';
import SecureAreaPage from '../../support/pageObjects/secure_area_page';

import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps'

/// <reference types="cypress" />

describe('Test suite', () => {
    Given('I have opened the login page', () => {
        Cypress.config('baseUrl', 'http://the-internet.herokuapp.com')
        cy.visit('/login')
    });

    Given('I nagivate to secure page directly', () => {
        Cypress.config('baseUrl', 'http://the-internet.herokuapp.com')
        cy.visit('/secure')
    });

    When('I login with username {string} and password {string}', (username: string, password: string) => {
        LoginPage.login(username, password);
    });

    Then('I should see error message {string}', (error: string) => {
        LoginPage.verifyErrorMessage(error);
    })

    Then('I should be on secure area page', () => {
        SecureAreaPage.verifyLoginMessage();
    })

    When('I login out', () => {
        SecureAreaPage.logout();
    });    

    When('I should be on login page', () => {
        LoginPage.verifyOnLoginPage();
    });    
})
