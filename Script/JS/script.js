let calendar = new Calendar();
var d = new Date();
calendar.createCalendar(d,1);


document.getElementById("nextMonth").addEventListener('click', calendar.nextMonth ,false);
document.getElementById("previousMonth").addEventListener('click', calendar.previousMonth ,false);
