import React, {Component} from "react";
import Chart from "react-google-charts";
import './../css/LineChart.css';
import moment from 'moment';

let newChartState = [];



class LineChart extends Component {

  constructor(props){
    super(props);

    this.state = {

       myChartData: [],
       lineColor: "#f783ac"

    }


  }


  componentDidMount() {

    //update the chart
    this.updateChart();

  }



  componentDidUpdate(prevProps){


    //update the chart and set line color if anything changed
    if (this.props.lineGraphArray !== prevProps.lineGraphArray) {

      this.updateChart();

      this.setState({lineColor: this.props.lineColor})


    }


  }




updateChart(){

  // alert(this.props.tooltipText);

  newChartState[0] = 
  [
    { type: 'string', label: 'x' },
    { type: 'number', label: this.props.tooltipText },
    // { type: 'string', role: 'tooltip' },

  ]

  

//set days of chart
  for (let i = 1; i <= 7; i++) {


    // newChartState[i] = [moment().day(i-5).format("ddd"), this.props.lineGraphArray[i-1], this.props.lineGraphArray[i-1]  + " Steps"];
    newChartState[i] = [moment().add((i -1), 'days').format("ddd"), this.props.lineGraphArray[i-1]];
  
  
  }
  
  
  
  //update the state of chart
  this.setState({myChartData: newChartState})
  


}



    render(){


        return (




 
 <div className = "chartHolder">  
<Chart

    chartType="LineChart"
    graphID="lineChart"
    data={this.state.myChartData}
    options={{
      fontName: 'Poppins',
      fontSize: '12',
      colors: [this.state.lineColor],
      backgroundColor: {
        fill: 'transparent'
      },
      pointSize: 2,
      legend: {
        position: 'none'
      },
      animation:{
        duration: 1000,
        easing: 'out'
      },




      tooltip: { textStyle: { fontName: 'Poppins', fontSize: 13, isHtml: true } },

      curveType: 'function',
      vAxis: {
        baselineColor: 'none',
        ticks: [],
        gridlines: {
          color: 'transparent'
        }
      },
      hAxis: {
        baselineColor: 'none',
        textStyle: {
            color: '#FFFFFF'
        },

        gridlines: {
          color: 'transparent'
        }
      }
    }}
  />

  
 </div>


        )


    }


};


export default LineChart;