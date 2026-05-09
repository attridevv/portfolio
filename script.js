(function () {
  "use strict";

  var timeEl = document.getElementById("local-time");
  var yearEl = document.getElementById("year");
  var revealEls = Array.prototype.slice.call(document.querySelectorAll("[data-reveal]"));

  function updateTime() {
    if (!timeEl) return;
    var now = new Date();
    timeEl.textContent = now.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false
    });
    timeEl.dateTime = now.toISOString();
  }

  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  updateTime();
  setInterval(updateTime, 30000);

  if ("IntersectionObserver" in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.14 });

    revealEls.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    revealEls.forEach(function (el) {
      el.classList.add("is-visible");
    });
  }
}());
