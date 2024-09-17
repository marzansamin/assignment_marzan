import TopNavbarPageObjects from "../Wiring/TopNavbarPageObjects"
import Login from "./LoginPage"

const topNavbarPageObjects = new TopNavbarPageObjects()

class TopNavbar{
    logout(){
        cy.get(topNavbarPageObjects.getImgLocator()).click()
        cy.get(topNavbarPageObjects.getLogoutLocator()).click()
        let login = new Login()
        return login
    }
}

export default TopNavbar