import React from 'react'
import {Table, Divider} from 'antd'
import SliceDetailBox from '../SliceDetailBox'
import UpdateButton from '../ManageRockButton'
import {withRouter} from "react-router-dom";

class SliceListTable extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        const columns = [{
            title: '深度',
            dataIndex: 'name',
            render: text => <a href="javascript:;">{text}</a>,
            sorter: (a, b) => a.name.length - b.name.length,
        }, {
            title: '年代底层单位',
            className: 'column-money',
            dataIndex: 'money',
        }, {
            title: '偏光类型',
            dataIndex: 'address',
            filters: [{
                text: '正交偏光',
                value: '正交',
            }, {
                text: '单偏光',
                value: '单偏光',
            }],
            onFilter: (value, record) => record.address.indexOf(value) === 0,
            sortDirections: ['descend'],
        },{
            title: '岩性',
            dataIndex: 'a',
            filters: [{
                text: '火山岩',
                value: '火山岩',
            }, {
                text: '沉积岩',
                value: '沉积岩',
            }],
            onFilter: (value, record) => record.a.indexOf(value) === 0,
            sortDirections: ['descend'],
        },{
            title: '操作',
            dataIndex: 'operate',
            render: () => (
                <div>
                    <SliceDetailBox />
                    <Divider type="vertical" />
                    <UpdateButton />
                    <Divider type="vertical" />
                    <a href="javascript:;" onClick={()=>{this.props.history.push('/analyze')}}>分析</a>
                </div>
            ),
        }];

        const data = [{
            key: '1',
            name: '111',
            money: '123',
            address: '正交偏光',
            a: '火山岩'
        }, {
            key: '2',
            name: '112311',
            money: '123',
            address: '正交偏光',
            a: '火山岩'
        }, {
            key: '3',
            name: '11141',
            money: '123',
            address: '单偏光',
            a: '火山岩'
        },{
            key: '4',
            name: '11',
            money: '123',
            address: '单偏光',
            a: '火山岩'
        },{
            key: '5',
            name: '1111',
            money: '123',
            address: '正交偏光',
            a: '火山岩'
        },{
            key: '6',
            name: '1111',
            money: '123',
            address: '单偏光',
            a: '火山岩'
        },{
            key: '7',
            name: '1111',
            money: '123',
            address: '正交偏光',
            a: '火山岩'
        },{
            key: '8',
            name: '1111',
            money: '123',
            address: '正交偏光',
            a: '火山岩'
        },{
            key: '9',
            name: '1111',
            money: '123',
            address: '正交偏光',
            a: '沉积岩'
        }];
        return(
            <div id="sliceListTable">
                <Table
                    columns={columns}
                    size="middle"
                    dataSource={data}
                    bordered
                    title={() => '12号井'}
                />
            </div>
        )
    }
}
export default withRouter(SliceListTable)
