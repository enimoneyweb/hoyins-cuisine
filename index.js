/* =========================================
   HOYIN'S CUISINE
   JAVASCRIPT
========================================= */


/* =========================================
   MOBILE MENU
========================================= */

const menuBtn = document.getElementById("menuBtn");
const navbar = document.getElementById("navbar");

if (menuBtn && navbar) {
  menuBtn.addEventListener("click", () => {
    navbar.classList.toggle("open");

    const icon = menuBtn.querySelector("i");

    if (icon) {
      if (navbar.classList.contains("open")) {
        icon.classList.remove("fa-bars");
        icon.classList.add("fa-xmark");
      } else {
        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");
      }
    }
  });
}


/* =========================================
   CLOSE MOBILE MENU
========================================= */

document.querySelectorAll(".navbar a").forEach(link => {
  link.addEventListener("click", () => {

    if (navbar) {
      navbar.classList.remove("open");
    }

    const icon = menuBtn?.querySelector("i");

    if (icon) {
      icon.classList.remove("fa-xmark");
      icon.classList.add("fa-bars");
    }

  });
});


/* =========================================
   ACTIVE NAVIGATION
========================================= */

const sections = document.querySelectorAll("section[id]");

const navLinks =
  document.querySelectorAll(".navbar > a:not(.nav-order)");

window.addEventListener("scroll", () => {

  let current = "";

  sections.forEach(section => {

    const sectionTop =
      section.offsetTop - 150;

    if (window.scrollY >= sectionTop) {
      current = section.getAttribute("id");
    }

  });

  navLinks.forEach(link => {

    link.classList.remove("active");

    if (
      link.getAttribute("href") ===
      `#${current}`
    ) {
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

      if (
        filter === "all" ||
        category === filter
      ) {

        card.style.display = "block";

        setTimeout(() => {
          card.style.opacity = "1";
          card.style.transform =
            "translateY(0)";
        }, 30);

      } else {

        card.style.opacity = "0";
        card.style.transform =
          "translateY(10px)";

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

let cartItemsData = [];

const cartBtn =
  document.getElementById("cartBtn");

const cartPanel =
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


/* =========================================
   OPEN CART
========================================= */

if (cartBtn) {

  cartBtn.addEventListener("click", () => {

    cartPanel?.classList.add("open");

    cartOverlay?.classList.add("show");

    document.body.classList.add("no-scroll");

  });

}


/* =========================================
   CLOSE CART
========================================= */

function closeCartPanel() {

  cartPanel?.classList.remove("open");

  cartOverlay?.classList.remove("show");

  document.body.classList.remove("no-scroll");

}

closeCart?.addEventListener(
  "click",
  closeCartPanel
);

cartOverlay?.addEventListener(
  "click",
  closeCartPanel
);


/* =========================================
   ADD TO CART
========================================= */

document
  .querySelectorAll(".quick-add")
  .forEach(button => {

    button.addEventListener("click", () => {

      const name =
        button.getAttribute("data-name");

      const price =
        Number(
          button.getAttribute("data-price")
        );

      if (!name || isNaN(price)) {
        showToast("Unable to add this item");
        return;
      }

      const existing =
        cartItemsData.find(
          item => item.name === name
        );

      if (existing) {

        existing.quantity++;

      } else {

        cartItemsData.push({
          name: name,
          price: price,
          quantity: 1
        });

      }

      updateCart();

      showToast(
        `${name} added to your order`
      );

    });

  });


/* =========================================
   UPDATE CART
========================================= */

function updateCart() {

  if (!cartItems) return;

  cartItems.innerHTML = "";

  let total = 0;

  let quantityTotal = 0;


  /* EMPTY CART */

  if (cartItemsData.length === 0) {

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


  /* CART ITEMS */

  cartItemsData.forEach((item, index) => {

    const itemTotal =
      item.price * item.quantity;

    total += itemTotal;

    quantityTotal += item.quantity;


    const itemElement =
      document.createElement("div");

    itemElement.className =
      "cart-item";


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
        aria-label="Remove ${item.name}"
      >
        <i class="fa-solid fa-trash"></i>
      </button>

    `;


    cartItems.appendChild(itemElement);

  });


  /* CART COUNT */

  if (cartCount) {

    cartCount.textContent =
      quantityTotal;

  }


  /* CART TOTAL */

  if (cartTotal) {

    cartTotal.textContent =
      `₦${total.toLocaleString()}`;

  }


  /* REMOVE ITEMS */

  document
    .querySelectorAll(".remove-item")
    .forEach(button => {

      button.addEventListener("click", () => {

        const index =
          Number(
            button.getAttribute("data-index")
          );

        if (
          !Number.isInteger(index) ||
          index < 0 ||
          index >= cartItemsData.length
        ) {
          return;
        }

        cartItemsData.splice(index, 1);

        updateCart();

        showToast("Item removed from your order");

      });

    });

}


/* =========================================
   TOAST
========================================= */

let toastTimer;

function showToast(message) {

  if (!toast) return;

  const toastText =
    toast.querySelector("span");

  if (toastText) {
    toastText.textContent = message;
  }

  toast.classList.add("show");

  clearTimeout(toastTimer);

  toastTimer = setTimeout(() => {

    toast.classList.remove("show");

  }, 2500);

}


/* =========================================
   WHATSAPP ORDER
========================================= */

if (checkoutBtn) {

  checkoutBtn.addEventListener(
    "click",
    () => {

      if (cartItemsData.length === 0) {

        showToast("Your cart is empty");

        return;

      }


      let message =
        "Hello Hoyin's Cuisine! 👋\n\n" +
        "I would like to order:\n\n";


      let total = 0;


      cartItemsData.forEach(item => {

        const itemTotal =
          item.price * item.quantity;

        total += itemTotal;


        message +=
          `• ${item.name} × ${item.quantity} — ₦${itemTotal.toLocaleString()}\n`;

      });


      message +=
        `\nTotal: ₦${total.toLocaleString()}\n\n`;


      message +=
        "Please let me know how I can complete my order.";


      const whatsappURL =
        `https://wa.me/2348142532364?text=${encodeURIComponent(message)}`;


      window.open(
        whatsappURL,
        "_blank"
      );

    }
  );

}


/* =========================================
   IMAGE FALLBACK
========================================= */

document
  .querySelectorAll("img")
  .forEach(img => {

    img.addEventListener("error", () => {

      img.style.background = "#ddd";

      img.style.objectFit = "cover";

    });

  });


/* =========================================
   SCROLL REVEAL
========================================= */

const revealElements =
  document.querySelectorAll(
    ".food-card, .review-card, .feature, " +
    ".about-content, .about-images, .gallery-item"
  );


if ("IntersectionObserver" in window) {

  const observer =
    new IntersectionObserver(
      entries => {

        entries.forEach(entry => {

          if (entry.isIntersecting) {

            entry.target.style.opacity =
              "1";

            entry.target.style.transform =
              "translateY(0)";

            observer.unobserve(
              entry.target
            );

          }

        });

      },
      {
        threshold: 0.12
      }
    );


  revealElements.forEach(element => {

    element.style.opacity = "0";

    element.style.transform =
      "translateY(25px)";

    element.style.transition =
      "opacity .7s ease, transform .7s ease";

    observer.observe(element);

  });

}


/* =========================================
   INITIAL CART
========================================= */

updateCart();


/* =========================================
   HOYIN'S CUISINE JS LOADED
========================================= */

console.log(
  "Hoyin's Cuisine JavaScript is working!"
);