import React from "react";
import { useTranslation } from "react-i18next";
import i18next from "i18next";

import ArrowDropDown from '@mui/icons-material/ArrowDropDown';
import { Button, Popover, List, ListItem, ListSubheader }
  from "@mui/material";

const languageMap = {
  en: { label: "English", dir: "ltr", active: true },
  ru: { label: "Русский", dir: "ltr", active: false }
};

const LanguageSelect = () => {

  if (localStorage.getItem("i18nextLng") === "ru" ||
    localStorage.getItem("i18nextLng") === "ru-RU") {
    var selected = "ru";
  } else {
    var selected = "en";
  }
  const { t } = useTranslation();

  const [menuAnchor, setMenuAnchor] = React.useState(null);
  React.useEffect(() => {
    document.body.dir = languageMap[selected].dir;
  }, [menuAnchor, selected]);

  return (
    <div id="language-selector" className="d-flex justify-content-end align-items-center language-select-root">
      {/* <span>{t("language: ")}</span> */}
      <Button onClick={({ currentTarget }) => setMenuAnchor(currentTarget)}>
        {languageMap[selected].label}
        <ArrowDropDown fontSize="small" />
      </Button>
      <Popover
        open={!!menuAnchor}
        anchorEl={menuAnchor}
        onClose={() => setMenuAnchor(null)}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right"
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right"
        }}
      >
        <div>
          <List>
            <ListSubheader>{t("select_language")}</ListSubheader>
            {Object.keys(languageMap)?.map(item => (
              <ListItem
                button
                key={item}
                onClick={() => {
                  i18next.changeLanguage(item);
                  setMenuAnchor(null);
                }}
              >
                {languageMap[item].label}
              </ListItem>
            ))}
          </List>
        </div>
      </Popover>
    </div>
  );
};

export default LanguageSelect;
