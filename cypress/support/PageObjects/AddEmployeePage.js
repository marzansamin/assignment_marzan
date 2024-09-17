import AddEmployeePageObjects from "../Wiring/AddEmployeePageObjects"
import Employee from "../PageObjects/EmployeePage"

const addEmployeePageObjects = new AddEmployeePageObjects()

class AddEmployee{
    enterFirstName(firstname){
        cy.get(addEmployeePageObjects.getFirstName()).type(firstname)
        return this
    }
    enterLastName(lastname){
        cy.get(addEmployeePageObjects.getLastName()).type(lastname)
        return this
    }
    clickOnToggleCheckBox(){
        cy.get(addEmployeePageObjects.getToggle()).click()
    }
    enterUserName(username){
        cy.get(addEmployeePageObjects.getUserName()).parent().siblings('div').find('input').type(username)
        return this
    }
    enterPassword(password){
        cy.get(addEmployeePageObjects.getPassword()).parent().siblings('div').find('input').type(password)
        return this
    }
    enterConfirmPassword(password){
        cy.get(addEmployeePageObjects.getConfirmPassword()).parent().siblings('div').find('input').type(password)
        return this
    }
    clickOnSaveButton(){
        cy.get(addEmployeePageObjects.getSaveButton()).click()
        return this
    }
    assertSuccessMessage(){
        cy.get(addEmployeePageObjects.getSuccessMessage()).should('have.text', 'Successfully Saved')
        let employee = new Employee()
        return employee
    }
}

export default AddEmployee