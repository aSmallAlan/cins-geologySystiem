import React from 'react';
import {Layout, Menu, Breadcrumb, Icon, Progress, Row, Col, Card, Upload, Modal} from 'antd'
import PieChart from '../../Components/PieChart'
import BarChart from '../../Components/BarChart'
import './style.less'


const {Header, Content} = Layout;
class AnalyzePage extends React.Component{
    constructor(props){
        super(props);
        this.handlePreview = this.handlePreview.bind(this);
        this.handleImageLoaded = this.handleImageLoaded.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.state = {
            current: 'SliceAnalyze',
            progress: 0,
            //加载中显示状态
            loadingDisplay: 'block',
            isImageLoad: true,
            fileList: [],
            previewVisible: false,
            previewImage: '',
            //数据显示状态
            messageDisplay: 'none'
        }

    }

    componentDidMount(){
        let _this = this;
        let timer = setInterval(function () {
            let nowProgress = _this.state.progress
            _this.setState({
                progress: nowProgress+10
            });
            if (_this.state.progress >= 100){
                _this.setState({
                    loadingDisplay: 'none',
                    messageDisplay: 'block'
                });
                clearInterval(timer)
            }
        },300);

    }

    //----------------图片预览------------
    handlePreview(file){
        this.setState({
            previewImage: file.url || file.thumbUrl,
            previewVisible: true,
        });
    };
    handleImageLoaded(){
        this.setState({
            isImageLoad: false
        })
    }
    handleCancel(){
        this.setState({
            previewVisible: false
        });
    }
    //------------------------------------

    //浏览器回退
    changeMenu(){
        window.history.back()
    }
    render(){
        let fileList = [{
            uid: '-1',
            name: 'xxx.png',
            status: 'done',
            url: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
        }];
        const { previewVisible, previewImage } = this.state;
        return(
            <div id="analyzePage">
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
                        <Breadcrumb.Item>
                            <span>算法分析</span>
                        </Breadcrumb.Item>
                    </Breadcrumb>
                    <div className="progress-container" style={{display: this.state.loadingDisplay}}>
                        <Progress type="circle" percent={this.state.progress} />
                    </div>
                    <div className="chart-container" style={{display: this.state.messageDisplay}}>
                        <div className="pie-container">
                            <PieChart data={[
                                {value:335, name:'有机孔'},
                                {value:310, name:'粒间孔'},
                                {value:1548, name:'缝'},
                                {value:234, name:'粒内孔'}
                            ]}/>
                            <div className="card-container">
                                <div className="card">
                                    <Upload
                                        action="嘻嘻"
                                        listType="picture-card"
                                        fileList={fileList}
                                        onPreview={this.handlePreview}
                                    >
                                    </Upload>
                                    <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                                        <img alt="example" style={{ width: '100%' }} src={previewImage} onLoad={this.handleImageLoaded}/>
                                    </Modal>
                                </div>
                                <div className="card">
                                    <Upload
                                        action="嘻嘻"
                                        listType="picture-card"
                                        fileList={fileList}
                                        onPreview={this.handlePreview}
                                    >
                                    </Upload>
                                    <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                                        <img alt="example" style={{ width: '100%' }} src={previewImage} onLoad={this.handleImageLoaded}/>
                                    </Modal>
                                </div>
                            </div>
                        </div>
                        <div className="bar-container">
                            <Row>
                                <div className="card">
                                    <BarChart
                                        title="有机质孔等效直径分布"
                                    />
                                </div>
                                <div className="card">
                                    <BarChart
                                        title="有机质孔等效直径分布"
                                    />
                                </div>
                            </Row>
                            <Row>
                                <div className="card" style={{marginTop: 50}}>
                                    <BarChart
                                        title="粒内孔等效直径分布"
                                    />
                                </div>
                                <div className="card">
                                    <BarChart
                                        title="粒间孔等效直径分布"
                                    />
                                </div>
                            </Row>
                        </div>
                    </div>
                </Content>
            </div>
        )
    }
}
export default AnalyzePage;
