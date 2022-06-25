import { Component } from "react"
import { withTranslation } from 'react-i18next';
import { Divider, Paper, InputBase } from "@mui/material";

import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import SearchList from "./searchList";

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
            <div>
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
                <div>
                    <SearchList query={this.state.query} />
                </div>
            </div>
        )
    }
}

export default withTranslation()(SearchPage);