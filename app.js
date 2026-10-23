/* 
	? Application Programming Interface (API)
	* a way for us to communicate with a resource (usually a server)
	* client (front-end)
		* browsers, curl command, Postman request
	* server (back-end)
		* a computer has a listener setup that listens for requests
		* it serves up response
	* enables a RESTful architecture using request/response lifecycle
		* REST - representational state transfer
			* communicate in req/res
			* JSON (JavaScript Object Notation) specific
			* stateless
		* SOAP - simple object access protocol
			* communicate in req/res
			* XML specific
			* stateful
		* request - data we send (as the client)
			* headers (metadata)
			* query parameters (GET)
			* body (POST)
		* response - data we receive (as the server)
			* headers
			* payload
			* status code
	
	* REST & SOAP work via CRUD
		* create
		* read
		* update
		* delete
	
	* correspond to the following HTTP Methods or HTTP Verbs
		* POST
		* GET
		* PUT
		* DELETE
*/

/* 
	? Fetch API
	* asynchronous function
	* we need it because we don't know how long fetching data will take
	* we wait until our Promise is resolved or rejected
	* fetch allows us to handel the data in three states
		* pending (not done)
		* fulfilled (done)
		* rejected (error) - due to network problems or time-to-live (TTL)
	
	* JSON JavaScript Object Notation
		* it is an object
		* wrapped in a string
		* specific syntax for stringfying and JSONifying
		* ex: "{ 'name': 'Paul', 'age': 27}"
		* to aid in transmission, data gets encapsulated into ReadableStream object
		* it needs JSONified
*/

let url = `https://prismix.dev/api/v1/statuses`;

// fetch(url)
// 	.then(response => response.json())
// 	.then(data => console.log(data))
// 	.catch(err => console.log(err))

/* 
	? Fetch Process
	* 1. fetch grabs your resource and returns Promise object
	* Promise can be pending, fulfilled, or rejected
	* 2. use .then() resolver to strip the Promise
	* we catch the data in the parameter of the callback function (response)
	* 3. use Response.json() method to read and strip it from JSON string to object
	* .json() method returns a Promise again
	* 4. use another .then() resolver to strip its Promise
	* catch it into a parameter (data) and do as you please with your output
	* 5. use .catch() to deal with any error handling
*/

/* 
	? Fetch with Async Await Try Catch
*/

/*
let getData = async url => {
	try
    {
		let res = await fetch(url);
		let data = await res.json();
		console.log(data);
		return data;
	} 
    catch (err) 
    {
		console.log(err);
	}
};
*/

// ? This returns a Promise again
// to use it, either use resolvers or throw inside another async function
//console.log(getData(url))
// getData(url);


/* 
	? Challenge
	* parse thru the data and render it using DOM
	* build blocks that display the following:
		* name
		* description
		* updated date
		* recent issues
		! Spicey Mode
		* add an input field
		* as you type, the search removes all irrelevant blocks
*/

let getData = async url => {
	try {
		let res = await fetch(url);
		let data = await res.json();
		render(data.services)
	} catch (err) {
		console.log(err);
	}
};

let render = (data) => {
	console.log(data)
	let main = document.querySelector("main")
	data.forEach(d => {
		let div = document.createElement("div")
		div.className = "card"
		let h5name = document.createElement("h5")
		h5name.textContent = d.id
		let pDesc = document.createElement("p")
		pDesc.textContent = d.description
		let pDate = document.createElement("p")
		pDate.textContent = d.updatedAt
		let divIssues = document.createElement("div")
		let pIssue = document.createElement("p")

		// if (d.recentIncidentBriefs)
		// {
		// 	d.recentIncidentBriefs.forEach(i => console.log(i))
		// }

		// ? Optional Chaining Operator - checks if not null/undefined before running
		// d.recentIncidentBriefs?.forEach(i => console.log(i))

		d.recentIncidentBriefs?.forEach(i => {
			let pInc = document.createElement("p")
			pInc.textContent = `Impact: ${i.impact} Name: ${i.name}`
			divIssues.append(pInc)
		})

		div.append(h5name, pDesc, pDate, divIssues)
		main.appendChild(div)
	})
}

getData(url)

let search = document.querySelector("input")

search.addEventListener("keyup", (e) => {
	let searchTerm = e.target.value.toLowerCase()
	let cards = document.querySelectorAll(".card")
	cards.forEach(card => {
		let allCardText = card.innerText.toLowerCase()
		if (!allCardText.includes(searchTerm))
		{
			card.style.display = "none"
		} 
		else
		{
			card.style.display = "flex"
		}
	})
})

