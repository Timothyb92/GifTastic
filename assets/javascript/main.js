//Array that holds buttons that are shown when the page loads
var buttonList = ["America", "Germany", "South Korea", "Australia", "Great Britain", "China", "Peru", "Brazil", "Panama", "Norway", "Iceland", "Ireland", "India", "Singapore", "Malaysia", "France", "Cambodia", "South Africa", "Sweden", "Italy", "Turkey", "Russia", "Cuba", "Honduras", "Colombia", "Egypt", "Myanmar (Burma)", "The Philippines"];

//Function to render the buttons when the page loads
function renderButtons (){

    $("#buttons").empty();

    //Pushes all the buttons to the screen
    buttonList.forEach(function(i){
        var countryButton = $("<button>");
        countryButton.addClass("countryButtons");
        countryButton.attr("data-name", i)
        countryButton.text(i);
        $("#buttons").append(countryButton);
    })

    //Listens to the Submit button to add a new country button to the list and renders the screen
    $("#addCountry").click(function(){
        event.preventDefault();
        if ($("#countryInput").val() != ""){
            buttonList.push($("#countryInput").val().trim());
            renderButtons();
            //Sets the input field back to empty after the user enters a value
            $("#countryInput").val("");
        }
    })
    
};

function renderGifs (){
    //API call
    var searchParam = $(this).attr("data-name");
    // var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=417ePfutZTGs4Q4fMPQJhskpEMyUZVfN&q=south+korea&limit=25&offset=0&rating=PG&lang=en"
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=417ePfutZTGs4Q4fMPQJhskpEMyUZVfN&q=" + searchParam + "&limit=25&offset=0&rating=PG&lang=en"

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(data){
        console.log(data);
        // var gifDiv = $("<div>");
        // var gif = $("<div>");
    })
}

$(document).click("countryButtons", renderGifs);

window.onload = function(){
    renderButtons();
}