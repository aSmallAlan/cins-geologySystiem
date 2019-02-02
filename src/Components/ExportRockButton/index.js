import React from 'react';
import {Button, Modal, Cascader} from 'antd'

class ExportRockButton extends React.Component{
    constructor(props){
        super(props);
        this.showModal = this.showModal.bind(this);
        this.onClose = this.onClose.bind(this);
        this.state = {
            visible: false
        }
    }
    showModal(){
        this.setState({
            visible: true
        });
    };

    onClose(){
        this.setState({
            visible: false
        });
    };

    onChange(value){
        console.log(value);
    }
    render(){
        const options = [{
            value: '原薄片',
            label: '1',
            children: [{
                value: 'id',
                label: '',
                children: [{
                    value: 'xihu',
                    label: 'West Lake',
                }],
            }],
        }, {
            value: 'jiangsu',
            label: 'Jiangsu',
            children: [{
                value: 'nanjing',
                label: 'Nanjing',
                children: [{
                    value: 'zhonghuamen',
                    label: 'Zhong Hua Men',
                }],
            }],
        }];

        return (
            <div id="exportRockButton">
                <Button type="primary" onClick={this.showModal}>
                    导出薄片信息
                </Button>
                <Modal
                    title="导出薄片信息"
                    visible={this.state.visible}
                    onOk={this.showModal}
                    onCancel={this.onClose}
                >
                    <Cascader
                        style={{width: 300}}
                        options={options}
                        onChange={this.onChange}
                        placeholder="请选择导出类型"
                    />
                </Modal>

            </div>
        )
    }
}
export default ExportRockButton;
