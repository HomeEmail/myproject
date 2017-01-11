import React from 'react';
import ReactDOM from 'react-dom';
import {IndexLink,Link} from 'react-router';

class Nav extends React.Component{
    render(){
        return(
            <div className="nav_wrap">
                <div className="nav content">
                    <IndexLink to="/" activeClassName="select">首页</IndexLink>
                    <Link href="#" activeClassName="select">预约挂号</Link>
                    <Link to="/mes" activeClassName="select">信息公告</Link>
                    <Link href="#" activeClassName="select">健康资讯</Link>
                    <Link href="#" activeClassName="select">疾病百科</Link>
                    <Link href="#" activeClassName="select">疾病百科</Link>
                    <Link href="#" activeClassName="select">症状自测</Link>
                    <span>
                        <a href="#" style={{'fontSize':'14px','marginRight':'20px','color':'#fff','float':'right','paddingTop':'10px'}}>我的预约挂号记录</a>
                    </span>
                </div>
            </div>
        )
    }

}

export default Nav;