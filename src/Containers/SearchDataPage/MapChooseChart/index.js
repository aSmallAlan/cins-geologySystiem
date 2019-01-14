import React from 'react'
import {Drawer} from 'antd'
import WellChooseBox from '../../../Components/WellChooseBox'

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


var data = [
    {name: '武汉', value: 273},
    {name: '大庆', value: 279},
    {name: '成都', value: 300}
];

var geoCoordMap = {
    '武汉':[114.31,30.52],
    '大庆':[125.03,46.58],
    '成都': [104.06, 30.67]
};

var convertData = function (data) {
    var res = [];
    for (var i = 0; i < data.length; i++) {
        var geoCoord = geoCoordMap[data[i].name];
        if (geoCoord) {
            res.push({
                name: data[i].name,
                value: geoCoord.concat(data[i].value)
            });
        }
    }
    return res;
};

function renderItem(params, api) {
    var coords = [
        [116.7,39.53],
        [103.73,36.03],
        [112.91,27.87],
        [120.65,28.01],
        [119.57,39.95]
    ];
    var points = [];
    for (var i = 0; i < coords.length; i++) {
        points.push(api.coord(coords[i]));
    }
    var color = api.visual('color');

    return {
        type: 'polygon',
        shape: {
            points: echarts.graphic.clipPointsByRect(points, {
                x: params.coordSys.x,
                y: params.coordSys.y,
                width: params.coordSys.width,
                height: params.coordSys.height
            })
        },
        style: api.style({
            fill: color,
            stroke: echarts.color.lift(color)
        })
    };
}

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
        formatter: function (params,ticket,callback){
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
        let _this = this;
        let myChart = echarts.init(document.getElementById('MapChooseChart'));
        try{
            myChart.setOption(option)
        }catch (e) {
            console.log("")
        }
        myChart.on('click', function(params){
            _this.setState({
                renderBox: (
                    <WellChooseBox
                        area={params.data.name}
                        wells={['第一口井','第二口井']}
                        props={_this.props.props}
                    />)
            });
            _this.showDrawer()
            console.log(params);
        });
    }
    render(){
        return(
            <div>
                <div id="MapChooseChart" style={{ width: 1200, height: 530 }}></div>
                <Drawer
                    title="请选择井号"
                    placement="right"
                    closable={false}
                    onClose={this.onClose}
                    visible={this.state.visible}
                >
                    {
                        this.state.renderBox
                    }
                </Drawer>
            </div>
        )
    }
}
export default MapChooseChart
