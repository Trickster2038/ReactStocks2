import { Component } from "react"
import { withTranslation } from 'react-i18next';
import { Paper, InputBase } from "@mui/material";

import SearchIcon from '@mui/icons-material/Search';
import SearchGrid from "./searchGrid";

class SearchPage extends Component {

    constructor(props) {
        super(props);
        this.state = { query: "" };
    }

    onChangeHandler = (e) => {
        this.setState({ query: e.target.value })
    }

    render() {
        return (
            <div id="searchpage">
                <Paper
                    component="form"
                    sx={{ p: '2px 4px', display: 'flex', alignItems: 'center' }}
                >
                    <InputBase
                        sx={{ ml: 1, flex: 1 }}
                        placeholder={this.props.t("search")}
                        inputProps={{ 'aria-label': 'search' }}
                        onChange={(e) => this.onChangeHandler(e)}
                    />
                    <SearchIcon />
                </Paper>
                <div id="searchlist">
                    <SearchGrid query={this.state.query}
                        category={this.props.category} />
                </div>
            </div>
        )
    }
}

export default withTranslation()(SearchPage);