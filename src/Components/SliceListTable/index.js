import React from 'react'
import {Table, Divider, Popconfirm, message} from 'antd'
import SliceDetailBox from '../SliceDetailBox'
import UpdateButton from '../ManageRockButton'
import {withRouter} from "react-router-dom";
import {fetchDeleteRocks} from "../../Fetch/fetchSearchData";

class SliceListTable extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            polData: [],
            litData: [],
            regionData: []
        }
    }

    //确认删除
    confirm(id){
        let result = fetchDeleteRocks({
            id: id
        });
        result.then(res=>{
            return  res.json()
        }).then(res=>{
                if (res.code === 0){
                    this.props.update(this.props.currentPage);
                    message.info(res.msg)
                } else{
                    message.error(res.msg)
                }
                console.log(res)
            }
        );
    }

    render(){
        const columns = [{
            title: '深度',
            dataIndex: 'depth',
            render: text => <a href="javascript:;">{text}</a>,
        }, {
            title: '年代底层单位',
            className: 'area_detail',
            dataIndex: 'area_detail',
        }, {
            title: '偏光类型',
            dataIndex: 'pol_type',
            filters: [{
                text: '正交偏光',
                value: '正交',
            }, {
                text: '单偏光',
                value: '单偏光',
            }],
            onFilter: (value, record) => record.pol_type.indexOf(value) === 0,
            sortDirections: ['descend'],
        },{
            title: '岩性',
            dataIndex: 'lit_des',
            filters: [{
                text: '火成岩',
                value: '火成岩',
            }, {
                text: '沉积岩',
                value: '沉积岩',
            }],
            onFilter: (value, record) => record.lit_des.indexOf(value) === 0,
            sortDirections: ['descend'],
        },{
            title: '操作',
            dataIndex: 'operate',
            width: 200,
            render: (record, text) => {
                return (
                    <div>
                        <SliceDetailBox
                            message={text.detail}
                        />
                        <Divider type="vertical" />
                        <UpdateButton
                            message={text}
                            //继承父元素更新功能
                            update={this.props.update}
                            currentPage={this.props.currentPage}
                        />
                        <Divider type="vertical" />
                        <a href="javascript:;" onClick={()=>{this.props.history.push('/analyze')}}>分析</a>
                        <Divider type="vertical" />
                        <Popconfirm
                            title="确认删除该薄片？"
                            onConfirm={()=>{this.confirm(text.detail.id)}}
                            okText="是"
                            cancelText="否"
                        >
                            <a href="#">删除</a>
                        </Popconfirm>,
                    </div>
            )}
        }];

        const data = this.props.data;
        let title = null;
        try{
            title = this.props.data[0].well_name
        }catch (e) {

        }

        return(
            <div id="sliceListTable">
                <Table
                    columns={columns}
                    size="middle"
                    dataSource={data}
                    bordered
                    pagination={false}
                    title={() => title}
                />
            </div>
        )
    }
}
export default withRouter(SliceListTable);


