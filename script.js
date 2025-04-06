const logInForm = document.querySelector('#logInForm')
const userName = document.querySelector('#userName')
const logInSection = document.querySelector('#logInSection')
const signUpLink = document.querySelector('#signUp')
const navTools = document.querySelectorAll('.navTools')
const welcomeP = document.querySelector('#welcomeUserP')
const brewerUl = document.querySelector('#contentUl')
const breweryMenu = document.querySelector('#breweryMenu')
const searchMenu = document.querySelector('#searchOption')
const collectMenu = document.querySelector('#collectionOption')
const landingPage = document.querySelector('#landingPage')
const searchPage = document.querySelector('#searchPage')
const favPage = document.querySelector('#favPage')
const searchUl = document.querySelector('#searchUl')
const favUl = document.querySelector('#favUl')
const searchInput = document.querySelector('#searchInput')
const searchForm = document.querySelector('#searchForm')
const filterOptions = document.querySelector('#filterOptions')
const filterBtn = document.querySelector('#filterBtn')
const feedBackForm = document.querySelector('#feedBackForm')



document.addEventListener('DOMContentLoaded', () => {
    breweryAvailable();
})



//Appends breweries to page, allow search and saving
function breweryAvailable() {
    searchPage.style.display = "none";
    favPage.style.display = "none";
    let c = 2;

    //SignUp and LogIn option on form
    signUpLink.addEventListener("click", () => {
        authentication(c);
        c++
    })

    //LogIn and SignUp loads landing page
    logInForm.addEventListener('submit', (e) => {
        e.preventDefault()
        landPage()

        breweryMenu.style.backgroundColor = 'black'
        fetch('https://api.openbrewerydb.org/breweries?per_page=50')
            .then(resp => resp.json())
            .then(data => {
                data.forEach((brewery) => {
                    breweryToPage(brewery, brewerUl)
                })
            })

        breweryMenu.addEventListener('click', () => {
            showPage(landingPage, searchPage, favPage)
            menuOptionColor(breweryMenu, searchMenu, collectMenu)
        })

        //Search for brewery from Database
        searchForm.addEventListener('submit', (e) => {
            e.preventDefault()
            searchUl.innerHTML = '';
            fetch(`https://api.openbrewerydb.org/breweries/search?query=${searchInput.value}`)
                .then(resp => resp.json())
                .then(data => {
                    data.forEach(brewery => {
                        breweryToPage(brewery, searchUl)

                    })

                    let searchLis = searchUl.querySelectorAll('li')
                    let favLis = favUl.querySelectorAll('li')

                    //Align search, popular and saved brewery like 
                    searchLis.forEach(searchLi => {
                        favLis.forEach(favLiEach => {
                            if (searchLi.querySelector('i').innerText === favLiEach.querySelector('i').innerText) {
                                searchLi.querySelector('img').src = "https://sammy-ck.github.io/phase-1-project/images/liked.png"
                            } else {

                            }

                        })
                    })

                    searchForm.reset()
                    filterBtn.addEventListener('click', () => {
                        filterResults(filterOptions)

                    })

                })
        })

        searchMenu.addEventListener('click', () => {
            showPage(searchPage, landingPage, favPage)
            menuOptionColor(searchMenu, breweryMenu, collectMenu)
            searchUl.className = "centerDiv"
            searchUl.innerHTML = '';

        })

        collectMenu.addEventListener('click', () => {
            showPage(favPage, searchPage, landingPage)
            menuOptionColor(collectMenu, searchMenu, breweryMenu)
            favUl.className = "centerDiv"

            let favsLi = favUl.querySelectorAll('li')
            // Remove button on collection breweries
            favsLi.forEach(fav => {
                fav.querySelector('input').classList.remove('noDisplay')
                fav.querySelector('img').classList.add('noDisplay')
                fav.querySelector('small').classList.add('noDisplay')
            })

        })
        //User feedback form
        feedBackForm.addEventListener('submit', (e) => {
            e.preventDefault()
            feedBackForm.innerHTML = "<b>Thank you for your feedback</b>"
        })
    })

}


//user to login or sign up
function authentication(c) {
    if (c % 2 === 0) {
        document.querySelector('#logInHeader').innerText = "Sign Up"
        document.querySelector('#pReminderlogIn').innerText = "Please enter your new signin and password!"
        document.querySelector('#logInBtn').value = "SIGN UP"
        document.querySelector('#signUp').innerText = "Log In"
        document.querySelector('#signUpP').innerText = "Have an account?"
    } else {
        document.querySelector('#logInHeader').innerText = "Login"
        document.querySelector('#pReminderlogIn').innerText = "Please enter your new login and password!"
        document.querySelector('#logInBtn').value = "LOG IN"
        document.querySelector('#signUp').innerText = "Sign Up"
        document.querySelector('#signUpP').textContent = "Don't have an account?"
    }
}

