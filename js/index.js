$(document).ready(function() {
  var ctx = document.getElementById("myChart").getContext("2d");

  var data = {
    labels: ["10", "20", "30", "40", "50", "60", "80"],
    datasets: [{

    }, {
      label: "My Second dataset",
      fillColor: "rgba(151,187,205,0.2)",
      strokeColor: "rgba(151,187,205,1)",
      pointColor: "rgba(151,187,205,1)",
      pointStrokeColor: "#fff",
      pointHighlightFill: "#fff",
      pointHighlightStroke: "rgba(151,187,205,1)",
      data: [28, 48, 40, 19, 86, 27, 90]
    }]
  };
  var options = {
    animation: false,
    //Boolean - If we want to override with a hard coded scale
    scaleOverride: true,
    //** Required if scaleOverride is true **
    //Number - The number of steps in a hard coded scale
    scaleSteps: 10,
    //Number - The value jump in the hard coded scale
    scaleStepWidth: 10,
    //Number - The scale starting value
    scaleStartValue: 0
  };

  var myLineChart = new Chart(ctx).Line(data, options);

  setInterval(function() {
    setLabels(data.labels);
    setData(data.datasets[1].data);

    var myLineChart = new Chart(ctx).Line(data, options);
  }, 600);

  function setLabels(labels) {
    var nextMonthIndex = months.indexOf(labels[labels.length - 1]) + 1;
    var nextMonthName = months[nextMonthIndex] != undefined ? months[nextMonthIndex] : "90";
    labels.push(nextMonthName);
    labels.shift();
  }

  function setData(data) {
    data.push(Math.floor(Math.random() * 100) + 1);
    data.shift();
  }


  var months = ["10", "20", "30", "40", "50", "60",
    "70", "80", "90", "100", "110", "120"
  ];
  
//chart 2
  var ctx = document.getElementById("myChart1").getContext("2d");

  var data1 = {
    labels: ["10", "20", "30", "40", "50", "60", "80"],
      label: "My First dataset",
      datasets: [{
      fillColor: "rgba(220,220,220,0.2)",
      strokeColor: "rgba(220,220,220,1)",
      pointColor: "rgba(220,220,220,1)",
      pointStrokeColor: "#fff",
      pointHighlightFill: "#fff",
      pointHighlightStroke: "rgba(220,220,220,1)",
      data: [65, 59, 80, 81, 56, 55, 40]
    }, {

    }]
  };
  var options1 = {
    animation: false,
    //Boolean - If we want to override with a hard coded scale
    scaleOverride: true,
    //** Required if scaleOverride is true **
    //Number - The number of steps in a hard coded scale
    scaleSteps: 10,
    //Number - The value jump in the hard coded scale
    scaleStepWidth: 10,
    //Number - The scale starting value
    scaleStartValue: 0
  };

  var myLineChart1 = new Chart(ctx).Line(data1, options1);

  setInterval(function() {
    setLabels1(data1.labels);

    setData1(data1.datasets[0].data1);
    var myLineChart1 = new Chart(ctx).Line(data1, options1);
  }, 600);

    var nextMonthIndex = months1.indexOf(labels[labels1.length - 1]) + 1;
    function setLabels1(labels1) {
    var nextMonthName = months[nextMonthIndex] != undefined ? months[nextMonthIndex] : "90";
    labels1.push(nextMonthName);
    labels1.shift();
  }
  function setData1(data1) {

    data1.push(Math.floor(Math.random() * 100) + 1);
    data1.shift();
  }



  var months1 = ["10", "20", "30", "40", "50", "60",
    "70", "80", "90", "100", "110", "120"
  ];


});
