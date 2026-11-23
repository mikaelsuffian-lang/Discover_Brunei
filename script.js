// Navigation menu
document.querySelectorAll(".menu-toggle").forEach(button => {
  const menu = button.parentElement.querySelector(".nav-links");

  if (!menu) return;

  button.setAttribute("aria-expanded", "false");

  button.addEventListener("click", () => {
    const isOpen = menu.classList.toggle("active");

    button.setAttribute("aria-expanded", String(isOpen));
    button.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
  });

  menu.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      menu.classList.remove("active");
      button.setAttribute("aria-expanded", "false");
      button.setAttribute("aria-label", "Open navigation menu");
    });
  });
});


// Respect reduced-motion preferences
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (reducedMotion) {
  document.querySelectorAll(".bg-video").forEach(video => {
    video.pause();
    video.removeAttribute("autoplay");
  });
}


// Homepage fact rotator
const facts = [
  "Brunei has four districts: Brunei-Muara, Belait, Tutong and Temburong.",
  "Brunei celebrates National Day on 23 February.",
  "Kampong Ayer is a historic water settlement on the Brunei River.",
  "The Brunei dollar is interchangeable at par with the Singapore dollar.",
  "Darussalam means Abode of Peace."
];

const fact = document.querySelector("#fact");
const factButton = document.querySelector("#factBtn");

let previousFact = 0;

if (fact && factButton) {
  factButton.addEventListener("click", () => {
    let next = Math.floor(Math.random() * facts.length);

    while (facts.length > 1 && next === previousFact) {
      next = Math.floor(Math.random() * facts.length);
    }

    previousFact = next;
    fact.textContent = facts[next];
  });
}


// Attraction category filters
const filterButtons = document.querySelectorAll(".filter-btn");
const attractionCards = document.querySelectorAll(".attraction-card");

filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    const category = button.dataset.filter;

    filterButtons.forEach(item => {
      item.classList.remove("active");
      item.setAttribute("aria-pressed", "false");
    });

    button.classList.add("active");
    button.setAttribute("aria-pressed", "true");

    attractionCards.forEach(card => {
      card.hidden = category !== "all" && card.dataset.category !== category;
    });
  });
});


// Copy Malay phrases
async function copyText(text, button) {
  try {
    await navigator.clipboard.writeText(text);
    button.textContent = "Copied!";
  } catch (error) {
    button.textContent = "Copy unavailable";
  }

  setTimeout(() => button.textContent = "Copy", 1600);
}

document.querySelectorAll(".copy").forEach(button => {
  button.addEventListener("click", () => {
    copyText(button.dataset.text || "", button);
  });
});


// Attraction map buttons
const mapFrame = document.querySelector("#map");

if (mapFrame) {
  document.querySelectorAll(".show-map").forEach(button => {
    button.addEventListener("click", () => {
      mapFrame.src = "https://maps.google.com/maps?q=" + encodeURIComponent(button.dataset.place) + "&output=embed";

      mapFrame.scrollIntoView({
        behavior: reducedMotion ? "auto" : "smooth",
        block: "center"
      });
    });
  });
}


// Contact form demo validation
const contactForm = document.querySelector("#contactForm");

if (contactForm) {
  const status = document.querySelector("#contactStatus");
  const nameField = document.querySelector("#contactName");
  const emailField = document.querySelector("#contactEmail");
  const messageField = document.querySelector("#contactMessage");

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function showError(message, field) {
    status.textContent = message;
    status.className = "form-message error";
    field.setAttribute("aria-invalid", "true");
    field.focus();
  }

  contactForm.addEventListener("submit", event => {
    event.preventDefault();

    [nameField, emailField, messageField].forEach(field => {
      field.removeAttribute("aria-invalid");
    });

    if (!nameField.value.trim()) {
      return showError("Please enter your name.", nameField);
    }

    if (!emailPattern.test(emailField.value.trim())) {
      return showError("Please enter a valid email address.", emailField);
    }

    if (messageField.value.trim().length < 10) {
      return showError("Please write at least 10 characters.", messageField);
    }

    status.textContent = "Thank you, " + nameField.value.trim() + ". This is a demonstration form; your message has not been sent.";
    status.className = "form-message";

    contactForm.reset();
  });
}