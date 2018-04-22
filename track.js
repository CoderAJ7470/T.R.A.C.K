/* Author: Turbofan */
/* Last Updated: April 22, 2018 */

$(function(){

    /* Variables */
    let resetTabGenButton = $(".resetTabGenerator");
    let vaCodeButton = $(".chooseVACode");
    let statusButton = $(".chooseFlightStatus");
    let vaCodeInput = $(".vaCodeInput");
    let fltNoInput = $(".fltNoInput");
    let aircraftTypeInput = $(".aircraftTypeInput");
    let goButton = $(".generateFlightTabButton");
    let clearTabsTable = $(".clearTabsTable");
    let resetAll = $(".resetAll");
    let helpButton = $(".helpButton");
    let userInputValid = "";
    let vaCodeValid = "";
    let flightNumberValid = "";
    let aircraftTypeValid = "";
    let statusValid = "";
    let slides = $(".slides");
    let helpInvisible = true;

    /* Constants */
    const depsGreen = "rgb(0, 119, 0)";
    const arrsBlue = "rgb(0, 90, 200)";
    const emergencyColor = "rgb(187, 0, 0)";
    const KEYCODE_ESC = 27; // Key code for the ESC key

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


    /*****************************************************************************************/
    /******************* SORTABLE FUNCTION THAT HANDLES TAB DRAG-AND-DROP ********************/
    /*****************************************************************************************/

    /* Allows the flight tabs in the flight tabs table to be switched between departures
    * arrivals, as well as be moved up/down within the same list */
    $("#departures, #arrivals").sortable({
        connectWith: ".dragAndDropList",
        receive: function(event, ui){
            if(ui.item.hasClass("deps")){
                ui.item.removeClass("deps").addClass("arrs");

                if(ui.item.css("background-color") == emergencyColor){
                    $(".arrivalsList ul").prepend(ui.item);
                    return;
                }

                ui.item.css("background-color", arrsBlue);
            }
            else{
                ui.item.removeClass("arrs").addClass("deps");

                if(ui.item.css("background-color") == emergencyColor){
                    $(".departuresList ul").prepend(ui.item);
                    return;
                }

                ui.item.css("background-color", depsGreen);
            }
        }
    }).disableSelection();


    /*****************************************************************************************/
    /********************** CLICK HANDLERS FOR BUTTONS AND TEXT INPUTS ***********************/
    /*****************************************************************************************/

    /* Click handlers for menu buttons */
    $(resetTabGenButton).on("click", resetFlightTabGenerator);

    $(clearTabsTable).on("click", clearTable);

    $(resetAll).on("click", function(){
        resetFlightTabGenerator();
        clearTable();
        checkHelpOpen();
        resetErrors();
    });

    $(helpButton).on("click", toggleHelp);

    /* Click handlers for flight tab generator */
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
        $(".vaCodes").slideUp(500, "swing");
        $(vaCodeButton).html("Choose a VA");
    });



    /*****************************************************************************************/
    /********* EVENT LISTENERS FOR PAGE LOADING/RE-LOADING AND DOCUMENT-BASED CLICKS *********/
    /*****************************************************************************************/
    
    // Puts the focus on the VA Code drop-down list button when the page 
    $(document).on("load", focusOnVACodeButton());

    // Removes a flight tab from the tabs table
    $(document).on("click", ".deleteTabButton", function(){
        $(this).parent().remove();
    });

    // Closes an open drop-down list if it's open (for the VA Codes and Status drop-down lists)
    $(document).keyup(function(e){
        if(e.keyCode == KEYCODE_ESC) {
            $(".vaCodes").slideUp(500, "swing");
            $(".depOrArr").slideUp(500, "swing");
        }
    });

    // Allows the user to toggle a tab between normal and emergency
    $(document).on("click", ".emergencyButton", function(){
        let statusClass = $(this).parent().attr("class");
        let originalColor = $(this).parent().css("background-color");

        switch(statusClass){
            case "deps":
                if(originalColor != depsGreen){
                    $(this).parent().css("background-color", depsGreen);
                }
                else{
                    $(this).parent().css("background-color", emergencyColor);
                }
                break;
            case "arrs":
                if(originalColor != arrsBlue){
                    $(this).parent().css("background-color", arrsBlue);
                }
                else{
                    $(this).parent().css("background-color", emergencyColor);
                }
        } // End of switch(statusClass)

    });
    

    /*****************************************************************************************/
    /********************** EVENT LISTENERS FOR DROP-DOWN LIST BUTTONS ***********************/
    /*****************************************************************************************/

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


    /*****************************************************************************************/
    /************************************** FUNCTIONS ****************************************/
    /*****************************************************************************************/

    /* Checks for blanks and special characters in input fields, as well as ensuring that the user
    /* chooses an option from the drop-down lists */
    function validateUserInputs() {
        let vaCodeButtonChoice = $(vaCodeButton).html();
        let vaCodeString = $(vaCodeInput).val();
        let flightNumberString = $(fltNoInput).val();
        let aircraftTypeString = $(aircraftTypeInput).val();
        let statusString = $(statusButton).html();
        let vaCodePattern = new RegExp("^[a-zA-Z]{2,3}$");
        let flightNumberPattern = new RegExp("^[0-9a-zA-Z]+$");
        let vaCodeValid = true;
        let flightNumberValid = true;
        let aircraftTypeValid = true;
        let statusValid = true;

        userInputValid = true;

        if(vaCodeButtonChoice == "Choose a VA") {
            if(!vaCodePattern.test(vaCodeString) || vaCodeString == "") {
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

        /* If all user inputs are valid, then proceed with tab generation; otherwise show the errors and exit */
        if(!userInputValid) {
            showErrors(vaCodeValid, flightNumberValid, aircraftTypeValid, statusValid);
            return false;
        }
        else {
            flightNumberString = flightNumberString.toUpperCase();
            aircraftTypeString = aircraftTypeString.toUpperCase();
            if(vaCodeButtonChoice == "Choose a VA"){
                vaCodeString = vaCodeString.toUpperCase();
                generateFlightTabs(vaCodeString, flightNumberString, aircraftTypeString);
            }
            else{
                generateFlightTabs(vaCodeButtonChoice, flightNumberString, aircraftTypeString);
            }
            resetErrors();
            resetFlightTabGenerator();
            focusOnVACodeButton();
        }
    }

    /* Generates a flight tab based on the user inputs and puts it in the appropriate column */
    function generateFlightTabs(vaCode, flightNumber, aircraftType) {
        if($(statusButton).html() == "Dep"){
            $(".departuresList ul").append("<li class='deps'>" + vaCode + " | " + flightNumber + " | " +
                aircraftType + " | <button class='emergencyButton'>E</button> | <button class='deleteTabButton'>Del(X)</button></li>");
        }
        else{
            $(".arrivalsList ul").append("<li class='arrs'>" + vaCode + " | " + flightNumber + " | " +
                aircraftType + " | <button class='emergencyButton'>E</button> | <button class='deleteTabButton'>Del(X)</button></li>");
        }
    }

    /* Re-sets all buttons and fields back to default state */
    function resetFlightTabGenerator() {
        $(vaCodeButton).html("Choose a VA");
        $(vaCodeInput).val("");
        $(fltNoInput).val("");
        $(aircraftTypeInput).val("");
        $(statusButton).html("Status");
    }

    function clearTable(){
        $(".flightStatusTable ul").empty();
    }

    function checkHelpOpen() {
        if(!helpInvisible){
            $(".help").slideUp();
        }

        helpInvisible = !helpInvisible;
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

    function focusOnVACodeButton() {
        $(".chooseVACode").focus();
    }

    function resetErrors() {
        $("div .errors").empty();
    }

    function toggleHelp() {
        if(helpInvisible){
            $(".help").slideDown();
        }
        else {
            $(".help").slideUp();
        }

        helpInvisible = !helpInvisible;
    }

    /*****************************************************************************************/
    /******************************** CYCLE PLUGIN FUNCTIONS *********************************/
    /*****************************************************************************************/

    slides.cycle({
		fx: 'scrollHorz',
		timeout: 0,
		speed: 500,
		prev: '#prevSlides',
		next: '#nextSlides'
	});

});