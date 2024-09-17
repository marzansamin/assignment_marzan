import DirectoryPageObjects from "../Wiring/DirectoryPageObjects"

const directoryPageObjects = new DirectoryPageObjects()

class Directory{
    enterEmployeeName(firstname){
        cy.get(directoryPageObjects.getSearchInput()).type(firstname)
        cy.get(directoryPageObjects.getSearchSuggestion()).click()
        return this
    }
    clickOnSearchButton(){
        cy.get(directoryPageObjects.getSearchButton()).click()
        return this
    }
    assertCardHolderContainsEmployeeName(fullname){
        cy.get(directoryPageObjects.getCardHeader()).invoke('text').then((text)=>{
            const normalizedText = text.replace(/\s+/g, ' ').trim()
            expect(normalizedText).to.eq(fullname)
        })
        return this
    }
}

export default Directory