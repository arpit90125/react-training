function fillDaySelect(){
    let selectDay = document.getElementById("day");
    for (let i = 1;i<=31;i++)
    {
        let x = document.createElement("option");
        x.text = i;
        x.value = i;
        selectDay.add(x);
    }
}

function fillMonthSelect(){
    let selectMonth = document.getElementById("month");
    let monthName = ['Jan' , 'Feb' , 'Mar' , 'Apr' , 'May' , 'Jun' , 'Jul' , 'Aug' ,'Sep' ,'Oct' ,'Nov' ,'Dec'];
    for(let i=0;i<12;i++){
        let x = document.createElement("option");
        x.text = monthName[i];
        x.value = i;
        selectMonth.add(x);
    }
}

function fillYearSelect(){
    let selectYear = document.getElementById("year");
    for (let i = 2020;i>=1900;i--)
    {
        let x = document.createElement("option");
        x.text = i;
        x.value = i;
        selectYear.add(x);
    }
}


function verifyDate()
{
    let day = document.getElementById("day");
    let month = document.getElementById("month");
    let year = document.getElementById("year");
    let today = new Date();
    console.log(today.getFullYear() - year.value , today.getMonth(),Number(month.value) , today.getDate() ,day.value)
    let outputMsg = "";
    if(today.getFullYear() - year.value < 13)
    {
        outputMsg = "you are under age";
    }
    else if (today.getFullYear() - year.value === 13 && today.getMonth() < Number(month.value)){
        outputMsg = "you are under age";
    }
    else if ( today.getFullYear() - year.value === 13 && today.getMonth() === Number(month.value) && today.getDate() < Number(day.value))
    {
        outputMsg = "you are under age";
    }
    else{
        outputMsg = "welcome to facebook";
    }
    let para = document.getElementById("para");
    para.innerText = outputMsg;
    document.getElementById("output").appendChild(para);
    if(outputMsg === "you are under age")
        document.getElementById("output").style.border = "1px solid red";
    else
    document.getElementById("output").style.border = "1px solid black";
}
fillDaySelect();
fillMonthSelect();
fillYearSelect();