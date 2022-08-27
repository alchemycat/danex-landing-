window.addEventListener("DOMContentLoaded", () => {
  const burger = document.querySelector(".burger");
  const menu = document.querySelector(".navbar");

  burger.addEventListener("click", () => {
    burger.classList.toggle("burger_active");
    menu.classList.toggle("navbar_active");
  });

  const modal = document.querySelector("#city");
  const city = window.localStorage.getItem("city");

  if (!city) {
    modal.classList.add("modal_active");
    document.body.style.overflow = "hidden";
  }

  const closeButtons = document.querySelectorAll(".modal__close");

  setCity();

  function setCity() {
    const currentCity = document.querySelectorAll(".current__city");
    const city = window.localStorage.getItem("city") || "Алматы";
    currentCity.forEach((item) => {
      item.textContent = city;
    });
    const adminEmails = document.querySelectorAll('[name="admin_email"]');

    if (city == "Алматы") {
      adminEmails.forEach((item) => {
        item.value = "vtiw27@gmail.com";
      });
    } else {
      adminEmails.forEach((item) => {
        item.value = "colacat1927@gmail.com";
      });
    }
  }

  closeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      button.parentElement.parentElement.classList.remove("modal_active");
      document.body.style.overflow = "visible";
    });
  });

  function changeCity(buttonsSelector, modalActiveClass = null) {
    const buttons = document.querySelectorAll(buttonsSelector);

    buttons.forEach((button) => {
      button.addEventListener("click", (e) => {
        e.preventDefault();
        window.localStorage.setItem("city", button.textContent);
        if (modalActiveClass) {
          modal.classList.remove(modalActiveClass);
          document.body.style.overflow = "visible";
        }

        try {
          let footerList = document.querySelector(".footer__change-city");
          footerList.classList.remove("change__city_active");
        } catch {}

        setCity();
      });
    });
  }

  changeCity(".modal__button", "modal_active");
  changeCity(".change__city-button");

  function toggleList(buttonSelector, listSelector) {
    const changeButton = document.querySelector(buttonSelector);

    changeButton.addEventListener("click", (e) => {
      e.preventDefault();
      const changeModal = document.querySelector(listSelector);

      changeModal.classList.toggle("change__city_active");
    });
  }

  toggleList(".contacts__item_choice", ".header__change-city");
  toggleList(".footer__select-city", ".footer__change-city");

  function createOrder() {
    const orderButtons = document.querySelectorAll(".assortment__button");
    const orderModal = document.querySelector("#order");

    orderButtons.forEach((orderButton) => {
      orderButton.addEventListener("click", (e) => {
        e.preventDefault();
        const parent = orderButton.parentElement;

        const title = parent.querySelector(".assortment__name").textContent;
        const details = parent.querySelector(
          ".assortment__details"
        ).textContent;

        const inputTitle = document.querySelector('[name="order-title"]');
        const inputDetails = document.querySelector('[name="order-details"]');

        inputTitle.value = title;
        inputDetails.value = details;

        orderModal.classList.add("modal_active");
      });
    });
  }

  createOrder();

  function smoothScrolling() {
    let anchorlinks = document.querySelectorAll('a[href^="#"]');

    for (let item of anchorlinks) {
      // relitere
      item.addEventListener("click", (e) => {
        let hashval = item.getAttribute("href");
        try {
          const navbar = document.querySelector(".navbar");
          const burger = document.querySelector(".burger");
          navbar.classList.remove("navbar_active");
          burger.classList.remove("burger_active");
        } catch {}
        let target = document.querySelector(hashval);
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
        history.pushState(null, null, hashval);
        e.preventDefault();
      });
    }
  }
  smoothScrolling();

  function sendRequest(formSelector) {
    const form = document.querySelector(formSelector);
    const button = form.querySelector(".button");

    button.addEventListener("click", (e) => {
      e.preventDefault();

      // const alert = document.createElement("div");
      const alert = document.querySelector(".alert");

      let formData = new FormData(form);

      let xhr = new XMLHttpRequest();

      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            console.log("Отправлено");
            alert.innerText == "Заявка успешна отправлена.";

            form.append(alert);
          } else {
            alert.innerText ==
              "Ошибка, не удалось отправить заявку, попробуйте еще раз.";
            form.append(alert);
          }
          form.reset();
        }
      };

      xhr.open("POST", "/mailer/smart.php", true);
      xhr.send(formData);
    });
  }

  sendRequest("#order-form");
  sendRequest("#question-form");
});
