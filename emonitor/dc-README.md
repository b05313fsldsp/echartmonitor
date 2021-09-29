### dc- develop journey
day - 29/09/2021

- to add a function for dynamic fetch and get the data array and return data for echart option for line chart usage.

a. getData - func_a() - function for dynamic fetch and get the data array

```


	getData = async () => { a. b. c. }
    a.    
        const response = await fetch(globalConfirmed);
        const data = await response.text();
    b.
    	// Get x-axis Labels
        let dates = data.trim().split('\n').slice(0, 1)[0].split(',').slice(4)
        this.setState({ dates: this.formatDates(dates) }); //??
    c.
    	// parse table

```



b. chartIt - 

```
    chartIt = async () => {
        await this.getData();
        // const ctx = document.getElementById('chart').getContext('2d');
        let arrMapKeys = Object.keys(this.state.arrMap);

        arrMapKeys.forEach(key => {
            let i = 0;
            for (i; i < this.state.arrMap[key]["x"].length; i++) {
                if (this.state.arrMap[key]["x"][i] >= 100) {
                    break;
                }
            }
            this.state.arrMap[key]["dates"] = this.state.arrMap[key]["dates"].slice(i);
            this.state.arrMap[key]["x"] = this.state.arrMap[key]["x"].slice(i);
            let updatedCases = this.calcWeeklyNewCases(this.state.arrMap[key]["x"]).map((cases) => {
                if (cases === 0) {
                    return 1;
                }
                return cases;
            })
            this.state.arrMap[key]["y"] = updatedCases;
            this.state.arrMap[key]["x,y"] = this.mergeXY(this.state.arrMap[key]["x"], this.state.arrMap[key]["y"]);
        })


        const dataSets = [];
        for (let i = 0; i < arrMapKeys.length; i++) {
            let newDataSet = {};
            newDataSet["name"] = i18next.t("homePage:country." + arrMapKeys[i]);
            newDataSet["z"] = arrMapKeys[i] === "AU" ? 3 : arrMapKeys[i] === "US" ? 1 : 2;
            newDataSet["type"] = "line";
            newDataSet["smooth"] = true;
            newDataSet["symbol"] = "diamond";
            newDataSet["sampling"] = "average";
            newDataSet["itemStyle"] = {
                color: this.props.countryColours[arrMapKeys[i]].backgroundColor
            };
            newDataSet["data"] = this.state.arrMap[arrMapKeys[i]]["x,y"].map((val, index) => {
                if (this.state.arrMap[arrMapKeys[i]]["x,y"].length - 1 === index) {
                    return {
                        name: this.state.dates[(this.state.dates.length - 1) - (this.state.arrMap[arrMapKeys[i]]["x,y"].length - 1) + index],
                        value: val,
                        symbolSize: 8,
                        label: {
                            show: true,
                            formatter: '{a}'
                        }
                    };
                } else {
                    return {
                        name: this.state.dates[(this.state.dates.length - 1) - (this.state.arrMap[arrMapKeys[i]]["x,y"].length - 1) + index],
                        value: val,
                        symbolSize: 1
                    };
                }
            });

            dataSets.push(newDataSet);
        }
        this.setState({ dataSets: dataSets });

    }

``` 

c. 

``` EChartGlobalLog.js
    componentDidMount() {
        this.chartIt();
       
    }


    render() {
        return (
            <div className="card">

```










### react16.5.0实现echarts4模块化加载

**我们真的需要react-echarts插件吗？**

## NO

**注意：该项目仅作为源码学习使用，不能采取npm install --save react-echarts-modules的方式导入你的项目，因为这不是一个插件！！**

**在这里，我使用echarts提供的模块化加载方式，实现了几个react-echarts图表组件**

**你可以打开控制台，观察每个图表组件的加载情况。**

#### 插件版本号

```json
  "echarts": "4.1.0",
  "react": "16.5.0",
  "react-dom": "16.5.0"
```

#### 实现了哪些图表组件

1、饼图

2、柱状图

3、折线图

4、散点图

5、地图

6、雷达图

7、k线图


