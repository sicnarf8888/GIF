$(document).ready(function() {

  var topics = ["Test tube", "Microscope", "Laboratory Equipment", "Chemical reaction", "Bacteria", "DNA"]
  const theme = new Audio("assets/sound/bensound-creativeminds.mp3");
  var musicPlaying = false;
  var results;
  
  
    // MUSIC FUNCTION 
  
    $("#title-button").on("click", function() {
      if(musicPlaying == false){
            theme.play();
            musicPlaying = true;
         }else {
            theme.pause();
            musicPlaying = false;
        }
    });
  
    // MAKE BUTTONS	AND ADD ONCLICK FUNCTION 
  
    function makeButtons() {
  
      $("#got-buttons").empty();
  
      for (i = 0; i < topics.length; i++) {
        
        var b = $("<button>");
  
        b.addClass("character-btn");
        b.attr("data-name", topics[i]);
        b.text(topics[i]);

        $(b).on("click",dataPull);
  
        $("#got-buttons").append(b);
      };
    };
  
    $("#add-character").on("click", function(event) {
  
      event.preventDefault();
  
      var character = $("#got-input").val().trim();
  
      topics.push(character);
      $("#got-input").val("");
  
      makeButtons();
  
      console.log(topics);
    });
  
    makeButtons();
  
    //FUNCTION FOR GRABBING GIPHY API CONTENT
  
      function dataPull() {
  
       var characterName = $(this).attr("data-name");
       var characterStr = characterName.split(" ").join("+");
       var giphyApi = "VZOeRuvGv99Tv5bcROMNykfgZduAJHcq";
       var giphyURL =  "http://api.giphy.com/v1/gifs/search?q=" + characterStr + "&api_key=" + giphyApi + "&limit=10";

       $.ajax({
          url: giphyURL,
          method: "GET"
        }).done(function(response) {
          
          console.log(giphyURL);
          console.log(response);
  
          results = response.data;
  
          $("#gifs").empty();
          for (var i = 0; i < results.length; i++) {
            
            var characterDiv = $("<div>");
            var para = $("<p class='rating'>").text("Rating: " + results[i].rating);
            var characterImage = $("<img>");
  
            para.addClass("rating-text")
            
            characterImage.addClass("image-gifs")
            characterImage.attr("src", results[i].images.fixed_height_still.url);
            characterImage.attr("data-state", "still");
            characterImage.attr("data-position", i);
  
            characterDiv.append(para);
            characterDiv.append(characterImage);
            characterDiv.addClass("individual-gifs")
  
            $("#gifs").prepend(characterDiv);
  
          }; //ENDS FOR LOOP
        }); // ENDS AJAX FUNCTION
    
    };
  
    // Use document on click function to apply function for elements AFTER the page has loaded
  
    $(document).on("click", ".character-btn", dataPull);
  
    // ANIMATE GIFS
  
      function gifAnimation() {
        var state = $(this).attr("data-state");
        var position = $(this).attr("data-position"); //will return a string
        position = parseInt(position); //string to integer
  
        console.log(results[position].images.fixed_height.url);
        console.log(position);
  
        if (state === "still") {
          console.log("we're here");
          $(this).attr("src", results[position].images.fixed_height.url);
          $(this).attr("data-state", "animate");
        } else {
          $(this).attr("src", results[position].images.fixed_height_still.url);
          $(this).attr("data-state", "still");
        }
      };
  
    $(document).on("click", ".image-gifs", gifAnimation);
  
  }); //document.ready 
  