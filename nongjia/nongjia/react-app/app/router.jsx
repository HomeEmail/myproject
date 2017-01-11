import React from 'react'
import {Router, Route, browserHistory, IndexRoute} from 'react-router';
import ReactDOM from 'react-dom'
import Index_main from "./index_main.jsx";
import Mes_main1 from "./mes_main1.jsx";
import App from "./index.jsx";

const app = document.createElement('div');
document.body.appendChild(app);
ReactDOM.render(
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={Index_main} />
            <Route path="/mes" component={Mes_main1} />
        </Route>
    </Router>,app)
