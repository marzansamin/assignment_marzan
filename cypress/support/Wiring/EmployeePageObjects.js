const employeeHeader = "h6"
const directoryPageLocator = "ul li a span:contains('Directory')"

class EmployeePageObjects{
    getEmployeeHeader(){
        return employeeHeader
    }
    getDirectoryPageLocator(){
        return directoryPageLocator
    }
}

export default EmployeePageObjects