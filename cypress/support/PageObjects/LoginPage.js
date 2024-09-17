import LoginPageObjects from "../Wiring/LoginPageObjects";
import Dashboard from "./DashboardPage"

const loginPageObject = new LoginPageObjects()

class Login{
    enterUsername(username){
        cy.get(loginPageObject.getUsername()).type(username)
        return this
    }
    enterPassword(password){
        cy.get(loginPageObject.getPassword()).type(password)
        return this
    }
    clickSubmitButton(){
        cy.get(loginPageObject.getSubmitButton()).click()
        let dashboard = new Dashboard()
        return dashboard
    }
}

export default Login