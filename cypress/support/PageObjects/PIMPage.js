import PIMPageObjects from "../Wiring/PIMPageObjects"
import AddEmployee from "../PageObjects/AddEmployeePage"

const pimPageObjects = new PIMPageObjects()

class PIM{
    clickOnAddButton(){
        cy.get(pimPageObjects.getAddButton()).click()
        let addEmployee = new AddEmployee()
        return addEmployee
    }
}

export default PIM