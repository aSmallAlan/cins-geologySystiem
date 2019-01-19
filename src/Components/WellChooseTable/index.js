import React from 'react'
import {Table} from 'antd'
import {withRouter} from "react-router-dom";
import './style.less'

class WellChooseBox extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        const columns = [
            { title: '序号', width: 100, dataIndex: 'name', key: 'name', fixed: 'left' },
            { title: '井号', width: 100, dataIndex: 'age', key: 'age', fixed: 'left' },
            { title: '井别', dataIndex: 'address', key: '1' },
            { title: '井型', dataIndex: 'address', key: '2' },
            { title: '备注', dataIndex: 'address', key: '3' },
            { title: '经度', dataIndex: 'address', key: '4' },
            { title: '纬度', dataIndex: 'address', key: '5' },
            { title: '地面海拔', dataIndex: 'address', key: '6' },
            { title: '目的层', dataIndex: 'address', key: '7' },
            { title: '钻探层位', dataIndex: 'address', key: '8' },
            {
                title: '操作',
                key: 'operation',
                fixed: 'right',
                width: 100,
                render: () => <a onClick={()=>{this.props.history.push("/sliceList/12")}}>确定</a>,
            },
        ];

        const data = [{
            key: '1',
            name: '1',
            age: 32,
            address: '宁210井',
        }, {
            key: '2',
            name: 2,
            age: 40,
            address: '宁210井',
        },{
            key: '3',
            name: '3',
            age: 32,
            address: '宁210井',
        },{
            key: '4',
            name: '4',
            age: 32,
            address: '宁210井',
        }];
        return (
            <div id='wellChooseTable'>
                <Table columns={columns} dataSource={data} scroll={{ x: 1300 }} />;
            </div>
        )
    }
}

export default withRouter(WellChooseBox)
