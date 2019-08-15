const baseURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json"; //1
const key = 'S0iwMsrXcgsXcoHQY6IEPYMcGX7NmMMU';
let url;

//SEARCH FORM
const searchTerm = document.querySelector('.search');
const startDate = document.querySelector('.start-date');
const endDate = document.querySelector('.end-date');
const searchForm = document.querySelector('form');  
const submitBtn = document.querySelector('.submit');

//RESULTS NAVIGATION
const nextBtn = document.querySelector('.next');
const previousBtn = document.querySelector('.prev');
const nav = document.querySelector('nav');  

//RESULTS SELECTION
const section = document.querySelector('section');
nav.style.display = 'none';
let pageNumber = 0;
let displayNav = false;

searchForm.addEventListener('submit', fetchResults);
nextBtn.addEventListener('click', nextPage);
previousBtn.addEventListener('click', previousPage);

////Quick notes:
                    //1
function fetchResults(e){    //what does (e) point at.
    console.log(e); //2
    //Assembling the full URL
    url = baseURL + '?api-key=' + key + '&page=' + pageNumber + "&q=" + searchTerm.value; //3
    console.log(url); //4
}

function nextPage() {
    console.log('Next Button Clicked');
}  // 5

function previousPage() {
    console.log('Next Button Clicked');
} // 5

/*  
    1: The little (e) is part of something in Javascript called an event handling function. Every event handling function receives an event object. For the purpose of this discussion, think of an object as a "thing" that holds a bunch of properties (variables) and methods (functions). The handle, the e, is similar to a variable that allows you to interact with the object.

    2: We are logging the event object so that you can look at it in the console for learning purposes.

    3: We are creating a versatile query string. The url variable is loaded with other variables and url requirements. We have our base for the API, our key, the page number that corresponds to the results array, and our specific value. Something to study on your own might be: ?, &, and &q= in a URL string. What are those?

    4: We log the string so that we can see it. Later on, you can try another search and see how it changes.

    5: We add in a few basic functions to define nextPage and previousPage and log them. If you leave out this step, your app will get an error.
 */

function fetchResults(e) {
    e.preventDefault(); //1
    url = baseURL + "?api-key=" + key + "&page=" + pageNumber + "&q=" + searchTerm.value;

 
//  1: We add the preventDefault method to make sure that a request isn't actually sent. In other words, even though we tell our code to submit the data, we don't actually want data to be submitted anywhere. This isn't a form where we are signing up for something or filling out data to be saved in a database. That is the default nature of a form element: to submit data, to send a POST request.

if(startDate.value !== '') {
    console.log(startDate.value)
    url += '&begin_date=' + startDate.value;
};

if(endDate.value !== '') {
    console.log(endDate.value)
    url += '&end_date=' + endDate.value;
};


fetch(url)  //1
    .then(function(results){
        return results.json(); //2
    }) .then(function(json){
        displayResults(json);  //3     
    });
}

/*
    1: Remember that fetch is a reserved keyword in JavaScript that allows us to make a request for information, similar to using a GET request with HTTP. The url is given to fetch as a parameter, which sends the request to the url.

    2: Meanwhile, it creates a promise containing a result object. This is our response. Remember that we use promises when we have asynchronous, long-running operations. The fetch gets the network resource, which might take a long time to resolve. It will convert the response into a json object by returning the result.json function.

    3: That json object is used in another promise (set off by the second .then) to send the information received to another function. For now, we'll use console.log(json) to see the json data.

Let's go through that again:

1: We make the fetch request.
2: We pass in the NYT url.
3: We create a promise .then that returns a response object called result.
4: The promise asynchronously returns a function that converts the result into usable json format - result.json() is that function call.
5: We create a second promise that has a function that takes in the json object.
6: We log the json object for now.
*/

