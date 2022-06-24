import logo from './logo.svg';
import './App.css';
import { useTranslation } from 'react-i18next';
import LanguageSelect from "./languageSelect";
import ResponsiveDrawer from './components/menu';
import { Toolbar } from '@mui/material';

function App() {
  const { t } = useTranslation();

  return (
    <div>
      <Toolbar />
      <div className="App">
        <header className="App-header">

          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <div>
            <ResponsiveDrawer />
          </div>
          <div className="language-select">
            <LanguageSelect />
          </div>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          <h1>{t('caption0')}</h1>
        </header>
      </div>
    </div>
  );
}

export default App;
