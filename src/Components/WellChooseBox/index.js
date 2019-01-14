import React from 'react'
import {Card, Tag} from 'antd'

class WellChooseBox extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div id='wellChooseBox'>
                <Card title={this.props.area} bordered={false} style={{ width: 300 }}>
                    {this.props.wells.map((item)=>{
                        return <Tag color="orange" onClick={()=>{this.props.props.history.push('./RockMessageDisplay')}}>{item}</Tag>
                    })}
                </Card>
            </div>
        )
    }
}

export default WellChooseBox
