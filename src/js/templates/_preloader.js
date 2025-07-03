import { disablePageScroll, enablePageScroll } from "scroll-lock";

export function showLoader(nodeElement = false) {
  const preloader = document.querySelector(".preloader-wrap");
  if (nodeElement) {
    if (!nodeElement.classList.contains("loader-block-wrap")) {
      const div = document.createElement("div");
      div.innerHTML = preloader.innerHTML;
      div.classList.add("loader-block");
      nodeElement.appendChild(div);
      nodeElement.classList.add("loader-block-wrap");
    }
  } else {
    if (preloader) {
      preloader.classList.add("active");
      preloader.style.opacity = "1";
      preloader.style.visibility = "visible";
      disablePageScroll();
    }
  }
}

export function hideLoader(nodeElement = false) {
  const preloader = document.querySelector(".preloader-wrap");

  if (nodeElement) {
    nodeElement.querySelector(".loader-block").remove();
    nodeElement.classList.remove("loader-block-wrap");
  } else {
    if (preloader) {
      if (preloader.classList.contains("active")) {
        preloader.classList.remove("active");
        preloader.style.opacity = "0";
        preloader.style.visibility = "hidden";
        enablePageScroll();
      }
    }
  }
}

window.showLoader = showLoader;
window.hideLoader = hideLoader;
