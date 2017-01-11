import  React from 'react';
import ReactDOM from 'react-dom';

import '../css/footer.css';

class Footer extends React.Component{
    render(){
        return(
            <div className="footer">
                <div className="footer_notice">
                    <div className="content" style={{textAlign:'center'}}>
                        <a href="#">法律须知</a>
                        <span>|</span>
                        <a href="#">隐私声明</a>
                    </div>
                </div>
                <div className="footer_content">
                    <div className="content" style={{overflow:'hidden'}}>
                        <div style={{float:'left'}}>
                            <div  style={{background:"url('../image/logo.png ')left no-repeat",width:'440px',height:'100px'}}></div>
                            <p>由青岛市卫生和计划生育委员会官方主导</p>
                            <p>中信银行和浙江远图互联科技股份有限公司承建</p>
                            <div className="zhongxin"></div>
                            <div className="yuantu"></div>
                        </div>
                        <div className="code"></div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Footer;