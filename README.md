# TS-Cypress-BDD

### About
**Overview:** _TypeScript UI and API with BDD testing framework sample._

**Systems under test:**
- UI: [herokuapp login application](http://the-internet.herokuapp.com/login).
- API: [Student Management Rest API application](http://localhost:9080/swagger-ui.html).

**Technology stack:**
- Basic: TypeScript, Cypress
- BDD: Cucumber
- UI: Cypress
- API: Cypress
- Reporting: Allure

## Locally on your machine
### Installation
1. Install [Node.js](https://nodejs.org/en/).
1. Install [Yarn](https://classic.yarnpkg.com/lang/en/docs/install)
1. Download the project.
1. Install dependencies with a terminal command `yarn install` or `npm install` in the project's root folder.
1. Additional step: You need to install [Allure](https://github.com/allure-framework/allure2), if you want to use it.

### Running tests
1. Launch `java -jar studentmgmt-0.0.1-SNAPSHOT.jar` with `yarn cy:api-setup` before running any api tests 
1. You can use Cypress GUI with `yarn cy:ui` command to execute individual feature and debug
1. As well, you can start test suite with `yarn cy:headless` command.
1. Also, you can start the suite and generate Allure report with `yarn cy:allure` and after it, open it with `yarn allure:open`.
1. And the most prefered options is to use `yarn cy:allure:open` command, that would execute the suite, generate and open the report as an HTML doc.

### After test
- Framework creates allure reports, that located in `allure-results` folder.
- Check the `Running tests` section to get more info about working with Allure reports.
- **Note: Allure folder would be cleared within the next test run.**