#### echarts体积太大，使用模块化加载

以柱状图为例子，我们根据需要渲染的插件采取模块导入，不渲染的组件不导入，最大程度减小js。

```javascript
import echarts from 'echarts/lib/echarts' //必须
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/grid'
import 'echarts/lib/chart/bar'
```

#### 组件化开发的福音，react组件模块化加载

demo中采用单个echarts组件异步打包加载的模式，因为echarts组件普遍偏大，即使压缩也效果不明显，所以异步加载是最好的方式。

```javascript
import { pieOption, barOption, lineOption, scatterOption, mapOption, radarOption, candlestickOption } from './optionConfig/options'
const PieReact = asyncComponent(() => import(/* webpackChunkName: "Pie" */'./EchartsDemo/PieReact'))  //饼图组件
const BarReact = asyncComponent(() => import(/* webpackChunkName: "Bar" */'./EchartsDemo/BarReact')) //柱状图组件
const LineReact = asyncComponent(() => import(/* webpackChunkName: "Line" */'./EchartsDemo/LineReact'))  //折线图组件
const ScatterReact = asyncComponent(() => import(/* webpackChunkName: "Scatter" */'./EchartsDemo/ScatterReact'))  //散点图组件
const MapReact = asyncComponent(() => import(/* webpackChunkName: "Map" */'./EchartsDemo/MapReact'))  //地图组件
const RadarReact = asyncComponent(() => import(/* webpackChunkName: "Radar" */'./EchartsDemo/RadarReact')) //雷达图组件
const CandlestickReact = asyncComponent(() => import(/* webpackChunkName: "Candlestick" */'./EchartsDemo/CandlestickReact')) //k线图组件
```

### 启动项目

```npm
npm install
```

```npm
npm start
```

### 打包项目

```npm
npm run build
```

### 实现方案介绍

1、每个图表单独封装成一个组件，通过参数传递数据，你会发现，图表内部代码几乎完全一样，只有import的类型不同。

2、异步加载是提高图表加载性能的最佳方式，不管是服务端还是客户端渲染。

3、在这些demo中，我认为对你来说最有价值的是react组件异步加载模式，很多人异步加载组件是通过拆分路由的方式，而非路由组件的异步加载，并不多人去尝试。但我想告诉你的是，
非路由组件的异步加载会将你的庞大的父组件拆分的更细，体积更小，加载的更加流畅。

4、有时候，我会看到有些人把echarts打包到公共js文件里面，如果你的首屏不需要用到它，完全没有必要这样做。

### 附echarts各个模块导出路径

```javascript
/**
 * 导出echarts主模块
 */
module.exports = require('./lib/echarts');

// 各子模块路径
require('./lib/chart/line');
require('./lib/chart/bar');
require('./lib/chart/pie');
require('./lib/chart/scatter');
require('./lib/chart/radar');

require('./lib/chart/map');
require('./lib/chart/treemap');
require('./lib/chart/graph');
require('./lib/chart/gauge');
require('./lib/chart/funnel');
require('./lib/chart/parallel');
require('./lib/chart/sankey');
require('./lib/chart/boxplot');
require('./lib/chart/candlestick');
require('./lib/chart/effectScatter');
require('./lib/chart/lines');
require('./lib/chart/heatmap');
require('./lib/chart/pictorialBar');
require('./lib/chart/themeRiver');
require('./lib/chart/custom');

require('./lib/component/graphic');
require('./lib/component/grid');
require('./lib/component/legend');
require('./lib/component/tooltip');
require('./lib/component/axisPointer');
require('./lib/component/polar');
require('./lib/component/geo');
require('./lib/component/parallel');
require('./lib/component/singleAxis');
require('./lib/component/brush');
require('./lib/component/calendar');

require('./lib/component/title');

require('./lib/component/dataZoom');
require('./lib/component/visualMap');

require('./lib/component/markPoint');
require('./lib/component/markLine');
require('./lib/component/markArea');

require('./lib/component/timeline');
require('./lib/component/toolbox');

require('zrender/lib/vml/vml');

```
