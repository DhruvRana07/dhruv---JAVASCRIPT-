let productDiv = document.querySelector("#product-container")
let totalAmount = document.querySelector("#total-price")
let sum = 0
function addToCartFetch(){
  fetch('https://shark-tank-front.onrender.com/cart').then((res)=>res.json()).then((data)=>{
    addCardList(data)
    grandTotal(data)
  }).catch((err)=>console.log(err))
}
addToCartFetch()
function addCard(image, title, founder, price, id,quantity){
    let div = `
      <div class="card">
        <img src=${image} alt="${name}">
        <div class="card-body">
          <h3 class="product-title">Title: ${title}</h3>
          <p class="product-founder">Founder: ${founder}</p>
          <p class="product-price">Price: $${price}</p>
          <button class="increment" data-id="${id}">+</button>
          <button data-id=${id} class="quantity">${quantity}</button>
          <button class="decrement" data-id="${id}">-</button>
          <button class="delete-addToCart" data-id="${id}" id="Delete-button">Delete</button>
        </div>
      </div>
    `
    return div;
}
function addCardList(addArray){
  let addStore = addArray.map((ele)=>addCard(ele.image, ele.title, ele.founder, ele.price, ele.id, ele.quantity))
  productDiv.innerHTML = addStore.join("")
}
// Delete from add to cart
document.addEventListener("click", (e)=>{
  if(e.target.classList.contains("delete-addToCart")){
    alert("The Pitch has been deleted.")
    deleteCartProduct(e.target.dataset.id)
  }
})
function deleteCartProduct(id){
  fetch(`https://shark-tank-front.onrender.com/cart/${id}`,{
    method: "DELETE"
  })
}
// For quantity Decrement
document.addEventListener("click", (e)=>{
  if(e.target.classList.contains('decrement')){
    decreAmount(e.target.dataset.id)
  }
  else if(e.target.classList.contains('increment')){
    increAmount(e.target.dataset.id)
  }
})
function  decreAmount(id){
  fetch(`https://shark-tank-front.onrender.com/cart/${id}`).then((res)=>res.json()).then((data)=>{
    if(Number(data.quantity)>1){
      let decreQuantity =  Number(data.quantity)-1
      let obj={
        "id": data.id,
        "image": data.image,
        "category": data.category,
        "founder": data.founder,
        "price": data.price,
        "title": data.title,
        "quantity": decreQuantity
      }
      fetch(`https://shark-tank-front.onrender.com/cart/${id}`,{
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(obj),
      })
    }
  })
}
// For Quantity Increment
let increQuantity;
let productPrice;
function increAmount(id){
  fetch(`https://shark-tank-front.onrender.com/cart/${id}`).then((res)=>res.json()).then((data)=>{
    increQuantity =  Number(data.quantity)+1
      let obj={
        "id": data.id,
        "image": data.image,
        "category": data.category,
        "founder": data.founder,
        "price": data.price,
        "title": data.title,
        "quantity": increQuantity
      }
      fetch(`https://shark-tank-front.onrender.com/cart/${id}`,{
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(obj),
      })
  })
}
function grandTotal(alldata){
  alldata.map((ele)=>{
    sum += Number(ele.price)
    totalAmount.innerHTML = sum
  })
}