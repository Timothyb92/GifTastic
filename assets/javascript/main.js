// $(".gif").click(function(){
//     console.log("Clicked gif");
//     if($(this).attr("data-state") == "still"){
//         $(this).attr("src", $(this).attr("data-animate"));
//     }
// })
$(document).ready(function(){
    //Array that holds buttons that are shown when the page loads
    var buttonList = ["America", "Germany", "South Korea", "Australia", "Great Britain", "China", "Peru", "Brazil", "Panama", "Norway", "Iceland", "Ireland", "India", "Singapore", "Malaysia", "France", "Cambodia", "South Africa", "Sweden", "Italy", "Russia", "Cuba", "Honduras", "Colombia", "Egypt", "Myanmar (Burma)", "The Philippines"];

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

        
    };

    renderButtons();
    
    //Listens to the Submit button to add a new country button to the list and renders the screen
    $("#addCountry").click(function(){
        event.preventDefault();
        renderButtons();
        console.log("Submit button clicked and renderButtons method ran");
        if ($("#countryInput").val() != ""){
            var country = $("#countryInput").val().trim();
            buttonList.push(country);
            renderButtons();
            //Sets the input field back to empty after the user enters a value
            $("#countryInput").val("");
        }
    })
    
    $(".countryButtons").click(function(){
        //API call that searches the text in the button clicked
        var searchParam = $(this).attr("data-name");
        console.log($(this).attr("data-name"));
        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=417ePfutZTGs4Q4fMPQJhskpEMyUZVfN&q=" + searchParam + "&limit=25&offset=0&rating=PG&lang=en";
        
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(data){
            //Creates a div that will hold the gif and information about the gif
            for (var i = 0; i <= 9; i++){
                var gifDiv = $("<div>");
                var gif = $("<img>").addClass("gif");
                gif.attr("src", data.data[i].images.fixed_height_still.url);
                gif.attr("data-animate", data.data[i].images.fixed_height.url);
                gif.attr("data-state", "still");
                gifDiv.append(gif);
                $("#gifContainer").prepend(gifDiv);
            }
        })
    })
    
})