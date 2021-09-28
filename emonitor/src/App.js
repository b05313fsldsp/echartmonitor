import React, { Component } from 'react';
import asyncComponent from './AsyncComponent'
// import { pieOption, barOption, lineOption, scatterOption, mapOption, radarOption, candlestickOption } from './optionConfig/options'
const PieReact = asyncComponent(() => import(/* webpackChunkName: "Pie" */'./EchartsDemo/PieReact'))  //饼图组件
const BarReact = asyncComponent(() => import(/* webpackChunkName: "Bar" */'./EchartsDemo/BarReact')) //柱状图组件
const LineReact = asyncComponent(() => import(/* webpackChunkName: "Line" */'./EchartsDemo/LineReact'))  //折线图组件
const ScatterReact = asyncComponent(() => import(/* webpackChunkName: "Scatter" */'./EchartsDemo/ScatterReact'))  //散点图组件
const MapReact = asyncComponent(() => import(/* webpackChunkName: "Map" */'./EchartsDemo/MapReact'))  //地图组件
const RadarReact = asyncComponent(() => import(/* webpackChunkName: "Radar" */'./EchartsDemo/RadarReact')) //雷达图组件
const CandlestickReact = asyncComponent(() => import(/* webpackChunkName: "Candlestick" */'./EchartsDemo/CandlestickReact')) //k线图组件

//dc-
//折线图数据
export const lineOption = {
  title: {
    text: '堆叠区域图'
  },
  tooltip : {
    trigger: 'axis',
    axisPointer: {
      type: 'cross',
      label: {
        backgroundColor: '#6a7985'
      }
    }
  },
  legend: {
    data:['a','b','c','d','e']
  },
  toolbox: {
    feature: {
      saveAsImage: {}
    }
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis : [
    {
      type : 'category',
      boundaryGap : false,
      data : ['t1','t2','t3','t4','t5','t6','t7']
    }
  ],
  yAxis : [
    {
      type : 'value'
    }
  ],
  series : [
    {
      name:'a',
      type:'line',
      stack: 'total',
      areaStyle: {normal: {}},
      // data:[120, 132, 101, 134, 90, 230, 210] // [{ name: "Female", type: "line" }]
      data:[{ name: "Tqs", type: "line" }]
    },
/*
    {
      name:'a',
      type:'line',
      stack: 'total',
      areaStyle: {normal: {}},
      data:[120, 132, 101, 134, 90, 230, 210]
    },

    {
      name:'b',
      type:'line',
      stack: 'total',
      label: {
        normal: {
          show: true,
          position: 'top'
        }
      },
      areaStyle: {normal: {}},
      data:[820, 932, 901, 934, 1290, 1330, 1320]
    }
*/
  ]
};


class App extends Component {
  render() {
    return (
      <div>
        
        <h2>TQS Data Dynamic Monitoring</h2>
        <LineReact option={lineOption} />
        <hr/>

        <h2>TQS Data Dynamic Monitoring - 2</h2>
        <LineReact option={lineOption} />
        <hr/>
  
      </div>
    );
  }
}

export default App;
