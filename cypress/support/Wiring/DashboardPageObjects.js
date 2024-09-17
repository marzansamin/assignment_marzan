const dashboardHeader = "h6"
const pimLocator = "ul li a span:contains('PIM')"
const userNameLocator = "p[class*='oxd-userdropdown-name']"

class DashboardPageObjects{
    getDashboardHeader(){
        return dashboardHeader
    }
    getPIMLocator(){
        return pimLocator
    }
    getUserNameLocator(){
        return userNameLocator
    }
}

export default DashboardPageObjects