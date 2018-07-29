$(document).ready(function(){
    //Array that holds buttons that are shown when the page loads
    var buttonList = ["America", "Germany", "South Korea", "Australia", "Great Britain", "China", "Peru", "Brazil", "Panama", "Norway", "Iceland", "Ireland", "India", "Singapore", "Malaysia", "France", "Cambodia", "South Africa", "Sweden", "Italy", "Russia", "Cuba", "Honduras", "Colombia", "Egypt", "The Philippines"];
    
    //Function to render the buttons when the page loads
    function renderButtons (){
        
        $("#buttons").empty();
        
        //Adds a new button for each country in the array and displays them them on the DOM
        buttonList.forEach(function(i){
            var countryButton = $("<button>");
            countryButton.addClass("countryButtons btn");
            countryButton.attr("data-name", i)
            countryButton.text(i);
            $("#buttons").append(countryButton);
        })
        
        
    };
    
    renderButtons();
    
    //Listens to the Submit button to add a new country button to the list and renders the screen
    $("#addCountry").click(function(event){
        event.preventDefault();
        //Only runs if the field has a value inside of it
        if ($("#countryInput").val() != ""){
            var country = $("#countryInput").val().trim();
            buttonList.push(country);
            renderButtons();
            //Sets the input field back to empty after the user enters a value
            $("#countryInput").val("");
        }
    })
    
        function displayCountryGifs (){
            //API call that searches the text in the button clicked
            var searchParam = $(this).attr("data-name");
            console.log($(this).attr("data-name"));
            var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=417ePfutZTGs4Q4fMPQJhskpEMyUZVfN&q=" + searchParam + "&limit=25&offset=0&rating=PG&lang=en";
            
            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function(data){
                console.log(data);
                //Empties the part of the page that holds GIFs so when another country button is clicked, it clears the previous section
                $("#gifContainer").empty();
                //Creates 9 divs that will hold the gifs and information about the gifs
                for (var i = 0; i <= 9; i++){
                    var gifDiv = $("<div>").addClass("gifDiv float-left card");
                    var gif = $("<img>").addClass("gif");
                    var rating = $("<p>").addClass("rating card-header text-center");
                    //assigns data-still and data-animate to the src of both the still an animated versions of the gif
                    gif.attr("data-still", data.data[i].images.fixed_height_still.url)
                    gif.attr("data-animate", data.data[i].images.fixed_height.url);
                    //sets the gif to be still once it loads
                    gif.attr("data-state", "still");
                    gif.attr("src", data.data[i].images.fixed_height_still.url);
                    rating.text("Rating: " + data.data[i].rating);
                    gifDiv.append(rating);
                    gifDiv.append(gif);
                    $("#gifContainer").prepend(gifDiv);
                }
                
                //When a gif is clicked, it will animate or pause depending on the state it's currently in
                $(".gif").click(function(){
                    if($(this).attr("data-state") == "still"){
                        //Sets the src of the image to the animated gif
                        $(this).attr("src", $(this).attr("data-animate"));
                        //Sets data-state to animate
                        $(this).attr("data-state", "animate");
                    }
                    else if ($(this).attr("data-state") == "animate") {
                        //Sets the src of the image to the still image
                        $(this).attr("src", $(this).attr("data-still"));
                        //Changes data-state to still
                        $(this).attr("data-state", "still");
                    }
                })
            })
            // })
        }
        $(document).on("click", ".countryButtons", displayCountryGifs);
    
})