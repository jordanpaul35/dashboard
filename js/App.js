


import './../css/App.css';
import { Component, Fragment } from 'react';
import TopChart from './../js/TopChart';
import RecentActivities from './../js/RecentActivities';
import moment from 'moment';

import {updateHeartRate, updateSteps, updateCalories, updateSpinAndWalk, updateSleep} from "./api.js";

//images
import spin from './../icons/spin.png';
import walk from './../icons/walk.png';
import sleep from './../icons/sleep.png';

const purple = "#2322BD";

let themeColor;

let stepsData;
let totalSteps;

let heartRateData;
let avgHeartRate;

let caloriesData;
let totalCalories;

let spinCalories;
let spinDuration;
let spinHeartRate;
let spinStartTime;

let walkCalories;
let walkDuration;
let walkHeartRate;
let walkStartTime;

let sleepDuration;

class App extends Component {
// function App() {

  constructor(props){ 
      super(props) 
        this.state = {

        themeColor: purple

      }


  }

//function to update theme color 
  updateTheme = (newColor) => {

    this.setState({themeColor: newColor})


}


  componentWillMount() {

    //get all api data
    let stepsContent = updateSteps();

    stepsData = stepsContent.stepsFromApi;
    totalSteps = stepsContent.totalSteps;

    let heartContent = updateHeartRate();

    heartRateData = heartContent.heartRateFromApi;
    avgHeartRate = Math.round(heartContent.avgHeartRate);

    let caloriesContent = updateCalories();

    caloriesData = caloriesContent.caloriesFromApi;
    totalCalories = caloriesContent.totalCalories;


    let spinAndWalkContent = updateSpinAndWalk();

    spinCalories = spinAndWalkContent.spinCalories;
    spinDuration = spinAndWalkContent.spinDuration;
    spinHeartRate = spinAndWalkContent.spinHeartRate;
    spinStartTime = spinAndWalkContent.spinStartTime;

    spinStartTime = moment(spinStartTime).format("M-DD-YY");

    walkCalories = spinAndWalkContent.walkCalories;
    walkDuration = spinAndWalkContent.walkDuration;
    walkHeartRate = spinAndWalkContent.walkHeartRate;
    walkStartTime = spinAndWalkContent.walkStartTime;

    walkStartTime = moment(walkStartTime).format("M-DD-YY");


    sleepDuration = updateSleep();



  }





  componentDidMount() {

    //update the theme on first run
    this.updateTheme(themeColor);

  }

 

render(){
  return (

    <Fragment>

      <div className="container">



        <div className="App">

     

      

        
        <div className="row">

          <div className="col-md-12">

            <div className="mainTitle">The Jordan Tracker</div>
            <p className="subTitle">Welcome to the Jordan Tracker, the safe and legal way to stalk me!</p>
            <p className="subTitle">I created this dashboard in React, and all of the data is pulled from my watch using the Fitbit API. It was also built using jQuery, Boostrap, and Google Charts.</p>

          </div>
        </div>

        <div className="row">


          <div className="col-md-12">

            <TopChart 
            sendThemeHome = {this.updateTheme}   
            stepsData = {stepsData}  
            heartRateData = {heartRateData} 
            caloriesData = {caloriesData} 
            totalSteps = {totalSteps} 
            avgHeartRate = {avgHeartRate} 
            totalCalories = {totalCalories}
            /> 


            </div>
        </div>

        <div className="row ">

          <div className="col-md-12 ">

          <div className="midTextHolder centerContent">
            <h1>Recent Activity</h1>
          </div>

          </div>


        </div>


        <div className="row">


          <div className="col-md-4 centerContent">

            <RecentActivities 
            name = "Last Spin" 
            icon = {spin} 
            color = {this.state.themeColor}
            caloriesBurned = {spinCalories}
            heartRate = {spinHeartRate}
            duration = {spinDuration}
            activityStartTime = {spinStartTime}
            />
            

          </div>

          <div className="col-md-4 centerContent">

            <RecentActivities 
            name = "Last Walk" 
            icon = {walk} 
            color = {this.state.themeColor}
            caloriesBurned = {walkCalories}
            heartRate = {walkHeartRate}
            duration = {walkDuration}
            activityStartTime = {walkStartTime}
            />

          </div>

          <div className="col-md-4 centerContent">

             <RecentActivities 
             name = "Sleep Last Night" 
             icon = {sleep} 
             color = {this.state.themeColor}
             sleepDuration = {sleepDuration}
             />

          </div> 


          
        </div>




          </div>


          




      </div>

      </Fragment>

  )
}
}

export default App;
