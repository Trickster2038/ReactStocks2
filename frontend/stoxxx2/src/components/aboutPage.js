import { Component } from "react";
import { withTranslation } from 'react-i18next';

class AboutPage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <p>Ab08t</p>
            </div>
        )
    };
}

export default withTranslation()(AboutPage);