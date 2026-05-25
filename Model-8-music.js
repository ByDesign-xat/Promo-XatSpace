// why is math so hard

$(document).ready(function(){

var aaa = document.getElementById("audio");

aaa.addEventListener("timeupdate", function(){
    $(".tinfoil").addClass("oven");
    
    var now = parseFloat(aaa.currentTime),
        MP = "0" + Math.floor(now / 60),
        SP = "0" + (Math.floor(now) - MP * 60),
        _now = MP.substr(-2) + ":" + SP.substr(-2);
    var wtf = parseInt
    (((aaa.currentTime / aaa.duration) * 100), 10);
    
    var gr = "linear-gradient(",
    gr1 = ", transparent 50%, var(--Progress-Empty) 50%), ",
    gr_over50 = ", transparent 50%, var(--Progress-Fill) 50%), ",
    gr2 = ", var(--Progress-Empty) 50%, transparent 50%",
    pct = Math.floor((360 * (wtf * 0.01)) + 90),
    pct_over50 = Math.floor((360 * (wtf * 0.01)) - 90);
    
    if (wtf == 100) {
        $(".oliveoil").css("background-image","none");
    }
    
    if (wtf >= 0 && wtf <= 50) {
        $(".oliveoil").css({
        "background-image":
            gr + pct + "deg" + gr1 +
            gr + "90deg" + gr2,
        });
    }
    
    if (wtf >= 51 && wtf <= 99) {
        $(".oliveoil").css({
        "background-image":
            gr + pct_over50 + "deg" + gr_over50 +
            gr + "90deg" + gr2,
        });
    }
});//end eventlistener

var hasAutoplay = $("#audio").attr("autoplay");

if (typeof hasAutoplay !== typeof undefined && hasAutoplay !== false) {
    $(".pausee").addClass("aff");
    $(".playy").addClass("beff");
}
    
$(".cherry").click(function(){
    if (aaa.paused) {
      aaa.play();
      $(".pausee").toggleClass("aff");
      $(".playy").toggleClass("beff");
    } else {
      aaa.pause();
      $(".playy").toggleClass("beff");
      $(".pausee").toggleClass("aff");
    }
});

aaa.onended = function(){
    $(".playy").removeClass("beff");
	$(".pausee").removeClass("aff");
	$(".tinfoil").removeClass("oven");
};

});// ready end