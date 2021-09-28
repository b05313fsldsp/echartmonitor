# D:\echartmonitor\emonitor
## D:\R\react-echarts-modules\src\EchartsDemo

D:\echartmonitor\emonitor\src
├── App.css
├── App.js
├── App.test.js
├── AsyncComponent.js
├── EchartsDemo
├── index.css
├── index.js
├── logo.svg
├── optionConfig
└── registerServiceWorker.js

## App.js
```
        <LineReact option={lineOption} />
```
const LineReact = asyncComponent(() => import(/* webpackChunkName: "Line" */'./EchartsDemo/LineReact'))  //折线图组件

##  LineReact.js
```
/**
 * Created by yongyuehuang on 2017/8/5.
 */
import React from 'react'
import echarts from 'echarts/lib/echarts' //必须
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/grid'
import 'echarts/lib/chart/line'

export default class LineReact extends React.Component {
  
  constructor(props) {
    super(props)
    this.initPie = this.initPie.bind(this)
  }
  
  initPie() {
    const { option={} } = this.props //外部传入的data数据
    let myChart = echarts.init(this.ID) //初始化echarts
    
    //设置options
    myChart.setOption(option)
    window.onresize = function() {
      myChart.resize()
    }
  }
  
  componentDidMount() {
    this.initPie()
  }
  
  componentDidUpdate() {
    this.initPie()
  }
  
  render() {
    const { width="100%", height="300px" } = this.props
    return <div ref={ID => this.ID = ID} style={{width, height}}></div>
  }
}
```

## option.js
```
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
    data:['邮件营销','联盟广告','视频广告','直接访问','搜索引擎']
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
      data : ['周一','周二','周三','周四','周五','周六','周日']
    }
  ],
  yAxis : [
    {
      type : 'value'
    }
  ],
  series : [
    {
      name:'邮件营销',
      type:'line',
      stack: '总量',
      areaStyle: {normal: {}},
      data:[120, 132, 101, 134, 90, 230, 210]
    },
    {
      name:'联盟广告',
      type:'line',
      stack: '总量',
      areaStyle: {normal: {}},
      data:[220, 182, 191, 234, 290, 330, 310]
    },
    {
      name:'视频广告',
      type:'line',
      stack: '总量',
      areaStyle: {normal: {}},
      data:[150, 232, 201, 154, 190, 330, 410]
    },
    {
      name:'直接访问',
      type:'line',
      stack: '总量',
      areaStyle: {normal: {}},
      data:[320, 332, 301, 334, 390, 330, 320]
    },
    {
      name:'搜索引擎',
      type:'line',
      stack: '总量',
      label: {
        normal: {
          show: true,
          position: 'top'
        }
      },
      areaStyle: {normal: {}},
      data:[820, 932, 901, 934, 1290, 1330, 1320]
    }
  ]
};

