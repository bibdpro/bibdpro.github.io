// module/urlhandler.js

document.addEventListener("DOMContentLoaded", function () {
  const elements = document.querySelectorAll(".x-main > div");
  elements.forEach((element) => {
    element.style.display = "none";
  });

  const path = window.location.pathname;
  let fragment = window.location.hash.substr(1, 6).toLowerCase();
  let structure = "";

  switch (true) {
    case path === "/" && fragment === "":
      structure = "home";
      break;
    case fragment === "faves":
      structure = "faves";
      break;
    case fragment === "images" || fragment.includes("images"):
      structure = "images";
      break;
    case fragment === "stream":
      structure = "stream";
      break;
    case fragment === "search":
      structure = "search";
      break;
    default:
      structure = "unknown";
      break;
  }

  const element = document.querySelector(`.x-${structure}`);

  if (element) {
    element.style.display = "block";

    const iconStatus = Array.from(elements).map(
      (el) => el.style.display === "block"
    );

    const svgIcons = document.querySelectorAll(".x-menu-item svg");
    svgIcons.forEach((svg, index) => {
      const itemName = svg.parentElement.innerText.trim();
      const iconName = itemName.toLowerCase();
      const fillType = iconStatus[index] ? "fill" : "line";
      const imageUrl = `./assets/fonts/icons/${iconName}-${fillType}.svg`;
      svg.querySelector("image").setAttribute("href", imageUrl);
    });

    const smallElements = document.querySelectorAll(".x-menu-item small");
    smallElements.forEach((small, index) => {
      if (iconStatus[index]) {
        small.classList.add("text-black", "font-semibold");
        small.classList.remove("text-slate-400");
      } else {
        small.classList.add("text-slate-400");
        small.classList.remove("text-black", "font-semibold");
      }
    });
  } else {
    document.body.innerHTML = `
        <div class="error-container mx-auto mt-8 md:mt-16 lg:max-w-lg xl:max-w-xl" style="max-width: 400px; margin: auto; padding: 2rem; border-radius: 0.5rem; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); background-color: #ffffff; text-align: center;">
          <img src="https://cdn-icons-png.flaticon.com/512/9715/9715024.png" alt="Error" class="error-image mx-auto" style="max-width: 200px; margin-bottom: 1rem;">
          <h2 class="error-title text-xl md:text-2xl lg:text-3xl mb-4" style="font-size: 1.5rem; font-weight: 600; color: #4b5563; margin-bottom: 1rem;">Oops! Something went wrong.</h2>
          <p class="error-message" style="color: #6b7280; margin-bottom: 1rem;">We apologize for the inconvenience.</p>
          <p class="error-message" style="color: #6b7280; margin-bottom: 1rem;">Please try again later.</p>
          <p class="error-message" style="color: #6b7280; margin-bottom: 1rem;">You can go back to <a href="../" class="error-link" style="color: #2563eb; text-decoration: underline; transition: color 0.2s ease;">home</a>.</p>
        </div>
      `;
  }

  document.querySelectorAll(".x-menu-item").forEach((item) => {
    item.addEventListener("click", () => {
      history.replaceState(
        null,
        document.title,
        window.location.pathname + window.location.search
      );
    });
  });
});
