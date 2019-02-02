import React from 'react';
import {Layout, Menu, Breadcrumb, Icon, Pagination, Spin, Row, Col } from 'antd'
import './style.less'
import SliceListTable from '../../Components/SliceListTable'
import  AddRockButton from '../../Components/AddRockButton'
import ExportRockButton from '../../Components/ExportRockButton'
import {fetchGetlithosType, fetchGetpoltype, fetchGetRocks,  fetchGetRegion } from "../../Fetch/fetchSearchData";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import * as chooseMessageActionsFromOtherFile from "../../Actions/chooseMessage";

const {Header, Content} = Layout;

class SliceListPage extends React.Component{
    constructor(props){
        super(props);
        this.onChange = this.onChange.bind(this);
        this.state = {
            current: 'SliceAnalyze',
            sliceListMessage: null,
            isLoad: true
        }

    }
    componentWillMount(){
        const {reduxSetRegionData, reduxSetLithosData, reduxSetPoltypeData} = this.props.chooseMessageDataAction;
        //获取偏光类型
        let pol = fetchGetpoltype();
        pol.then(res=>{
            return  res.json()
        }).then(res=>{
                reduxSetPoltypeData({
                    polData: res
                });
            }
        );
        //获取岩性类型
        let lit = fetchGetlithosType();
        lit.then(res=>{
            return  res.json()
        }).then(res=>{
                reduxSetLithosData({
                    litData: res
                });
            }
        );
        // 获取地区
        let region = fetchGetRegion();
        region.then(res=>{
            return  res.json()
        }).then(res=>{
                reduxSetRegionData({
                    regionData: res
                });
            }
        );
    }
    componentDidMount(){
        let id = this.props.match.params.id;
        //获取薄片列表
        let result = fetchGetRocks({
            address: id
        });
        result.then(res=>{
            return  res.json()
        }).then(res=>{
                this.setState({
                    sliceListMessage: res.results,
                    message: res,
                    isLoad: false
                });
            }
        );
    }

    //分页
    onChange(pageNumber) {
        let id = this.props.match.params.id;
        let result = fetchGetRocks({
            address: id,
            page: pageNumber
        });
        result.then(res=>{
            return  res.json()
        }).then(res=>{
                this.setState({
                    sliceListMessage: res.results,
                    message: res,
                    isLoad: false
                });
            }
        );
    }
    //浏览器回退
    changeMenu(){
        window.history.back()
    }
    render(){
        let currentPage = null;
        let total = null;
        try{
            currentPage = this.state.message.curent_page;
            total = this.state.message.count;
        }catch (e) {

        }
        return(
            <div id="sliceListPage">
                <Header>
                    {/*头部*/}
                    <Menu
                        onClick={this.changeMenu}
                        selectedKeys={[this.state.current]}
                        mode="horizontal"
                    >
                        <Menu.Item key="SliceAnalyze">
                            岩心薄片分析
                        </Menu.Item>
                    </Menu>
                </Header>
                <Content>
                    <Breadcrumb separator=">" style={{margin: '20px 0px 0px 71px'}}>
                        <Breadcrumb.Item>
                            <Icon type="home" />
                            <span> 岩心薄片分析</span>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            <span>井号选择</span>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            <span>薄片列表</span>
                        </Breadcrumb.Item>
                    </Breadcrumb>
                    <div className="table-container">
                        <Row>
                            <Col span={3}>
                                <AddRockButton
                                    update={this.onChange}
                                    currentPage={currentPage}
                                />
                            </Col>
                            <Col span={3}>
                                <ExportRockButton />
                            </Col>
                        </Row>
                        <Spin tip="加载中..." spinning={this.state.isLoad}>
                            <SliceListTable
                                data={this.state.sliceListMessage}
                                update={this.onChange}
                                currentPage={currentPage}
                            />
                        </Spin>
                        <div className="pagination-container">
                            <Pagination showQuickJumper  current={currentPage} total={total} pageSize={8} onChange={this.onChange} />
                        </div>
                    </div>
                </Content>
            </div>
        )
    }
}
function mapStateToProps(state) {
    return {
        chooseMessageData: state.chooseMessageData
    }
}
function mapDispatchToProps(dispatch) {
    return {
        chooseMessageDataAction: bindActionCreators(chooseMessageActionsFromOtherFile, dispatch)
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SliceListPage)

