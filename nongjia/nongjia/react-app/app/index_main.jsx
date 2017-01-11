import React from 'react';
import ReactDOM from 'react-dom';
import '../css/index_main.css'
import Button from './button.jsx'
import Title_block from './title_block.jsx'
import Hospital from './hospital.jsx'
import Index_disease_list from './index_disease_list.jsx'
import Exp_list from './exp_list.jsx'

class Index_main extends React.Component {
    constructor() {
        super();
        this.state = {
            hos_list: [],
            disease_list: [],

        }
    }
    componentDidMount() {
        console.log(123)
            window.fetch('http://guahao.jkqd.gov.cn/user-web/ws/query/hospital-list?unionId=29&currentPage=1&pageSize=10&isFirstCorp=false&isNeedPage=1&ver=1.0')
                /*.then(function(response) {
                    return response.json();
                }).then(function(json) {
                this.setState({
                    hos_list:json.data.listHospital
                })*/
                    .then(r => r.json())
                    .then(r =>{
                        this.setState({
                            hos_list:r.data.listHospital
                        })
            })


        /*$.ajax({
            type: 'GET',
            url: 'http://guahao.jkqd.gov.cn/user-web/ws/query/hospital-list?unionId=29&currentPage=1&pageSize=10&isFirstCorp=false&isNeedPage=1&ver=1.0',
            dataType: 'jsonp',
            success: function (result) {
                let data = result.data.listHospital;
                this.setState({
                    hos_list: data
                })
            }.bind(this),
            error: function () {
                console.log('error')
            }
        })*/
        $.ajax({
            type: 'GET',
            url: 'http://search.yuantutech.com:8080/spider/api/findAllHosJibs?ver=1.0',
            dataType: 'jsonp',
            success: function (result) {
                let data = result.jibList;
                this.setState({
                    disease_list: data
                })
            }.bind(this),
            error: function () {
                console.log('error')
            }
        })
    }

