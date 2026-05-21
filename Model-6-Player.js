
/*---------------------------------------------------
    
    MUSIC PLAYER #01 by glenthemes
    
    Initial release: 2017/04/10
    Major code update: 2021/08/12
	Last updated: 2021/08/12
    
    hi there traveller!
    it's been a tradition of mine to put hidden
    learning resources here in the comments, so
    let's continue that :)
    
    to build a music player you need javascript
    as well as html components. css is wherever you
    want the player to be and how you want it to look!
    
    > audio javascript:
      https://www.w3schools.com/jsref/dom_obj_audio.asp
    > audio html:
      https://www.w3schools.com/tags/tag_audio.asp
    
---------------------------------------------------*/

var barvert = "data:image/svg+xml;charset=utf8,<svg xmlns='http://www.w3.org/2000/svg' version='1.0' width='100.000000pt' height='500.000000pt' viewBox='0 0 100.000000 500.000000' preserveAspectRatio='xMidYMid meet'> <g transform='translate(0.000000,500.000000) scale(0.100000,-0.100000)' fill='black' stroke='none'> <path d='M390 4971 c-89 -29 -141 -60 -206 -125 -72 -72 -124 -171 -151 -283 -17 -74 -18 -179 -18 -2068 0 -1915 1 -1993 19 -2060 58 -219 182 -354 368 -405 74 -20 89 -21 142 -11 186 38 308 141 384 323 64 152 62 98 62 2176 0 1818 -1 1880 -20 1987 -43 245 -175 408 -379 469 -68 20 -130 19 -201 -3z'/> </g> </svg>";

document.documentElement.style.setProperty('--barvert','url("' + barvert + '")');

$(document).ready(function(){
    $(".tumblr_preview_marker___").remove();
    
    var songis = document.getElementById("music-id");
    
    $("#music-id").each(function(){
        var mp3 = $.trim($(this).attr("src"));
        mp3 = mp3.replaceAll("?dl=0","").replaceAll("www.dropbox","dl.dropbox");
        $(this).attr("src",mp3)
    })
    
    $("[glenplayer01]").each(function(){
        $(this).wrapInner("<div class='cereal'>");
    })
    
    $(".cereal").each(function(){
        $(this).before("<div class='fryingpan'>");
    })
    
    $("[glenplayer01] [top-text]").each(function(){
        if(!$(this).parent().is(".musictext")){
            if($(this).next().is("[bottom-text]")){
                $(this).add($(this).next()).wrapAll("<div class='musictext'>");
            }
            
            if(!$(this).next("[bottom-text]").length){
                $(this).wrap("<div class='musictext'>");
            }
        }
    })
    
    $("[glenplayer01] [bottom-text]").each(function(){
        if(!$(this).parent().is(".musictext")){
            if($(this).prev().is("[top-text]")){
                $(this).add($(this).prev()).wrapAll("<div class='musictext'>");
            }
            
            if(!$(this).prev("[top-text]").length){
                $(this).wrap("<div class='musictext'>");
            }
        }
    })
    
    $(".cereal").find("audio").before("<div class='circ'></div>");
    
    $(".circ").each(function(){
        $(this).append("<div class='macaroni'>");
        $(this).append("<div class='cheese'>");
    })
    
    $(".circ .cheese").each(function(){
        $(this).prepend("<div class='bartender'>");
        for(var idkloops=0; idkloops<5; ++idkloops){
            $(this).find(".bartender").append("<div class='vodka'>");
        }
    })
    
    setTimeout(function(){
    
        $(".musictext").wrap("<div class='gouache'>");
        
        var sonic = getComputedStyle(document.documentElement).getPropertyValue("--MusicPlayer-SlideOut-Speed");
        
        var sonic_val = parseFloat(sonic);
        var sonic_units = sonic.replace(/[^A-Za-z]/g,'');
        
        if(sonic_units == "s"){
            sonic_val = sonic_val * 1000;
        }
        
        var mw = $(".gouache").width();
        $("[glenplayer01]").css("margin-left",-mw)
        
        setTimeout(function(){
            $("[glenplayer01]").css({
                "visibility":"visible",
                "opacity":"1"
            });
        },sonic_val)
        
        $(".circ").click(function(){
            if(songis.paused){
                songis.play();
                $(".macaroni").hide();
                $(".cheese").show();
            } else {
                songis.pause();
                $(".macaroni").show();
                $(".cheese").hide();
            }
        })
        
        var ap = $("#music-id").attr("autoplay");
        
        $("#music-id[autoplay]").each(function(){
            $(this).removeAttr("autoplay");
            $(this).addClass("ap-yes");
        })
        
        if($("#music-id").hasClass("ap-yes")){
            $(".macaroni").hide();
            $(".cheese").show();
            if(songis.paused){
                songis.play();
            }
			
			$(window).load(function(){
				if(songis.paused){
					songis.play();
				}
			});
        }
        
        songis.onended = function(){
            $(".macaroni").show();
            $(".cheese").hide();
        }
    
    },420)
    
})//end ready
