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

  initPy() {
    const { option={} } = this.props //外部传入的data数据
    let yyChart = echarts.init(this.ID) //初始化echarts
    let tqsData = [];
    
    //设置options
    yyChart.setOption(option)
    window.onresize = function() {
      yyChart.resize()
    }
  }
  
  componentDidMount() {
    this.initPy()
    //dc-
     // this.chartIt();  //29-09-2021 added by DavidC
  }
  
  componentDidUpdate() {
    this.initPy()
    //dc-
     // this.chartIt();  //29-09-2021 added by DavidC
  }

/*
  componentDidMount() {
    this.initPie()
  }
  
  componentDidUpdate() {
    this.initPie()
  }
*/
  
  render() {
    const { width="100%", height="300px" } = this.props
    return <div ref={ID => this.ID = ID} style={{width, height}}></div>
  }
}


/*
REF CODE -  https://www.gushiciku.cn/pl/gWKE/zh-tw
```
class App extends Component { // 初始化狀態 
    state = {
        sourceData: [],
    };
    async componentDidMount() {
        let data = [];
        for (let i = 0; i <= 100; i++) {//根據公式,生成繪製在圖上的座標資料來源陣列
            let theta = i / 100 * 360;
            let r = 5 * (1 + Math.sin(theta / 180 * Math.PI));
            data.push([r, theta]);
        }
        this.setState(() => {
            return {
                sourceData: data//更新react元件的state資料
            };
        });
        // 初始化Echarts例項，將其掛載到id為main的dom元素上展示  
        let myChart = echarts.init(document.getElementById("main"));
        // 繪製Echarts例項所需要的資料
        myChart.setOption({
                title: {
                    text: '極座標雙數值軸'
                },
                legend: {
                    data: ['line']
                },
                polar: {},
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross'
                    }
                },
                angleAxis: {
                    type: 'value',
                    startAngle: 0
                },
                radiusAxis: {
                },
                series: [{
                    coordinateSystem: 'polar',//極座標圖
                    name: 'line',
                    type: 'line',
                    data: data //根據已生成的座標陣列來繪製愛心圖形
                }]
            }
        );
    }
    render() {//渲染需要陳放Echart例項的容器元素
            return <div id = "main" style = { {  width: 1000, height: 600 }}> </div>; 
    }
}
export default App; 
```




















*/