    render() {

        var exp_list = [
            {exp_imgSrc: '../image/exp_img.jpg', hosName: '青岛市妇女儿童医院', exp_name: '张战红', pos: '主任医师', department: '产科门诊'}
        ];
        var list = [];
        if (this.state.hos_list == '') {
            list.push(<div key='1'>请稍后..</div>);
            console.log('hos_list2',this.state.hos_list)
        } else {
            for (var i = 0; i < 3; i++) {
                list.push(<Hospital hos={this.state.hos_list[i]} key={i}/>)
            }
            console.log('hos_list1',this.state.hos_list)
        }
        var disease_list = [];
        if (this.state.disease_list == '') {
            disease_list.push(<div key='2'>请稍后..</div>);
        } else {
            for (var i = 0; i < this.state.disease_list.length; i++) {
                disease_list.push(<Index_disease_list disease={this.state.disease_list[i].name} key={i}/>)
            }
        }

        return (
            <div className="main content">
                <div className="l_main">
                    <div className="top">
                        <div className="banner">
                            <img src="image/index.jpg" alt=""/>
                        </div>
                    </div>
                    <div className="middle" style={{'marginTop':'10px'}}>
                        <div style={{'border':'1px solid #f3f7fa','boxSizing':'border-box'}}>
                            <Title_block title={'全部医院'} more={'全部医院'} otherState={'none'}/>
                            <div
                                style={{'borderBottom':'1px solid #f3f7fa','boxSizing':'border-box','padding':'8px','overflow':'hidden'}}>
                                {list}
                            </div>
                            <div style={{'textAlign':'center'}}>
                                <a href="#"
                                   style={{'fontSize':'16px','color':'#45a7ff','padding':'8px 0','display':'inline-block'}}>查看全部医院</a>
                            </div>
                        </div>
                    </div>
                    <div className="middle">
                        <div style={{'border':'1px solid #f3f7fa','boxSizing':'border-box'}}>
                            <Title_block title={'常见疾病'} more={'全部疾病'}/>
                            <div style={{padding:'10px 15px'}}>
                                {disease_list}
                            </div>
                        </div>
                    </div>
                    <div className="middle">
                        <div style={{'border':'1px solid #f3f7fa','boxSizing':'border-box'}}>
                            <Title_block title={'专家介绍'} more={'全部专家'} otherState={'none'}/>
                            <div style={{padding:'10px 15px',overflow:'hidden'}}>
                                <Exp_list exp_list={exp_list}/>
                                <Exp_list exp_list={exp_list}/>
                                <Exp_list exp_list={exp_list}/>
                                <Exp_list exp_list={exp_list}/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="r_main">
                    <div className="top">
                        <div className="fast_order">
                            <h1><span style={{'marginLeft':'25px'}}>快速预约</span></h1>
                            <ul>
                                <li><span>选择区域 ：</span><select name="" id="">
                                    <option value=""></option>
                                </select></li>
                                <li><span>选择医院 ：</span><select name="" id="">
                                    <option value=""></option>
                                </select></li>
                                <li><span>选择科室 ：</span><select name="" id="">
                                    <option value=""></option>
                                </select></li>
                                <li><span>选择医生 ：</span><select name="" id="">
                                    <option value=""></option>
                                </select></li>
                            </ul>
                            <div style={{'textAlign':'center','paddingTop':'15px'}}>
                                <div className="btn btn_1">
                                    <Button link={'#'} btn_name={'预约挂号'}/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="middle">
                        <div className="help">
                            <h1><span style={{'marginLeft':'25px'}}>帮助中心</span></h1>
                            <div className="btn_group">
                                <div className="btn btn_3">
                                    <Button btn_name={'注册/登录'}/>
                                </div>
                                <div className="btn btn_3">
                                    <Button btn_name={'预约指南'}/>
                                </div>
                                <div className="btn btn_3">
                                    <Button btn_name={'就诊人管理'}/>
                                </div>
                                <div className="btn btn_3">
                                    <Button btn_name={'常见问题'}/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="middle">
                        <div className="notice">
                            <div className="hos_title">
                                <span style={{'marginLeft':'10px'}}>信息公告</span>
                                <div style={{'float':'right','marginRight':'15px'}}>
                                    <span>|</span>
                                    <a href="#" style={{'fontSize':'12px'}}>更多</a>
                                </div>
                            </div>
                            <div style={{'border':'1px solid #f3f7fa','boxSizing':'border-box','padding':'8px'}}>
                                <ul>
                                    <li><a href="#">【青岛开发】关于青岛市开发区第一人民医院不再收取就诊卡押金的通知</a><span>11-15</span></li>
                                    <li><a href="#">【青岛开发】关于青岛市开发区第一人民医院不再收取就诊卡押金的通知</a><span>11-15</span></li>
                                    <li><a href="#">【青岛开发】关于青岛市开发区第一人民医院不再收取就诊卡押金的通知</a><span>11-15</span></li>
                                    <li><a href="#">【青岛开发】关于青岛市开发区第一人民医院不再收取就诊卡押金的通知</a><span>11-15</span></li>
                                    <li><a href="#">【青岛开发】关于青岛市开发区第一人民医院不再收取就诊卡押金的通知</a><span>11-15</span></li>
                                    <li><a href="#">【青岛开发】关于青岛市开发区第一人民医院不再收取就诊卡押金的通知</a><span>11-15</span></li>
                                    <li><a href="#">【青岛开发】关于青岛市开发区第一人民医院不再收取就诊卡押金的通知</a><span>11-15</span></li>
                                    <li><a href="#">【青岛开发】关于青岛市开发区第一人民医院不再收取就诊卡押金的通知</a><span>11-15</span></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="middle">
                        <div className="notice">
                            <div className="hos_title">
                                <span style={{'marginLeft':'10px'}}>常见问题</span>
                                <div style={{'float':'right','marginRight':'15px'}}>
                                    <span>|</span>
                                    <a href="#" style={{'fontSize':'12px'}}>更多</a>
                                </div>
                            </div>
                            <div style={{'border':'1px solid #f3f7fa','boxSizing':'border-box','padding':'8px'}}>
                                <ul>
                                    <li><span style={{'float':'left'}}>·</span><a href="#">【青岛开发】关于青岛市开发区第一人民医院不再收取就诊卡押金的通知</a><span>11-15</span>
                                    </li>
                                    <li><span style={{'float':'left'}}>·</span><a href="#">【青岛开发】关于青岛市开发区第一人民医院不再收取就诊卡押金的通知</a><span>11-15</span>
                                    </li>
                                    <li><span style={{'float':'left'}}>·</span><a href="#">【青岛开发】关于青岛市开发区第一人民医院不再收取就诊卡押金的通知</a><span>11-15</span>
                                    </li>
                                    <li><span style={{'float':'left'}}>·</span><a href="#">【青岛开发】关于青岛市开发区第一人民医院不再收取就诊卡押金的通知</a><span>11-15</span>
                                    </li>
                                    <li><span style={{'float':'left'}}>·</span><a href="#">【青岛开发】关于青岛市开发区第一人民医院不再收取就诊卡押金的通知</a><span>11-15</span>
                                    </li>
                                    <li><span style={{'float':'left'}}>·</span><a href="#">【青岛开发】关于青岛市开发区第一人民医院不再收取就诊卡押金的通知</a><span>11-15</span>
                                    </li>
                                    <li><span style={{'float':'left'}}>·</span><a href="#">【青岛开发】关于青岛市开发区第一人民医院不再收取就诊卡押金的通知</a><span>11-15</span>
                                    </li>
                                    <li><span style={{'float':'left'}}>·</span><a href="#">【青岛开发】关于青岛市开发区第一人民医院不再收取就诊卡押金的通知</a><span>11-15</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                </div>

            </div>

        )
    }

}

export default Index_main;
