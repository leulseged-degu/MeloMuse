// SEARCH

const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");
const songCards = document.querySelectorAll(".song-card");

function searchSongs() {

    const searchText = searchInput.value.toLowerCase();

    songCards.forEach(function (card) {

        const songName = card.querySelector("h3").textContent.toLowerCase();
        const artistName = card.querySelector("p").textContent.toLowerCase();

        if (
            songName.includes(searchText) ||
            artistName.includes(searchText)
        ) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }

    });

}

searchButton.addEventListener("click", searchSongs);

searchInput.addEventListener("keydown", function (event) {

    if (event.key === "Enter") {
        searchSongs();
    }

});

// FAVORITES

const favoriteButtons = document.querySelectorAll(".favorite-button");
const favoritesContainer = document.getElementById("favoritesContainer");

function updateFavorites() {

    favoritesContainer.innerHTML = "";

    favoriteButtons.forEach(function (button) {

        if (button.classList.contains("favorite-active")) {

            const originalCard = button.closest(".song-card");

            const favoriteCard = originalCard.cloneNode(true);

            favoritesContainer.appendChild(favoriteCard);
        }

    });

    if (favoritesContainer.children.length === 0) {

        favoritesContainer.innerHTML =
            "<p>You haven't added any favorites yet ❤️</p>";

    }
}


favoriteButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        button.classList.toggle("favorite-active");

        updateFavorites();

    });

});

// LIGHT MODE TOGGLER

const themeToggle = document.getElementById("themeToggle");

themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("light-mode");

    if (document.body.classList.contains("light-mode")) {
        themeToggle.innerHTML = `
            <i data-lucide="moon"></i>
            <span>Dark Mode</span>
        `;
    } else {
        themeToggle.innerHTML = `
            <i data-lucide="sun"></i>
            <span>Light Mode</span>
        `;
    }

    lucide.createIcons();
});

// FAVORITES PAGE

const favoritesLink = document.getElementById("favoritesLink");
const homeLink = document.getElementById("homeLink");

favoritesLink.addEventListener("click", function (event) {

    event.preventDefault();

    songCards.forEach(function (card) {

        const favoriteButton = card.querySelector(".favorite-button");

        if (favoriteButton.classList.contains("favorite-active")) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }

    });

});
homeLink.addEventListener("click", function (event) {

    event.preventDefault();

    songCards.forEach(function (card) {
        card.style.display = "block";
    });

});

// PAGE VIEWS

const homeHeader = document.querySelector(".main-content > header");
const searchSection = document.querySelector(".search-section");
const genresSection = document.querySelector(".genres");
const songsSection = document.querySelector(".songs");
const releasesSection = document.querySelector(".new-releases");

const favoritesView = document.getElementById("favoritesView");


// OPEN FAVORITES
favoritesLink.addEventListener("click", function (event) {

    event.preventDefault();

    // Hide Home content
    homeHeader.style.display = "none";
    searchSection.style.display = "none";
    genresSection.style.display = "none";
    songsSection.style.display = "none";
    releasesSection.style.display = "none";

    // Show Favorites
    favoritesView.style.display = "block";

    // Change active sidebar item
    homeLink.classList.remove("active");
    favoritesLink.classList.add("active");

    // Update favorites
    updateFavorites();
});


// OPEN HOME
homeLink.addEventListener("click", function (event) {

    event.preventDefault();

    // Show Home content
    homeHeader.style.display = "block";
    searchSection.style.display = "flex";
    genresSection.style.display = "block";
    songsSection.style.display = "block";
    releasesSection.style.display = "block";

    // Hide Favorites
    favoritesView.style.display = "none";

    // Change active sidebar item
    favoritesLink.classList.remove("active");
    homeLink.classList.add("active");
});