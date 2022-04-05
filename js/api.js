import $ from "jquery";
import moment from 'moment';

const startTime = moment().subtract(1, 'weeks').format("YYYY-MM-DD");
const endTime = moment().format("YYYY-MM-DD");

let stepsFromApi = [];
let heartRateFromApi = [];
let caloriesFromApi = [];

let totalSteps = 0;
let avgHeartRate = 0;
let totalCalories = 0;


const myToken =
    "xxxxx";


export function updateSteps() {

  stepsFromApi = [];

  let apiUrl = "https://api.fitbit.com/1/user/-/activities/tracker/steps/date/" + startTime + "/" + endTime + ".json";


  $.ajax({
    url: apiUrl,
    method: "GET",
    headers: {
      "Authorization": "Bearer " + myToken,
   },
    async: false,
    success: function(apiResponse) {

      // console.log(apiResponse);

        for (let i = 0; i <= Object.keys(apiResponse['activities-tracker-steps']).length - 1; i++) {


          stepsFromApi.push((apiResponse['activities-tracker-steps'])[i].value);
    
    
        }
    

      // }.bind(this),
    },
            

});   



for (let i = 1; i <= 7; i++) {

  totalSteps = totalSteps + Number(stepsFromApi[i-1]);

  

}

totalSteps = totalSteps.toLocaleString();
return {stepsFromApi, totalSteps};



}





export function updateHeartRate() {

  heartRateFromApi = [];

  let apiUrl = " https://api.fitbit.com/1/user/-/activities/heart/date/" + startTime + "/" + endTime + ".json";


  $.ajax({
    url: apiUrl,
    method: "GET",
    headers: {
      "Authorization": "Bearer " + myToken,
   },
    async: false,
    success: function(apiResponse) {

        for (let i = 0; i <= Object.keys(apiResponse['activities-heart']).length - 1; i++) {


          heartRateFromApi.push((apiResponse['activities-heart'])[i].value.restingHeartRate);
    
    
        }
    

      // }.bind(this),
    },
            

});   




for (let i = 1; i <= 7; i++) {


  avgHeartRate = avgHeartRate + Number(heartRateFromApi[i-1]);

}

avgHeartRate = avgHeartRate/7;

return {heartRateFromApi, avgHeartRate};





}









export function updateCalories() {

  caloriesFromApi = [];

  let apiUrl = "https://api.fitbit.com/1/user/-/activities/tracker/calories/date/" + startTime + "/" + endTime + ".json";


  $.ajax({
    url: apiUrl,
    method: "GET",
    headers: {
      "Authorization": "Bearer " + myToken,
   },
    async: false,
    success: function(apiResponse) {


        for (let i = 0; i <= Object.keys(apiResponse['activities-tracker-calories']).length - 1; i++) {


          caloriesFromApi.push((apiResponse['activities-tracker-calories'])[i].value);
    
    
        }
    

      // }.bind(this),
    },

            

});   





for (let i = 1; i <= 7; i++) {

  totalCalories = totalCalories + Number(caloriesFromApi[i-1]);

}

totalCalories = totalCalories.toLocaleString();
return {caloriesFromApi, totalCalories};



}









export function updateSpinAndWalk() {


  let spinCalories;
  let spinHeartRate;
  let spinDuration;
  let spinStartTime;

  let walkCalories;
  let walkHeartRate;
  let walkDuration;
  let walkStartTime;


  let spinDay = moment().add(1, 'days').format("YYYY-MM-DD");


  let apiUrl = "https://api.fitbit.com/1/user/-/activities/list.json?limit=50&sort=desc&beforeDate=" + spinDay + "&offset=0";


  $.ajax({
    url: apiUrl,
    method: "GET",
    headers: {
      "Authorization": "Bearer " + myToken,
   },
    async: false,
    success: function(apiResponse) {

      for (let i = 0; i <= Object.keys(apiResponse.activities).length - 1; i++) {


        if(apiResponse.activities[i].activityName === "Spinning"){


          spinCalories = apiResponse.activities[i].calories;
          spinHeartRate = apiResponse.activities[i].averageHeartRate;
          spinDuration = apiResponse.activities[i].duration;
          spinStartTime = apiResponse.activities[i].startTime;




          break;
  
        }
  
  
      }
  
  
  
      for (let k = 0; k <= Object.keys(apiResponse.activities).length - 1; k++) {
  
  
      if(apiResponse.activities[k].activityName === "Walk"){
  
  
        walkCalories = apiResponse.activities[k].calories;
        walkHeartRate = apiResponse.activities[k].averageHeartRate;
        walkDuration = apiResponse.activities[k].duration;
        walkStartTime = apiResponse.activities[k].startTime;

        break;

      }

        
    
  
      }
  

      // }.bind(this),
    },
            

});   


// spinDuration = spinDuration / 60000;


let walkMinutes = Math.round(walkDuration / 60000);          
let spinMinutes = Math.round(spinDuration / 60000);    

walkDuration = walkMinutes + " Min ";

spinDuration = spinMinutes + " Min ";


return {spinCalories, spinHeartRate, spinDuration, spinStartTime, walkCalories, walkHeartRate, walkDuration, walkStartTime};




}








export function updateSleep() {


  let sleepDayTotal = 0;
  let sleepDayTotalConverted = "";

  const sleepDate = moment().format("YYYY-MM-DD");
 
  var apiUrl = "  https://api.fitbit.com/1.2/user/-/sleep/date/" + sleepDate + ".json";


  $.ajax({
    url: apiUrl,
    method: "GET",
    headers: {
      "Authorization": "Bearer " + myToken,
   },
    async: false,
    success: function(apiResponse) {

      sleepDayTotal = apiResponse.summary.totalMinutesAsleep;

      let sleepHours = Math.floor(sleepDayTotal / 60);          
      let sleepMinutes = sleepDayTotal % 60;

      sleepDayTotalConverted = sleepHours + " Hrs " + sleepMinutes + " Min ";



      // }.bind(this),
    },
            

});   


return sleepDayTotalConverted;




}

