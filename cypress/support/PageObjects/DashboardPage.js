import DashboardPageObjects from "../Wiring/DashboardPageObjects"
import PIM from "./PIMPage"

const dashboardPageObjects = new DashboardPageObjects()

class Dashboard{
    assertDashboardHeaderIsVisible(){
        cy.get(dashboardPageObjects.getDashboardHeader()).should('have.text', "Dashboard")
        return this
    }
    clickOnPIMButton(){
        cy.get(dashboardPageObjects.getPIMLocator()).click()
        let pim = new PIM
        return pim
    }
    assertUsernameIsVisible(){
        cy.get(dashboardPageObjects.getUserNameLocator()).should('have.text', fullname)
    }
}

export default Dashboard