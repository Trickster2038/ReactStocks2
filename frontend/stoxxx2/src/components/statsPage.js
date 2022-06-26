// TradingView reads "?symbol=" implicitly
import TradingViewWidget, { Themes } from "react-tradingview-widget";
import { withTranslation } from 'react-i18next';
import { Component } from "react";

class StatsPage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const symb = urlParams.get('symb')
        return (
            <div>
                {console.log("tradingViewLocale: ", this.props.i18n.language)}
                <div id="trading-view-frame">
                    <TradingViewWidget
                        symbol={symb}
                        theme={Themes.LIGHT}
                        locale={this.props.i18n.language}
                        autosize
                    />
                </div>
            </div>
        )
    };
}

export default withTranslation()(StatsPage);