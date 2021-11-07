const navItems = document.getElementsByClassName("nav__item")
const navBack = document.getElementById("backBtn")

navBack.addEventListener("click", deActive)

for (let i = 0; i < navItems.length; i++) {
  navItems[i].addEventListener("click", function() {
    setActive(this, i)
  })
}

function populateCards(data){
  const cards = document.querySelector("#cards ul");
  let zIndex = 0
  data.forEach((item)=>{
    let element = document.createElement("LI");
    element.setAttribute("data-name", item.name)
    element.innerHTML = `
    <div>
      <span>
        <img src="assets/${item.name.toLowerCase()}.png">
        <img src="assets/${item.name.toLowerCase()}.png">
      </span>
      <span><img src='../assets/playcard.jpeg'/></span>
    </div>`
    element.onclick = function(e){
      e.currentTarget.style.zIndex = zIndex
      zIndex++
      if (e.currentTarget.classList.contains("flipped")){
        e.currentTarget.classList.remove("flipped");
      } else {
        e.currentTarget.classList.add("flipped");
      }
    };
    cards.appendChild(element)
  })
}

fetch("../assets/persons.json").then(res=>{
  return res.json()
}).then(data=>{
  populateCards(data.persons);
})

function setActive(elem, i) {
  deActive();
  document.querySelector("nav").classList.add("active");
  elem.parentNode.classList.add("active-item");
  let content = document.querySelectorAll("nav .content-container li")[i].classList.add("active");
  console.log("activated", elem);
}

function deActive() {
  document.querySelector("nav").classList.remove("active");
  document.querySelectorAll("nav .content-container li").forEach((item)=>{
    item.classList.remove("active");
  });
  document.querySelectorAll("nav li").forEach((item) => {
    item.classList.remove("active-item");
  });
}

const searchContainer = document.getElementById("search-results")
const searchBar = document.getElementById("searchbar")

searchBar.addEventListener("input", function() {
  search(this)
})

async function getStudents() {
  return await fetch("../assets/persons.json").then(res=>{
    return res.json()
  }).then(data=>{
    return data.persons
  })
}

let students = []
getStudents().then((data)=>{
  students = data
  students.forEach(student=>{
    let link = `http://www.${student.name.toLowerCase()}.student.fdnd.nl`
    searchContainer.innerHTML += `<a href="${link}" target="_blank">${student.name}</a>`
  })
})

function search(search) {
  let results = []
  const searchValue = search.value.toUpperCase()
  students.forEach((student)=>{
    if(student.name.toUpperCase().indexOf(searchValue) > -1) {
      results.push(student)
    }
  })
  renderSearch(results)
}

function renderSearch(results) {
  searchContainer.innerHTML = ""
  results.forEach(result=>{
    let link = `http://www.${result.name.toLowerCase()}.student.fdnd.nl`
    searchContainer.innerHTML += `<a href="${link}">${result.name}</a>`
  })
}
