import React from 'react'
import { Layout, Menu, Col, Row, Form, Input, Button,Breadcrumb, Icon } from 'antd'
import MapChooseChart from './MapChooseChart'
import {getRocksByCondition} from "../../Fetch/fetchSearchData";
import './style.less';

const {Header, Content, Footer} = Layout;
const FormItem = Form.Item;
class SearchDataPage extends React.Component{
    constructor(props){
        super(props);
        this.searchData = this.searchData.bind(this);
        this.onRef = this.onRef.bind(this);
        this.state = {
            current: 'SliceAnalyze',
            searchType: 'select',
            searchData: [],
            mapList: [],
            listVisible: false
        }
    }
    onRef(ref){
        this.child = ref
    }

    //查询，筛选
    searchData(){
            const form = this.props.form;
            form.validateFields((err, values) => {
                if (!err) {
                    let result = getRocksByCondition({
                        search: values.search
                    });
                    result.then(res=>{
                        return  res.json()
                    }).then(res=>{
                            this.child.showDrawer()
                        }
                    );
                }
            });
    }

    //浏览器回退
    changeMenu(){
        window.history.back()
    }
    render(){
        const { getFieldDecorator } = this.props.form;
        return(
            <div id='searchData'>
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
                    </Breadcrumb>
                    <div className='content'>
                        <div className="select-container">
                            <Row gutter={16} type="flex" justify="center" style={{margin: '30px 0'}} >
                                {/*条件搜索*/}
                                <Col span={3}>
                                    <Button>关键字搜索</Button>
                                </Col>
                                <Col span={6}>
                                    <Form layout="inline" onSubmit={this.handleSubmit} style={{margin: '-4px'}}>
                                        <FormItem>
                                            {getFieldDecorator('search')(
                                                <Input  placeholder="搜索信息" style={{width: 300}}/>
                                            )}
                                            </FormItem>
                                    </Form>
                                </Col>
                                <Col span={2}>
                                    <Button type='primary' onClick={this.searchData}>查询</Button>
                                </Col>
                            </Row>
                        </div>
                        <div className="map-container">
                            <Row type="flex" justify="center">
                                <MapChooseChart
                                    onRef={this.onRef}
                                />
                            </Row>
                        </div>
                    </div>
                </Content>
            </div>
        )
    }
}


export  default Form.create()(SearchDataPage)
