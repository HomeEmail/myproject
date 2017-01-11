//import '../node_modules/bootstrap/dist/css/bootstrap.css';
import React from 'react';
import ReactDOM from 'react-dom';

/*css*/
import "../css/base.css";
import "../css/header.css";
import "../css/nav.css";
/*jq*/
import $ from 'jquery'
/*jsx*/
import Header from "./header.jsx"
import Nav from "./Nav.jsx"
import Index_main from "./index_main.jsx"
import Footer from './footer.jsx'
class App extends React.Component{
    render() {
        //JSX here!
        return  (
            <div>
                <Header/>
                <Nav/>
                {this.props.children}
                {/*<Index_main hos_list = {this.state.hos_list} disease_list = {this.state.disease_list}/>*/}
                <Footer/>
            </div>

        )
    }

};

export default App
// const app = document.createElement('div');
// document.body.appendChild(app);
// ReactDOM.render(<App />, app);