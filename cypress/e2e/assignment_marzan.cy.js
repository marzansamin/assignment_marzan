//Import faker ilbrary
const {faker} = require('@faker-js/faker')
import 'cypress-mochawesome-reporter/register';

import Dashboard from '../support/PageObjects/DashboardPage';
import Login from '../support/PageObjects/LoginPage';
import ReusableMethods from '../support/PageObjects/ReusableMethods'
import AddEmployee from '../support/PageObjects/AddEmployeePage';
import Employee from '../support/PageObjects/EmployeePage';
import TopNavbar from '../support/PageObjects/TopNavbaPage';

describe('OrangeHRM End To End Testing', ()=> {
  //admin credentials
  const adminUserName = "Admin"
  const adminPassword = "admin123"

  //pages
  const loginPage = new Login()
  const dashboard = new Dashboard()
  const reusables = new ReusableMethods()
  const addEmployee = new AddEmployee()
  const employee = new Employee()
  const topNavbar = new TopNavbar()

  //name and passwords
  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();
  const fullName = firstName + " " + lastName
  const username = firstName + lastName
  const password = reusables.generateRandomPassword()

  //before hook-> works at the starting
  before(() => {
    cy.log('Logging in and visiting dashboard');
    cy.LoginAndVisitDashboard(adminUserName, adminPassword)
  });

  it("Validate the OrangeHRM Flow", ()=>{
    dashboard.assertDashboardHeaderIsVisible()
      .clickOnPIMButton()
      .clickOnAddButton()
      .enterFirstName(firstName)
      .enterLastName(lastName)
      .clickOnToggleCheckBox()
    addEmployee.enterUserName(username)
      .enterPassword(password)
      .enterConfirmPassword(password)
      .clickOnSaveButton()
      .assertSuccessMessage()
      .assertEmployeeNameIsVisible(fullName)
      .goToDirectoryPageFromNavbar()
      .enterEmployeeName(firstName)
      .clickOnSearchButton()
      .assertCardHolderContainsEmployeeName(fullName)
    topNavbar.logout()
    cy.LoginAndVisitDashboard(username, password)
    dashboard.assertDashboardHeaderIsVisible(fullName)
  });

  //after hook-> works on the end
  after(() =>{
    topNavbar.logout()
  });
})