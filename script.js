// ===============================
// SEARCH
// ===============================

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
            card.style.display = "";
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


// ===============================
// FAVORITES
// ===============================

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

    lucide.createIcons();
}

favoriteButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        button.classList.toggle("favorite-active");

        updateFavorites();
    });

});


// ===============================
// DARK / LIGHT MODE
// ===============================

const themeToggle = document.getElementById("themeToggle");

themeToggle.addEventListener("click", function () {

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


// ===============================
// PAGE LINKS
// ===============================

const homeLink = document.getElementById("homeLink");
const trendingLink = document.getElementById("trendingLink");
const favoritesLink = document.getElementById("favoritesLink");
const discoverLink = document.getElementById("discoverLink");
const searchLink = document.getElementById("searchLink");


// ===============================
// HOME SECTIONS
// ===============================

const homeHeader = document.querySelector(".main-content > header");
const searchSection = document.querySelector(".search-section");
const genresSection = document.querySelector(".genres");
const songsSection = document.querySelector(".songs");
const releasesSection = document.querySelector(".new-releases");


// ===============================
// PAGE VIEWS
// ===============================

const favoritesView = document.getElementById("favoritesView");
const trendingView = document.getElementById("trendingView");
const discoverView = document.getElementById("discoverView");
const searchView = document.getElementById("searchView");


// ===============================
// SEARCH PAGE
// ===============================

const searchPageInput = document.getElementById("searchPageInput");
const searchResults = document.getElementById("searchResults");
const searchPageButton = document.getElementById("searchPageButton");


// ===============================
// ACTIVE SIDEBAR LINK
// ===============================

function setActiveLink(activeLink) {

    homeLink.classList.remove("active");
    trendingLink.classList.remove("active");
    favoritesLink.classList.remove("active");
    discoverLink.classList.remove("active");
    searchLink.classList.remove("active");

    activeLink.classList.add("active");
}


// ===============================
// HIDE ALL PAGES
// ===============================

function hideAllPages() {

    homeHeader.style.display = "none";
    searchSection.style.display = "none";
    genresSection.style.display = "none";
    songsSection.style.display = "none";
    releasesSection.style.display = "none";

    favoritesView.style.display = "none";
    trendingView.style.display = "none";
    discoverView.style.display = "none";
    searchView.style.display = "none";
}


// ===============================
// HOME
// ===============================

homeLink.addEventListener("click", function (event) {

    event.preventDefault();

    hideAllPages();

    homeHeader.style.display = "";
    searchSection.style.display = "";
    genresSection.style.display = "";
    songsSection.style.display = "";
    releasesSection.style.display = "";

    songCards.forEach(function (card) {
        card.style.display = "";
    });

    setActiveLink(homeLink);
});


// ===============================
// TRENDING
// ===============================

trendingLink.addEventListener("click", function (event) {

    event.preventDefault();

    hideAllPages();

    trendingView.style.display = "block";

    setActiveLink(trendingLink);

    lucide.createIcons();
});


// ===============================
// FAVORITES
// ===============================

favoritesLink.addEventListener("click", function (event) {

    event.preventDefault();

    hideAllPages();

    favoritesView.style.display = "block";

    updateFavorites();

    setActiveLink(favoritesLink);
});


// ===============================
// DISCOVER
// ===============================

discoverLink.addEventListener("click", function (event) {

    event.preventDefault();

    hideAllPages();

    discoverView.style.display = "block";

    setActiveLink(discoverLink);

    lucide.createIcons();
});


// ===============================
// SEARCH PAGE
// ===============================

searchLink.addEventListener("click", function (event) {

    event.preventDefault();

    hideAllPages();

    searchView.style.display = "block";

    setActiveLink(searchLink);

    searchPageInput.focus();

    lucide.createIcons();
});



 // ===============================
 // SEARCH PAGE RESULTS
 // ===============================

function searchPageSongs() {
    const searchText = searchPageInput.value
        .toLowerCase()
        .trim();

    searchResults.innerHTML = "";

    if (searchText === "") {
        searchResults.innerHTML = `
            <p class="search-message">
                Start typing to search for music.
            </p>
        `;
        return;
    }

    let foundSongs = 0;

    const uniqueSongs = new Map();

    songCards.forEach(function (card) {
        const songName = card.querySelector("h3").textContent.trim();
        const artistName = card.querySelector("p").textContent.trim();

        const songKey = `${songName.toLowerCase()}-${artistName.toLowerCase()}`;

        if (!uniqueSongs.has(songKey)) {
            uniqueSongs.set(songKey, card);
        }
    });

uniqueSongs.forEach(function (card) {
        const songName = card
            .querySelector("h3")
            .textContent
            .toLowerCase();

        const artistName = card
            .querySelector("p")
            .textContent
            .toLowerCase();

        if (
            songName.includes(searchText) ||
            artistName.includes(searchText)
        ) {
            const resultCard = card.cloneNode(true);
            searchResults.appendChild(resultCard);
            foundSongs++;
        }
    });

    if (foundSongs === 0) {
        searchResults.innerHTML = `
            <p class="search-message">
                No music found for "${searchPageInput.value}".
            </p>
        `;
    }

    lucide.createIcons();
}

// Search button click
searchPageButton.addEventListener("click", searchPageSongs);

// Press Enter to search
searchPageInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        searchPageSongs();
    }
});
