import React from 'react'
import {Modal, Card, Divider} from 'antd'

const { Meta } = Card;
class SliceDetailBox extends React.Component{
    constructor(props){
        super(props);
        this.state = {
          visible: false
        };
        this.showModal = this.showModal.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleOk = this.handleOk.bind(this);
    }
    showModal(){
        this.setState({
            visible: true,
        });
    }

    handleOk(e){
        console.log(e);
        this.setState({
            visible: false,
        });
    }

    handleCancel(e){
        console.log(e);
        this.setState({
            visible: false,
        });
    }
    render(){
        return(
            <a onClick={()=>{this.showModal()}} id="sliceDetailBox">
                查看
                <Modal
                    title="薄片信息"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={null}
                >
                    <div className="card-container">
                        <Card
                            style={{ width: 400, margin: '0 auto' }}
                            cover={<img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />}
                        >
                            <Meta
                                title="组分特征"
                                description="This is the descriptio"
                            />
                            <Divider />
                            <Meta
                                title="古生物特征"
                                description="This is the descriptio"
                            />
                            <Divider />
                            <Meta
                                title="岩性特征"
                                description="This is the descriptio"
                            />
                            <Divider />
                            <Meta
                                title="孔缝特征"
                                description="This is the descriptio"
                            />
                        </Card>
                    </div>
                </Modal>
            </a>
        )
    }
}

export default SliceDetailBox
