import React from 'react';
import ReactDOM from 'react-dom';

import Title_block from './title_block.jsx'
import '../css/message.css'
class Message extends React.Component{
    render(){
        return(
            <div className="content">
                <div className="crumbs">
                    <a href="#">首页</a>
                    <span> > </span>
                    <a href="">{this.props.pos}</a>
                </div>
                <div className="" style={{border:'1px solid #f3f7fa'}}>
                    <Title_block title={this.props.title} moreState={'none'}  otherState={'none'}/>
                    <div style={{padding:'10px 15px'}}>
                        <ul className="mes_list">
                            <li>
                                <a href=""><span style={{display:this.props.inblock ?this.props.inblock : 'inline-block' }}>[公告]</span>【青岛开发】关于青岛市开发区第一人民医院不再收取就诊卡押金的通知<span style={{float:'right'}}>2016-11-15</span></a>
                            </li>
                            <li>
                                <a href=""><span style={{display:this.props.inblock ?this.props.inblock : 'inline-block' }}>[公告]</span>【青岛开发】关于青岛市开发区第一人民医院不再收取就诊卡押金的通知<span style={{float:'right'}}>2016-11-15</span></a>
                            </li>
                            <li>
                                <a href=""><span style={{display:this.props.inblock ?this.props.inblock : 'inline-block' }}>[公告]</span>【青岛开发】关于青岛市开发区第一人民医院不再收取就诊卡押金的通知<span style={{float:'right'}}>2016-11-15</span></a>
                            </li>
                            <li>
                                <a href=""><span style={{display:this.props.inblock ?this.props.inblock : 'inline-block' }}>[公告]</span>【青岛开发】关于青岛市开发区第一人民医院不再收取就诊卡押金的通知<span style={{float:'right'}}>2016-11-15</span></a>
                            </li>
                            <li>
                                <a href=""><span style={{display:this.props.inblock ?this.props.inblock : 'inline-block' }}>[公告]</span>【青岛开发】关于青岛市开发区第一人民医院不再收取就诊卡押金的通知<span style={{float:'right'}}>2016-11-15</span></a>
                            </li>
                            <li>
                                <a href=""><span style={{display:this.props.inblock ?this.props.inblock : 'inline-block' }}>[公告]</span>【青岛开发】关于青岛市开发区第一人民医院不再收取就诊卡押金的通知<span style={{float:'right'}}>2016-11-15</span></a>
                            </li>
                            <li>
                                <a href=""><span style={{display:this.props.inblock ?this.props.inblock : 'inline-block' }}>[公告]</span>【青岛开发】关于青岛市开发区第一人民医院不再收取就诊卡押金的通知<span style={{float:'right'}}>2016-11-15</span></a>
                            </li>
                            <li>
                                <a href=""><span style={{display:this.props.inblock ?this.props.inblock : 'inline-block' }}>[公告]</span>【青岛开发】关于青岛市开发区第一人民医院不再收取就诊卡押金的通知<span style={{float:'right'}}>2016-11-15</span></a>
                            </li>
                            
                        </ul>
                    </div>
                </div>

            </div>
        )
    }

}
export default Message;