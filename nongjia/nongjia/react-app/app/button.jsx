import React from 'react';
import ReactDOM from 'react-dom';
import '../css/button.css'
class Button extends React.Component{
    render(){
        return(
            <a href={this.props.links}>{this.props.btn_name}</a>
        )
    }

}

export default Button;