import React from 'react'
import './style.less'
import echarts from '../../../node_modules/echarts/lib/echarts';
import '../../../node_modules/echarts/lib/chart/bar'
import '../../../node_modules/echarts/lib/component/title'

class BarChart extends React.Component{
    constructor(props){
        super(props);
        this.setOption = this.setOption.bind(this);
        this.initBarChart = this.initBarChart.bind(this);
    }
    componentDidMount(){
        this.initBarChart()
    }

    initBarChart(){
        const { data, title } = this.props;
        let myChart = echarts.init(this.refs.barChart);
        let options = this.setOption(data, title);
        myChart.setOption(options)
    }

    setOption(data,title) {
        return {
            title: {
                text: title
            },
            tooltip: {},
            xAxis: {
                data: ["1","2","3","4","5","6","7","8","9"]
            },
            itemStyle: {
                normal: {
                  color: ['#3398DB']
                }
            },
            legend: {
                data: ['等效直径(微米)'],
                x: 30, // 'center' | 'left' | {number},
                y: 20, // 'center' | 'bottom' | {number}

            },
            yAxis: {},
            series: [{
                name: '销量',
                radius : '60%',
                center: ['50%', '50%'],
                type: 'bar',
                data: ["35","10","3","2","3","0","30","0","5"]
            }]
        }
    }
    render(){
        return(
            <div id="barChart">
                <div ref="barChart" style={{width: "230px", height: "300px"}}></div>
            </div>
        )
    }
}
export default BarChart
