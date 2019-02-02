import React from 'react'
import {Table} from 'antd'
import {withRouter} from "react-router-dom";
import './style.less'
import {connect} from "react-redux";

class WellChooseBox extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        const columns = [
            { title: '地区', width: 100, dataIndex: 'region', fixed: 'left'},
            { title: '井号', width: 100, dataIndex: 'name', fixed: 'left',},
            { title: '钻井深度', dataIndex: 'dep_dri', key:'1' },
            { title: '井别', dataIndex: 'well_class1', key:'2' },
            { title: '井型', dataIndex: 'well_class2', key:'3' },
            { title: '备注', dataIndex: 'note', key:'4' },
            { title: '经度', dataIndex: 'lon', key:'5' },
            { title: '纬度', dataIndex: 'lat', key:'6' },
            { title: '目的层', dataIndex: 'tar_layer', key:'7'},
            { title: '钻探层位', dataIndex: 'dri_layer', key:'8' },
            { title: '完钻深度', dataIndex: 'dep_dri', key:'9' },
            { title: '是否取心', dataIndex: 'core', key:'10', render: (text) => {
                if (text == false){
                    return (<div>否</div>)
                }else {
                    return (<div>是</div>)
                }
            }},
            { title: '取心层位', dataIndex: 'core_layer', key:'11' },
            { title: '取心段', dataIndex: 'core_sec' , key:'12'},
            {
                title: '选择该井',
                dataIndex: 'id',
                fixed: 'right',
                width: 100,
                render: (id) => {
                    return (<a onClick={()=>{this.props.history.push("/sliceList/" + id)}}>确定</a>)
                }
            },
        ];
        const data = this.props.wellData.wellBoxMessage;
        return (
            <div id='wellChooseTable'>
                <Table columns={columns} dataSource={data} scroll={{ x: 1300 }} />
            </div>
        )
    }
}
// 链接redux
function mapStateToProps(state) {
    return {
        wellData: state.wellData
    }
}

export default connect(
    mapStateToProps
)(withRouter(WellChooseBox))

