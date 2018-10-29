function Calendar(){
    var self = this;
    this.monthName = ["Janvier", "Février", "Mars", "Avril","Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre","Décembre"];
    this.dayName = ["D","L","M","M","J","V","S"];
    this.currentMonthNumber;
    this.currentYear;
    this.currentDay;
    this.currentDayNumber;
    var nowDate = new Date();
    this.NowDate = nowDate.getDate();
    this.NowFullYear = nowDate.getFullYear();
    this.NowMonth = nowDate.getMonth();
    

    this.createCalendar = function(d,val){
        let firstDay = new Date(d.getFullYear(), d.getMonth(), 1);
        this.day_no = firstDay.getDay();
        let lastDayOfMonth = new Date(d.getFullYear(), d.getMonth()+1, 0);
        this.lastDateOfMonth = lastDayOfMonth.getDate();
        let currentMonth = this.monthName[d.getMonth()];
        self.currentYear = d.getFullYear();
        self.currentMonthNumber = d.getMonth();
        if (val == 1){
            self.currentDate = d.getDate();
        }
        self.currentDay = this.dayName[d.getDay()];
        document.getElementById("calendar-month").innerHTML = currentMonth;
        document.getElementById("calendar-year").innerHTML = self.currentYear;
        let calendarTable = this.createTable(this.day_no,this.lastDateOfMonth,val);
        document.getElementById("calendar-days").appendChild(calendarTable);
        val = 1;
    }
    
    this.createTable = function(val){
        let table = document.createElement('table');
        let tr = document.createElement('tr');
        var cellContent = "Contenue </br> Contenue </br> Contenue </br> Contenue";
        this.concatDate = "";
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
            var selfMonthPusOne = self.currentMonthNumber + 1;
            this.concatDate = self.currentYear + "-" + selfMonthPusOne + "-" + count;
            this.rtvRdvEmp(this.concatDate);
            var td = document.createElement('td');
            if (self.currentYear == self.NowFullYear && self.currentMonthNumber == self.NowMonth && self.currentDate == self.NowDate && val == 1){
                if (count == self.NowDate){
                    td.innerHTML = '<div id = "numberDayCellToday" >' + count +  '</div>' + '<div id = "contentCell">' + cellContent +'</div>';
                }
                else{
                    td.innerHTML = '<div id = "numberDayCell">' + count +  '</div>' + '<div id = "contentCell">' + cellContent +'</div>';
                }
            }
            else{
                td.innerHTML = '<div id = "numberDayCell">' + count +  '</div>' + '<div id = "contentCell">' + cellContent +'</div>';
            }
            count++;
            //td.setAttribute("type", "button");
            td.setAttribute("id", "dayCells");
            tr.appendChild(td);
        }
        table.appendChild(tr);

        //Creaton rest of the row
        for(var r=3; r<= 7; r++){
            tr = document.createElement('tr');
            for(var c=0; c<= 6; c++){
                var selfMonthPusOne = self.currentMonthNumber + 1;
                this.concatDate = self.currentYear + "-" + selfMonthPusOne + "-" + count;
                var testPAL = this.rtvRdvEmp(this.concatDate);
                console.log(testPAL);
                if(count>this.lastDateOfMonth){
                    table.appendChild(tr);
                    return table;
                }
                var td = document.createElement('td');
                //td.setAttribute("type", "button");
                td.setAttribute("id", "dayCells");
                if (self.currentYear == self.NowFullYear && self.currentMonthNumber == self.NowMonth && self.currentDate == self.NowDate && val == 1){
                    if (count == self.NowDate){
                        td.innerHTML = '<div id = "numberDayCellToday" >' + count +  '</div>' + '<div id = "contentCell">' + cellContent +'</div>';
                    }
                    else{
                        td.innerHTML = '<div id = "numberDayCell">' + count +  '</div>' + '<div id = "contentCell">' + cellContent +'</div>';
                    }
                }
                else{
                    td.innerHTML = '<div id = "numberDayCell">' + count +  '</div>' + '<div id = "contentCell">' + cellContent +'</div>';
                }
                count++
                tr.appendChild(td);
            }
            table.appendChild(tr);
        } 
    }

    this.nextMonth = function(){
        this.monthPlusOne = self.currentMonthNumber + 1;
        let d = new Date(self.currentYear, this.monthPlusOne, 1);
        self.currentDate = self.NowDate;
        self.resetCalendar();
        self.createCalendar(d,0);
    }

    this.previousMonth = function(){
        this.monthPlusOne = self.currentMonthNumber - 1;
        let d = new Date(self.currentYear, this.monthPlusOne, 1);
        self.currentDate = self.NowDate;
        self.resetCalendar();
        self.createCalendar(d,0);
    }

    this.rtvRdvEmp = function(dateRdv){
        const xhr = new XMLHttpRequest();
        var vars = "dateRdv="+dateRdv;
        var stringConcat ="";
        xhr.open("POST", "Script/PHP/rtvRdvEmp.php", true);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.onreadystatechange = function() {
            if(xhr.readyState == 4 && xhr.status == 200) {
                var obj = JSON.parse(xhr.responseText);
                if (obj.data.length > 0){
                    for (var i = 0; i < obj.data.length; i++) {
                        let prenom = obj.data[i].prenom;
                        let nom = obj.data[i].nom;
                        let abreviation = obj.data[i].abreviation;
                        stringConcat = stringConcat + "<a>" + prenom + " " + nom + " " + abreviation + "</a>" + "</br>";
                    }
                    console.log(stringConcat);
                }            
            }
        }
        xhr.send(vars); 
    }

}

Calendar.prototype.resetCalendar = function(){
    document.getElementById("calendar-month").innerHTML = "";
    document.getElementById("calendar-year").innerHTML = "";
    document.getElementById("calendar-days").innerHTML = "";
}
