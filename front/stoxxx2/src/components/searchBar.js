import { Component } from "react"
import { withTranslation } from 'react-i18next';
import { Divider, Paper, InputBase } from "@mui/material";

import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

class SearchBar extends Component {

    onChangeHandler = (e) => {
        this.props.onSearchChange(e.target.value)
    }

    render() {
        return (
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
                {/* <IconButton type="submit" sx={{ p: '10px' }} aria-label="search"> */}
                    <SearchIcon />
                {/* </IconButton> */}
            </Paper>
        )
    }
}

export default withTranslation()(SearchBar);