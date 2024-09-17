const imgLocator = "span img"
const logoutLocator = "li a:contains('Logout')"

class TopNavbarPageObjects{
    getImgLocator(){
        return imgLocator
    }
    getLogoutLocator(){
        return logoutLocator
    }
}

export default TopNavbarPageObjects