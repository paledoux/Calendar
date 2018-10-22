var monthName = ["Janvier", "Février", "Mars", "Avril","Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre","Décembre"];
var dayName = ["Dimanche","Lundi","Mardi","Mercredi","Jeudi","Vendredi","Samedi"];
var currentYear;
var currentMonthNumber;

window.onload = function(){
    var d = new Date();
    createCalendar(d)
} 

function createCalendar(d){
    var firstDay = new Date(d.getFullYear(), d.getMonth(), 1);
    var day_no = firstDay.getDay();
    var lastDayOfMonth = new Date(d.getFullYear(), d.getMonth()+1, 0);
    lastDateOfMonth = lastDayOfMonth.getDate();
    var currentMonth = monthName[d.getMonth()];
    currentYear = d.getFullYear();
    currentMonthNumber = d.getMonth();
    var currentDay = dayName[d.getDay()];
    var currentDate = d.getDate();
    document.getElementById("calendar-month").innerHTML = currentMonth;
    document.getElementById("calendar-year").innerHTML = currentYear;
    var calendarTable = createTable(day_no,lastDateOfMonth);
    document.getElementById("calendar-days").appendChild(calendarTable);
};

function createTable(day_no,lastDateOfMonth){
    var table = document.createElement('table');
    var tr = document.createElement('tr');

    //Creation name days row
    for(var c=0; c<= 6; c++){
        var td = document.createElement('td');
        td.innerHTML = dayName[c];
        tr.appendChild(td);
    }
    table.appendChild(tr);

    //Creation empty Date row
    tr = document.createElement('tr');
    var c=0;
    for(;c <= 6; c++){
        if (c == day_no){
            break;
        }
        var td = document.createElement('td');
        td.innerHTML = "";
        tr.appendChild(td);
    }
    table.appendChild(tr);


    //Creation number Date row
    var count = 1;
    for(; c<= 6; c++){
        var td = document.createElement('td');
        td.innerHTML = count;
        count++;
        tr.appendChild(td);
    }
    table.appendChild(tr);


    //Creaton rest of the row
    for(var r=3; r<= 7; r++){
        tr = document.createElement('tr');
        for(var c=0; c<= 6; c++){
            if(count>lastDateOfMonth){
                table.appendChild(tr);
                return table;
            }
            var td = document.createElement('td');
            td.innerHTML = count;
            count++
            tr.appendChild(td);
        }
        table.appendChild(tr);
    } 
};

function resetCalendar(){
    document.getElementById("calendar-month").innerHTML = "";
    document.getElementById("calendar-year").innerHTML = "";
    document.getElementById("calendar-days").innerHTML = "";
};

/*var nextMonthButton = document.getElementById("nextMonth");
var previousMonthButton = document.getElementById("previousMonth");
nextMonthButton.addEventListener('click', function(){
    var monthPlusOne = currentMonthNumber + 1;
    var d = new Date(currentYear, monthPlusOne, 1);
    resetCalendar();
    createCalendar(d);
});*/
var nextMonthButton = document.getElementById("nextMonth");
var previousMonthButton = document.getElementById("previousMonth");
nextMonthButton.addEventListener('click', changeMonth ,false);
previousMonthButton.addEventListener('click', changeMonth ,false);

function changeMonth(){
    var monthPlusOne = currentMonthNumber + 1;
    var d = new Date(currentYear, monthPlusOne, 1);
    resetCalendar();
    createCalendar(d);
};


/*
utiliser la meme function tout dependant du bouton changer pour +1 ou -1
*/



