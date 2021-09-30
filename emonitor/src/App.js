//dc- Hook
import React, { useState, useEffect } from "react";
import asyncComponent from './AsyncComponent'
//dc-
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

//dc-
//  const response = await fetch("http://localhost:8081/api/tqs");
//  const tqs = await response.json();

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
      name:'c',
      type:'line',
      stack: 'total',
      areaStyle: {normal: {}},
      // data:[120, 132, 101, 134, 90, 230, 210] // [{ name: "Female", type: "line" }]
      data: getData // [{item.SPN1761}]  //fetchTqsJSON
    },
/*
    {
      name:'a',
      type:'line',
      stack: 'total',
      areaStyle: {normal: {}},
      data:[120, 132, 101, 134, 90, 230, 210, 132, 101, 134, 90, 132, 101, 134, 90, 132, 101, 134, 90]
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

/* 

//
  var schema = mongoose.Schema(
    {
      title: String,
      SN: String,
      CANID: String,
      SPN1761: Number,
      TTIMESTAMP: Number,
      createdAt:String

    }
  );


//dc- 

const tqsData = {
 prop1: 'title',
 prop1: 'SN',
 prop1: 'CANID',
 prop1: 'SPN1761',
 prop1: 'TTIMESTAMP',
 prop1: 'createdAt'

};

const { title, SN, CANID, SPN1761, TTIMESTAMP, createdAt } = tqsData;

console.log(SPN1761);  // 'SPN1761'





//javascript deconstruct object-

const objA = {
 prop1: 'foo',
 prop2: {
   prop2a: 'bar',
   prop2b: 'baz',
 },
};

// Deconstruct nested props
const { prop1, prop2: { prop2a, prop2b } } = objA;

console.log(prop1);  // 'foo'
console.log(prop2a); // 'bar'
console.log(prop2b); // 'baz'
*/

async function getData() {
  const response = await fetch("http://localhost:8081/api/tqs");
  const tqsData = await response.text();

  /*
    const tqsData = {
     prop1: 'title',
     prop1: 'SN',
     prop1: 'CANID',
     prop1: 'SPN1761',
     prop1: 'TTIMESTAMP',
     prop1: 'createdAt'
     
    };
  */
    // const { title, SN, CANID, SPN1761, TTIMESTAMP, createdAt } = tqsData;

    console.log(`current tqs is ${tqsData}`);  // 'SPN1761'
  
    return {SPN1761};
}

async function fetchTqsJSON() {
  const response = await fetch("http://localhost:8081/api/tqs");
  const tqs = await response.json();
  // console.log(`current tqs is ${tqs}`);

  return tqs;
}

const App = () => {

 //dc-
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [api, setApi] = useState([]);


  useEffect(() => {
  //fetch("http://10.3.1.194:8081/api/tqs")
  //.then(res => res.json())
  fetchTqsJSON().then(
  (response ) => {
  setIsLoaded(true);
  setApi(response );
  },
  // Note: it's important to handle errors here
  // instead of a catch() block so that we don't swallow
  // exceptions from actual bugs in components.
  (error) => {
  setIsLoaded(true);
  setError(error);
  }
  )
  }, [])

  useEffect(() => {
  getData();}
  )

  // dc-qq
  // console.log(`current tqs is ${api.map(1)}`);


  //dc--

    return (

    <div className="app">
         <ul>
          {api.map(item => (
          <li key={item.id}>
          {item.SN}

          <p/>
          {item.SPN1761}
         </li>
         ))}
         </ul>
         <ul>
          {api.map(item => (
          <li key={item.id}>
          {item.SN}
          <p/>
          {item.SPN1761}
         </li>
         ))}
         </ul>

  
        <h2>TQS Data Dynamic Monitoring</h2>
        <LineReact option={lineOption} />
        <hr/>
        <h2>TQS Data Dynamic Monitoring - 2</h2>
        <LineReact option={lineOption} />
        <hr/>
      
    </div>
    );

};

export default App;
