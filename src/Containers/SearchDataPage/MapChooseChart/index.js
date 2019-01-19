import React from 'react'
import {Modal} from 'antd'
import { connect } from 'react-redux';
import WellChooseBox from '../../../Components/WellChooseTable'
// 引入 ECharts 主模块
import echarts from '../../../../node_modules/echarts/lib/echarts';
import  '../../../../node_modules/echarts/lib/chart/scatter';
import  '../../../../node_modules/echarts/lib/chart/effectScatter';
import  '../../../../node_modules/echarts/lib/chart/custom';
import '../../../../node_modules/echarts/lib/chart/map'
import '../../../../node_modules/echarts/dist/extension/bmap'
// 引入提示框和标题组件
import '../../../../node_modules/echarts/lib/component/tooltip';
import '../../../../node_modules/echarts/lib/component/title';
import {getInitialMaps} from "../../../Fetch/fetchGetMap";


class MapChooseChart extends React.Component{
    constructor(props){
        super(props);
        this.showDrawer = this.showDrawer.bind(this);
        this.onClose = this.onClose.bind(this);
        this.state = {
            renderBox: null,
            visible: false
        }
    }

    //打开抽屉
    showDrawer(){
        this.setState({
            visible: true,
        });
    };

    //关闭抽屉
    onClose(){
        this.setState({
            visible: false,
        });
    };

    componentDidMount() {
        this.props.onRef(this)
        //获取地图显示的初始值
        let _this = this;
        let mapList = getInitialMaps();
        mapList.then(res=>{
            return  res.json()
        }).then(res=> {
            let data = [
                {name: '武汉', value: 273},
                {name: '大庆', value: 279},
                {name: '成都', value: 300}
            ];

            let geoCoordMap = {
                '武汉':[114.31,30.52],
                '大庆':[125.03,46.58],
                '成都': [104.06, 30.67]
            };

            let convertData = function (data) {
                let res = [];
                for (let i = 0; i < data.length; i++) {
                    let geoCoord = geoCoordMap[data[i].name];
                    if (geoCoord) {
                        res.push({
                            name: data[i].name,
                            value: geoCoord.concat(data[i].value)
                        });
                    }
                }
                return res;
            };

            let option = {
                // backgroundColor: '#404a59',
                title: {
                    text: '全国地区井号',
                    left: 'center',
                    textStyle: {
                        color: '#fff'
                    }
                },
                tooltip : {
                    trigger: 'item',
                    formatter: function (params){
                        return params.data.name + '<br/>' + '当前拥有的井数:' + params.data.value[2]
                    }
                },
                bmap: {
                    center: [104.06, 30.67],
                    zoom: 7,
                    roam: true,
                    mapStyle: {
                        styleJson: [
                            {
                                "featureType": "water",
                                "elementType": "all",
                                "stylers": {
                                    "color": "#044161"
                                }
                            },
                            {
                                "featureType": "land",
                                "elementType": "all",
                                "stylers": {
                                    "color": "#004981"
                                }
                            },
                            {
                                "featureType": "boundary",
                                "elementType": "geometry",
                                "stylers": {
                                    "color": "#064f85"
                                }
                            },
                            {
                                "featureType": "railway",
                                "elementType": "all",
                                "stylers": {
                                    "visibility": "off"
                                }
                            },
                            {
                                "featureType": "highway",
                                "elementType": "geometry",
                                "stylers": {
                                    "color": "#004981"
                                }
                            },
                            {
                                "featureType": "highway",
                                "elementType": "geometry.fill",
                                "stylers": {
                                    "color": "#005b96",
                                    "lightness": 1
                                }
                            },
                            {
                                "featureType": "highway",
                                "elementType": "labels",
                                "stylers": {
                                    "visibility": "off"
                                }
                            },
                            {
                                "featureType": "arterial",
                                "elementType": "geometry",
                                "stylers": {
                                    "color": "#004981"
                                }
                            },
                            {
                                "featureType": "arterial",
                                "elementType": "geometry.fill",
                                "stylers": {
                                    "color": "#00508b"
                                }
                            },
                            {
                                "featureType": "poi",
                                "elementType": "all",
                                "stylers": {
                                    "visibility": "off"
                                }
                            },
                            {
                                "featureType": "green",
                                "elementType": "all",
                                "stylers": {
                                    "color": "#056197",
                                    "visibility": "off"
                                }
                            },
                            {
                                "featureType": "subway",
                                "elementType": "all",
                                "stylers": {
                                    "visibility": "off"
                                }
                            },
                            {
                                "featureType": "manmade",
                                "elementType": "all",
                                "stylers": {
                                    "visibility": "off"
                                }
                            },
                            {
                                "featureType": "local",
                                "elementType": "all",
                                "stylers": {
                                    "visibility": "off"
                                }
                            },
                            {
                                "featureType": "arterial",
                                "elementType": "labels",
                                "stylers": {
                                    "visibility": "off"
                                }
                            },
                            {
                                "featureType": "boundary",
                                "elementType": "geometry.fill",
                                "stylers": {
                                    "color": "#029fd4"
                                }
                            },
                            {
                                "featureType": "building",
                                "elementType": "all",
                                "stylers": {
                                    "color": "#1a5787"
                                }
                            },
                            {
                                "featureType": "label",
                                "elementType": "all",
                                "stylers": {
                                    "visibility": "off"
                                }
                            }
                        ]
                    }
                },
                series : [
                    {
                        name: '地区:',
                        type: 'effectScatter',
                        coordinateSystem: 'bmap',
                        data: convertData(data.sort(function (a, b) {
                            return b.value - a.value;
                        }).slice(0, 6)),
                        symbolSize: function (val) {
                            return val[2] / 10;
                        },
                        showEffectOn: 'emphasis',
                        rippleEffect: {
                            brushType: 'stroke'
                        },
                        hoverAnimation: true,
                        label: {
                            normal: {
                                formatter: '{b}',
                                position: 'right',
                                show: true
                            }
                        },
                        itemStyle: {
                            normal: {
                                color: '#f4e925',
                                shadowBlur: 10,
                                shadowColor: '#333'
                            }
                        },
                        zlevel: 1
                    }
                ]
            };
            let myChart = echarts.init(document.getElementById('MapChooseChart'));
            try{
                myChart.setOption(option)
            }catch (e) {
                console.log("")
            }
            myChart.on('click', function(params){
                _this.showDrawer();
            });
            }
        );

    }
    render(){
        return(
            <div>
                <div id="MapChooseChart" style={{ width: 'calc(80vw)', height: 'calc(70vh)' }}></div>
                <Modal title="井号选择"
                       visible={this.state.visible}
                       onOk={this.showDrawer}
                       onCancel={this.onClose}
                       footer={null}
                       width="80%"
                >
                    <WellChooseBox />
                </Modal>
            </div>
        )
    }
}

export default MapChooseChart

