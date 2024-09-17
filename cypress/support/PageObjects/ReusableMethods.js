class ReuseableMethods{
    generateRandomPassword() {
        const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+';
        let password = '';
        for (let i = 0; i < 12; i++) {
          password += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return password+1;
      }
      waitTillHeaderIsVisible(){
        cy.waitTillVisible('h6')
      }
}

export default ReuseableMethods