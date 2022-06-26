// TradingView reads "?symbol=" implicitly
import TradingViewWidget, { Themes } from "react-tradingview-widget";
import { withTranslation } from 'react-i18next';
import { Component } from "react";

class StatsPage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <div id="trading-view-frame">
                    <TradingViewWidget
                        // symbol=<reads forms param "?symbol=">
                        theme={Themes.LIGHT}
                        locale="ru"
                        autosize
                    />
                </div>
            </div>
        )
    };
}

export default withTranslation()(StatsPage);