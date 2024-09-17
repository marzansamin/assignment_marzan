import Login from "./PageObjects/LoginPage";
import Dashboard from "./PageObjects/DashboardPage";

const loginPage = new Login()
const dashboard = new Dashboard()

Cypress.on('uncaught:exception', (err, runnable) => {
  return false;
});

Cypress.Commands.add('orangeHRMLogin', (uname, password) => {
  cy.session([uname, password], () => {
    cy.visit('/')
    cy.waitTillVisible('input[name="username"]');
    loginPage.enterUsername(uname).enterPassword(password).clickSubmitButton()
    },
    {
      cacheAcrossSpecs: true
    }
  )
})

Cypress.Commands.add('LoginAndVisitDashboard', (username, password) => {
  cy.orangeHRMLogin(username, password)
  cy.visit('/')
})

Cypress.Commands.add("waitTillVisible",(selector,timeout=10000)=>{
  cy.get(selector,{timeout}).should("be.visible")
})