//Set up landing page and menu
function landPage() {
    logInSection.remove()
    alert(`Welcome ${userName.value}`)
    for (const x of navTools) {
        x.style.visibility = "visible"
    }
    welcomeP.innerHTML = ` <img src="./images/clinkbeer.gif" width="120px" style="border-radius: 20%;">`
}

//show brewery details
function showBreweryDetails(moreDetails, brewery, counter) {
    if (counter % 2 === 0) {
        moreDetails.innerHTML = ''
        moreDetails.innerHTML = `
<p><b>Telephone:</b> <a href="tel:${brewery.phone}">${brewery.phone}</a></p>
<p><b>Website:</b> <a href="${brewery.website_url}" target="_blank" class="${(brewery.website_url === null) ?
                "noSite" : ""}">${(brewery.website_url === null) ? `No WEBSITE` : brewery.website_url}</a></p>
<p><b>Country: </b>${brewery.country}</p>
                        `
        moreDetails.style.borderTop = "thin dotted black"
    } else {
        moreDetails.innerHTML = ''
        moreDetails.style.borderTop = ""
    }
}

//Adds all breweries to the breweries landing page
function breweryToPage(brewery, currentUl) {
    let liBrewery = document.createElement('li')
    let detailsBtn = document.createElement('button')
    let moreDetails = document.createElement('div')
    moreDetails.style.textAlign = "center"

    liBrewery.innerHTML = `
<h2>${brewery.name}</h2>
<p>TYPE:
<b>${brewery.brewery_type}</b>
</p>
<p><b>Address:</b> <i>${brewery.street} ${brewery.city} ${brewery.state}</i></p>
<img class="liker" style="float: right;" src="https://sammy-ck.github.io/phase-1-project/images/like.png">
<small style="float: right;">Add collection </small>
<input id="remover" type="button" style="float: right;" class="noDisplay" value="REMOVE">
`

    //Delete from collection
    liBrewery.querySelector('#remover').addEventListener('click', () => {
        let breweryLis = brewerUl.querySelectorAll('li')

        breweryLis.forEach(breweryLi => {
            if (breweryLi.querySelector('i').innerText === liBrewery.querySelector('i').innerText) {
                breweryLi.querySelector('img').src = "https://sammy-ck.github.io/phase-1-project/images/like.png"
            } else {

            }

        })
        liBrewery.remove()

    })


    detailsBtn.innerText = "Details"
    liBrewery.appendChild(detailsBtn)
    liBrewery.appendChild(moreDetails)
    liBrewery.style.borderBottom = "thick solid black"
    liBrewery.style.paddingBottom = "10px"
    currentUl.appendChild(liBrewery)
    currentUl.className = "centerDiv"

    let counter = 2
    detailsBtn.addEventListener('click', () => {
        showBreweryDetails(moreDetails, brewery, counter)
        counter++
    })

    let liker = liBrewery.querySelector('img')

    //Adds and removes likes
    liker.addEventListener('click', () => {
        if (liker.src === "https://sammy-ck.github.io/phase-1-project/images/like.png") {
            liker.src = "https://sammy-ck.github.io/phase-1-project/images/liked.png"
            breweryToPage(brewery, favUl)

            let breweryLis = brewerUl.querySelectorAll('li')

            breweryLis.forEach(breweryLi => {
                if (breweryLi.querySelector('i').innerText === liBrewery.querySelector('i').innerText) {
                    breweryLi.querySelector('img').src = "https://sammy-ck.github.io/phase-1-project/images/liked.png"
                } else {

                }
            })

        } else {
            liker.src = "https://sammy-ck.github.io/phase-1-project/images/like.png"

            let breweryLis = brewerUl.querySelectorAll('li')

            breweryLis.forEach(breweryLi => {
                if (breweryLi.querySelector('i').innerText === liBrewery.querySelector('i').innerText) {
                    breweryLi.querySelector('img').src = "https://sammy-ck.github.io/phase-1-project/images/like.png"
                } else {

                }
            })

            for (let liFav of favUl.children) {
                if ((liFav.querySelector('h2')).innerText === (liBrewery.querySelector('h2')).innerText) {
                    liFav.remove();
                } else {
                }

            }

        }

    })

}


//show current page depending on menu selection
function showPage(shown, hidden1, hidden2) {
    shown.style.display = "block"
    hidden1.style.display = "none"
    hidden2.style.display = "none"
}

//menu options change color
function menuOptionColor(current, other1, other2) {
    current.style.backgroundColor = "black"
    other1.style.backgroundColor = ""
    other2.style.backgroundColor = ""
}

//filter search results
function filterResults(filterOptions) {
    let resultsLi = searchUl.querySelectorAll('li')

    resultsLi.forEach(result => {
        let typeResult = result.querySelector('b')
        if (typeResult.innerText !== filterOptions.value) {
            result.style.display = "none"
        } else {
            result.style.display = ""
        }

    })
}