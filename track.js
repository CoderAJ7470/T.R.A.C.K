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
    let userInputValid = "";
    let vaCodeValid = "";
    let flightNumberValid = "";
    let aircraftTypeValid = "";
    let statusValid = "";
    

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
        let vaCodePattern = new RegExp("[a-zA-Z0-9]{2,3}");
        let flightNumberPattern = new RegExp("^[0-9a-zA-Z]+$");
        let vaCodeValid = true;
        let flightNumberValid = true;
        let aircraftTypeValid = true;
        let statusValid = true;

        userInputValid = true;

        // alert("vacodeString is " + vaCodeString);

        if(vaCodeButtonChoice == "Choose a VA") {
            if(!vaCodePattern.test(vaCodeString) || vaCodeString == "") {
                // alert("va code invalid");
                userInputValid = false;
                vaCodeValid = false;
            }
        }

        if(!flightNumberPattern.test(flightNumberString) || flightNumberString == "") {
            // alert("flight number invalid");
            userInputValid = false;
            flightNumberValid = false;
        }

        if(aircraftTypeString == "") {
            // alert("aircraft type not filled");
            userInputValid = false;
            aircraftTypeValid = false;
        }

        if(statusString == "Status") {
            // alert("status not chosen");
            userInputValid = false;
            statusValid = false;
        }

        if(!userInputValid) {
            showErrors(vaCodeValid, flightNumberValid, aircraftTypeValid, statusValid);
            return false;
        }
        else {
            resetErrors();
            resetFlightTabGenerator();
            generateFlightTab();
        }
    }

    /* Generates a flight tab based on the user inputs */
    function generateFlightTab() {
        alert("Tab generating successful!");
    }

    /* Re-sets all buttons and fields back to default state */
    function resetFlightTabGenerator() {
        $(vaCodeButton).html("Choose a VA");
        $(vaCodeInput).val("");
        $(fltNoInput).val("");
        $(aircraftTypeInput).val("");
        $(statusButton).html("Status");
    }

    /* Shows all errors and what needs to be corrected */
    function showErrors(isVaCodeValid, isFlightNumberValid, isAircraftValid, isStatusValid) {
        // first clear the error div's contents
        resetErrors();

        if(!isVaCodeValid) {
            $(".errors").append("<p>Invalid VA Code</p>");
        }

        if(!isFlightNumberValid) {
            $(".errors").append("<p>Invalid flight number</p>");
        }

        if(!isAircraftValid) {
            $(".errors").append("<p>Invalid aircraft type</p>");
        }

        if(!isStatusValid) {
            $(".errors").append("<p>Invalid flight status</p>");
        }
    }

    function resetErrors() {
        $("div .errors").empty();
    }

});