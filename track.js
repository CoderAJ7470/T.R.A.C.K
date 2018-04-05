/* Author: Turbofan */
/* Last Updated: March 26, 2018 */

$(function(){

    /* Variables */
    let vaCodeButton = $(".chooseVACode");
    let statusButton = $(".chooseFlightStatus");
    let vaCodeInput = $(".vaCodeInput");
    let fltNoInput = $(".fltNoInput");
    let aircraftTypeInput = $(".aircraftTypeInput");
    let goButton = $(".generateFlightTabButton");
    let userInputValid = false;

    /* Re-set input fields on window refresh */
    window.onload = function(){
        if($(vaCodeInput).val() != undefined){
            $(vaCodeInput).val("");
        }

        if($(fltNoInput).val() != undefined){
            $(fltNoInput).val("");
        }

        if($(aircraftTypeInput).val() != undefined){
            $(aircraftTypeInput).val("");
        }
    }

    /* Click handlers for buttons */
    $(vaCodeButton).on("click", function(){
        $(".vaCodes").slideToggle(500, "swing");
    });

    $(statusButton).on("click", function(){
        $(".depOrArr").slideToggle(500, "swing");
    });

    $(goButton).on("click", function(){
        validateUserInputs();
        generateFlightTab();
    });

    $(vaCodeInput).change(function(){
        $(vaCodeButton).html("Choose a VA");
    });

    /* When the user makes a choice from either the VA Codes drop-down list or the status drop-down list,
     * this code makes the list slide back up */
    $(".vaCodes a").each(function(){
        $(this).on("click", function(){
            let choice = $(this).text();
            $(".vaCodes").slideUp();
            $(vaCodeButton).html(choice);

            if($(vaCodeInput).val() != undefined){
                $(vaCodeInput).val("");
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

    /* Checks for blanks and special characters in input fields, as well as valid choices for button drop-downs */
    function validateUserInputs() {
        let vaCodeButtonChoice = $(vaCodeButton).html();
        let vaCodeString = $(vaCodeInput).val();
        let flightNumberString = $(fltNoInput).val();
        let aircraftTypeString = $(aircraftTypeInput).val();
        let statusString = $(statusButton).html();

        let pattern = new RegExp(/[@~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/);
        alert("vacodeString is " + vaCodeString);

        if(vaCodeButtonChoice == "Choose a VA") {
            if(pattern.test(vaCodeString) || vaCodeString == "") {
                alert("ehhhh!");
                return false;
            }
        }

        // if(pattern.test(flightNumberString) || flightNumberString == "") {
        //     alert("ehhhh!");
        //     return false;
        // }

        userInputValid = true;
        return true;
    }

    /* Generates a flight tab based on the user inputs if the data is valid */
    function generateFlightTab() {

        if(userInputValid){
            resetFlightTabGenerator();
            alert("Tab generating successful!");
        }
        userInputValid = false;
    }

    /* Re-sets all buttons and fields back to default state */
    function resetFlightTabGenerator() {
        $(vaCodeButton).html("Choose a VA");
        $(vaCodeInput).val("");
        $(fltNoInput).val("");
        $(aircraftTypeInput).val("");
        $(statusButton).html("Status");
    }

});