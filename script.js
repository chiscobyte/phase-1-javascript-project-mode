document.addEventListener("DOMContentLoaded", function(){

    const quoteText = document.querySelector(".quote");
    const authorName = document.querySelector(".name")
    let quoteBtn = document.querySelector("button#quote")
    let favouriteBtn = document.querySelector("#Favourite")
    let likeBtn = document.querySelector(".like")
    
    
    function randomQuote(){
      quoteBtn.innerText = "loading Quote..." // while a new quote is loading, the text in the quotebtn reads loading Quote...
        fetch("https://api.quotable.io/random") // gets the API 
        .then(res => res.json()) //brings data as a promise
        .then(function(data) {console.log(data); //returns the data
        quoteText.innerText = data.content;
        authorName.innerText = data.author;
        
        likeBtn.addEventListener("click", ()=>{
          likeBtn.style.color = "Red" //changing the like button to red when clicked
        })
        favouriteBtn.addEventListener("click", ()=>{
        favouriteBtn.style.color ="Red"//changing the favourite button to red when clicked
        let li = document.createElement("li"); //creating an li to list all the quotes added to favourite
        li.innerHTML = data.content;
        let p = document.createElement("p");
        p.innerHTML = `~ ${data.author}`; 
        p.setAttribute("class", "authorName")
        let div = document.getElementById("listFavourite")
        div.append(li);  //appending li to div
        div.append(p); //appending p to div
    },{once: true})
      
        quoteBtn.innerText = "New Quote"  //when the quote loads the button text changes to new quote
        likeBtn.style.color = "#7b2cbf"  // the color of the likebutton changed back to the original color when a new quote is displayed 
        favouriteBtn.style.color = "#7b2cbf" // the color of the favouritebutton changed back to the original color when a new quote is displayed 
        })
      let copyBtn = document.querySelector(".copy") // to copy the quote to clipboard
      copyBtn.addEventListener("click", ()=>{
        navigator.clipboard.writeText(quoteText.innerText)
      })
    
    
      function searchQuote(){
        document.querySelector("form#search-author").addEventListener("submit", function(e){ //adding event listener submit
            e.preventDefault()
            let name = e.target.searchinput.value 
            if (name === "" ){
              alert("No valid input")
            }
            else{
            let authors = document.querySelectorAll("div#listFavourite p.authorName") //getting all the authors name
            let authors2 = document.querySelectorAll("div#listFavourite p.authorName")
            for(let author2 of authors2){
              let quoteName2 = author2.previousSibling // getting the quotes
              quoteName2.style.color = "black" //changes to black after the first loop when a new author name is entered 
              author2.style.color = "black"    //changes to black after the first loop when a new author name is entered 
            }
            console.log(authors)
            for(let author of authors){
            let nameCheck = author.textContent
              if(`~ ${name}` === nameCheck || name === nameCheck){ // when one searches the author name only or the authorname with  this ~
               let quoteName = author.previousSibling  // getting the quotes
               quoteName.scrollIntoView()  // when the author name is searched, it directly scrolls to the specific quote and the author name 
               quoteName.style.color = "red"  // changes to red to show its the quote being searched 
              author.style.color = "red"       // changes to red to show the author's name being searched 
              console.log(author)
              
              }
            }
          }
        })
    }
    searchQuote()
    
    
    quoteBtn.addEventListener("click", randomQuote); // when clicked a new quote is dispalyed
    }randomQuote()
    
    
        function signupForm() {
            document.querySelector("section#signUp").style.display = "none"; // to hide the form 
            let signUp = document.querySelector("p#sign-up-nav-bar");
            signUp.addEventListener("click", function () {
              document.querySelector("section#signUp").setAttribute("style", ""); //shows the form
    
            });
          }
          signupForm();
    
          function feedBackForm(){
            document.querySelector("section#feedback-form").style.display = "none"  // to hide it when its not in use
            document.querySelector("p#leave-feedback").addEventListener("click",function(){
             document.querySelector("section#feedback-form").setAttribute("style","") //shows the form
            })
           }feedBackForm()
    
          function submitAlert() {   // to alert the user for signing up
            function alertTimeout() {
              alert("Thank you for signing up");  
            }
            setTimeout(alertTimeout, 5);
          }
    
    
    
    
    
    
    function alertFeedBack(){
    document.querySelector("form#feedBack")
      .addEventListener("submit", function (event){
        event.preventDefault();
        let feedbackMsgs = event.target.feedbackinput.value;
        let feedbackNme = event.target.feedbackname.value;
        if (feedbackMsgs === "" || feedbackNme === ""){
          alert("Please fill all the empty spaces");
        }
        else {
          document.querySelector("form#feedBack").reset();
          document.querySelector("section#feedback-form").style.display = "none";
          submitAlert();
        }
      })
      
    }alertFeedBack()
    
    function alertsignup(){
      document.querySelector("form#user-details")
        .addEventListener("submit", function (event){
          event.preventDefault();
          let username = event.target.name.value;
          let emailAdress = event.target.email.value;
          let userPassword = event.target.pass.value;
          if (userPassword === "" || username === "" || emailAdress === ""){
            alert("Please fill all the empty spaces");
          }
          else {
            document.querySelector("form#user-details").reset();
            document.querySelector("section#signUp").style.display = "none";
            submitAlert();
          }
        })
        
      }alertsignup()
    
    })