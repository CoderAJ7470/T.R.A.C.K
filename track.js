/* Author: Turbofan */
/* Last Updated: March 26, 2018 */

$(function(){

    let vaCodeButton = $(".chooseVACode");
    $(vaCodeButton).on("click", function(){
        $(".vaCodes").slideToggle(500, "swing");
    });

    let statusButton = $(".chooseFlightStatus");
    $(statusButton).on("click", function(){
        $(".depOrArr").slideToggle(500, "swing");
    });

    $(".vaCodes a").each(function(){
        $(this).on("click", function(){
            let choice = $(this).text();
            $(".vaCodes").slideUp();
            $(vaCodeButton).html(choice);
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