function displayResults(json) {
    while (section.firstChild) {
        section.removeChild(section.firstChild); //1@
    }

    let articles = json.response.docs;

    if(articles.length === 10) {
        nav.style.display = 'block'; //shows the nav display if 10 items are in the display
    } else {
        nav.style.display = 'none'; //hides the display if items are less than 10
    }
  
    if(articles.length === 0) {
      console.log("No results");
    } else {
      for(let i = 0; i < articles.length; i++) {
        let article = document.createElement('article'); //1
        let heading = document.createElement('h2'); //2
        let link = document.createElement('a'); //1*
        let img = document.createElement('img');
        let para = document.createElement('p'); //1$
        let clearfix = document.createElement('div'); //2$

        let current = articles[i]; //2*
        console.log("Current: ", current);  //3*

        link.href = current.web_url; //4*
        link.textContent = current.headline.main; //5*

        para.textContent = "Keywords: "; //3$

        for(let j = 0; j < current.keywords.length; j++) { //4$
            let span = document.createElement('span'); //5$
            span.textContent += current.keywords[j].value + ' '; //6$
            para.appendChild(span); //7$
        }

        if(current.multimedia.length > 0) {
            img.src = 'http://www.nytimes.com/' + current.multimedia[0].url;
            img.alt = current.headline.main;
        }
    
        clearfix.setAttribute('class','clearfix');  //8$

        //9$
        article.appendChild(heading); //3
        heading.appendChild(link); //6*
        article.appendChild(img);
        article.appendChild(para);
        article.appendChild(clearfix);
        section.appendChild(article); //4

      }
    }
  };

  function nextPage(e) {
    pageNumber++; //1^
    fetchResults(e);  //2^
    console.log("Page number:", pageNumber); //3^
 };

 function previousPage(e) {
    if(pageNumber > 0) { //1&
      pageNumber--; //2&
    } else {
      return; //3&
    }
    fetchResults(e); //4&
    console.log("Page:", pageNumber); //5&
  
  };
// 1: We create an article variable that will create a node in the DOM that is an article element. Remember that article is an HTML5 element.

// 1@: We run the displayResults function each time the button gets pressed. In this chunk of code, we are checking to see if the section element has any child elements. If the section.firstChild is true, then we call removeChild on the section variable, which targets the section element in the html file. This simply will clear out any child elements that are in the section.

// 1*: We create a link variable that is going to use the a element, the anchor tag which will allow us to create an 'href' link.

// 1$: We've declared a paragraph variable that will append a p tag to the DOM to be used for some of our JSON data.

// 1^: We first increase the value of the pageNumber variable.

// 1&: We have to account for the user being on the first page (page 0), as a pageNumber of -1 would cause an error.

// 2: We also create a heading variable that creates a node in the DOM that is an h2 element.

// 2*: We create a current variable that holds the data of the current article as we iterate.

// 2$: We're declaring a clearfix variable that will later on append a div to the DOM. More on that later.

// 2^: We rerun the fetchResults function.

// 2&: If the page number is over 0, we decrement the page number by 1.

// 3: We call appendChild() on the article element. This will create a child node on that element. We pass in heading to the appendChild method. This means that there will be an h2 element created inside each article element.

// 3*: We log the current data so that we can see it in the console.

// 3$: We are adding the textContent attribute to our para variable. Each result will show this at the start of the p tag that is created by para.

// 3^: We print the pageNumber variable so that we can see it increment.

// 3&: If the value is 0, however, we return nothing and get out of the function, thus ensuring that the value won't drop below 0.

// 4: Since we have a section in our original html file, we call the appendChild() method on the section element. We pass in the article to that. This way, the article is a child of section, and the h2 is a grandchild of section. 

// 4*: Since link is an a element, we need to attach an href property to it. current.web_url grabs the hyperlink for the current article out of the json result. This will set the value for the link.href each time we iterate.

// 4$: Now, we have a for loop inside of our for loop. We are using this nested loop to iterate over the current object, specifically the keywords array for that object. If you look through the JSON results, you'll see that keywords is a property of the entire object, and it's an array. Here, we iterate through the length of the array for the current result object.

// 4&: If the value wasn't 0 and we've decremented the page number, we run fetchResults again.

// 5*: The text that we'll use in link.textContent is set to the value of current.headline.main, which is part of the json object from the NYT API. You can see this when you drill down into the data: 

// 5$: As we iterate, we create a <span> for each keyword. If you don't already know, a <span> will be an element that will end when the item ends. So, the <span> of Pizza will start at the P and end at the a. If we were to use a p tag here, it would cover the entirity of the parent object.

// 6*: Finally, we call the appendChild method on the heading element again. This will append a link as a child element in the DOM inside of each h2. See the screenshot for orientation: 

// 6$: The textContent for each <span> will be the value found inside the keywords array inside the JSON object.

// 7$: We append each <span> to the para node.

// 8$: Remember that we still have an outer loop and printing the results. Here, we're using the setAttribute method to target our clearfix class. It's a class in the CSS file.

// 9$: We add clearfix & para as children of article.