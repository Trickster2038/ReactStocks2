import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

import IndicatorsGrid from "./indicatorsGrid";
import TradingViewWidget, { Themes } from "react-tradingview-widget";

import { useTranslation } from 'react-i18next';

export default function StatsTabs() {
    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const { t, i18n } = useTranslation();

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const symb = urlParams.get('symb')
    const tag = urlParams.get('tag')

    return (
        <Box sx={{ width: '100%', typography: 'body1' }}>
            <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={handleChange} aria-label="lab API tabs example">
                        <Tab label={t("overview")} value="1" />
                        <Tab label={t("tech-analysis")} value="2" />
                    </TabList>
                </Box>
                <TabPanel value="1">
                    <div id="trading-view-frame">
                        <TradingViewWidget
                            symbol={symb}
                            theme={Themes.LIGHT}
                            locale={i18n.language}
                            autosize
                        />
                    </div>
                </TabPanel>
                <TabPanel value="2">
                    <div>
                        <IndicatorsGrid symb={symb} tag={tag} interval="daily" />
                    </div>
                </TabPanel>
            </TabContext>
        </Box>
    );
}