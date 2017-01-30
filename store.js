
//Storage would have to contain
//wish, time of wish, meteor name of wish 
/*
wishes[0] = {
  "wish":
  "time of wish":
  "name of meteor": 
}
*/
// as well as last meteor (used for checking if meteor has rly been updated after crontab checks every hr)

//populates wish array - stores all of them until end of year

var allWishes = new Array();
var meteorEvents = new Array();
var eventIds = new Array();
var opened;
function populateWish(myWish, myTime, myMeteor) {
  var existingWishes = JSON.parse(localStorage.getItem("allWishes"));
  console.log(existingWishes);
  if(existingWishes == null) existingWishes = [];
  
  var wishValue = myWish;
  var wishTime = myTime;
  var wishStar = myMeteor;
  
  var currWish = {
    "wish": wishValue,
    "time": wishTime,
    "meteor": wishStar    
  };
  
  localStorage.setItem("currWish", JSON.stringify(currWish));
  existingWishes.push(currWish);
  console.log(existingWishes);
  localStorage.setItem("allWishes", JSON.stringify(existingWishes));
}

var currStar;

function populateMeteors(obj){
  var existingEvents = JSON.parse(localStorage.getItem("meteorEvents"));
  if(existingEvents == null) existingEvents = [];

    var city = obj.city;
    var country = obj.country;
    var duration = obj.duration;
    var time = obj.time;

    var currMeteor = {
      "city": city,
      "country": country,
      "duration": duration,
      "time": time
    };
  
  localStorage.setItem("currStar", JSON.stringify(currMeteor));
  existingEvents.push(currMeteor);
  console.log(existingEvents);
  localStorage.setItem("meteorEvents", JSON.stringify(existingEvents));
  localStorage.setItem('opened', false);
  
}


function populateEvents(id){
  var existingIds = JSON.parse(localStorage.getItem("eventIds"));
  console.log(existingIds);
  if(existingIds == null) existingIds = [];
  
  var currEvent = id;
  
  localStorage.setItem("currEvent", id);
  existingIds.push(currEvent);
  console.log(existingIds);
  localStorage.setItem("eventIds", JSON.stringify(existingIds));
}

function removeMeteor(){
  var existingEvents = JSON.parse(localStorage.getItem("meteorEvents"));
  console.log(existingEvents);
  if (existingEvents == null){
    existingEvents = [];
  }else{
    existingEvents.splice(0,1);
    localStorage.setItem("meteorEvents", JSON.stringify(existingEvents));
    console.log(existingEvents);
  }
}

function removeID(){
  var existingIds = JSON.parse(localStorage.getItem("eventIds"));
  console.log(existingIds);
  if(existingIds == null){
    existingIds = [];
  }else{
    existingIds.splice(0, 1);
    localStorage.setItem("eventIds", JSON.stringify(existingIds));
    console.log(existingIds);
  }
}
  
//checks if meteor has been updated
//if updated - returns true and stores the new meteor event
//else returns false and keeps the old event
function checkPrev(event, obj){
  var prevEvent = JSON.parse(localStorage.getItem("eventIds"));
  //console.log(prevEvent);
  
  if(prevEvent == null) prevEvent =[];
  for(var i = 0; i < prevEvent.length; i++){
    if(prevEvent[i] == event){
      return false;
    }
  }
  populateMeteors(obj);
  populateEvents(event);
  return true;
}
/* <----------- testing functions -------------> */
function removeAll_forTesting(){
  var existingEvents = new Array();
  localStorage.setItem("meteorEvents", JSON.stringify(existingEvents));
  var existingIds = new Array();
  localStorage.setItem("eventIds", JSON.stringify(existingIds));
  var existingWishes = new Array();
  localStorage.setItem("allWishes", JSON.stringify(existingWishes));
}


