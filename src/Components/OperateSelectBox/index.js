import React from 'react'
import {Card, Icon, Button, Avatar, Row} from 'antd'
import './style.less'

const { Meta } = Card;
class OperateSelectBox extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <div id="operateSelectBox">
                <Row type="flex" justify="center">
                    <Avatar size={64}  style={{backgroundColor: '#f56a00'}} icon={this.props.icon} />
                </Row>
                <Row type="flex" justify="center">
                    <h2>
                        {this.props.title}
                    </h2>
                </Row>
                <Row type="flex" justify="center">
                    <span style={{width:'78%', fontSize: '10px', textAlign: 'center', height: '30px'}}>
                         {this.props.description}
                    </span>
                </Row>
                <Row type="flex" justify="center">
                    <Button style={{margin: '2px 0 18px'}} type="danger" ghost onClick={()=>{this.props.root.history.push(this.props.link)}}>进入</Button>
                </Row>
            </div>
        )
    }
}

export default OperateSelectBox;
