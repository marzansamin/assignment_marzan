const searchInput = "input[placeholder='Type for hints...']"
const searchSuggestion = ".oxd-autocomplete-option > span"
const searchButton = "button[type='submit']"
const cardHeader = ".orangehrm-directory-card-header"

class DirectoryPageObjects{
    getSearchInput(){
        return searchInput
    }
    getSearchSuggestion(){
        return searchSuggestion
    }
    getSearchButton(){
        return searchButton
    }
    getCardHeader(){
        return cardHeader
    }
}

export default DirectoryPageObjects