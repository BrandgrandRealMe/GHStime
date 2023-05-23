// functions 
function qs(search_for) { // gets quary strings  (www.example.com/?thing=var&thing2=var2)
  var query = window.location.search.substring(1);
  var parms = query.split(/[+&]+/);
  for (var i = 0; i < parms.length; i++) {
    var pos = parms[i].indexOf('=');
    if (pos > 0 && search_for == parms[i].substring(0, pos)) {
      return parms[i].substring(pos + 1);;
    }
  }
  return "";
}

function init() { // init the loop
/* Based on this http://jsfiddle.net/brettwp/J4djY/*/
function detectDoubleTapClosure() {
  let lastTap = 0;
  let timeout;
  return function detectDoubleTap(event) {
    const curTime = new Date().getTime();
    const tapLen = curTime - lastTap;
    if (tapLen < 500 && tapLen > 0) {
     modal.style.display = "flex";
      event.preventDefault();
    } else {
      timeout = setTimeout(() => {
        clearTimeout(timeout);
      }, 500);
    }
    lastTap = curTime;
  };
}
  const modal = document.getElementById("modal");
const closeBtn = document.getElementsByClassName("close")[0];

closeBtn.onclick = function() {
  modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
/* Regex test to determine if user is on mobile */
if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
  document.body.addEventListener('touchend', detectDoubleTapClosure());
}
const handleKeyboard = event => {
  if (event.key === 't') modal.style.display = "flex";
}
document.addEventListener('keyup', handleKeyboard)

// colors
  var r = document.querySelector(':root');
  
  let bg = qs("background")
  if (bg !== null) {
    r.style.setProperty('--md-sys-color-background', bg);
  }

  let primary = qs("primary")
  if (primary !== null) {
    r.style.setProperty('--md-sys-color-primary', primary);
  }

  let secondary = qs("secondary")
  if (secondary !== null) {
    r.style.setProperty('--md-sys-color-secondary', secondary);
  }

  
  console.log("Initized")
  var apiKey = atob("ZTcyMjlhOWI3ZDIzZjAxOWE1ODg3ZGEzMTQ4Y2EyOTk=");
  Weather.setApiKey(apiKey);
  bellSchedule()
  navigator.geolocation.getCurrentPosition((data) => getw(data.coords.latitude, data.coords.longitude))
  weathergetter();
  battgetter()

}
function getw(lat, long) {
  Weather.getCurrentByLatLong(lat, long, function(current) {
    document.getElementById("temp").innerHTML = Math.floor(Weather.kelvinToFahrenheit(current.temperature())) + "&degF "
    document.getElementById("con").innerHTML = current.conditions()
    var iconurl = "https://openweathermap.org/img/wn/" + current.data.weather[0].icon + "@2x.png";

    document.getElementById('wicon').src = iconurl
    document.getElementById("wicon").classList.remove('hide');
    document.getElementById("wicon").classList.add('wicon');
    console.log("weather Updated")
  });
}
function isToday (date) {  
  const now = new Date()

    return date.getDate() === now.getDate() &&
         date.getMonth() === now.getMonth() &&
         date.getFullYear() === now.getFullYear()
}

const dateBetween = function(currentDate, firstDate, secondDate) { // returns true if date is in between first and last date
  if (currentDate >= firstDate && currentDate <= secondDate) {
    return true;
  }
  return false;
};

const IsSchoolhours = function(currentTime) { // returns true if time is during GHS school hours 
  var startTime = new Date(); // 8:20AM
  startTime.setHours(8);
  startTime.setMinutes(20);

  var endTime = new Date(); // 3:50PM
  endTime.setHours(15);
  endTime.setMinutes(50);
  if (currentTime >= startTime && currentTime <= endTime) {
    return true;
  }
  return false;
};

function toMonthName(monthNumber) { // self expainatory. Gets month #  and returns the name of the date Ex(2 = February)
  const date = new Date();
  date.setMonth(monthNumber - 1);

  return date.toLocaleString('en-US', {
    month: 'long',
  });
}



function format_two_digits(n) { // again self explanitory. makes single # two digits ## Ex(6 -> 06)
  return n < 10 ? "0" + n : n;
}


