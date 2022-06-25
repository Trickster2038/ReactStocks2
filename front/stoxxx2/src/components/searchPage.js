import { Component } from "react";
import { useTranslation } from "react-i18next";
import SearchBar from "./searchBar";

class SearchPage extends Component {

    constructor(props) {
        super(props);
        this.state = { searchQuery: "" };
        // console.log(props.category)
    }

    onSearchChangeHandler = (e) => {
        this.state.searchQuery = e
        // console.log("higher search: ", e)
    }

    render() {
        return (
            <div align="center">
                {<SearchBar onSearchChange={this.onSearchChangeHandler}/>}
            </div>
        );
    }
}

export default SearchPage;