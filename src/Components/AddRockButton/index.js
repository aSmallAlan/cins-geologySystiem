import React from 'react'
import {Button, Drawer, Form, Input, Select, Tabs} from 'antd'
import AddOne from './AddOne'
import AddAll from './AddAll'
import './style.less'

const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;
const TabPane = Tabs.TabPane;
class AddRockButton extends React.Component{
    constructor(props){
        super(props);
        this.showDrawer = this.showDrawer.bind(this);
        this.closeDrawer = this.closeDrawer.bind(this);
        this.state = {
            drawerIsVisible: false
        };
    }

    //显示抽屉
    showDrawer(){
        this.setState({
            drawerIsVisible: true,
        });
    };
    //关闭抽屉
    closeDrawer(){
        this.setState({
            drawerIsVisible: false
        });
    }

    render(){
        return (
            <div id="addRockButton">
                <Button type="danger" style={{marginBottom: 20}} onClick={()=>{this.showDrawer()}}>添加薄片</Button>
                <Drawer
                    title="添加薄片"
                    width="400"
                    placement="left"
                    closable={false}
                    onClose={this.closeDrawer}
                    visible={this.state.drawerIsVisible}
                >
                    <Tabs defaultActiveKey="1">
                        <TabPane tab="单个添加" key="1">
                            <AddOne
                                update={this.props.update}
                                currentPage={this.props.currentPage}
                            />
                        </TabPane>
                        <TabPane tab="批量添加" key="2">
                            <AddAll />
                        </TabPane>
                    </Tabs>
                </Drawer>
            </div>
        )
    }
}

export default AddRockButton;

