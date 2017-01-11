import React from 'react';
import ReactDOM from 'react-dom';

class Index_disease_list extends React.Component{
    render(){
        return(
            <a className="hos_label" href="#">{this.props.disease}</a>
        )
    }

}

export default Index_disease_list;
