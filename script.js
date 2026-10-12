const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

const ICON_MENU = menuToggle.innerHTML;
const ICON_CLOSE =
  '<svg class="icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><line x1="6" y1="6" x2="18" y2="18"/><line x1="18" y1="6" x2="6" y2="18"/></svg>';

menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.innerHTML = isOpen ? ICON_CLOSE : ICON_MENU;
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.textContent = "☰";
  });
});

document.getElementById("year").textContent = new Date().getFullYear();

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Reveal sections as they enter the viewport.
const revealEls = document.querySelectorAll(".reveal");
if (revealEls.length) {
  if (prefersReducedMotion) {
    revealEls.forEach((el) => el.classList.add("is-visible"));
  } else {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2, rootMargin: "0px 0px -60px 0px" }
    );
    revealEls.forEach((el) => observer.observe(el));
  }
}

// Cycle the terminal's status line through a few short messages.
const terminalText = document.querySelector(".terminal-text");
if (terminalText && !prefersReducedMotion) {
  const messages = [
    "Ready to build something",
    "Compiling ideas into code",
    "Learning, one commit at a time",
  ];
  let index = 0;

  const typeMessage = (message, onDone) => {
    terminalText.textContent = "";
    let i = 0;
    const type = () => {
      terminalText.textContent = message.slice(0, i + 1);
      i += 1;
      if (i < message.length) {
        setTimeout(type, 28);
      } else {
        setTimeout(onDone, 1800);
      }
    };
    type();
  };

  const eraseMessage = (onDone) => {
    const erase = () => {
      const current = terminalText.textContent;
      if (current.length > 0) {
        terminalText.textContent = current.slice(0, -1);
        setTimeout(erase, 16);
      } else {
        onDone();
      }
    };
    erase();
  };

  const cycle = () => {
    typeMessage(messages[index], () => {
      eraseMessage(() => {
        index = (index + 1) % messages.length;
        cycle();
      });
    });
  };

  setTimeout(cycle, 1600);
}
