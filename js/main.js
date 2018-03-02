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

var database = firebase.database();

// Button for adding trains
$("#add-train-btn").on("click", function (event) {
  event.preventDefault();

  // Grabs user input
  var tName = $("#employee-name-input").val().trim();
  var tDestination = $("#role-input").val().trim();
  var tTime = $("#start-input").val().trim();
  var tFrequency = $("#rate-input").val().trim();

  // Creates local "temporary" object for holding train data
  var newTrain = {
    train: tName,
    destination: tDestination,
    time: tTime,
    frequency: tFrequency
  };

  // Uploads employee data to the database
  database.ref().push(newTrain);

  // Alert
  alert("Train successfully added");

  // Clears all of the text-boxes
  $("#employee-name-input").val("");
  $("#role-input").val("");
  $("#start-input").val("");
  $("#rate-input").val("");

});

// Create Firebase event for adding train to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function (childSnapshot, prevChildKey) {

  console.log(childSnapshot.val());

  // Store everything into a variable.
  var newName = childSnapshot.val().train;
  var newDestination = childSnapshot.val().destination;
  var newTime = childSnapshot.val().time;
  var newFrequency = childSnapshot.val().frequency;


  // First Time (pushed back 1 year to make sure it comes before current time)
  var startTimeConverted = moment(newTime, "hh:mm").subtract(1, "years");

  // Current Time
  var currentTime = moment();

  // Difference between the times
  var diffTime = moment().diff(moment(startTimeConverted), "minutes");

  // Time apart (remainder)
  var tRemainder = diffTime % newFrequency;

  // Minute(s) Until Train
  var tMinutesTillTrain = newFrequency - tRemainder;

  // Next Train
  var nextTrain = moment().add(tMinutesTillTrain, "minutes");
  var catchTrain = moment(nextTrain).format("h:mm a");

  // Add each train's data into the table
  $("#employee-table > tbody").append("<tr><td>" + newName + "</td><td>" + newDestination + "</td><td>" + newFrequency
    + "</td><td>" + catchTrain + "</td><td>" + tMinutesTillTrain + "</td></tr>");
});

// Example Time Math
// -----------------------------------------------------------------------------
// Assume Employee start date of January 1, 2015
// Assume current date is March 1, 2016

// We know that this is 15 months.
// Now we will create code in moment.js to confirm that any attempt we use mets this test case
