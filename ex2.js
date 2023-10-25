// Reference used : Chat GPT

// Add an event listener to the "Submit" button
document.getElementById("button-submit").addEventListener("click", function () {
    
    // Get the selected date from the dropdown
    const selectedDate = document.getElementById("day-choices").value;
  
    if (selectedDate === "") {
      alert("Please select a date.");
      return;
    }
  
    // Fetch the JSON data (assuming the JSON file is named data.json)
    fetch("gaming.json")
      .then((response) => response.json())
      .then((data) => {
        // Find the corresponding data for the selected date
        const selectedData = data.find((entry) => entry.date === selectedDate);    
  
        if (selectedData) {
        
        // Change the title of the stream
        const h2Element = document.querySelector("h2");
        h2Element.textContent = selectedData.game.name;      
      
        //add youtube video
        document.getElementById("youtubeVideo").src=selectedData.game.gameVideo;
        console.log(selectedData.gameVideo);
        console.log(selectedData);

        // // Create a new div for the type content
        // // Get the newly-created div
        // const typeContent = document.createElement("div");
        // typeContent.className = "typeContent";
        // typeContent.innerHTML = selectedData.game.type;        


        // // Change the style of the type content div
        // typeContent.style.backgroundColor = "#bb84da"; // Change the background color
        // typeContent.style.opacity = "rgba(128, 74, 143, 0.75)"; // Change the background color
        // typeContent.style.borderRadius = "20px"; // Change the background color
        // typeContent.style.width = "200px"; // Change the width
        // typeContent.style.color = "#333"; // Change the text color
        // typeContent.style.fontSize = "14px"; // Set the font size
        // typeContent.style.padding = "10px"; // Add padding
        // typeContent.style.lineHeight = "1.5"; // Change line height
        // typeContent.style.textAlign = "left";
                
        // // Position the type content div within streamerInterface
        // typeContent.style.position = "absolute";
        // typeContent.style.top = "10%"; 
        // typeContent.style.left = "5%"; 


          // Create a new div for the chat content
        // Get the newly-created div
        const chatContent = document.createElement("div");
        chatContent.className = "chat-content";
        chatContent.innerHTML = selectedData.game.myComments;
        
        // Change the style of the chat comment div
        chatContent.style.backgroundColor = "transparent"; // Change the background color
        chatContent.style.width = "200px"; // Change the width
        chatContent.style.color = "#333"; // Change the text color
        chatContent.style.fontSize = "14px"; // Set the font size
        chatContent.style.padding = "10px"; // Add padding
        chatContent.style.lineHeight = "1.5"; // Adjust as needed
        chatContent.style.textAlign = "left";
        
        // Position the chatContent div within chatBox
        chatContent.style.position = "relative";
        chatContent.style.top = "-95%"; // Adjust as needed
        chatContent.style.left = "9%"; // Adjust as needed
        
        // Wrap the first word in a <span> element and apply different styles
        const words = selectedData.game.myComments.split(' ');
        if (words.length > 1) {
            // Create a <span> for the first word
            const firstWordSpan = document.createElement("span");
            firstWordSpan.style.color = "#B266C4"; // Change the color
            firstWordSpan.style.fontWeight = "800"; // Change the font-weight
            firstWordSpan.textContent = words[0];
        
            // Replace the first word with the <span> in the chatContent div
            chatContent.innerHTML = chatContent.innerHTML.replace(words[0], firstWordSpan.outerHTML);
        }
        
        // Append the chat content to the chatBox div
        document.querySelector(".chatBox").appendChild(chatContent);
                
        
        // Append the type content to the streamerInterface div
                document.querySelector(".streamerInterface").appendChild(typeContent);

    
    } else {
        alert("Data not found for the selected date.");
      }
    })
    .catch((error) => {
      console.error("Error fetching data: ", error);
    });
});




      
  




