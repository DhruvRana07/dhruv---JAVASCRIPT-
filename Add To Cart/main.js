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
// Problem 1. ✅ Shows the correct initial data
let allData = []
function showData(){
    fetch('https://shark-tank-json-server-1.onrender.com/pitches').then((res)=>res.json()).then((data)=>{
        allData = data
        cardList(data)
    }).catch((err)=>console.log(err))
}
showData()
function card(image, title, founder, category, price, id){
    let div = `
        <div class="card" data-id="${id}">
            <div class="card-img">
                <img src="${image}" alt="pitch">
            </div>
            <div class="card-body">
                <h4 class="card-title">${title}</h4>
                <p class="card-founder">Founder: ${founder}</p>
                <p class="card-category">Category: ${category}</p>
                <p class="card-price">Price: $${price}</p>
                <a href="#" data-id="${id}" class="card-link" id="edit">Edit</a>
                <button data-id="${id}" class="card-button">Delete</button>
                <button data-id="${id}" class="addToCart-button" style="background-color:green; color: white">Add to Cart</button>
            </div>
        </div>
    `
    return div;
}
function cardList(array){
    let store = array.map((ele)=>card(ele.image, ele.title, ele.founder, ele.category, ele.price, ele.id))
    mainSection.innerHTML = store.join("")
}
// Problem 2. ✅ Able to add new pitch
pitchCreateBtn.addEventListener("click",()=>{
    let addpitchData ={
        "title": pitchTitleInput.value,
        "image": pitchImageInput.value,
        "category": pitchCategoryInput.value,
        "founder": pitchfounderInput.value,
        "price": pitchPriceInput.value
    }
    fetch("https://shark-tank-json-server-1.onrender.com/pitches", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(addpitchData),
    }).then((res)=>res.json()).then((data)=>showData()).catch((err)=>console.log(err))
    pitchTitleInput.value = ""
    pitchImageInput.value = ""
    pitchCategoryInput.value = ""
    pitchfounderInput.value = ""
    pitchPriceInput.value = ""
})
// Problem 3. ✅ Able to delete a pitch
document.addEventListener("click", (event)=>{
    if(event.target.classList.contains("card-button")){
        alert("The Pitch has been Deleted.")
        DeletePitch(event.target.dataset.id)
    }
})
function DeletePitch(id){
    fetch(`https://shark-tank-json-server-1.onrender.com/pitches/${id}`, {
        method: "DELETE"
    }).then((res)=>res.json()).then((data)=>showData()).catch((err)=>console.log(err))
}
// Problem 4. ✅ Able to edit all fields of the pitch
// Problem 5. ✅ Able to edit the price
document.addEventListener("click", (evnt)=>{
    if(evnt.target.classList.contains("card-link")){
        editProductData(evnt.target.dataset.id)
    }
})
function editProductData(id){
    fetch(`https://shark-tank-json-server-1.onrender.com/pitches/${id}`).then((res)=>res.json()).then((data)=>{
        updatePitchIdInput.value = data.id;
        updatePitchTitleInput.value = data.title;
        updatePitchImageInput.value = data.image;
        updatePitchfounderInput.value = data.founder;
        updatePitchCategoryInput.value = data.category;
        updatePitchPriceInput.value = data.price;

        updatePricePitchId.value = data.id;
        updatePricePitchPrice.value = data.price;
    }).catch((err)=>console.log(err))
    updatePitchBtn.addEventListener("click", ()=>{
        alert("The Pitch has been updated")
        let updateProductData={
            "id": updatePitchIdInput.value,
            "title": updatePitchTitleInput.value,
            "image": updatePitchImageInput.value,
            "founder": updatePitchfounderInput.value,
            "category": updatePitchCategoryInput.value,
            "price": updatePitchPriceInput.value
        }
        fetch(`https://shark-tank-json-server-1.onrender.com/pitches/${id}`,{
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updateProductData),
          }).then((res)=>res.json()).then((data)=>showData()).catch((err)=> console.log(err))
            updatePitchIdInput.value = ""
            updatePitchTitleInput.value = ""
            updatePitchImageInput.value = ""
            updatePitchfounderInput.value = ""
            updatePitchCategoryInput.value = ""
            updatePitchPriceInput.value = ""
    })
    updatePricePitchPriceButton.addEventListener("click",()=>{
        alert("Price has been updated")
        let priceUpdate = {
            "title": updatePitchTitleInput.value,
            "image": updatePitchImageInput.value,
            "founder": updatePitchfounderInput.value,
            "category": updatePitchCategoryInput.value,
            "id": updatePricePitchId,
            "price": updatePricePitchPrice.value
        }
        fetch(`https://shark-tank-json-server-1.onrender.com/pitches/${id}`,{
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(priceUpdate),
        }).then((res)=>res.json()).then((data)=>cardList(data)).catch((err)=> console.log(err))
        updatePitchTitleInput.value = ""
        updatePitchImageInput.value = ""
        updatePitchfounderInput.value = ""
        updatePitchCategoryInput.value = ""
        updatePricePitchPrice.value = ""
    })
}
// Problem 6. ✅ Sorts as expected
sortAtoZBtn.addEventListener("click", ()=>{
    let sortData =  allData.sort((a,b)=> a.price - b.price)
    cardList(sortData)
})
sortZtoABtn.addEventListener("click", ()=>{
    let sortData =  allData.sort((a,b)=> b.price - a.price)
    cardList(sortData)
})
//Problem 7. ✅ Filters as expected
filterFood.addEventListener("click", ()=>{
    let foodFilter =  allData.filter((elment)=>elment.category  === "Food")
    cardList(foodFilter);
})
filterElectronics.addEventListener("click", ()=>{
    let electroFilter = allData.filter((electroEle)=>electroEle.category==="Electronics")
    cardList(electroFilter)
})
filterPersonalCare.addEventListener("click", ()=>{
    let personCareFilter = allData.filter((PersonalEle)=>PersonalEle.category==="Padcare Lab")
    cardList(personCareFilter)
})
// Problem 8. ✅ Add in Add to cart
document.addEventListener("click", (evt)=>{
    if(evt.target.classList.contains("addToCart-button")){
        alert("This Pitch has been added in your Cart.")
        addToCart(evt.target.dataset.id)
    }
})
function addToCart(id){
    fetch(`https://shark-tank-json-server-1.onrender.com/pitches/${id}`).then((response)=>response.json()).then((datas)=>{
        fetch('https://shark-tank-json-server-1.onrender.com/cartpage',{
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(datas),
          }).then((resp)=>resp.json()).then((addData)=>showData()).catch((err)=>console.log(err))
    }).catch((err)=>console.log(err))
}