var addNameBtn = document.getElementById('addNameBtn')
var personalInfoDiv = document.getElementById('personalInfoDiv')
var addAboutBtn = document.getElementById('addAboutBtn')
var aboutDiv = document.getElementById('aboutDiv')

function addName (id, username) {
    var aTag = personalInfoDiv.getElementsByTagName('a')[0]
    const newItem = document.createElement('form');
    newItem.method = "post"
    newItem.action = `/profile/addName/${id}/${username}`
    newItem.classList.add("d-flex")
    newItem.classList.add("justify-content-center")
    newItem.classList.add("align-items-center")
    newItem.innerHTML = `
            <input type="text" id="firstName" name="firstName" class="form-control form-control-sm" placeholder="Adınızı Girin"> &nbsp
            <input type="text" id="lastName" name="lastName" class="form-control form-control-sm" placeholder="Soyadınızı Girin">
            <button type="submit" class="btn btn-primary btn-sm"> Gönder </button>
    `
    aTag.parentNode.replaceChild(newItem, aTag)
}




function addAbout (id, username) {
    var aTag = aboutDiv.getElementsByTagName('a')[0]
    const newItem = document.createElement('form');
    newItem.method = "post"
    newItem.action = `/profile/addAbout/${id}/${username}`
    newItem.classList.add("d-flex")
    newItem.classList.add("justify-content-center")
    newItem.classList.add("align-items-center")
    newItem.innerHTML = `
            <textarea type="text" id="about" name="about" class="form-control form-control-sm"> </textarea> &nbsp
            <button type="submit" class="btn btn-primary btn-sm"> Gönder </button>
    `
    aTag.parentNode.replaceChild(newItem, aTag)
}