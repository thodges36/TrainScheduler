// Initialize Firebase
var config = {
  apiKey: "AIzaSyBK0g2bqTsVvJti8dHncORE4qGEAk-jUlA",
  authDomain: "teds-super-sweet-project.firebaseapp.com",
  databaseURL: "https://teds-super-sweet-project.firebaseio.com",
  projectId: "teds-super-sweet-project",
  storageBucket: "teds-super-sweet-project.appspot.com",
  messagingSenderId: "656009702395"
};
firebase.initializeApp(config);


// Create a variable to reference the database.
var database = firebase.database();

//Adding trains per on click function
$("#data-input").on("click", function () {
  event.preventDefault();

  //Input values
  var trainName = $('#train-name').val().trim();
  var trainDestination = $('#destination').val().trim();
  var firstTrainTime = $("#train-time").val().trim();
  var trainFrequency = $('#frequency').val().trim();

  //Temporary object for holding data
  var tempTrain = {
    name: trainName,
    destination: trainDestination,
    firstTime: firstTrainTime,
    frequency: trainFrequency
  };

  //Uploads to firebase
  database.ref().push(tempTrain);

  //Console logs
  console.log(tempTrain.name);
  console.log(tempTrain.destination);
  console.log(tempTrain.firstTime);
  console.log(tempTrain.frequency);

  //Alert
  alert("Train successfully added!");

  //Clears all text boxes
  $('#train-name').val('');
  $('#destination').val('');
  $('#train-time').val('');
  $('#frequency').val('');

});


//Adding child to table per exercise 19
database.ref().on("child_added", function (childSnapshot, prevChildKey) {
  console.log(childSnapshot.val());

  //Store into variable
  var trainName = childSnapshot.var().name;
  var trainDestination = childSnapshot.var().destination;
  var firstTrainTime = childSnapshot.var().firstTime;
  var trainFrequency = childSnapshot.var().frequency;

  //Console log info
  console.log(name);
  console.log(destination);
  console.log(firstTrainTime);
  console.log(frequency);

  //Date formatting
  //var timeConverted = moment.unix(firstTrainTime).format("MM/DD/YY");

  //Add train data into table
  $("#employee-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" +
  firstTrainTime + "</td><td>" + trainFrequency + "</td></tr>");

});


