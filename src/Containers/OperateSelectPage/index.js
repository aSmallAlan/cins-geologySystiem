import React from 'react';
import OperateSelectBox from '../../Components/OperateSelectBox'
import {Layout, Menu, Row, Col, Breadcrumb, Icon } from "antd/lib/index";
import './style.less'

const {Header, Content, Footer} = Layout;
class OperateSelectPage extends React.Component{
    constructor(props){
        super(props);
        this.changeMenu = this.changeMenu.bind(this);
        this.state = {
            current: 'SliceAnalyze'
        }
    }

    //切换menu状态并跳转
    changeMenu(e){
        let key = e.key;
        this.setState({
            current: key
        });
        //切换轮播图
        if (key === 'SliceAnalyze'){
            this.props.history.push('/')
        }else{
            this.props.history.push('/')
        }
    }

    render(){
        return(
            <div id="operateSelectPage">
                <Layout>
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
                        </Breadcrumb>
                        <div className="pie-container">
                            <Row>
                                <Col>
                                    <OperateSelectBox
                                        title='区域岩心分析'
                                        description='通过对区域岩心分析得到区域储层岩石各种物理性质'
                                        icon='dot-chart'
                                        root={this.props}
                                        link='/searchData'
                                    />
                                </Col>
                                <Col>
                                    <OperateSelectBox
                                        title='页岩薄片分析'
                                        description='通过对页岩薄片分析得到页岩的来源矿物、矿物类型以及古生物特征'
                                        icon='area-chart'
                                    />
                                </Col>
                                <Col>
                                    <OperateSelectBox
                                        title='页岩孔隙分析'
                                        description='通过对页岩薄片的场发射扫描电镜图片进行分析得到页岩的发育孔类型、矿物类型。
'
                                        icon='bar-chart'
                                    />
                                </Col>
                                <Col>
                                    <OperateSelectBox
                                        title='碳酸盐岩薄片'
                                        description='通过对碳酸盐岩薄片分析得到该层位碳酸盐岩的孔渗特性、矿物组成进行分析'
                                        icon='pie-chart'
                                    />
                                </Col>
                                <Col>
                                    <OperateSelectBox
                                        title='碎分析'
                                        description='对页岩薄片进行分析'
                                        icon='line-chart'
                                    />
                                </Col>
                                <Col>
                                    <OperateSelectBox
                                        title='数据录入'
                                        description='对数据进行录入'
                                        icon='edit'
                                    />
                                </Col>
                            </Row>
                        </div>
                    </Content>
                </Layout>
            </div>
        )
    }
}
export default OperateSelectPage;
