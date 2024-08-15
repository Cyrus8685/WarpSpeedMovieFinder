document.addEventListener('DOMContentLoaded', () => {
    const movieContainer = document.getElementById('movie-container');
    const movieModal = document.getElementById('movie-modal');
    const movieTitle = document.getElementById('movie-title');
    const movieSynopsis = document.getElementById('movie-synopsis');
    const closeModal = document.querySelector('.close');

    const apiKey = '#';
    const apiUrl = '#'; 

    let movies = [];

    async function fetchMovies() {
        try {
            const response = await fetch(apiUrl + '?api_key=' + apiKey);
            const data = await response.json();
            movies = data.results;
            displayMovies(movies);
        } catch (error) {
            console.error('Error fetching movies:', error);
        }
    }

    function displayMovies(movieList) {
        movieContainer.innerHTML = '';
        movieList.forEach(movie => {
            const movieCard = document.createElement('div');
            movieCard.className = 'movie-card';
            movieCard.innerHTML = `
                <img src="${movie.poster_path}" alt="${movie.title}">
                <h3>${movie.title}</h3>
            `;
            movieCard.addEventListener('click', () => {
                movieTitle.textContent = movie.title;
                movieSynopsis.textContent = movie.overview;
                movieModal.style.display = 'flex';
            });
            movieContainer.appendChild(movieCard);
        });
    }

    function filterMovies(genre) {
        const filteredMovies = genre === 'All' ? movies : movies.filter(movie => movie.genre_ids.includes(genre));
        displayMovies(filteredMovies);
    }

    document.querySelectorAll('.genre-button').forEach(button => {
        button.addEventListener('click', () => {
            filterMovies(button.id.replace('genre-', ''));
        });
    });

    closeModal.addEventListener('click', () => {
        movieModal.style.display = 'none';
    });

    // Fetch and display movies on page load
    fetchMovies();
});
