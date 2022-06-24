import { Component } from "react";
import LanguageSelect from "./languageSelect";

import { withTranslation } from 'react-i18next';

class SettingsPage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <p>s3tt1ngs</p>
                <LanguageSelect />
            </div>
        )
    };
}

export default withTranslation()(SettingsPage);