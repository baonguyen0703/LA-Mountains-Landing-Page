const tnContainer = document.querySelector(".thumbnails-container");
const circleNav = document.querySelector(".circle-nav");
const imgList = document.querySelectorAll(".thumbnails-container img");

function updateLayout(mobile) {
    if (mobile) {
        imgsPerGroup = 2;
    } else {
        imgsPerGroup = 4;
    }

    numGroups = Math.ceil(imgList.length / imgsPerGroup);

    // clear all elements inside
    tnContainer.innerHTML = "";
    circleNav.innerHTML = "";

    let counter = 0;
    for (let i = 0; i < numGroups; i++) {
        const tngroup = document.createElement("div");
        tngroup.id = `tngroup${i + 1}`;
        tngroup.classList.add("tngroup");
        for (let j = 0; j < imgsPerGroup && counter < imgList.length; j++) {
            const imgIndex = i * imgsPerGroup + j;
            tngroup.appendChild(imgList[imgIndex]);
            counter++;
        }
        tnContainer.appendChild(tngroup);

        const circleNavButton = document.createElement("a");
        circleNavButton.href = `#tngroup${i + 1}`;
        circleNavButton.dataset.groupId = `tngroup${i + 1}`;
        circleNav.appendChild(circleNavButton);
    }

    handleNavigation();
}

function handleNavigation() {
    const circleNavButtonList = document.querySelectorAll(".circle-nav a");
    const tnContainerLeft = tnContainer.getBoundingClientRect().left;

    for (let i = 0; i < circleNavButtonList.length; i++) {
        const nav = circleNavButtonList[i];

        // handle circle navbar
        nav.addEventListener("click", (e) => {
            const tngroup = document.getElementById(nav.dataset.groupId);
            console.log(tngroup);
            e.preventDefault();
            if (tngroup) {
                const tngroupLeft = tngroup.getBoundingClientRect().left;
                targetLeft = tngroupLeft - tnContainerLeft; // distance between left edges of target and the containter
                tnContainer.scrollLeft += targetLeft;
            }
        });
    }
    // handle scroll events
    tnContainer.addEventListener("scroll", handleScroll);
}

function handleScroll() {
    console.log("numGroups: ", numGroups);
    const circleNavButtonList = document.querySelectorAll(".circle-nav a");
    let iActive = null;
    let minDistance = window.innerWidth;

    //   active group's left edge will has the min distance to tnContainer's left edge
    for (let i = 0; i < numGroups; i++) {
        const tngroup = document.getElementById(`tngroup${i + 1}`);
        if (tngroup) {
            const tngroupRect = tngroup.getBoundingClientRect();
            const tnContainerRect = tnContainer.getBoundingClientRect();
            const tngroupLeft = tngroupRect.left;
            const tnContainerLeft = tnContainerRect.left;
            const distance = Math.abs(tngroupLeft - tnContainerLeft);
            if (distance < minDistance) {
                minDistance = distance;
                iActive = i;
            }
        }
    }
    for (let i = 0; i < numGroups; i++) {
        if (i !== iActive) {
            circleNavButtonList[i].classList.remove("active-group");
        } else {
            circleNavButtonList[i].classList.add("active-group");
        }
    }
}

let imgsPerGroup = 4;
if (window.innerWidth < 768) {
    imgsPerGroup = 2;
}

let mobile = window.innerWidth < 768;

let numGroups = Math.ceil(imgList.length / imgsPerGroup);
updateLayout(mobile);

window.addEventListener("resize", () => {
    // update layout only when mobile state changes
    if (
        (mobile && window.innerWidth >= 768) ||
        (!mobile && window.innerWidth < 768)
    ) {
        mobile = window.innerWidth < 768;
        tnContainer.removeEventListener("scrollend", handleScroll);

        updateLayout(mobile);
    }
});
