document.addEventListener("DOMContentLoaded", function () {
  const scrollToTopButton = document.querySelector(".scroll-to-top");

  scrollToTopButton.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  window.addEventListener("scroll", function () {
    if (window.scrollY > 100) {
      scrollToTopButton.style.display = "block";
    } else {
      scrollToTopButton.style.display = "none";
    }
  });

  const darkModeToggle = document.getElementById("dark-mode-toggle-checkbox");
  const body = document.body;

  darkModeToggle.addEventListener("change", function () {
    if (this.checked) {
      body.classList.add("dark-mode");
    } else {
      body.classList.remove("dark-mode");
    }
  });

  const lightbox = document.getElementById("lightbox");
  const lightboxImg = lightbox.querySelector(".lightbox-img");
  const screenshotItems = document.querySelectorAll(
    ".screenshots .col-md-4 img"
  );

  screenshotItems.forEach((item) => {
    item.addEventListener("click", () => {
      lightboxImg.src = item.src;
      lightbox.style.display = "flex";
    });
  });

  lightbox.addEventListener("click", (e) => {
    if (e.target !== lightboxImg) {
      lightbox.style.display = "none";
    }
  });

  fetch("data.json")
    .then((response) => response.json())
    .then((data) => {
      // Populate hero section
      const hero = data.hero;
      document.querySelector(".hero h1").textContent = hero.headline;
      document.querySelector(".hero p").textContent = hero.subheadline;
      document.querySelector(".hero .btn-primary").href =
        hero.ctaButtons[0].link;
      document.querySelector(".hero .btn-secondary").href =
        hero.ctaButtons[1].link;

      // Populate features section
      const features = data.features;
      const featuresContainer = document.querySelector("#features .row");
      features.forEach((feature) => {
        const featureItem = document.createElement("div");
        featureItem.classList.add("col-md-4");
        featureItem.innerHTML = `
            <div class="feature-item p-4 rounded shadow">
              <h3>${feature.title}</h3>
              <p>${feature.description}</p>
            </div>
          `;
        featuresContainer.appendChild(featureItem);
      });

      // Populate testimonials section
      const testimonials = data.testimonials;
      const testimonialsContainer =
        document.querySelector("#testimonials .row");
      testimonials.forEach((testimonial) => {
        const testimonialItem = document.createElement("div");
        testimonialItem.classList.add("col-md-4");
        testimonialItem.innerHTML = `
            <div class="testimonial-item p-4 rounded shadow">
              <blockquote class="blockquote">
                <p class="mb-0">"${testimonial.feedback}"</p>
                <footer class="blockquote-footer">${testimonial.name}</footer>
              </blockquote>
            </div>
          `;
        testimonialsContainer.appendChild(testimonialItem);
      });

      // Populate pricing section
      const pricing = data.pricing;
      const pricingContainer = document.querySelector("#pricing .row");
      pricing.forEach((plan) => {
        const pricingItem = document.createElement("div");
        pricingItem.classList.add("col-md-4");
        pricingItem.innerHTML = `
            <div class="pricing-plan card shadow">
              <div class="card-body">
                <h3 class="card-title">${plan.plan}</h3>
                <p>${plan.features.join(", ")}</p>
                <p class="card-text">${plan.price}</p>
                <a href="#" class="btn btn-primary">Choose Plan</a>
              </div>
            </div>
          `;
        pricingContainer.appendChild(pricingItem);
      });
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
});
