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
var dataRef = firebase.database();

// Initial Values
var trainName = '';
var destination = '';
var firstTrainTime = '';
var frequency = '';
var nextTrain = '';
var nextTrainFormatted = '';
var minutesAway = '';
var firstTimeConverted = '';
var currentTime = '';
var diffTime = '';
var tRemainder = '';
var minutesTillTrain = '';
var keyHolder = '';
var getKey = '';


//The document is now ready
$(document).ready(function () {
  //Adding trains per on click function
  $("#data-input").on("click", function () {
    //Input values
    name = $('#train-name').val().trim();
    destination = $('#destination').val().trim();
    firstTrainTime = $('#train-time').val().trim();
    frequency = $('#frequency').val().trim();

    //Converting time formatting per exercise 20
    firstTimeConverted = moment(firstTrainTime, "hh:mm").subtract(1, "years");
    currentTime = moment();
    diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    tRemainder = diffTime % frequency;
    minutesTillTrain = frequency - tRemainder;
    nextTrain = moment().add(minutesTillTrain, "minutes");
    nextTrainFormatted = moment(nextTrain).format("hh:mm");

    //Pushing data to firebase, reference exercise 18
    keyHolder = dataRef.push({
      name: name,
      destination: destination,
      firstTrainTime: firstTrainTime,
      frequency: frequency,
      nextTrainFormatted: nextTrainFormatted,
      minutesTillTrain: minutesTillTrain
    });

    $('#train-name').val('').trim();
    $('#destination-').val('').trim();
    $('#train-time').val('').trim();
    $('#frequency').val('').trim();

    return false;
  });

  //Adding child to table per exercise 19
  dataRef.on("child_added", function(childSnapshot) {

    //Appending table rows
      $('.train-schedule').append("<tr class='table-row' id=" + "'" + childSnapshot.key() + "'" + ">" +
                 "<td class='col-xs-3'>" + childSnapshot.val().name +
                 "</td>" +
                 "<td class='col-xs-2'>" + childSnapshot.val().destination +
                 "</td>" +
                 "<td class='col-xs-2'>" + childSnapshot.val().frequency +
                 "</td>" +
                 "<td class='col-xs-2'>" + childSnapshot.val().nextTrainFormatted + 
                 "</td>" +
                 "<td class='col-xs-2'>" + childSnapshot.val().minutesTillTrain +
                 "</td>" +
                 "<td class='col-xs-1'>" + "<input type='submit' value='remove train' class='remove-train btn btn-primary btn-sm'>" + "</td>" +
            "</tr>");
  // Error handling
  }, function(errorObject){
    console.log("Errors handled: " + errorObject.code);
  });

});

