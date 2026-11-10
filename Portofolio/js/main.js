const toggle = document.querySelector(".nav-toggle");
const menu = document.querySelector("#menu");
const nav = document.querySelector(".nav");

toggle.addEventListener("click", () => {
  const open = menu.classList.toggle("open");
  toggle.setAttribute("aria-expanded", open ? "true" : "false");
});

menu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    menu.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
  });
});

window.addEventListener("scroll", () => {
  nav.classList.toggle("scrolled", window.scrollY > 8);
}, { passive: true });

document.querySelectorAll("[data-gallery]").forEach((gallery) => {
  const track = gallery.querySelector(".gallery-track");
  const slides = [...track.children];
  const caption = gallery.querySelector("[data-caption]");
  const count = gallery.querySelector("[data-count]");
  let index = 0;

  const show = (next) => {
    index = (next + slides.length) % slides.length;
    track.style.transform = `translateX(${-index * 100}%)`;
    caption.textContent = slides[index].dataset.label;
    count.textContent = `${index + 1} / ${slides.length}`;
  };

  gallery.querySelector(".prev").addEventListener("click", () => show(index - 1));
  gallery.querySelector(".next").addEventListener("click", () => show(index + 1));

  let startX = 0;
  track.addEventListener("pointerdown", (event) => {
    startX = event.clientX;
  });
  track.addEventListener("pointerup", (event) => {
    const delta = event.clientX - startX;
    if (Math.abs(delta) > 40) show(index + (delta < 0 ? 1 : -1));
  });
});
