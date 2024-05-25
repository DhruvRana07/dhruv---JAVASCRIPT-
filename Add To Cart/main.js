
let mainSection = document.getElementById("data-list-wrapper");

// pitch
let pitchTitleInput = document.getElementById("pitch-title");
let pitchImageInput = document.getElementById("pitch-image");
let pitchCategoryInput = document.getElementById("pitch-category");
let pitchfounderInput = document.getElementById("pitch-founder");
let pitchPriceInput = document.getElementById("pitch-price");
let pitchCreateBtn = document.getElementById("add-pitch");

// Update pitch
let updatePitchIdInput = document.getElementById("update-pitch-id");
let updatePitchTitleInput = document.getElementById("update-pitch-title");
let updatePitchImageInput = document.getElementById("update-pitch-image");
let updatePitchfounderInput = document.getElementById("update-pitch-founder");
let updatePitchCategoryInput = document.getElementById("update-pitch-category");
let updatePitchPriceInput = document.getElementById("update-pitch-price");
let updatePitchBtn = document.getElementById("update-pitch");

//Update price
let updatePricePitchId = document.getElementById("update-price-pitch-id");
let updatePricePitchPrice = document.getElementById("update-price-pitch-price");
let updatePricePitchPriceButton = document.getElementById("update-price-pitch");

//sort and filter
let sortAtoZBtn = document.getElementById("sort-low-to-high");
let sortZtoABtn = document.getElementById("sort-high-to-low");
let filterFood = document.getElementById("filter-Food");
let filterElectronics = document.getElementById("filter-Electronics");
let filterPersonalCare = document.getElementById("filter-Personal-Care");

//Search by title/founder

let searchBySelect = document.getElementById("search-by-select");
let searchByInput = document.getElementById("search-by-input");
let searchByButton = document.getElementById("search-by-button");

// Problem 1. List of pitches on page load [3}

// logic of todo
let PitchData = []
function showData() {
    let result = fetch('https://shark-tank-frontend.onrender.com/pitches').then(e => e.json()).then(e => {
        PitchData = e
        e.map(e => {
            Data(e.id, e.image, e.title, e.founder, e.price, e.category)
        })
    })
}
showData()
function Data(id, image, title, founder, price, category) {
    let insert =
        `
        <div class='card' data-id=${id}>
            <a href="description.html?title=${encodeURIComponent(title)}&image=${encodeURIComponent(image)}&founder=${encodeURIComponent(founder)}&category=${encodeURIComponent(category)}&price=${encodeURIComponent(price)}">
                <div class='card-img'>
                    <img src='${image}' alt='image not found'>
                </div>
                
                <div class='card-body'>
                    <h4 class='card-title'>${title}</h4>
                    <p class='card-founder'>${founder}</p>
                    <p class='card-category'>${category}</p>
                    <p class='card-price'>${price}</p>
                    <a href='#' class='card-link' data-id=${id}>Edit</a>
                    <button class='card-button' data-id=${id}>Delete</button>
                </div>
            </a>
        </div>
        `
    mainSection.innerHTML += insert
}


// add data in pitch
pitchCreateBtn.addEventListener('click', () => {
    let obj = {
        title: pitchTitleInput.value,
        image: pitchImageInput.value,
        category: pitchCategoryInput.value,
        founder: pitchfounderInput.value,
        price: pitchPriceInput.value
    }
    let fetchPost = fetch('https://shark-tank-frontend.onrender.com/pitches', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(obj)
    }).then(resp => {
        if (resp.ok) {
            showData();
        } else {
            alert('Error')
        }
    })
})

// delete pitch
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('card-button')) {
        deletePitch(e.target.dataset.id)
    }
    if (e.target.classList.contains('card-link')) {
        EditPitch(e.target.dataset.id)
    }
})
// delete pitch
function deletePitch(id) {
    let delPitch = fetch(`https://shark-tank-frontend.onrender.com/pitches/${id}`, {
        method: 'DELETE'
    })

}
// edit pitch
function EditPitch(id) {
    fetch(`https://shark-tank-frontend.onrender.com/pitches/${id}`).then(e => e.json()).then(e => {
        updatePitchTitleInput.value = e.title
        updatePitchImageInput.value = e.image
        updatePitchfounderInput.value = e.founder
        updatePitchPriceInput.value = e.price
        updatePitchCategoryInput.value = e.category
        updatePitchIdInput.value = e.id
        updatePricePitchId.value = e.id
        updatePricePitchPrice.value = e.price
    })
}
// filter pitch
filterFood.addEventListener('click', (e) => {
    mainSection.innerHTML = null
    let filterFood = PitchData.filter(e => {
        if (e.category == 'Food') {
            Data(e.id, e.image, e.title, e.founder, e.price, e.category)
        }
    })
})
filterPersonalCare.addEventListener('click', (e) => {
    mainSection.innerHTML = null
    let filterPersonalCare = PitchData.filter(e => {
        if (e.category == 'Personal Care') {
            Data(e.id, e.image, e.title, e.founder, e.price, e.category)
        }
    })
})
filterElectronics.addEventListener('click', (e) => {
    mainSection.innerHTML = null
    let filterElectronics = PitchData.filter(e => {
        if (e.category == 'Electronics') {
            Data(e.id, e.image, e.title, e.founder, e.price, e.category)
        }
    })
})
sortAtoZBtn.addEventListener('click', () => {
    mainSection.innerHTML = null
    let data = PitchData.sort((a, b) => {
        return a.price - b.price
    })
    data.map(e => Data(e.id, e.image, e.title, e.founder, e.price, e.category))
})
sortZtoABtn.addEventListener('click', () => {
    mainSection.innerHTML = null
    let data = PitchData.sort((a, b) => {
        return b.price - a.price
    })
    data.map(e => Data(e.id, e.image, e.title, e.founder, e.price, e.category))
})

// update pitch
updatePitchBtn.addEventListener('click', (e) => {
    let updatePitch = {
        id: updatePitchIdInput.value,
        title: updatePitchTitleInput.value,
        image: updatePitchImageInput.value,
        founder: updatePitchfounderInput.value,
        category: updatePitchCategoryInput.value,
        price: updatePitchPriceInput.value
    }
    fetch(`https://shark-tank-frontend.onrender.com/pitches/${updatePitch.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatePitch)
    })
})
// only price update
updatePricePitchPriceButton.addEventListener('click', () => {
    let priceId = {
        id: updatePricePitchId.value,
        price: updatePricePitchPrice.value
    }
    fetch(`https://shark-tank-frontend.onrender.com/pitches/${priceId.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(priceId)
    })
})

// search by
// searchByInput.addEventListener('focusout',()=>{
//     mainSection.innerHTML=null
//     PitchData.filter(e=>{
//         if(searchByInput.value!==e.title || e.founder)
//         {
//             mainSection.innerHTML='<h1>Search Product not Found</h1>'
//         }
//     })
// })
searchByButton.addEventListener('click', () => {
    mainSection.innerHTML = null
    PitchData.filter(e => {
        if (searchByInput.value == e.title) {
            Data(e.id, e.image, e.title, e.founder, e.price, e.category)
        }
        if (searchByInput.value == e.founder) {
            Data(e.id, e.image, e.title, e.founder, e.price, e.category)
        }
    })
})
// some search error
