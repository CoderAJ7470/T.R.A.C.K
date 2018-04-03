/* Author: Turbofan */
/* Last Updated: March 26, 2018 */

$(function(){

    window.addEventListener("load", function(){
        $("input").each(function(){
            $(input).val("");
        });
    });

    let vaCodeButton = $(".chooseVACode");
    $(vaCodeButton).on("click", function(){
        $(".vaCodes").slideToggle(500, "swing");
    });

    let statusButton = $(".chooseFlightStatus");
    $(statusButton).on("click", function(){
        $(".depOrArr").slideToggle(500, "swing");
    });

    let vaCodeInput = $(".vaCodeInput");
    $(vaCodeInput).change(function(){
        $(vaCodeButton).html("Choose a VA");
    });

    $(".vaCodes a").each(function(){
        $(this).on("click", function(){
            let choice = $(this).text();
            $(".vaCodes").slideUp();
            $(vaCodeButton).html(choice);

            if($(".vaCodeInput").val() != undefined){
                $(".vaCodeInput").val("");
            }
            
        });
    });

    $(".depOrArr a").each(function(){
        $(this).on("click", function(){
            let status = $(this).text();
            $(".depOrArr").slideUp();
            $(statusButton).html(status);
        });
    });

    

});