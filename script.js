const phone = "923703851991"; // yahan number likho (92 ke saath, bina 0)

document.getElementById("heroBtn").href =
  `https://wa.me/${phone}?text=${encodeURIComponent("Hello, I would like to place an order.")}`;

document.querySelectorAll(".order").forEach(btn => {
  btn.addEventListener("click", () => {
    const msg = `Hello, I would like to order "${btn.dataset.name}".`;
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`, "_blank");
  });
});

const header = document.querySelector(".header");
window.addEventListener("scroll", () => header.classList.toggle("scrolled", window.scrollY > 50));

const items = document.querySelectorAll(".section h2, .deal, .card, #contact p");
items.forEach((el, i) => {
  el.classList.add("reveal");
  el.style.setProperty("--d", (i % 3) * 0.15 + "s");
});
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add("visible"); observer.unobserve(e.target); }
  });
}, { threshold: 0.15 });
items.forEach(el => observer.observe(el));

if (window.matchMedia("(hover: hover)").matches) {
  document.querySelectorAll(".card").forEach(card => {
    card.addEventListener("mousemove", e => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      card.style.transform = `perspective(800px) rotateY(${x*14}deg) rotateX(${-y*14}deg) translateY(-8px)`;
    });
    card.addEventListener("mouseleave", () => card.style.transform = "");
  });
}