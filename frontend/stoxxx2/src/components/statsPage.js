import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import IndicatorsGrid from "./indicatorsGrid";
import TradingViewWidget, { Themes } from "react-tradingview-widget";

import { useTranslation } from 'react-i18next';

export default function StatsPage() {
    const [tabValue, setTabValue] = React.useState('1');
    const [interval, setInterval] = React.useState('daily');

    const handleChangeTabs = (event, newValue) => {
        setTabValue(newValue);
    };

    const handleChangeSelect = (event) => {
        setInterval(event.target.value);
    };

    const { t, i18n } = useTranslation();

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const symb = urlParams.get('symb')
    const tag = urlParams.get('tag')

    return (
        <Box sx={{ width: '100%', typography: 'body1' }}>
            <TabContext value={tabValue}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={handleChangeTabs} aria-label="lab API tabs example">
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
                            <Select
                                value={interval}
                                onChange={handleChangeSelect}
                                defaultValue={"daily"}
                                inputProps={{ 'aria-label': 'Without label' }}
                            >
                                <MenuItem value={"daily"}>Daily</MenuItem>
                                <MenuItem value={"weekly"}>Weekly</MenuItem>
                                <MenuItem value={"monthly"}>Monthly</MenuItem>
                            </Select>
                    </div>
                    <div>
                        {/* <p>{interval}</p> */}
                        <IndicatorsGrid symb={symb} tag={tag} interval="daily" />
                    </div>
                </TabPanel>
            </TabContext>
        </Box>
    );
}