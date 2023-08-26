// LE MENU DEROULANT

const togglebtn = document.querySelector(".entete-toggle");
// console.log(togglebtn);

const ul = document.querySelector(".ul");
// console.log(ul);

togglebtn.addEventListener("click", () => {
  ul.classList.toggle("active");
});

// Le caroussel

const slides = document.querySelectorAll(".slide");
const next = document.querySelector("#next");
const prev = document.querySelector("#prev");
const auto = true;
const intervalTime = 5000;
let slideInterval;

const nextSlide = () => {
  //get current class
  const current = document.querySelector(".current");

  //Remove current class
  current.classList.remove("current");
  // check for next slide
  if (current.nextElementSibling) {
    current.nextElementSibling.classList.add("current");
  } else {
    // add current to start
    slides[0].classList.add("current");
  }
  setTimeout(() => current.classList.remove("current"));
};

const prevSlide = () => {
  //get current class
  const current = document.querySelector(".current");

  //Remove current class
  current.classList.remove("current");
  // check for previous slide
  if (current.previousElementSibling) {
    current.previousElementSibling.classList.add("current");
  } else {
    // add current to last
    slides[slides.length - 1].classList.add("current");
  }
  setTimeout(() => current.classList.remove("current"));
};

//Auto slide
if (auto) {
  //Run next slide at intervalle time
  slideInterval = setInterval(nextSlide, intervalTime);
}

// faire apparaitre le panier

// on selectione le boutton du panier

const shopBtn = document.querySelector(".fa-bag-shopping");
const cartContainer = document.querySelector(".cart-container");

// on ajoute la class active en cliquant sur le boutton
shopBtn.addEventListener("click", function () {
  cartContainer.classList.toggle("active");
});

//ajouter un element au panier

// conselectionne les bouttons des produits
const btnsShop = document.querySelectorAll(".fa-cart-shopping");

btnsShop.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    imagePath = e.target.parentElement.parentElement.children[0].src;
    namePath =
      e.target.parentElement.parentElement.parentElement.nextElementSibling
        .children[0].textContent;

    pricePath =
      e.target.parentElement.parentElement.parentElement.nextElementSibling
        .children[1].textContent;

    // on retire le symbol FCFA
    finalPrice = pricePath.replace("FCFA", "");

    // on supprime l'espace derriere le chiffre
    endPrice = finalPrice.trim();

    //creation de l'array qui contiendra les objets selectiones

    const item = {};

    item.name = namePath;

    item.img = imagePath;

    item.price = endPrice;

    // console.log(item);

    // creons la div qui conteindra les element du produits choisi
    const cartItem = document.createElement("div");

    cartItem.classList.add("cart-item");

    cartItem.innerHTML = `
     <img src="${item.img}" alt="" />
  
      <div class="cart-item-text">
        <p>${item.name}</p>
  
        <span class="cart-item-price"> ${item.price} </span>

        <span> FCFA </span>
      </div>
  
      <a href="#">
        <i class="fa-solid fa-trash deleter "></i>
      </a>`;

    // on selectionne la div du total

    const totaldiv = document.querySelector(".cart-total");

    // on ajoute l'item dans le panier
    cartContainer.insertBefore(cartItem, totaldiv);

    totalMoney();

    // on supprime des elements du panier

    const AlldeleteBtn = document.querySelectorAll(".deleter");

    AlldeleteBtn.forEach((deleteBtn) => {
      deleteBtn.addEventListener("click", (e) => {
        e.target.parentElement.parentElement.remove();

        totalMoney();
      });
    });
  });
});

function totalMoney() {
  //on calcule le montant total

  // on cree l'objet qui conteindra le total
  const Total = [];

  const prices = document.querySelectorAll(".cart-item-price");
  prices.forEach((price) => {
    Total.push(parseFloat(price.textContent));
  });
  // console.log(Total);

  // on additionne tout les elements de l'objet total
  const totalMoney = Total.reduce(function (Total, item) {
    Total += item;

    return Total;
  }, 0);

  const EndTotalMoney = totalMoney.toFixed(2);

  // on ajoute dans le montant total

  document.querySelector(".total-amount").textContent = EndTotalMoney;

  // on affiche le nombre de produits selectionne dans l'entete de l'icone du panier
  document.querySelector(".cart-count").textContent = Total.length;
}
