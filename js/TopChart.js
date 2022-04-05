import React, {Component} from "react";
import LineChart from './LineChart';
import './../css/TopChart.css';
import $ from "jquery";
import 'jquery-ui';
import 'jquery-color';


//images
import sneakers from './../icons/sneakers.png';
import heart from './../icons/heart.png';
import calories from './../icons/calories.png';


let whichChart = 1;
let colorHex;
let lineColor;
let tooltipText = "Steps";


class TopChart extends Component {



  constructor(props){
    super(props);


    this.state = {

     
      topChartTitle: "Daily Steps",
      topChartIcon: sneakers,
      stepsData: this.props.stepsData,
      heartRateData: this.props.heartRateData,
      caloriesData: this.props.caloriesData,
      whichChart: "",
      weeklyTotal: "Weekly Total: " + this.props.totalSteps + " Steps"
      

    }


  }

  componentWillMount() {

      //get steps chart ready
      this.setState({whichChart: this.state.stepsData})

  }



//next and previous arrows
  mouseOver(e) {

  
    $(e.target).animate({
      color: "#333333"

    }, 200 );


}


mouseOut(e) {


  $(e.target).animate({
    color: "#FFFFFF"

  }, 200 );


}


onClick(e){


  //change chart and set arrows as active and inactive
  if ($(e.target).hasClass("rightArrow")) {

    whichChart++;

    $(".leftArrow").addClass("active");

    

    if(whichChart === 3){
     
      $(".rightArrow").removeClass("active");
      $(".rightArrow").addClass("inactive");
      
    }

  } else if ($(e.target).hasClass("leftArrow")) {

    whichChart--;

    $(".rightArrow").addClass("active");

   

    if(whichChart === 1){
      
      $(".leftArrow").removeClass("active");
      $(".leftArrow").addClass("inactive");
     
    }

  }



  if(whichChart === 1){

    this.setState({weeklyTotal:  "Weekly Total: " + this.props.totalSteps + " Steps"})
    this.setState({whichChart: this.state.stepsData})
    this.setState({topChartTitle: "Daily Steps", topChartIcon: sneakers})
    colorHex = "#2322BD";
    lineColor = "#f783ac";
    tooltipText = "Steps";

  }else if(whichChart === 2){


    this.setState({weeklyTotal:  "Avg Heart Rate: " + this.props.avgHeartRate + " BPM"})
    this.setState({whichChart: this.state.heartRateData})
    this.setState({topChartTitle: "Avg Resting Heart Rate", topChartIcon: heart})
    colorHex = "#BD2222";
    lineColor = "#BDBD22";
    tooltipText = "Avg Heart Rate";

  }else if(whichChart === 3){

    this.setState({weeklyTotal:  "Weekly Total: " + this.props.totalCalories + " Calories"})
    this.setState({whichChart: this.state.caloriesData})
    this.setState({topChartTitle: "Calories Burned", topChartIcon: calories})
    colorHex = "#259008";
    lineColor = "#082590";
    tooltipText = "Calories Burned";

  }

  $(".topChart").animate({
    backgroundColor: colorHex,
  }, 300 );

  //animate top chart title
  $(".topChartTitle").css({opacity: "0", left: "120px"});

  $(".topChartTitle").animate({
    left: "70px",
    opacity: 1,
  }, 300 );

  //animate chart icon
  $(".topChartIcon").hide();
  $(".topChartIcon").fadeIn("slow");


  this.props.sendThemeHome(colorHex);

  // alert(tooltipText);

}






  render(){


    return (





      <div className="topChart">
        <img className="topChartIcon" src={this.state.topChartIcon} alt="sneakers"></img>
        <div className="topChartTitle">{this.state.topChartTitle}</div>


        <div className="graphHolder">

          <LineChart lineGraphArray = {this.state.whichChart} lineColor = {lineColor} tooltipText = {tooltipText}/>

        </div>

        <div className="weeklyTotalBox">
          <div className="weeklyTotal">{this.state.weeklyTotal}</div>
        </div>

        <div className="leftArrow inactive" onMouseOver={this.mouseOver}  onMouseOut={this.mouseOut}  onClick={this.onClick.bind(this)}>{"<"}</div>
        <div className="rightArrow active" onMouseOver={this.mouseOver}  onMouseOut={this.mouseOut} onClick={this.onClick.bind(this)} >{">"}</div>

  
      </div> 
    
      
    )


  }




};


export default TopChart;