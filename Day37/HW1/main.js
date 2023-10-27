const delay = 3000;
const content = document.querySelector(".content");
const products = content.querySelector(".products")
const data = [
    {
        img: "./img/item1.jpg",
        name: "WD 2TB Elements Portable External Hard Drive - USB 3.0",
        star: "3.3",
        price: "$64"
    },
    {
        img: "./img/item2.jpg",
        name: "SanDisk SSD PLUS 1TB Internal SSD - SATA III 6 Gb/s",
        star: "2.9",
        price: "$109"
    },
    {
        img: "./img/item3.jpg",
        name: "Silicon Power 256GB SSD 3D NAND A55 SLC Cache Performance Boost SATA III 2.5",
        star: "4.8",
        price: "$109"
    },
    {
        img: "./img/item4.jpg",
        name: "WD 4TB Gaming Drive Works with Playstation 4 Portable External Hard Drive",
        star: "4.8",
        price: "$114"
    },
    {
        img: "./img/item5.jpg",
        name: "Acer SB220Q bi 21.5 inches Full HD (1920 x 1080) IPS Ultra-Thin",
        star: "2.9",
        price: "$599"
    },
    {
        img: "./img/item6.jpg",
        name: "amsung 49-Inch CHG90 144Hz Curved Gaming Monitor",
        star: "2.2",
        price: "$999.99"
    },
]

const getItem = ({index, value}) => {
    if (!value) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(data[index])
            },delay)
        })
    } else if (!index) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(value)
            },delay)
        })
    }
}

const createItem = (lists) => {
    let stringHtml = "";
    for (let i = 0; i < lists.length ; i++) {
        const promise = getItem({index: i}).then(({img}) => {
            stringHtml += `<div class="product-item">
            <div class="img"><img width="100%" height="100%" src="${img}" alt="" /></div>`;
            return lists[i];
        }).then(({name}) => {
            stringHtml += `<h3 class="heading">${name}</h3>`;
            return lists[i];
        }).then(({star})=> {
            stringHtml += `<div class="item-info">
            <span>electronics</span>
            <div class="star">
                ${star}<svg
                    stroke="currentColor"
                    fill="yellow"
                    stroke-width="0"
                    viewBox="0 0 576 512"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"
                    ></path>
                </svg>
            </div>
        </div>`;
        return lists[i];
        }).then(({price})=> {
            stringHtml += `<div class="price">${price}</div>
            <div class="action-btn">
                <button class="btn-add btn">Add to card</button>
                <button class="btn-buy btn">Buy now</button>
            </div></div>`;
            return Promise.resolve(stringHtml)
        })
        if (i === lists.length - 1) {
            return promise;
        }
    }
}
const getTag = async () => {
    let stringHtml = createItem(data).then((data) => {
        return `<div class="banner">
        <img width="100%" height="100%" src="./img/banner.jpg" alt="banner" />
    </div>
    <div class="features-products">
        <div class="container">
            <h2 class="heading">Featured Products</h2>
            <div class="products">${data}</div>
            </div>
        </div>`
    })
    return stringHtml;
}

getTag().then((data) => {
    content.innerHTML = data;
    console.log(data)
})



