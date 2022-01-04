function get_sailtime() {
    let now = new Date();
    let sailtime = new Date("Sun Jan 02 2022 03:30:29 GMT+0900"); //time.bora.net 기준
    while(sailtime.getTime() - 30*1000 < now.getTime())
        sailtime.setTime(sailtime.getTime() + 11*60*1000);
    return sailtime
}

function erin(time){
    mils = (time.getTime() - new Date(moment(time).format("YYYY-MM-DD 00:00:00.0000")).getTime());
    erinmils = mils / 36 * 24 * 60;
    return moment(erinmils).utc().format("에린 시간 : hh:mm:ss");
}

function update_clock(){
    let now = new Date();
    let sailtime = get_sailtime();
    let remain = moment.duration(sailtime.getTime() - now.getTime());
    document.querySelector("#now").innerHTML = moment(now).format("현재 시각 : YY-MM-DD hh:mm:ss");
    document.querySelector("#nowerin").innerHTML = erin(now);
    document.querySelector("#nextsail").innerHTML = moment(sailtime).format("다음 출항 : YY-MM-DD hh:mm:ss");
    document.querySelector("#erintime").innerHTML = erin(sailtime);
    document.querySelector("#remain").innerHTML = "출항까지 남은 시간 : " + remain.minutes() + "분 " + remain.seconds() + "초";
}

function onload(){
    setInterval(update_clock, 100);
}
