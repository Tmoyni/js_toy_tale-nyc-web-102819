const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false
let toyCollectionDiv = document.getElementById("toy-collection")
let addToyForm = toyForm.getElementsByTagName('form')[0]

document.addEventListener('DOMContentLoaded', function ()
{

// YOUR CODE HERE
function getToys(){
  fetch("http://localhost:3000/toys")
  .then(function (response) { return response.json() })
  .then(function(toys) {
    toyCollectionDiv.innerHTML = ""
    toys.forEach(function (toy) {
      let toyDiv = document.createElement('div')
      toyDiv.className = "card"
      toyDiv.dataset.id = toy.id
      toyDiv.innerHTML = `
        <h2>${toy.name}</h2>
        <img src=${toy.image} class="toy-avatar" />
        <p><span>${toy.likes}</span> Likes </p>
        <button class="like-btn" data-id=${toy.id}>Like <3</button>
      `
      toyCollectionDiv.append(toyDiv)
    })
    })
}


toyCollectionDiv.addEventListener("click", function(e) {
  if (e.target.className === "like-btn") {
    toyId = e.target.dataset.id
    toyDiv = e.target.parentNode
    toyDivSpan = toyDiv.getElementsByTagName('span')[0]
    likes = parseInt(toyDivSpan.innerText)
    ++likes
    
    fetch(`http://localhost:3000/toys/${toyId}`, {
      method: 'PATCH',
      headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
      body: JSON.stringify({likes: likes})
    })
    .then(function (response) {return response.json() })
    .then(getToys)
  }
  
})

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    // submit listener here
  } else {
    toyForm.style.display = 'none'
  }
})

addToyForm.addEventListener('submit', function(e){
  e.preventDefault()
  let toyName = e.target[0].value
  let toyImage = e.target[1].value

  fetch("http://localhost:3000/toys", {
      method: 'POST',
      headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
      body: JSON.stringify({name: toyName, image: toyImage, likes: 0})
    })
    .then(function (response) {return response.json() })
    .then( getToys)

    addToyForm.reset()

    addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    // submit listener here
  } else {
    toyForm.style.display = 'none'
  }
    
})

getToys()

// OR HERE!
});