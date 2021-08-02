import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
//HTML5의 History API를 사용하여 페이지를 새로고침하지 않고도 주소를 변경할 수 있도록 해준다.(즉, 페이지 변경으로 인한 깜빡거림이 없다.)
import { BrowserRouter } from 'react-router-dom';
import './index.css';

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <App />        
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
reportWebVitals();
//serviceWorker.unregister();
