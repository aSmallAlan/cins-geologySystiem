import React from 'react'
import {Collapse, Upload, Button,Icon, Alert, Steps, message, Divider, Tag, Col, Row, notification} from 'antd'
import {IP} from '../../../Constants/ip'

const Panel = Collapse.Panel;
const Step = Steps.Step;
class AddAll extends React.Component{
    constructor(props){
        super(props);
        this.next = this.next.bind(this);
        this.prev = this.prev.bind(this);
        this.openNotificationWithIcon = this.openNotificationWithIcon.bind(this);
        this.state = {
            current: 0,
        };
    }
    next(){
        this.setState({
            current: 1,
        })
    }
    prev(){
        this.setState({
            current: 0,
        })
    }
    openNotificationWithIcon(){
        notification["warning"]({
            message: '文件格式不正确',
            description: '请仔细阅读上传格式说明!',
        });
    };
    render(){
        const _this = this;
        const props = {
            onChange(info) {
                if (info.file.status === 'done') {
                    message.success(`${info.file.name}上传成功`);
                } else if (info.file.status === 'error') {
                    if (info.file.response.code !== 1){
                        message.error(`${info.file.name}上传失败,${info.file.response.msg}`);
                        if (info.file.response.code === -1){
                            _this.openNotificationWithIcon()
                        }
                    }
                }
            },
        };
        const steps = [{
            title: '上传图片',
            content: (
                <div style={{marginTop:20}}>
                    <Row type="flex" justify="center">
                        <Col span={12}>
                            <Upload
                                name='imgs'
                                action={IP + '/rock_images/'}
                                multiple={true}
                                {...props}
                            >
                                <Button>
                                    <Icon type="upload" /> 上传图片
                                </Button>
                            </Upload>
                        </Col>
                        <Col span={4}>
                            <Tag style={{marginTop: 5}} color="#f50" onClick={()=>{_this.next()}}>下一步</Tag>
                        </Col>
                    </Row>
                </div>
            )
        }, {
            title: '上传Excel',
            content: (
                <div style={{marginTop:20}}>
                    <Row type="flex" justify="center">
                        <Col span={12}>
                            <Upload
                                name='source'
                                action={IP + '/resource/'}
                                {...props}
                            >
                                <Button>
                                    <Icon type="upload" /> 上传Excel
                                </Button>
                            </Upload>
                        </Col>
                        <Col span={4}>
                            <Tag style={{marginTop: 5}} color="#f50" onClick={()=>{_this.prev()}}>返回上一步</Tag>
                        </Col>
                    </Row>
                </div>
            )
        }];
        let {current} = this.state;
        return(

            <div>
                <Divider>上传格式说明</Divider>
                <Alert message="1.请先上传图片再上传Excel" type="success" />
                <br/>
                <Alert message="2.图片命名应该与Excel里的图片命名一致" type="error" />
                <br/>
                <Alert
                    message="3.原薄片Excel表头格式:图片--地区--井号--年代地层-
                                -岩石地层--偏光类型--岩性--深度--组分特征--古生物特征--岩性特征--孔缝特征"
                    type="info"
                />
                <br/>
                <Alert
                    message="4.分析后薄片Excel表头格式:原图片--分析类型--分析后图片--孔隙度占比-
                                -有机孔占比--有机孔长轴均值--有机短轴均值--有机孔轴比均值--粒间孔占比--粒间孔长轴均值--粒间短孔均值--粒间孔轴比均值
                                --粒内孔占比--粒内孔长轴均值--粒内孔短轴均值--粒内孔轴比均值--裂隙占比--裂隙宽度均值"
                    type="warning"
                />
                <Divider>开始上传</Divider>
                <Collapse
                    defaultActiveKey={['1']}
                    accordion
                >
                    <Panel header="原薄片上传" key="1">
                        <Steps
                            current={current}
                            size="small"
                        >
                            {steps.map(item => <Step key={item.title} title={item.title} />)}
                        </Steps>
                        <div className="steps-content">{steps[current].content}</div>
                    </Panel>
                    <Panel header="分析后薄片上传" key="2">
                        <Steps
                            current={current}
                            size="small"
                        >
                            {steps.map(item => <Step key={item.title} title={item.title} />)}
                        </Steps>
                        <div className="steps-content">{steps[current].content}</div>
                    </Panel>
                </Collapse>

            </div>
        )
    }
}
export default AddAll
