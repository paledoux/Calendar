function Calendar(){
    this.monthName = ["Janvier", "Février", "Mars", "Avril","Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre","Décembre"];
    this.dayName = ["D","L","M","M","J","V","S"];

    currentData = {
        currentMonthNumber:0,
        currentYear:0
    };

    this.createCalendar = function(d){
        let firstDay = new Date(d.getFullYear(), d.getMonth(), 1);
        this.day_no = firstDay.getDay();
        let lastDayOfMonth = new Date(d.getFullYear(), d.getMonth()+1, 0);
        this.lastDateOfMonth = lastDayOfMonth.getDate();
        let currentMonth = this.monthName[d.getMonth()];
        currentData.currentYear = d.getFullYear();
        currentData.currentMonthNumber = d.getMonth();
        var currentDay = this.dayName[d.getDay()];
        var currentDate = d.getDate();
        document.getElementById("calendar-month").innerHTML = currentMonth;
        document.getElementById("calendar-year").innerHTML = currentData.currentYear;
        let calendarTable = this.createTable(this.day_no,this.lastDateOfMonth);
        document.getElementById("calendar-days").appendChild(calendarTable);
    }

    this.createTable = function(){
        let table = document.createElement('table');
        let tr = document.createElement('tr');
        var cellContent = "Contenue"
        //Creation name days row
        for(var c=0; c<= 6; c++){
            var td = document.createElement('td');
            td.innerHTML = this.dayName[c];
            td.setAttribute("id", "nameCells");
            tr.appendChild(td);
        }
        table.appendChild(tr);

        //Creation empty Date row
        tr = document.createElement('tr');
        var c=0;
        for(;c <= 6; c++){
            if (c == this.day_no){
                break;
            }
            var td = document.createElement('td');
            td.innerHTML = "";
            td.setAttribute("id", "emptyCells");
            tr.appendChild(td);
        }
        table.appendChild(tr);

        //Creation number Date row
        var count = 1;
        for(; c<= 6; c++){
            var td = document.createElement('td');
            td.innerHTML = '<div id = "numberDayCell">' + count +  '</div>' + '<div id = "contentCell">' + cellContent +'</div>';
            count++;
            td.setAttribute("type", "button");
            td.setAttribute("id", "dayCells");
            tr.appendChild(td);
        }
        table.appendChild(tr);

        //Creaton rest of the row
        for(var r=3; r<= 7; r++){
            tr = document.createElement('tr');
            for(var c=0; c<= 6; c++){
                if(count>this.lastDateOfMonth){
                    table.appendChild(tr);
                    return table;
                }
                var td = document.createElement('td');
                td.setAttribute("type", "button");
                td.setAttribute("id", "dayCells");
                td.innerHTML = '<div id = "numberDayCell">' + count +  '</div>' + '<div id = "contentCell">' + cellContent +'</div>';
                count++
                tr.appendChild(td);
            }
            table.appendChild(tr);
        } 
    }

    this.nextMonth = function(){
        this.monthPlusOne = currentData.currentMonthNumber + 1;
        let d = new Date(currentData.currentYear, this.monthPlusOne, 1);
        this.resetCalendar();
        this.createCalendar(d);
    }

    this.previousMonth = function(){
        this.monthPlusOne = currentData.currentMonthNumber - 1;
        let d = new Date(currentData.currentYear, this.monthPlusOne, 1);
        this.resetCalendar();
        this.createCalendar(d);
    }

    /*this.resetCalendar = function(){
        document.getElementById("calendar-month").innerHTML = "";
        document.getElementById("calendar-year").innerHTML = "";
        document.getElementById("calendar-days").innerHTML = "";
    }*/

    document.getElementById("nextMonth").addEventListener('click', this.nextMonth ,false);
    document.getElementById("previousMonth").addEventListener('click', this.previousMonth ,false);

}

Calendar.prototype.resetCalendar = function(){
    document.getElementById("calendar-month").innerHTML = "";
    document.getElementById("calendar-year").innerHTML = "";
    document.getElementById("calendar-days").innerHTML = "";
}


