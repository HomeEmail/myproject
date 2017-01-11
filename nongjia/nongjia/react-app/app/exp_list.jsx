import React from 'react';
import ReactDOM from 'react-dom';

import '../css/exp_list.css';

class Exp_list extends React.Component{
    render(){

        return(
            <div className="exp_list">
                <div style={{marginBottom:'10px'}}>
                    <div className="exp_img">
                        <img src={this.props.exp_list[0].exp_imgSrc} width="76" height="76"/>
                    </div>
                    <h1><a href="#">{this.props.exp_list[0].exp_name}</a><span>{this.props.exp_list[0].pos}</span></h1>
                    <p>{this.props.exp_list[0].department}</p>
                    <p>{this.props.exp_list[0].hosName}</p>
                </div>
                <div style={{textAlign:'center',padding:'15px 0',borderTop:'1px dashed #f3f7fa'}}>
                    <a href="#" className="yuyue">去预约挂号</a>
                </div>
            </div>


        )
    }

}

export default Exp_list