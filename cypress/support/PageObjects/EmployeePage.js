import EmployeePageObjects from "../Wiring/EmployeePageObjects"
import Directory from "../PageObjects/DirectoryPage"

const employeePageObjects = new EmployeePageObjects()

class Employee{
    assertEmployeeNameIsVisible(fullname){
        cy.get(employeePageObjects.getEmployeeHeader()).should('contain',fullname)
        return this
    }
    goToDirectoryPageFromNavbar(){
        cy.get(employeePageObjects.getDirectoryPageLocator()).click()
        let directory = new Directory()
        return directory
    }
}

export default Employee