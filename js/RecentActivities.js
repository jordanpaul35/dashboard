import React, {Component} from "react";
import './../css/RecentActivities.css';
import $ from "jquery";


class RecentActivities extends Component {

  constructor(props){
    super(props);
    this.state = {

        avgHeartRate: "",
        duration: "",
        caloriesBurned: "",
        activityDate: "",
        sleepDuration: ""

    }


  }

  componentDidMount() {

    if(this.props.name === "Sleep Last Night"){

        this.setState({sleepDuration:  this.props.sleepDuration})
        $(this).find(".actvityText" ).css("display", "none");

    }else{

 
      this.setState({activityText: "Avg Heart Rate: " + this.props.heartRate})
      this.setState({duration: "Duration: " + this.props.duration})
      this.setState({caloriesBurned: "CaloriesBurned: " + this.props.caloriesBurned})
      this.setState({activityDate: "Date: " + this.props.activityStartTime})
    
    }



  }


componentDidUpdate(){


    $(".iconBox" ).animate({ backgroundColor: this.props.color }, 200 );
    $(".iconBox img" ).animate({ backgroundColor: this.props.color }, 200 );

}





  
  render(){

    
    return (


    <div className="activityBoxContainer">

        <div className="activityBox">

            <div className="iconBox" >

                <img src={this.props.icon} alt={this.props.icon}></img>

            </div>

            <div className="activityTitle">{this.props.name}</div>

            <p className="activityText">{this.state.activityText}{<br/>}{this.state.caloriesBurned}{<br/>}{this.state.duration}{<br/>}{this.state.activityDate}</p>
            <p className="sleepText">{this.state.sleepDuration}</p>
    


        </div>

    </div>


      
    )


  }




};


export default RecentActivities;