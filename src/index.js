import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { IntlProvider } from 'react-intl';
import teluguMessages from './translations/te.json';
import englishMessages from './translations/en.json';

let locale = 'te';
let messages = teluguMessages;

function changeLanguage (language) {
  switch ('te') {
    case language:
      locale = 'te';
      messages = teluguMessages;
      break;

    default:
      locale = 'en';
      messages = englishMessages;
      break;
  }
  render();
}
function render () {
  ReactDOM.render(
    <React.StrictMode>
      <IntlProvider locale={locale} messages={messages}>    <App changeLanguage={changeLanguage} />
      </IntlProvider>
    </React.StrictMode>,
    document.getElementById('root')
  );
}
render();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
