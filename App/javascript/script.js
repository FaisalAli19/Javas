
$(function() {
    var countSession = parseInt($(".session h3").html());
    var countBreak = parseInt($(".break h3").html());
    var buzzer = $("#buzz")[0];

    //Increament the break number
    $(".break .plus").click(function(e) {
        e.preventDefault();
        countBreak += 5;
        $(".break h3").html(countBreak);
    });

    //Decreament the break number
    $(".break .minus").click(function(e) {
        e.preventDefault();
        if(countBreak > 5){
            countBreak -= 5;
            $(".break h3").html(countBreak);
        }
    });

    //Increament the session number
    $(".session .plus").click(function(e) {
        e.preventDefault();
        countSession += 5;
        $(".session h3").html(countSession);
    });

    //Decreament the session number
    $(".session .minus").click(function(e) {
        e.preventDefault();
        if(countSession > 25){
            countSession -= 5;
            $(".session h3").html(countSession);
        }
    });

    var countDown;
    var breakCountDown;
    var countSessionNew;
    var countBreakNew;


    //Start the timer
    $(".start").click(function(e) {
        e.preventDefault();
        countSession = parseInt($(".session h3").html());
        countBreak = parseInt($(".break h3").html());
        countSessionNew = countSession * 60;
        countBreakNew = countBreak * 60;

        // Start countdown
        countDown = setInterval(timer, 1000);


        //countdown function
        function timer(){
            countSessionNew -= 1;
            if(countSessionNew === 0){
                clearInterval(countDown);
                sessionTimer(countSessionNew);
                buzzer.play();
                //Start Break countDown
                breakCountDown = setInterval(timerBreak, 1000);
            }else{
                sessionTimer(countSessionNew);
            }
        }

        //breakCountDown function
        function timerBreak(){
            countBreakNew -= 1;
            if(countBreakNew === 0){
                clearInterval(breakCountDown);
                breakTimer(countBreakNew);
                buzzer.play();
            }else{
                breakTimer(countBreakNew);
            }
        }

        // Hide start button
        $(".start").addClass("hide");
        //Show reset button
        $(".reset").removeClass("hide");
    });

    //Reset timer
    $(".reset").click(function(e) {
        e.preventDefault();

        clearInterval(countDown);
        clearInterval(breakCountDown);

        countSessionNew = 0;
        countBreakNew = 0;

        sessionTimer(countSessionNew);
        breakTimer(countBreakNew);

        $(".title").html("");

        //hide reset button
        $(".reset").addClass("hide");
        // show start button
        $(".start").removeClass("hide");
    })
});

//Calculate the time in seconds and add the same to timer
function sessionTimer(time){
    var seconds = Math.floor(time % 60);
    var minutes = Math.floor(time / 60);

    if(minutes < 10){
        minutes = `0${minutes}`
    }

    if(seconds < 10){
        seconds = `0${seconds}`
    }

    //Insert the time to clock
    $(".time").html(`${minutes}:${seconds}`);
    $(".title").html("Session");
}

//Calculate the time in seconds and add the same to break timer
function breakTimer(time){
    var seconds = Math.floor(time % 60);
    var minutes = Math.floor(time / 60);

    if(minutes < 10){
        minutes = `0${minutes}`
    }

    if(seconds < 10){
        seconds = `0${seconds}`
    }

    //Insert the time to clock
    $(".time").html(`${minutes}:${seconds}`);
    $(".title").html("Break");
}
