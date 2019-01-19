import React from 'react';
import {Layout, Menu, Breadcrumb, Icon, Button} from 'antd'
import './style.less'
import SliceListTable from '../../Components/SliceListTable'

const {Header, Content} = Layout
class SliceListPage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            current: 'SliceAnalyze'
        }

    }
    //浏览器回退
    changeMenu(){
        window.history.back()
    }
    render(){
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
                        <Button type="danger" style={{marginBottom: 20}}>添加薄片</Button>
                        <SliceListTable></SliceListTable>
                    </div>
                </Content>
            </div>
        )
    }
}
export default SliceListPage;
