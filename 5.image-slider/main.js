const slider = document.querySelector(".slider");
const dotsContainer = document.querySelector(".dots-container");

async function fetchListOfImages() {
    try {
        const response = await fetch(
            "https://picsum.photos/v2/list?page=1&limit=5",
            {
                method: "GET",
            }
        );

        const imagesList = await response.json();
        if (imagesList && imagesList.length > 0) displayImages(imagesList);
    } catch (error) {
        console.log(error);
    }
}

function displayImages(getImagesList) {
    slider.innerHTML = getImagesList
        .map(
            (item) => `
    <div class="slide">
    <img src= ${item.download_url} alt=${item.id} />
    </div>
    `
        )
        .join(" ");

    dotsContainer.innerHTML = getImagesList
        .map(
            (item, index) => `
    <span class="dot ${index === 0 ? "active" : ""}" data-slide=${index}></span>
    `
        )
        .join(" ");
}

fetchListOfImages();



setTimeout(() => {
    const slides = document.querySelectorAll(".slide");
    const prevBtn = document.querySelector(".prev");
    const nextBtn = document.querySelector(".next");
    let currentSlide = 0;

    function activeDot(slide) {  // slide is the currentslide which has been passed from nextbtn or prevbtn

        // first removing all active from all the dots
        document.querySelectorAll(".dot").forEach((dotItem) => dotItem.classList.remove("active"));

        // adding active class to datslide index
        document.querySelector(`.dot[data-slide="${slide}"]`).classList.add("active");
    }

    function changeCurrentSlide(currentSlide) {  // current slide is current slide passed from nextbtn, precbtn, selected dot
        slides.forEach(
            (slideItem, index) =>
                (slideItem.style.transform = `translateX(${100 * (index - currentSlide)}%)`)

        );
    }

    changeCurrentSlide(currentSlide)

    nextBtn.addEventListener("click", () => {
        currentSlide++;

        if (slides.length - 1 < currentSlide) {
            currentSlide = 0;
        }

        changeCurrentSlide(currentSlide);
        activeDot(currentSlide);
    });

    prevBtn.addEventListener("click", () => {
        currentSlide--;

        if (0 > currentSlide) {
            currentSlide = slides.length - 1;
        }

        changeCurrentSlide(currentSlide);
        activeDot(currentSlide);
    });

    dotsContainer.addEventListener("click", (event) => {  // this functiin is to clickign on dot display respective slide images
        if (event.target.classList.contains('dot')) {
            const currentSlide = event.target.dataset.slide
            changeCurrentSlide(currentSlide)
            activeDot(currentSlide)
        }
    });
}, 1000);