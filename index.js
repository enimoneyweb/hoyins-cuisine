/* =========================================
   HOYIN'S CUISINE
   JAVASCRIPT
========================================= */


/* =========================================
   MOBILE MENU
========================================= */

const menuBtn = document.getElementById("menuBtn");
const navbar = document.getElementById("navbar");

menuBtn.addEventListener("click", () => {

  navbar.classList.toggle("open");

  const icon = menuBtn.querySelector("i");

  if (navbar.classList.contains("open")) {

    icon.classList.remove("fa-bars");
    icon.classList.add("fa-xmark");

  } else {

    icon.classList.remove("fa-xmark");
    icon.classList.add("fa-bars");

  }

});


/* Close mobile menu when link clicked */

document.querySelectorAll(".navbar a").forEach(link => {

  link.addEventListener("click", () => {

    navbar.classList.remove("open");

    const icon = menuBtn.querySelector("i");

    icon.classList.remove("fa-xmark");
    icon.classList.add("fa-bars");

  });

});


/* =========================================
   ACTIVE NAVIGATION
========================================= */

const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".navbar > a:not(.nav-order)");

window.addEventListener("scroll", () => {

  let current = "";

  sections.forEach(section => {

    const sectionTop = section.offsetTop - 150;

    if (window.scrollY >= sectionTop) {

      current = section.getAttribute("id");

    }

  });

  navLinks.forEach(link => {

    link.classList.remove("active");

    if (link.getAttribute("href") === `#${current}`) {

      link.classList.add("active");

    }

  });

});


/* =========================================
   MENU FILTER
========================================= */

const categoryButtons =
  document.querySelectorAll(".category");

const foodCards =
  document.querySelectorAll(".food-card");


categoryButtons.forEach(button => {

  button.addEventListener("click", () => {

    categoryButtons.forEach(btn => {

      btn.classList.remove("active");

    });

    button.classList.add("active");

    const filter =
      button.getAttribute("data-filter");


    foodCards.forEach(card => {

      const category =
        card.getAttribute("data-category");


      if (filter === "all" || category === filter) {

        card.style.display = "block";

        setTimeout(() => {

          card.style.opacity = "1";
          card.style.transform = "translateY(0)";

        }, 30);

      } else {

        card.style.opacity = "0";
        card.style.transform = "translateY(10px)";

        setTimeout(() => {

          card.style.display = "none";

        }, 200);

      }

    });

  });

});


/* =========================================
   SHOPPING CART
========================================= */

let cart = [];


const cartBtn =
  document.getElementById("cartBtn");

const cart =
  document.getElementById("cart");

const cartOverlay =
  document.getElementById("cartOverlay");

const closeCart =
  document.getElementById("closeCart");

const cartItems =
  document.getElementById("cartItems");

const cartCount =
  document.getElementById("cartCount");

const cartTotal =
  document.getElementById("cartTotal");

const checkoutBtn =
  document.getElementById("checkoutBtn");

const toast =
  document.getElementById("toast");


/* Open cart */

cartBtn.addEventListener("click", () => {

  cart.classList.add("open");

  cartOverlay.classList.add("show");

  document.body.classList.add("no-scroll");

});


/* Close cart */

function closeCartPanel() {

  cart.classList.remove("open");

  cartOverlay.classList.remove("show");

  document.body.classList.remove("no-scroll");

}


closeCart.addEventListener("click", closeCartPanel);

cartOverlay.addEventListener("click", closeCartPanel);


/* =========================================
   ADD TO CART
========================================= */

document.querySelectorAll(".quick-add").forEach(button => {

  button.addEventListener("click", () => {

    const name =
      button.getAttribute("data-name");

    const price =
      Number(button.getAttribute("data-price"));


    const existing =
      cart.find(item => item.name === name);


    if (existing) {

      existing.quantity++;

    } else {

      cart.push({
        name: name,
        price: price,
        quantity: 1
      });

    }


    updateCart();

    showToast(`${name} added to your order`);

  });

});


/* =========================================
   UPDATE CART
========================================= */

function updateCart() {

  cartItems.innerHTML = "";


  if (cart.length === 0) {

    cartItems.innerHTML = `

      <div class="empty-cart">

        <i class="fa-solid fa-basket-shopping"></i>

        <h3>Your cart is empty</h3>

        <p>
          Add something delicious from our menu.
        </p>

      </div>

    `;

  }


  let total = 0;

  let quantityTotal = 0;


  cart.forEach((item, index) => {

    total += item.price * item.quantity;

    quantityTotal += item.quantity;


    const itemElement =
      document.createElement("div");

    itemElement.className = "cart-item";


    itemElement.innerHTML = `

      <div class="cart-item-info">

        <h4>${item.name}</h4>

        <p>
          ₦${item.price.toLocaleString()}
          × ${item.quantity}
        </p>

      </div>

      <button
        class="remove-item"
        data-index="${index}"
        aria-label="Remove item"
      >
        <i class="fa-solid fa-trash"></i>
      </button>

    `;


    cartItems.appendChild(itemElement);

  });


  cartCount.textContent = quantityTotal;

  cartTotal.textContent =
    `₦${total.toLocaleString()}`;


  document.querySelectorAll(".remove-item")
    .forEach(button => {

      button.addEventListener("click", () => {

        const index =
          Number(button.getAttribute("data-index"));

        cart.splice(index, 1);

        updateCart();

      });

    });

}


/* =========================================
   TOAST
========================================= */

let toastTimer;


function showToast(message) {

  toast.querySelector("span").textContent =
    message;

  toast.classList.add("show");


  clearTimeout(toastTimer);


  toastTimer = setTimeout(() => {

    toast.classList.remove("show");

  }, 2500);

}


/* =========================================
   WHATSAPP ORDER
========================================= */

checkoutBtn.addEventListener("click", () => {

  if (cart.length === 0) {

    showToast("Your cart is empty");

    return;

  }


  let message =
    "Hello Hoyin's Cuisine! 👋%0A%0AI would like to order:%0A%0A";


  let total = 0;


  cart.forEach(item => {

    const itemTotal =
      item.price * item.quantity;

    total += itemTotal;


    message +=
      `• ${item.name} × ${item.quantity} — ₦${itemTotal.toLocaleString()}%0A`;

  });


  message +=
    `%0A*Total: ₦${total.toLocaleString()}*%0A%0A`;

  message +=
    "Please let me know how I can complete my order.";


  const whatsappURL =
    `https://wa.me/2348142532364?text=${message}`;


  window.open(
    whatsappURL,
    "_blank"
  );

});


/* =========================================
   IMAGE FALLBACK
========================================= */

document.querySelectorAll("img").forEach(img => {

  img.addEventListener("error", () => {

    img.style.background = "#ddd";

    img.style.objectFit = "cover";

  });

});


/* =========================================
   SIMPLE SCROLL REVEAL
========================================= */

const revealElements = document.querySelectorAll(
  ".food-card, .review-card, .feature, .about-content, .about-images, .gallery-item"
);


const observer =
  new IntersectionObserver(
    entries => {

      entries.forEach(entry => {

        if (entry.isIntersecting) {

          entry.target.style.opacity = "1";

          entry.target.style.transform =
            "translateY(0)";

          observer.unobserve(entry.target);

        }

      });

    },
    {
      threshold: .12
    }
  );


revealElements.forEach(element => {

  element.style.opacity = "0";

  element.style.transform = "translateY(25px)";

  element.style.transition =
    "opacity .7s ease, transform .7s ease";

  observer.observe(element);

});


/* =========================================
   INITIAL CART
========================================= */

updateCart();