var Cname = '';
var days;
var today;
var search = document.getElementById('search');
var UrlValid = false;

var dayName1 = document.getElementById('dayName1');
var dayDate1 = document.getElementById('dayDate1');
var degreeIcon1 = document.getElementById('degreeIcon1');
var avgdegree1 = document.getElementById('avgdegree1');
var moreinfo1 = document.getElementById('moreinfo1');

var dayName2 = document.getElementById('dayName2');
var dayDate2 = document.getElementById('dayDate2');
var degreeIcon2 = document.getElementById('degreeIcon2');
var avgdegree2 = document.getElementById('avgdegree2');
var moreinfo2 = document.getElementById('moreinfo2');


async function findCity() {
    var Location = await fetch('https://api.ipgeolocation.io/ipgeo?apiKey=38b2e7b22652465baa811f36cd488797&fields=city');
    var L = await Location.json();
    getData(L.city);
    // console.log(L.city);
}
findCity();


async function getData(city) {
    var resp = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=7c1748c30d59486d972163455230508&q=${city}&days=3`);
    console.log(resp);
    if (!resp.ok || resp.status != 200) {
        UrlValid = true;
    } else {
        if (resp.ok || (resp.status >= 200 && resp.status <= 299)) {
            var info = await resp.json();
            Cname = info.location.name;
            today = info.current;
            days = info.forecast.forecastday;

            // console.log(today);
            // console.log(Cname);
            // console.log(days);

            displayName(Cname)
            displayToday(today);
            displayDays(dayName1, dayDate1, degreeIcon1, avgdegree1, moreinfo1, days[1]);
            displayDays(dayName2, dayDate2, degreeIcon2, avgdegree2, moreinfo2, days[2]);
        }

    }

}


var city = document.getElementById('city');
function displayName(name) {
    city.innerHTML = Cname;
}


var todayName = document.getElementById('todayName');
var todayDate = document.getElementById('todayDate');
var todayDegree = document.getElementById('todayDegree');
var todayCondition = document.getElementById('todayCondition');
var todayDegreeIcon = document.getElementById('todayDegreeIcon');
var moreInfo = document.getElementById('moreInfo');
function displayToday(Today) {
    todayName.innerHTML = `${dayName(Today.last_updated)}`;
    var dateNumbers = Today.last_updated.slice(0, 10);
    todayDate.innerHTML = dateNumbers;

    todayDegree.innerHTML = `${Today.temp_c}<sup>o</sup>C`;
    todayCondition.innerHTML = Today.condition.text;
    document.getElementById("todayDegreeIcon").src = Today.condition.icon;

    moreInfo.innerHTML = `<span><i class="fa-solid fa-water"></i>${Today.humidity}%</span>
    <span><i class="fa-solid fa-wind"></i>${Today.wind_kph}Km/h</span>`;
}

function displayDays(daysName, daysDate, daysDegreeIcon, avgDegree, moreInfo, days) {
    daysName.innerHTML = dayName(days.date);
    daysDate.innerHTML = days.date;
    daysDegreeIcon.src = days.day.condition.icon;
    avgDegree.innerHTML = days.day.avgtemp_c;
    moreInfo.innerHTML = `<span>max ${days.day.maxtemp_c}<sup>o</sup>C</span>
    <span>${days.day.condition.text}</span>
    <span>min ${days.day.mintemp_c}<sup>o</sup>C</span>`;
}

search.addEventListener('keyup', function () {
    var NameRegex = /[a-zA-z]{3,}/;
    if (NameRegex.test(search.value) && UrlValid == false) {
        getData(search.value);
    } else {
        if (UrlValid==true) {
            alert('Enter valid Name!!')
        }
    }
    UrlValid=false;
})

function dayName(currentTime) {
    var weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    var d = new Date(currentTime);
    let day = weekday[d.getDay()];
    return day;
}
