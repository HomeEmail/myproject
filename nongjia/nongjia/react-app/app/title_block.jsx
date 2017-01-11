import React from 'react';
import ReactDOM from 'react-dom'

import '../css/title_block.css'
class Title_block extends React.Component{
    render(){
        return(
            <div  style={{'backgroundColor':'#f3f7fa','lineHeight':'30px','height':'30px'}}>
                <div className="title_block" >
                    {this.props.title}
                </div>
                <div className="other" style={{'display':this.props.otherState ? this.props.otherState : 'inline-block'}}>
                    <ul>
                        <li><a href="#">内科</a></li>
                        <li><a href="#">外科</a></li>
                        <li><a href="#">妇产科</a></li>
                        <li><a href="#">传染科</a></li>
                        <li><a href="#">生殖健康</a></li>
                        <li><a href="#">男科</a></li>
                    </ul>
                </div>
                <a href="#" style={{'fontSize':'12px','color':'#585858','float':'right','marginRight':'10px','display':this.props.moreState ? this.props.moreState : 'inline-block'}}>{this.props.more}</a>
            </div>

        )

    }
    

}

export default Title_block;