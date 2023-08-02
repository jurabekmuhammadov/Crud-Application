document.body.style = "background-color: var(--bs-light);transition: 0.5s;";
const sun =
  "https://www.uplooder.net/img/image/55/7aa9993fc291bc170abea048589896cf/sun.svg";
const moon =
  "https://www.uplooder.net/img/image/2/addf703a24a12d030968858e0879b11e/moon.svg";

let theme = "light";
const root = document.querySelector(":root");
const themeBtn = document.getElementsByClassName("theme-button")[0];
const themeIcon = document.getElementById("theme-icon");
themeBtn.addEventListener("click", setTheme);

function setTheme() {
  switch (theme) {
    case "light":
      setDark();
      theme = "dark";
      break;
    case "dark":
      setLight();
      theme = "light";
      break;
  }
}
function setLight() {
  root.style.setProperty(
    "--bs-light",
    "linear-gradient(318.32deg, #c3d1e4 0%, #dde7f3 55%, #d4e0ed 100%)"
  );
  themeBtn.classList.remove("shadow-light");
  document.body.classList.toggle("dark");
  setTimeout(() => {
    themeBtn.classList.add("shadow-dark");
    themeIcon.classList.remove("change");
  }, 300);
  themeIcon.classList.add("change");
  themeIcon.src = moon;
}
function setDark() {
  root.style.setProperty("--bs-light", "#212529");
  document.body.classList.toggle("dark");
  themeBtn.classList.remove("shadow-dark");
  setTimeout(() => {
    themeBtn.classList.add("shadow-light");
    themeIcon.classList.remove("change");
  }, 300);
  themeIcon.classList.add("change");
  themeIcon.src = sun;
}
