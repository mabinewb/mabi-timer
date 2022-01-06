function get_sailtime(firstsail = "2022-01-06 15:58:23 GMT+0900", mod = 11) {
    let now = new Date();
    let sailtime = new Date(firstsail); //time.bora.net 기준
    while(sailtime.getTime() - 30*1000 < now.getTime())
        sailtime.setTime(sailtime.getTime() + mod*60*1000);
    return sailtime
}

function erin(time, diff = 0){
    time = new Date(time.getTime() + diff*1000);
    let mils = (time.getTime() - new Date(time.format("yyyy-mm-dd 00:00:00.0000")).getTime());
    let erinmils = mils / 36 * 24 * 60;
    return new Date(erinmils).format("UTC:HH:MM:ss");
}

function update_clock(){
    let clocktype = document.querySelector("#clocktype");
    let now = new Date();
    let sailtime = clocktype.value == "iria" ? get_sailtime() : get_sailtime("2022-01-06 15:56:53 GMT+0900", 6);
    let remain = sailtime.getTime() - now.getTime();
    if(remain <= 60*1000){
        document.querySelector("#container").className = "red";
    } else if(remain <= 120*1000){
        document.querySelector("#container").className = "orange";
    } else {
        document.querySelector("#container").className = "";
    }
    let remain_min = parseInt(remain / 1000 / 60);
    let remain_sec = parseInt(remain / 1000 % 60);
    document.querySelector("#left").innerHTML = clocktype.value == "iria" ? "이리아" : "벨바스트";
    document.querySelector("#left").className = clocktype.value == "iria" ? "iria" : "belfast";
    document.querySelector("#now").innerHTML = "현재 시간 : " + now.format("yy-mm-dd HH:MM:ss");
    document.querySelector("#nowerin").innerHTML = "( 현재 에린 시간 : " + erin(now) + " )";
    document.querySelector("#nextsail").innerHTML = "다음 출항 시간 : " + sailtime.format("yy-mm-dd HH:MM:ss");
    document.querySelector("#erintime").innerHTML = "( 출항 에린 시간 : " + erin(sailtime) + " )";
    document.querySelector("#erintime_arrival").innerHTML = "( 도착 에린 시간 : " + (clocktype.value == "iria" ? erin(sailtime, 4 * 60) : erin(sailtime, 2 * 60)) + " )";
    document.querySelector("#remain").innerHTML = "출항까지 남은 시간 : " + (remain_min == 0 ? "" : remain_min + "분 ") + remain_sec + "초";
}

function start_clock(){
    setInterval(update_clock, 100);
}

function change(){
    let clocktype = document.querySelector("#clocktype");
    clocktype.value = clocktype.value == "iria" ? "belfast" : "iria";
}
