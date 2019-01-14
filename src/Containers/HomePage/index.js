import React from 'react'
import { Menu, Layout, Carousel, Button } from 'antd';
import firstImgUrl from '../../Static/image/homePageBanner1.jpg';
import secondImgUrl from '../../Static/image/homePageBanner2.jpg'
import './style.less'

const {Header, Content, Footer} = Layout;


class HomePage extends React.Component{
    constructor(props){
        super(props);
        this.changeMenu = this.changeMenu.bind(this);
        this.handleScroll = this.handleScroll.bind(this);
        this.changeCarousel = this.changeCarousel.bind(this);
        this.state = {
            current: 'SliceAnalyze',
            screensHeight: null
        }
    }

    componentDidMount(){
        //填满整个屏幕
        let screenHeight = document.querySelector('body').offsetHeight;
        let node = document.getElementsByClassName("slick-list");
        console.log(node)
        this.setState({
            screensHeight: screenHeight
        })
    }

    //切换menu状态并改变轮播图
    changeMenu(e){
        let key = e.key;
        this.setState({
            current: key
        });

        //切换轮播图
        if (key === 'SliceAnalyze'){
            this.refs.carousel.goTo(0)
        }else{
            this.refs.carousel.goTo(1);
        }

    }

    //滑轮滚动切换轮播图
    handleScroll(e){
        let carouselDom = this.refs.carousel;
        if (e.nativeEvent.deltaY <= 0) {
            carouselDom.prev()
        } else {
            carouselDom.next()
        }
    }

    //轮播图切换改变menu的状态
    changeCarousel(current){
        if (current === 0){
            this.setState({
                current: 'SliceAnalyze'
            });
        } else if (current === 1) {
            this.setState({
                current: 'NowAnalyze'
            })
        }
    }

    render(){
        return(
            <div id="homePage"  onWheel={(e) => this.handleScroll(e)}>
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
                            <Menu.Item key="NowAnalyze">
                                现状分析
                            </Menu.Item>
                        </Menu>
                    </Header>
                    <Content>
                        {/*轮播图*/}
                        <Carousel
                            vertical
                            ref='carousel'
                            height="99%"
                            afterChange={this.changeCarousel}
                        >
                            <div style={{height: 100}}>
                                <img src={firstImgUrl} alt="" style={{border:3, width: '100%', height: this.state.screensHeight-68, float: 'left'}}/>
                                <div className='sliceButton-container'>
                                    <div className='inner-container'>
                                        <h1 style={{color: 'white'}}>岩心薄片分析</h1>
                                        <p>
                                            岩心分析技术是一项基础性的工作, 在地质勘探和
                                            油藏开发当中具有重要的地位。 通过岩心分析可以
                                            得到指定区域内的地层特征, 矿物成分, 孔隙结构
                                            特征等信息, 能够对潜在的敏感性因素进行评估, 能
                                            够以此制定一系列油气层保护方案和措施, 能够使油
                                            气层保护工作更好的进行。
                                        </p>
                                        <div>
                                            <Button type="dashed" ghost onClick={()=>{this.props.history.push('/operateSelect') }}>进入</Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <img src={secondImgUrl} alt="" style={{width: '100%', height: this.state.screensHeight-68, float: 'left'}}/>
                                <div className='sliceButton-container'>
                                    <div className='inner-container'>
                                        <h1 style={{color: 'white'}}>现状分析</h1>
                                        <p>
                                            薄片分析技术是岩心分析最基础的分析技术, 需要
                                            使用光学显微镜对薄片进行观察。薄片分析对制片
                                            技术有一定要求,首先应使用铸体薄片, 其次制片厚度
                                            为0.03mm , 最后制片面积应大于15mm x 15mm 。分
                                            析内容主要包括制片分析、成岩变化分析、自生矿物分析
                                            、孔隙特征分析等。薄片分析技术具有常规性、基础性和
                                            不可替代性等特点。
                                        </p>
                                        <div>
                                            <Button type="dashed" ghost>进入</Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Carousel>
                    </Content>
                </Layout>
            </div>
        )
    }
}

export default HomePage;
