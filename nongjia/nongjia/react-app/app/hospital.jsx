import React from 'react';
import ReactDOM from 'react-dom'
import '../css/hospital.css'
import Button from './button.jsx'
class Hospital extends React.Component{
    render(){
        let server_list = [];
        for (let i in this.props.hos.functions){
            server_list.push(this.props.hos.functions[i])
        }
        let server = []
        for (let i = 0 ; i<3;i++){
            server.push( <span key={i} className="items_value items_server">{server_list[i]}</span>)
        }
        return(
            <div className="hos_items" key={this.props.hos.corpId}>
                <div style={{'float':'left'}}>
                    <img width="160" height="120" src={this.props.hos.logo}/>
                </div>
                <div style={{'float':'left','padding':'25px'}}>
                    <a className="hos_name" href="#">{this.props.hos.name }</a>
                    <span className="hos_level">{this.props.hos.corpTags}</span>
                    <ul>
                        <li><span className="items_key">联系电话：</span><span className="items_value">{this.props.hos.phone}</span></li>
                        <li><span className="items_key">医院地址：</span><span className="items_value">{this.props.hos.address }</span></li>
                            <li><span className="items_key">提供服务：</span>{server}</li>
                    </ul>
                </div>
                <div style={{'float':'right','padding':'30px 25px 0 0'}}>
                    <div className="btn btn_2">
                        <Button link={'#'} btn_name={'去预约挂号'}/>
                    </div>

                </div>
            </div>
        )
    }

}
export default Hospital;