function sleep(milliseconds) { // again self explanitory. Ex(sleep(1000) delays the code for 1 seconds)
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}
async function weathergetter() {
  setInterval(() => { navigator.geolocation.getCurrentPosition((data) => getw(data.coords.latitude, data.coords.longitude)); }, 300000);

}


async function battgetter() {
  
  navigator.getBattery().then(function(battery) {
    
    // if (battery.dischargingTime == "Infinity") {
    //     return
    //   }
    updateBatteryStatus(battery.level * 100);
    console.log(battery)

    function updateBatteryStatus(level) {
       if (level <= "100" && level >= "50") {
         if (battery.charging == true) {
            document.getElementById("battery-status").innerHTML = " <i  style='font-size: 0.73em;' class='large material-icons'>battery_charging_full</i> " + Math.floor(level) + "%";
          } else {
         document.getElementById("battery-status").innerHTML = " <i  style='font-size: 0.73em;' class='large material-icons'>battery_full</i> " + Math.floor(level) + "%";
         }
         
        document.getElementById("battery-status").classList.add("high");
        document.getElementById("battery-status").classList.remove("mid");
        document.getElementById("battery-status").classList.remove("low");

      } else if (level <= "49" && level >= "20") {
         document.getElementById("battery-status").innerHTML = " <i  style='font-size: 0.73em;' class='large material-icons'>battery_4_bar</i> " + Math.floor(level) + "%";
        document.getElementById("battery-status").classList.remove("high");
        document.getElementById("battery-status").classList.add("mid");
        document.getElementById("battery-status").classList.remove("low");


      } else if (level <= "19") {
document.getElementById("battery-status").innerHTML = " <i  style='font-size: 0.73em;' class='large material-icons'>battery_0_bar</i> " + Math.floor(level) + "%";
        document.getElementById("battery-status").classList.remove("high");
        document.getElementById("battery-status").classList.remove("mid");
        document.getElementById("battery-status").classList.add("low");
         

      }
      
    }
  });
  setInterval(() => {
    navigator.getBattery().then(function(battery) {
      addEventListener("chargingchange", (event) => { 
  console.log("event ran")
  battgetter() })
      updateBatteryStatus(battery.level * 100);

      battery.addEventListener('levelchange', function() {
        updateBatteryStatus(battery.level * 100);
      });

      function updateBatteryStatus(level) {

        if (level <= "100" && level >= "50") {
         document.getElementById("battery-status").innerHTML = " <i  style='font-size: 0.73em;' class='large material-icons'>battery_full</i> " + Math.floor(level) + "%";
        document.getElementById("battery-status").classList.add("high");
        document.getElementById("battery-status").classList.remove("mid");
        document.getElementById("battery-status").classList.remove("low");

      } else if (level <= "49" && level >= "20") {
         document.getElementById("battery-status").innerHTML = " <i  style='font-size: 0.73em;' class='large material-icons'>battery_4_bar</i> " + Math.floor(level) + "%";
        document.getElementById("battery-status").classList.remove("high");
        document.getElementById("battery-status").classList.add("mid");
        document.getElementById("battery-status").classList.remove("low");


      } else if (level <= "19") {
document.getElementById("battery-status").innerHTML = " <i  style='font-size: 0.73em;' class='large material-icons'>battery_0_bar</i> " + Math.floor(level) + "%";
        document.getElementById("battery-status").classList.remove("high");
        document.getElementById("battery-status").classList.remove("mid");
        document.getElementById("battery-status").classList.add("low");
         

      }
      }
    });
    console.log("battery % Updated ICON")
  }, 30000);
}
function bellSchedule() { // now we get to the good stuff

  // gets the juicy stuff about the current date
  let d = new Date(); // gets the current date
  let m = d.getMinutes(); // gets current minutes
  let h = d.getHours(); // gets current hours

  // Does some formating magic
  if (h == 0) {
    ap = "AM";
    h = 12;
  } else if (h < 12) {
    ap = "AM";
  } else if (h == 12) {
    ap = "PM";
  } else if (h > 12) {
    ap = "PM";
    h -= 12;
  }
  if (m <= 9) m = "0" + m;


  // Does some more formating magic
  var clocktext = "" + format_two_digits(h) + "꞉" + m + ap + "";
  let currentDayOfWeek = d.getDay();
  let currentYear = d.getYear() - 100;
  let currentMonth = d.getMonth() + 1;
  let todaysDate = currentMonth.toString() + d.getDate()
    .toString() + currentYear.toString();

  let currentTimeIndex = d.getHours() + "" + (d.getMinutes() < 10 ? '0' : '') + d.getMinutes(); // Formats Time into a Index

  // Sets some blank vars
  let currentMessage = "";
  let nextMessage = "";
  let plusNextMessage = "";
  let sched = [];
  let schedTitle = "";

  var countDownDate = '';
  var countDownEnd = '';
  var title = '';
  var cd = '';

  const now = new Date(); // Gets current date


  // some Depricated Coundown stuff
  var CountDowns = [{
    start: new Date("Dec 15, 2022 15:50:0").getTime(),
    end: new Date("Jan 03, 2023 0:0:0").getTime(),
    title: "Christmas Break"
  },
  {
    start: new Date("Mar 10, 2023 15:50:0").getTime(),
    end: new Date("Mar 17, 2023 0:0:0").getTime(),
    title: "Break"
  },
  {
    start: new Date("Jan 14, 2023 15:50:0").getTime(),
    end: new Date("Jan 14, 2023 0:0:0").getTime(),
    title: "MLK Day"
  }
  ];



  for (var i = 0; i < CountDowns.length; i++) {
    if (CountDowns[i].start < new Date().getTime()) {

      cd = CountDowns[i]
      countDownDate = CountDowns[i].start;
      countDownEnd = CountDowns[i].end;
      CDactive = true
      title = CountDowns[i].title;
      break;
    } else if (CountDowns[i].end < new Date()) {
      cd = CountDowns[i]
      countDownDate = cd.start;
      countDownEnd = cd.end;
      CDactive = false

      break;
    }
  }

  if (!schoolACTIVE) {
    title = "School is out!"
    CDactive = false
    document.getElementById("cd").style.visibility = "hidden";
  } else if (CDactive) {
    document.getElementById("cd").style.visibility = "visible";
    // Find the distance between now and the count down date
    var distance = countDownDate - now;

    // Time calculations for days, hours, minutes and seconds
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Display the result
    document.getElementById("cdtitle").innerHTML = title
    document.getElementById("cdcd").innerHTML = days + "d " + hours + "h " +
      minutes + "m " + seconds + "s ";

    // If the count down is finished, write some text
    if (distance < 0) {

      document.getElementById("cd").innerHTML = "EXPIRED";
    }

  } else {
    document.getElementById("cd").style.visibility = "visible";
  }

  // get QSs
  let ver = qs("ver")
  let skd = qs("skd")
  let debug = qs("debug")

  if (debug) { // If debug do this
    console.log(`Date ${countDownDate} | Now ${now} | end ${countDownEnd} | is ${dateBetween(now, countDownDate, countDownEnd)}`)
  }

  if (dateBetween(now, countDownDate, countDownEnd)) {
    schedTitle = `It's ${title}! Enjoy your days off!`;
    document.getElementById("weekend").innerHTML = schedTitle;
    var schoolACTIVE = false




    sched = [{
      t: 0,
      msg: "School is out!"
    }, {
      t: 1,
      msg: "School is out!"
    }, {
      t: 2359,
      msg: "School is out!"
    },];
    let sl = sched.length;
  } else if (currentDayOfWeek == 0 || currentDayOfWeek == 6 || debug == "weekend") { // Some stuff to do stuff
    schedTitle = "It's the WEEKEND! Enjoy!";
    document.getElementById("weekend").innerHTML = schedTitle;
    var schoolACTIVE = false

    sched = [{
      t: 0,
      msg: "School is out!"
    }, {
      t: 1,
      msg: "School is out!"
    }, {
      t: 2359,
      msg: "School is out!"
    },];
    let sl = sched.length;
  } else if (!IsSchoolhours(now)) {
    schedTitle = "School is out! Enjoy the rest of your day!";
    document.getElementById("weekend").innerHTML = schedTitle;
    var schoolACTIVE = false

    sched = [{
      t: 0,
      msg: "School is out!"
    }, {
      t: 1,
      msg: "School is out!"
    }, {
      t: 2359,
      msg: "School is out!"
    },];
    let sl = sched.length;
  } else if (ver == "am" || ver == "AM" || skd == "am" || skd == "AM") {
    var schoolACTIVE = true
    schedTitle = "AM Assembly Bell";

    sched = [{
      t: 0,
      msg: "Good Morning! <i style='font-size: 0.73em;' class='large material-icons'>free_breakfast</i> <br /> First Period Starts at 8:20"
    }, {
      t: 820,
      msg: "1st Period <i  style='font-size: 0.73em;' class='large material-icons'>class</i><br />   8:20 - 9:01"
    }, {
      t: 901,
      msg: "Transition <i  style='font-size: 0.73em;' class='large material-icons'>transfer_within_a_station</i>"
    }, {
      t: 906,
      msg: "2nd Period <i  style='font-size: 0.73em;' class='large material-icons'>class</i><br />   9:06 - 9:47"
    }, {
      t: 947,
      msg: "Transition <i  style='font-size: 0.73em;' class='large material-icons'>transfer_within_a_station</i>"
    }, {
      t: 949,
      msg: "Assembly <i  style='font-size: 0.73em;' class='large material-icons'>local_activity</i><br />   9:49 - 10:19"
    }, {
      t: 1019,
      msg: "Transition <i  style='font-size: 0.73em;' class='large material-icons'>transfer_within_a_station</i>"
    }, {
      t: 1021,
      msg: "3rd Period <i  style='font-size: 0.73em;' class='large material-icons'>class</i><br />  10:21 - 11:02"
    }, {
      t: 1102,
      msg: "Transition <i  style='font-size: 0.73em;' class='large material-icons'>transfer_within_a_station</i>"
    }, {
      t: 1107,
      msg: "4th Period <i  style='font-size: 0.73em;' class='large material-icons'>class</i><br />  11:07 - 11:48"
    }, {
      t: 1148,
      msg: "Transition <i  style='font-size: 0.73em;' class='large material-icons'>transfer_within_a_station</i>"
    }, {
      t: 1153,
      msg: "A Lunch <i  style='font-size: 0.73em;' class='large material-icons'>local_dining</i><br /> 11:53 - 12:23"
    }, {
      t: 1223,
      msg: "Transition <i  style='font-size: 0.73em;' class='large material-icons'>transfer_within_a_station</i>"
    }, {
      t: 1228,
      msg: "B Lunch <i  style='font-size: 0.73em;' class='large material-icons'>local_dining</i><br /> 12:28 - 12:58"
    }, {
      t: 1258,
      msg: "Transition <i  style='font-size: 0.73em;' class='large material-icons'>transfer_within_a_station</i>"
    }, {
      t: 1303,
      msg: "C Lunch <i  style='font-size: 0.73em;' class='large material-icons'>local_dining</i><br /> 1:03 - 1:33"
    }, {
      t: 1333,
      msg: "Transition <i  style='font-size: 0.73em;' class='large material-icons'>transfer_within_a_station</i>"
    }, {
      t: 1338,
      msg: "6th Period <i  style='font-size: 0.73em;' class='large material-icons'>class</i><br />  1:38 - 2:19"
    }, {
      t: 1419,
      msg: "Transition <i  style='font-size: 0.73em;' class='large material-icons'>transfer_within_a_station</i>"
    }, {
      t: 1424,
      msg: "7th Period <i  style='font-size: 0.73em;' class='large material-icons'>class</i><br />  2:24 - 3:05"
    }, {
      t: 1505,
      msg: "Transition <i  style='font-size: 0.73em;' class='large material-icons'>transfer_within_a_station</i>"
    }, {
      t: 1510,
      msg: "8th Period <i  style='font-size: 0.73em;' class='large material-icons'>class</i><br />  3:10 - 3:50"
    }, {
      t: 1550,
      msg: "3:50pm - Dismissed <i  style='font-size: 0.73em;' class='large material-icons'>exit_to_app</i>"
    }, {
      t: 2400,
      msg: "clock will reset <i  style='font-size: 0.73em;' class='large material-icons'>refresh</i>"
    },];
    let sl = sched.length;

  } else if (ver == "pm" || ver == "PM" || skd == "pm" || skd == "PM") {
    schedTitle = "PM Assembly Bell";
    var schoolACTIVE = true
    // ICONS https://materializecss.com/icons.html
    sched = [{
      t: 0,
      msg: "Good Morning! <i style='font-size: 0.73em;' class='large material-icons'>free_breakfast</i> <br /> First Period Starts at 8:20"
    }, {
      t: 820,
      msg: "1st Period <i  style='font-size: 0.73em;' class='large material-icons'>class</i><br />   8:20 - 9:00"
    }, {
      t: 900,
      msg: "Transition <i  style='font-size: 0.73em;' class='large material-icons'>transfer_within_a_station</i>"
    }, {
      t: 905,
      msg: "2nd Period <i  style='font-size: 0.73em;' class='large material-icons'>class</i><br />   9:05 - 9:45"
    }, {
      t: 945,
      msg: "Transition <i  style='font-size: 0.73em;' class='large material-icons'>transfer_within_a_station</i>"
    }, {
      t: 950,
      msg: "3rd Period <i  style='font-size: 0.73em;' class='large material-icons'>class</i><br />  9:50 - 10:30"
    }, {
      t: 1030,
      msg: "Transition <i  style='font-size: 0.73em;' class='large material-icons'>transfer_within_a_station</i>"
    }, {
      t: 1035,
      msg: "4th Period <i  style='font-size: 0.73em;' class='large material-icons'>class</i><br />  10:35 - 11:20"
    }, {
      t: 1120,
      msg: "Transition <i  style='font-size: 0.73em;' class='large material-icons'>transfer_within_a_station</i>"
    }, {
      t: 1125,
      msg: "A Lunch <i  style='font-size: 0.73em;' class='large material-icons'>local_dining</i><br /> 11:25 - 11:55"
    }, {
      t: 1155,
      msg: "Transition <i  style='font-size: 0.73em;' class='large material-icons'>transfer_within_a_station</i>"
    }, {
      t: 1200,
      msg: "B Lunch <i  style='font-size: 0.73em;' class='large material-icons'>local_dining</i><br /> 12:00 - 12:30"
    }, {
      t: 1230,
      msg: "Transition <i  style='font-size: 0.73em;' class='large material-icons'>transfer_within_a_station</i>"
    }, {
      t: 1235,
      msg: "C Lunch <i  style='font-size: 0.73em;' class='large material-icons'>local_dining</i><br /> 12:35 - 1:05"
    }, {
      t: 1305,
      msg: "Transition <i  style='font-size: 0.73em;' class='large material-icons'>transfer_within_a_station</i>"
    }, {
      t: 1310,
      msg: "6th Period <i  style='font-size: 0.73em;' class='large material-icons'>class</i><br />  1:10 - 1:50"
    }, {
      t: 1350,
      msg: "Transition <i  style='font-size: 0.73em;' class='large material-icons'>transfer_within_a_station</i>"
    }, {
      t: 1355,
      msg: "7th Period <i  style='font-size: 0.73em;' class='large material-icons'>class</i><br />  1:55 - 2:35"
    }, {
      t: 1435,
      msg: "Transition <i  style='font-size: 0.73em;' class='large material-icons'>transfer_within_a_station</i>"
    }, {
      t: 1440,
      msg: "8th Period <i  style='font-size: 0.73em;' class='large material-icons'>class</i><br />  2:40 - 3:20"
    }, {
      t: 1520,
      msg: "Assembly <i  style='font-size: 0.73em;' class='large material-icons'>local_activity</i><br /> 3:20 - 3:50"
    }, {
      t: 1550,
      msg: "3:50pm - Dismissed <i  style='font-size: 0.73em;' class='large material-icons'>exit_to_app</i>"
    }, {
      t: 2400,
      msg: "clock will reset <i  style='font-size: 0.73em;' class='large material-icons'>refresh</i>"
    },];
    let sl = sched.length;
  } else if (ver == "testing" || ver == "9WT" || skd == "testing" || skd == "9WT" || isToday(new Date('may 22, 2023'))   ) {
    schedTitle = "9Weeks Testing Bell A";
    var schoolACTIVE = true
    // ICONS https://materializecss.com/icons.html
    sched = [{
      t: 0,
      msg: "Good Morning! <i style='font-size: 0.73em;' class='large material-icons'>free_breakfast</i> <br /> First Period Starts at 8:20"
    }, {
      t: 820,
      msg: "1st Period <i  style='font-size: 0.73em;' class='large material-icons'>class</i><br />   8:20 - 9:45"
    }, {
      t: 945,
      msg: "Transition <i  style='font-size: 0.73em;' class='large material-icons'>transfer_within_a_station</i>"
    }, {
      t: 950,
      msg: "2nd Period <i  style='font-size: 0.73em;' class='large material-icons'>class</i><br />   9:50 - 11:15"
    }, {
      t: 1115,
      msg: "Transition <i  style='font-size: 0.73em;' class='large material-icons'>transfer_within_a_station</i>"
    }, {
      t: 1115,
      msg: "A Lunch <i  style='font-size: 0.73em;' class='large material-icons'>local_dining</i><br /> 11:15 - 11:45"
    }, {
      t: 1145,
      msg: "Transition <i  style='font-size: 0.73em;' class='large material-icons'>transfer_within_a_station</i>"
    }, {
      t: 1145,
      msg: "B Lunch <i  style='font-size: 0.73em;' class='large material-icons'>local_dining</i><br /> 11:45 - 12:15"
    }, {
      t: 1215,
      msg: "Transition <i  style='font-size: 0.73em;' class='large material-icons'>transfer_within_a_station</i>"
    }, {
      t: 1215,
      msg: "C Lunch <i  style='font-size: 0.73em;' class='large material-icons'>local_dining</i><br /> 12:15 - 12:45"
    }, {
      t: 1245,
      msg: "Transition <i  style='font-size: 0.73em;' class='large material-icons'>transfer_within_a_station</i>"
    }, {
      t: 1250,
      msg: "5th Period <i  style='font-size: 0.73em;' class='large material-icons'>class</i><br />  12:50 - 2:15"
    }, {
      t: 1415,
      msg: "Transition <i  style='font-size: 0.73em;' class='large material-icons'>transfer_within_a_station</i>"
    }, {
      t: 1420,
      msg: "6th Period <i  style='font-size: 0.73em;' class='large material-icons'>class</i><br />  2:20 - 3:50"
    }, {
      t: 1550,
      msg: "3:50pm - Dismissed <i  style='font-size: 0.73em;' class='large material-icons'>exit_to_app</i>"
    }, {
      t: 2400,
      msg: "clock will reset <i  style='font-size: 0.73em;' class='large material-icons'>refresh</i>"
    },];
    let sl = sched.length;
  } else if (ver == "testingb" || ver == "9WTb" || skd == "testingb" || skd == "9WTb" || isToday(new Date('may 23, 2023'))   ) {
    schedTitle = "9Weeks Testing Bell B";
    var schoolACTIVE = true
    // ICONS https://materializecss.com/icons.html
    sched = [{
      t: 0,
      msg: "Good Morning! <i style='font-size: 0.73em;' class='large material-icons'>free_breakfast</i> <br /> First Period Starts at 8:20"
    }, {
      t: 820,
      msg: "3rd Period <i  style='font-size: 0.73em;' class='large material-icons'>class</i><br />   8:20 - 9:45"
    }, {
      t: 945,
      msg: "Transition <i  style='font-size: 0.73em;' class='large material-icons'>transfer_within_a_station</i>"
    }, {
      t: 950,
      msg: "4th Period <i  style='font-size: 0.73em;' class='large material-icons'>class</i><br />   9:50 - 11:15"
    }, {
      t: 1115,
      msg: "Transition <i  style='font-size: 0.73em;' class='large material-icons'>transfer_within_a_station</i>"
    }, {
      t: 1115,
      msg: "A Lunch <i  style='font-size: 0.73em;' class='large material-icons'>local_dining</i><br /> 11:15 - 11:45"
    }, {
      t: 1145,
      msg: "Transition <i  style='font-size: 0.73em;' class='large material-icons'>transfer_within_a_station</i>"
    }, {
      t: 1145,
      msg: "B Lunch <i  style='font-size: 0.73em;' class='large material-icons'>local_dining</i><br /> 11:45 - 12:15"
    }, {
      t: 1215,
      msg: "Transition <i  style='font-size: 0.73em;' class='large material-icons'>transfer_within_a_station</i>"
    }, {
      t: 1215,
      msg: "C Lunch <i  style='font-size: 0.73em;' class='large material-icons'>local_dining</i><br /> 12:15 - 12:45"
    }, {
      t: 1245,
      msg: "Transition <i  style='font-size: 0.73em;' class='large material-icons'>transfer_within_a_station</i>"
    }, {
      t: 1250,
      msg: "7th Period <i  style='font-size: 0.73em;' class='large material-icons'>class</i><br />  12:50 - 2:15"
    }, {
      t: 1415,
      msg: "Transition <i  style='font-size: 0.73em;' class='large material-icons'>transfer_within_a_station</i>"
    }, {
      t: 1420,
      msg: "8th Period <i  style='font-size: 0.73em;' class='large material-icons'>class</i><br />  2:20 - 3:50"
    }, {
      t: 1550,
      msg: "3:50pm - Dismissed <i  style='font-size: 0.73em;' class='large material-icons'>exit_to_app</i>"
    }, {
      t: 2400,
      msg: "clock will reset <i  style='font-size: 0.73em;' class='large material-icons'>refresh</i>"
    },];
    let sl = sched.length;
  } else {
    schedTitle = "Regular Bell";
    var schoolACTIVE = true
    sched = [{
      t: 0,
      msg: "Good Morning! <i style='font-size: 0.73em;' class='large material-icons'>free_breakfast</i> <br /> First Period Starts at 8:20"
    }, {
      t: 820,
      msg: "1st Period <i  style='font-size: 0.73em;' class='large material-icons'>class</i><br />   8:20 - 9:05"
    }, {
      t: 905,
      msg: "Transition <i  style='font-size: 0.73em;' class='large material-icons'>transfer_within_a_station</i>"
    }, {
      t: 910,
      msg: "2nd Period <i  style='font-size: 0.73em;' class='large material-icons'>class</i><br />   9:10 - 9:55"
    }, {
      t: 955,
      msg: "Transition <i  style='font-size: 0.73em;' class='large material-icons'>transfer_within_a_station</i>"
    }, {
      t: 1000,
      msg: "3rd Period <i  style='font-size: 0.73em;' class='large material-icons'>class</i><br />  10:00 - 10:45"
    }, {
      t: 1045,
      msg: "Transition <i  style='font-size: 0.73em;' class='large material-icons'>transfer_within_a_station</i>"
    }, {
      t: 1050,
      msg: "4th Period <i style='font-size: 0.73em;' class='material-icons'>class</i> <br />  10:50 - 11:35"
    }, {
      t: 1135,
      msg: "Transition <i  style='font-size: 0.73em;' class='large material-icons'>transfer_within_a_station</i>"
    }, {
      t: 1140,
      msg: "A Lunch <i  style='font-size: 0.73em;' class='large material-icons'>local_dining</i> <br /> 11:40 - 12:10"
    }, {
      t: 1210,
      msg: "Transition <i style='font-size: 0.73em;' class='large material-icons'>transfer_within_a_station</i>"
    }, {
      t: 1215,
      msg: "B Lunch <i  style='font-size: 0.73em;' class='material-icons'>local_dining</i><br /> 12:15 - 12:45"
    }, {
      t: 1245,
      msg: "Transition <i  style='font-size: 0.73em;' class='large material-icons'>transfer_within_a_station</i>"
    }, {
      t: 1250,
      msg: "C Lunch <i  style='font-size: 0.73em;' class='large material-icons'>local_dining</i><br /> 12:50 - 1:20"
    }, {
      t: 1320,
      msg: "Transition <i style='font-size: 0.73em;' class='large material-icons'>transfer_within_a_station</i>"
    }, {
      t: 1325,
      msg: "6th Period <i style='font-size: 0.73em;' class='large material-icons'>class</i> <br />  1:25 - 2:10"
    }, {
      t: 1410,
      msg: "Transition <i style='font-size: 0.73em;' class='large material-icons'>transfer_within_a_station</i>"
    }, {
      t: 1415,
      msg: "7th Period <i style='font-size: 0.73em;' class='large material-icons'>class</i><br />  2:15 - 3:00"
    }, {
      t: 1500,
      msg: "Transition <i style='font-size: 0.73em;' class='large material-icons'>transfer_within_a_station</i>"
    }, {
      t: 1505,
      msg: "8th Period <i style='font-size: 0.73em;' class='large material-icons'>class</i><br />  3:05 - 3:50"
    }, {
      t: 1550,
      msg: "3:50pm - Dismissed <i  style='font-size: 0.73em;' class='large material-icons'>exit_to_app</i>"
    }, {
      t: 2400,
      msg: "clock will reset <i  style='font-size: 0.73em;' class='large material-icons'>refresh</i>"
    }];
    let sl = sched.length;
  }

  document.getElementById("schedTitle")
    .innerHTML = schedTitle;

  let sl = sched.length;
  for (let i = 0; i < sl; i++) {
    if (currentTimeIndex >= sched[i].t) {
      currentMessage = sched[i].msg;
      document.getElementById("message")
        .innerHTML = currentMessage;
      nextMessage = "";
      plusNextMessage = "";

      let ni = i + 1;
      let nii = i + 2;
      if (ni < sl && nii < sl) {
        nextMessage = sched[ni].msg;
        document.getElementById("next-message")
          .innerHTML = "Next Up...<br />" + nextMessage;
        plusNextMessage = sched[nii].msg;
        document.getElementById("plus-next-message")
          .innerHTML = "Then...<br />" + plusNextMessage;
      }
      var countDown = (Math.trunc(sched[ni].t / 100) * 60 + sched[ni].t % 100) - (Math.trunc(currentTimeIndex / 100) * 60 + currentTimeIndex % 100);
      var countDownSeconds = 59 - d.getSeconds();
    }
  }

  if (!schoolACTIVE) { // some complex stuff I forgot what it does but I will try :p

    document.title = title; // Sets tab title to title var

    // Hides stuff to show stuff for when school is out
    document.getElementById("weekend").style.visibility = "visible";
    document.getElementById('clockbox').classList.add('center');
    document.getElementById("centerbox").classList.add('hide');
  } else if (countDown <= 5) {

    countDown = countDown - 1;
    var title = "Time left: " + countDown + ":" + (countDownSeconds < 10 ? '0' : '') + countDownSeconds
    document.getElementById("countdown")
      .innerHTML = "<span style='color: #CA1D27'>" + countDown + ":" + (countDownSeconds < 10 ? '0' : '') + countDownSeconds;
    if (countDown < 1) {

      Tinycon.setBubble((countDownSeconds < 10 ? '0' : '') + countDownSeconds);
      Tinycon.setOptions({
        width: 8,
        color: '#ffffff',
        background: '#FF5733 '
      });
    } else {
      Tinycon.setBubble(countDown);
      Tinycon.setOptions({
        width: 8,
        color: '#000',
        background: '#FFEA00'
      });
    }
    document.title = title;
    document.getElementById("weekend").style.visibility = "hidden";
    document.getElementById('clockbox').classList.remove('center');
    document.getElementById("centerbox").classList.remove('hide');
  } else if (countDown >= 60) {
    var title = Math.floor(countDown / 60) + " hour(s) " + countDown % 60 + " minutes";
    document.getElementById("countdown")
      .innerHTML = "<span style='color: silver'>" + Math.floor(countDown / 60) + " hour(s) " + countDown % 60 + " minutes </style>";
    Tinycon.setBubble(0)
    document.title = title;
    document.getElementById("weekend").style.visibility = "hidden";
    document.getElementById('clockbox').classList.remove('center');
    document.getElementById("centerbox").classList.remove('hide');
  } else {
    var title = "Minutes Remaining: " + countDown;
    document.getElementById("countdown")
      .innerHTML = "<span style='color: silver'>Minutes Remaining: </style>" + countDown;
    Tinycon.setBubble(0)
    document.title = title;
    document.getElementById("weekend").style.visibility = "hidden";
    document.getElementById('clockbox').classList.remove('center');
    document.getElementById("centerbox").classList.remove('hide');
  }
  var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];


  var day = days[currentDayOfWeek];

  var date = day + ", " + toMonthName(currentMonth) + " " + d.getDate() + ", " + d.getFullYear();
  document.getElementById("clock")
    .innerHTML = clocktext;
  document.getElementById("date")
    .innerHTML = date;
  setTimeout(function() {

    bellSchedule()



  }, 1000);
}
