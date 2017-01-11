import React from 'react';
import ReactDOM from 'react-dom';

class Header extends React.Component{
    render(){
        return(
            <div>
                <div style={{'backgroundColor': '#f5f5f5'}}>
                    <div className="content header">
                        <span>下载无线端APP-慧医，使用更便捷</span>
                        <div style={{'float':'right'}}>
                            <span>欢迎您访问请</span><a>登录</a><span>或</span><a>注册</a>
                        </div>
                    </div>
                </div>
                <div className="search_box content">
                    <a href="#" className="logo_img"></a>
                    <div className="search_bar">
                        <form action="">
                            <input type="text" className="search_input" placeholder="输入疾病/症状关键字"/>
                            <input type="button" className="search_btn"/>
                        </form>
                    </div>
                </div>
            </div>



        )
    }
}
export default Header;