let sucessMsg = document.querySelector(".sucess-msg");
let productVendor = document.querySelector(".product-vendor");
let productTitle = document.querySelector(".product-title");
let price = document.querySelector(".price");
let compareAtPrice = document.querySelector(".compare-at-price");
let percentageOff = document.querySelector(".percentage-off");
let colors = document.querySelector(".colors");
let form = document.querySelector("form");
let description = document.querySelector(".description");


const imgArr = ['images/main-img.jpg', 'images/second-img.jpg', 'images/third-img.jpg', 'images/first-img.jpg']

document.getElementById("add-to-cart").addEventListener('click', function() {
    let size = document.querySelector("form input:checked+label").textContent
    let color = document.querySelector(".colors input:checked").value;
    sucessMsg.innerText = `Embrace Sideboard with Color ${color} and Size ${size} added to cart`;
    sucessMsg.classList.toggle("visible");
    setTimeout(() => {
        sucessMsg.classList.toggle("visible");
    }, 5000)
})

console.log(qantity.innerText)

document.querySelector("#minus-btn").addEventListener("click", () => {
    if (Number(qantity.innerText) > 1) {
        qantity.innerText = Number(qantity.innerText) - 1
    }
})

document.querySelector("#plus-btn").addEventListener("click", () => {

    qantity.innerText = Number(qantity.innerText) + 1

})

document.querySelector(".Thumbnails").addEventListener('change', (e) => {
    document.querySelector(".Product-Image").innerHTML = `<img src='${imgArr[Number(e.target.dataset.index)]}' alt="image">`
})





async function func() {
    let rawData = await fetch("https://cdn.shopify.com/s/files/1/0564/3685/0790/files/singleProduct.json?v=1701948448");
    let data = await rawData.json();
    console.log(data);
    productVendor.innerText = `${data.product.vendor}`;
    productTitle.innerText = `${data.product.title}`;
    price.innerText = `${data.product.price}`;
    compareAtPrice.innerText = `${data.product.compare_at_price}`;


    let priceInNum = parseInt(data.product.price.replace("$", ""));
    let comPriceInNum = parseInt(data.product.compare_at_price.replace("$", ""));
    let offPercent = ((comPriceInNum - priceInNum) / comPriceInNum) * 100;
    let finalOffPercent = Math.round(offPercent)
    percentageOff.innerText = `${finalOffPercent}% Off`

    let idx = 1;
    data.product.options.map(item => {
        if (item.name.toLowerCase() == "color") {
            item.values.forEach((value) => {
                Object.entries(value).map((val) => {
                    colors.innerHTML += `<input type="radio" id="option${idx}" name="color" value="${val[0]}" ${idx==1?"checked":""}>
                                       <label for="option${idx}" id="color${idx}"><i class='bx bx-check-square'></i></label>`


                    let colorId = `#color${idx}`
                    console.log(document.querySelector("#colorId"));
                    document.querySelector(colorId).style.backgroundColor = val[1];

                    idx++;
                })
            })
        }
        if (item.name.toLowerCase() == "size") {
            item.values.forEach((value, index) => {

                form.innerHTML += `<input type="radio" id="${value}" name="size" value="${value}"  ${index==0?"checked":""}  >
                                  <label for="Small">${value}</label>`
            })

        }

    })

    description.innerHTML = data.product.description;

}
func();