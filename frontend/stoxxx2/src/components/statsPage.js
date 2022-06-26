import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';

import IndicatorsGrid from "./indicatorsGrid";
import TradingViewWidget, { Themes } from "react-tradingview-widget";

import { useTranslation } from 'react-i18next';
import { SymbolInfo, FundamentalData, CompanyProfile } from "react-tradingview-embed";

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

    // console.log("banner")

    return (
        <Box sx={{ width: '100%', typography: 'body1', p: 0 }}>
            <TabContext value={tabValue}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider', p: 0 }}>
                    <TabList onChange={handleChangeTabs} aria-label="lab API tabs example">
                        <Tab label={t("overview")} value="1" />
                        <Tab label={t("company-profile")} value="2" />
                        <Tab label={t("tech-analysis")} value="3" />
                    </TabList>
                </Box>
                <TabPanel value="1" sx={{ p: 0 }}>
                    <div id="trading-view-frame" class="tab-panel">
                        <div class="trading-view-card">
                            <SymbolInfo
                                widgetProps={{
                                    "colorTheme": "Light",
                                    "symbol": symb,
                                    "locale": i18n.language,
                                    "width": "100%"
                                }}
                            />
                        </div>
                        <div id="trading-view-advanced" class="trading-view-card">
                            <TradingViewWidget
                                symbol={symb}
                                theme={Themes.LIGHT}
                                locale={i18n.language}
                                autosize
                            />
                        </div>
                        <div class="trading-view-card">
                            <FundamentalData
                                widgetProps={{
                                    "colorTheme": "Light",
                                    "symbol": symb,
                                    "locale": i18n.language,
                                    "width": "100%"
                                }}
                            />
                        </div>
                    </div>
                </TabPanel>
                <TabPanel value="2" sx={{ p: 0 }}>
                    <div class="tab-panel">
                        <CompanyProfile
                            widgetProps={{
                                "colorTheme": "Light",
                                "symbol": symb,
                                "locale": i18n.language,
                                "width": "100%"
                            }} />
                    </div>
                </TabPanel>
                <TabPanel value="3" sx={{ p: 0 }}>
                    <div class="tab-panel">
                        <div>
                            <FormControl style={{ width: "100%" }}>
                                <Select
                                    value={interval}
                                    onChange={handleChangeSelect}
                                    defaultValue={"daily"}
                                    inputProps={{
                                        'aria-label': 'Without label'
                                    }}
                                >
                                    <MenuItem value={"daily"}>{t("daily")}</MenuItem>
                                    <MenuItem value={"weekly"}>{t("weekly")}</MenuItem>
                                    <MenuItem value={"monthly"}>{t("monthly")}</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                        <div>
                            {/* <p>{interval}</p> */}
                            <IndicatorsGrid symb={symb} tag={tag} interval={interval} />
                        </div>
                    </div>
                </TabPanel>
            </TabContext>
        </Box>
    );
}