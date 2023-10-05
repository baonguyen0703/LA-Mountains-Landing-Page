const menuButton = document.querySelector(".menu-button");
const linkContainer = document.querySelector(".link-container");
const links = document.querySelectorAll(".link-container > *");

menuButton.addEventListener("click", () => {
  linkContainer.classList.toggle("hide");
});

links.forEach((link) => {
  link.addEventListener("click", () => {
    linkContainer.classList.toggle("hide");
  });
});

const tabHeaderList = document.querySelectorAll(".tab-header");

contentList.forEach((content) => {
  content.style.display = "none";
});

if (window.innerWidth >= 768) {
    contentList[0].style.display = "flex";
}

tabHeaderList.forEach((tabHeader) => {
  tabHeader.addEventListener("click", () => {
    const content = tabHeader.nextElementSibling;
    const expandButton = tabHeader.lastElementChild
    if (expandButton.innerHTML === "expand_more") {
        expandButton.innerHTML = "expand_less";
        content.style.display = "flex";
      } else {
        expandButton.innerHTML = "expand_more";
        content.style.display = "none";
      }
  });
});
const expandButtonList = document.querySelectorAll(".expand-button");
window.addEventListener('resize', () => {
    if (window.innerWidth < 768) {
        expandButtonList.forEach((expandButton) => {
            const content = expandButton.parentElement.nextElementSibling
            if (expandButton.innerHTML === "expand_less") {
                content.style.display = "flex";
              } else {
                content.style.display = "none";
              }
        })
    } else {
        for (let i=0; i < tabNavList.length; i++) {
            if (tabNavList[i].classList.contains("active")) {
                contentList[i].style.display = "flex"
            } else {
                contentList[i].style.display = "none"
            }
        }
    }
})