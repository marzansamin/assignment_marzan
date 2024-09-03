//Import Faker library
const { faker } = require('@faker-js/faker');

//Describe block
describe('OrangeHRM End To End Testing', ()=> {
  const adminUsername = "Admin"
  const adminPassword = "admin123"

  //File to save employee data
  const employeeDataFile = "employeeData.json"

  function generateRandomPassword () {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+,.;';
    let password = '';
    for (let i = 0; i < 12; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
  }

  //Hooks
  before(() => {
    //before all the tests, visit the base URL
    cy.visit('/')
    cy.title().should("eq", "OrangeHRM")

    //Login using Admin user credentials
    cy.get("input[name='username']").type(adminUsername)
    cy.get("input[name='password']").type(adminPassword)
    cy.get("button[type='submit']").click()
  });

  //it block
  it("Validate the whole OrangeHRM flow", ()=> {
    cy.waitTillVisible('h6')

    //Assert Dashboard
    cy.get("h6").should("have.text", "Dashboard")

    //Click on PIM
    cy.get("span").contains("PIM").click()

    //Click on Add button
    cy.get("button[type='button']").contains("Add").click()
    cy.waitTillVisible("h6")

    //Generate random employee data using Faker library
    // Extract the Employee ID.
    var employeeID = ""
    cy.get('label').contains("Employee Id").parent().siblings('div').find('input').invoke("val").then((value)=>{
      employeeID = value
    }).then(() => {
      //Create new employee data using Faker library
      const firstName = faker.name.firstName()
      const lastName = faker.name.lastName()
      const fullName = firstName + " " + lastName
      const userName = firstName + lastName
      const password = generateRandomPassword()

      //Enter first name and last name of employee data from Faker
      cy.get("input[name='firstName']").type(firstName)
      cy.get("input[name='lastName']").type(lastName)

      //Click on Create Login Details toggle
      cy.get("input[type='checkbox']").click({force: true})

      //Enter Employee Creation Information
      cy.get("label").contains("Username").parent().siblings("div").find("input").type(userName)
      cy.get("label").contains("Password").parent().siblings("div").find("input").type(password)
      cy.get("label").contains("Confirm Password").parent().siblings("div").find("input").type(password)
      cy.get("button[type='submit']").click()

      //Save employee details in a JSON file
      cy.writeFile(`cypress/fixtures/${employeeDataFile}`, {
        userName,
        password,
        employeeID
      })

      //Assert Employee Created Successfully
      cy.get(".oxd-text--toast-message").should("have.text", "Successfully Saved")

      //Assert the full name showing on clicking on the Save button
      cy.waitTillVisible('h6')
      cy.get('h6').should("contain.text", fullName)

      //Go to PIM
      cy.get("span").contains("PIM").click()

      //Search by employee ID from the JSON file
      cy.get("li a").contains("Employee List").click()
      cy.waitTillVisible('h6')
      cy.fixture(employeeDataFile).then((employee)=>{
        cy.get('label').contains("Employee Id").parent().siblings('div').find('input').type(employee.employeeID)
        cy.get("button[type='submit']").click()

        //Assert the firstName of the Employee is showing
        cy.get("div[role='cell'] div").contains(firstName).invoke('text')
        .then((text) => {
          const expectedText = text.replace(/\s+/g, ' ').trim(); // Collapse multiple spaces into one and trim
          expect(expectedText).to.eq(firstName);
        });
      })

      //Go to Directory menu
      cy.get("span").contains("Directory").click()
      cy.waitTillVisible("h5")
      
      // Type the firstName in the Employee Name
      cy.get("input[placeholder='Type for hints...']").type(firstName)
      
      // Get the locator from the API response from the cypress execution snapshot
      cy.get('.oxd-autocomplete-option > span').click()

      // Click on Search
      cy.get("button[type='submit']").click()
      cy.get(".orangehrm-directory-card-header")
      .invoke('text')
      .then((text) => {
        const normalizedText = text.replace(/\s+/g, ' ').trim(); // Collapse multiple spaces into one and trim
        expect(normalizedText).to.eq(fullName);
      });

      //Logout from the admin session
      cy.get("span img").click()
      cy.get("ul li a").contains("Logout").click()
      cy.waitTillVisible("h5")

      //Login using the new created user credential from JSON file
      cy.fixture(employeeDataFile).then((employee)=> {
        //Login with employee credentials
        cy.get("input[name='username']").type(employee.userName)
        cy.get("input[name='password']").type(employee.password)
        cy.get("button[type='submit']").click()

        //Assert that the full name is displayed beside the profile icon
        cy.get("p.oxd-userdropdown-name").should("have.text", fullName)

        //Navigate to My Info
        cy.get("span").contains("My Info").click()
        cy.waitTillVisible("h6")
        cy.scrollTo(0, 600); // Scrolls down 600 pixels from the top

        //Click Gender as Female
        cy.get("label").contains("Female").click()

        //Click on the Blood group dropdown
        cy.get("label").contains("Blood Type").parent().siblings("div").click()

        //Select O+ blood group
        cy.get('.oxd-select-dropdown > :nth-child(4)').click()

        //Save the changes
        cy.get("button[type='submit']").eq(1).click()

        //Assest the Successfully Saved message
        cy.get(".oxd-text--toast-message").should("have.text", "Successfully Saved")
      })
    })
  });

  after(() => {
    //Log out as new created employee
    cy.get("span img").click()
    cy.get("ul li a").contains("Logout").click()
    cy.waitTillVisible("h5")

    // clear employeedata object after all tests are completed
    cy.writeFile(`cypress/fixtures/${employeeDataFile}`,{});
  })
})