import React from 'react'
import echarts from '../../../node_modules/echarts/lib/echarts';
import '../../../node_modules/echarts/lib/chart/pie'
import '../../../node_modules/echarts/lib/component/title'

class PieChart extends React.Component{
    constructor(props){
        super(props);
        this.setOption = this.setOption.bind(this);
        this.initPieChart = this.initPieChart.bind(this);
    }
    componentDidMount(){
        this.initPieChart()
    }

    initPieChart(){
        const { data } = this.props;
        let myChart = echarts.init(this.refs.pieChart);
        let options = this.setOption(data);
        myChart.setOption(options)
    }

    setOption(data) {
        return {
            title : {
                text: '孔分析图',
                x:'center'
            },
            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                orient: 'vertical',
                left: 'left',
                data: ['有机孔','粒间孔','缝','粒内孔']
            },
            series : [
                {
                    name: '所占比',
                    type: 'pie',
                    radius : '80%',
                    center: ['50%', '50%'],
                    data: data,
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        }
    }

    render(){
        return(
            <div id="pieChart-container">
                <div ref="pieChart" style={{width: "500px", height: "400px"}}></div>
            </div>
        )
    }
}
export default PieChart
