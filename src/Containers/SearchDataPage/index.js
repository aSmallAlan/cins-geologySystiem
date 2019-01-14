import React from 'react'
import TreeSelect from '../../Components/TreeSelect'
import MapChooseChart from './MapChooseChart'
import { Layout, Menu, Col, Row, Form, Tabs, Select, Input, Button,Breadcrumb, Icon } from 'antd'
import './style.less'


const {Header, Content, Footer} = Layout;
const FormItem = Form.Item;
class SearchDataPage extends React.Component{
    constructor(props){
        super(props);
        this.setSearchType = this.setSearchType.bind(this);
        this.makeRegionJsonTree = this.makeRegionJsonTree.bind(this);
        this.getSelectData = this.getSelectData.bind(this);
        this.searchData = this.searchData.bind(this);
        this.state = {
            current: 'SliceAnalyze',
            searchType: 'select',
            regionList: [],
            poltypesList: [],
            lithosList: [],
            searchData: []
        }
    }

    componentDidMount(){
        //获取地区
        let regions = getRegions();
        regions.then(res=>{
            return  res.json()
        }).then(res=>{
                this.setState({
                    regionList: res
                });
            }
        );

        //获取偏光类型
        let poltype = getPoltypes();
        poltype.then(res=>{
            return  res.json()
        }).then(res=> {
                this.setState({
                    poltypesList: res
                })
            }
        );

        //获取岩性
        let lithos = getLithos();
        lithos.then(res=>{
            return  res.json()
        }).then(res=> {
                this.setState({
                    lithosList: res
                })
            }
        );

    }

    //转换地区的json树
    makeRegionJsonTree(tree){
        let type = typeof tree;
        if (type === "object") {
            for (let key in tree) {
                if (key === 'region'){
                    tree['title'] = tree['region'];
                    tree['value'] = 'region' + tree['id'];
                    tree['key'] = 'region' + tree['id'];
                    tree['children'] = tree['next_categery']
                }
                this.makeRegionJsonTree(tree[key])
            }
        } else {
            return true
        }
    }

    //获取搜索栏筛选的数据
    getSelectData(region, polType, litDes){
        let selectData = Object.assign({},{
            region: region,
            polType: polType,
            litDes: litDes
        });
        this.setState({
            selectData: selectData
        })
    }

    //设置搜索类型
    setSearchType(value){
        this.setState({
            searchType: value
        })
    }

    //查询，筛选
    searchData(){
        let searchType = this.state.searchType;
        if (searchType === 'select') {
            let result = getRocksByCondition({
                pol_type: `[${this.state.selectData.polType}]`,
                lit_des: `[${this.state.selectData.litDes}]`,
                address: `[${this.state.selectData.region}]`
            });
            result.then(res=>{
                return  res.json()
            }).then(res=>{

                }
            );
        } else if (searchType === 'search') {
            const form = this.props.form;
            form.validateFields((err, values) => {
                if (!err) {
                    let result = getRocksByCondition({
                        search: values.search
                    });
                    result.then(res=>{
                        return  res.json()
                    }).then(res=>{

                        }
                    );
                }
            });
        }
    }
    render(){
        const { getFieldDecorator } = this.props.form;
        const Option = Select.Option;
        //处理需要选择的数据

        //地区
        let regionList = this.state.regionList;
        this.makeRegionJsonTree(regionList);
        //偏光类型
        let poltypesList = this.state.poltypesList;
        poltypesList.map((item)=>{
            item['title'] = item['pol_type'];
            item['value'] = 'pol' + item['id'];
            item['key'] = 'pol' + item['id']
        });
        //岩性
        let lithosList = this.state.lithosList;
        //递归生成json树
        lithosList.map((item)=>{
            item['title'] = item['lit_des'];
            item['value'] = 'lith' + item['id'];
            item['key'] = 'lith' + item['id']
        });

        //生成最后的树
        let treeData = [{
            title: '地区',
            value: '001',
            key: '001',
            disableCheckbox: true,
            children: regionList
        },{
            title: '偏光类型',
            value: '002',
            key: '002',
            disableCheckbox: true,

            children: poltypesList
        },{
            title: '岩性',
            value: '003',
            key: '003',
            disableCheckbox: true,
            children: lithosList
        }];
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
                            区域岩心薄片分析
                        </Menu.Item>
                        <Menu.Item key="NowAnalyze">
                            碳酸盐薄片分析
                        </Menu.Item>
                        <Menu.Item key="NowAnalyze">
                            页岩孔隙薄片分析
                        </Menu.Item>
                        <Menu.Item key="NowAnalyze">
                            页岩薄片分析
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
                            <span>区域岩心分析</span>
                        </Breadcrumb.Item>
                    </Breadcrumb>
                    <div className='content'>
                        <Row gutter={16} type="flex" justify="center" style={{margin: '30px 0'}} >
                            {/*条件搜索*/}
                            <Col span={3}>
                                <Select defaultValue="select" style={{ width: 120 }} onChange={this.setSearchType}>
                                    <Option value="select">筛选</Option>
                                    <Option value="search">关键字搜索</Option>
                                </Select>
                            </Col>
                            <Col span={6}>
                                {
                                    this.state.searchType == 'select'?
                                        (<TreeSelect
                                            treeData={treeData}
                                            getSearchData={this.getSelectData}
                                        />):
                                        ( <Form layout="inline" onSubmit={this.handleSubmit} style={{margin: '-4px'}}>
                                            <FormItem>
                                                {getFieldDecorator('search', {
                                                    rules: [{ required: true, message: '请输入你要搜索的信息!' }],
                                                })(
                                                    <Input  placeholder="搜索信息" style={{width: 300}}/>
                                                )}
                                            </FormItem>
                                        </Form>)
                                }
                            </Col>
                            <Col span={2}>
                                <Button type='primary' onClick={this.searchData}>查询</Button>
                            </Col>
                        </Row>
                    </div>
                    <Row type="flex" justify="center">
                        <MapChooseChart props={this.props}/>
                    </Row>
                </Content>
            </div>
        )
    }
}
export default Form.create()(SearchDataPage)
