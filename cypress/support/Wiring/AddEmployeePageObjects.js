const firstName = "input[name='firstName']"
const lastName = "input[name='lastName']"
const toggle = "label span"
const userName = "label:contains('Username')"
const password = "label:contains('Password'):not(:contains('Confirm'))"
const confirmPassword = "label:contains('Confirm Password')"
const saveButton = "button[type='submit']"
const successMessage = "p[class*='oxd-text--toast-message']"

class AddEmployeePageObjects{
    getFirstName(){
        return firstName
    }
    getLastName(){
        return lastName
    }
    getToggle(){
        return toggle
    }
    getUserName(){
        return userName
    }
    getPassword(){
        return password
    }
    getConfirmPassword(){
        return confirmPassword
    }
    getSaveButton(){
        return saveButton
    }
    getSuccessMessage(){
        return successMessage
    }
}

export default AddEmployeePageObjects