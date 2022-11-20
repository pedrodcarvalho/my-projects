const moviesTemplate = document.querySelector('.movies');
let dataCached = {};
let moviesHTMLCached = '';

document.getElementById('search').addEventListener('click', () => {
    const movieName = document.getElementById('movie-name').value;

    fetch(`/movie?name=${movieName}`).then((res) => {
        return res.json();
    }).then((data) => {
        dataCached = data;

        try {
            if (data.results.length === 0) {
                throw new Error('No movies found');
            }

            const moviesObj = {
                moviesHTML: '',
                moviesCount: 1,
                newRow: true,
            };

            data.results.map((movie) => {
                if (movie.backdrop_path) {
                    if (moviesObj.newRow) {
                        moviesObj.moviesHTML += '<div class="flex">';
                        moviesObj.newRow = false;
                    }

                    moviesObj.moviesHTML += `
                    <div id="${movie.id}" class="movie-frame">
                      <img src="https://image.tmdb.org/t/p/original${movie.backdrop_path}" class="poster">
                      <p>${movie.title}</p>
                    </div>
                    `;

                    if (moviesObj.moviesCount % 5 === 0 && moviesObj.moviesCount !== 0) {
                        moviesObj.moviesHTML += '</div>';
                        moviesObj.newRow = true;
                    }

                    moviesObj.moviesCount++;
                }
            });

            moviesTemplate.innerHTML = moviesObj.moviesHTML;
            moviesHTMLCached = moviesObj.moviesHTML;

            setMoviesPage(data);
        }
        catch (err) {
            moviesTemplate.innerHTML = '<h1>No movies found</h1>';
        }
    });
});

const setMoviesPage = (data) => {
    const movies = document.querySelectorAll('.movie-frame');

    movies.forEach((movie) => {
        movie.addEventListener('click', () => {
            const movieId = movie.id;

            getMovieDetailedInfo(movieId, data);
        });
    });
};

const getMovieDetailedInfo = (movieId, data) => {
    const detailedInfo = data.results.find((movie) => {
        return movie.id === parseInt(movieId);
    });

    setMovieDetailedInfo(detailedInfo);
};

const setMovieDetailedInfo = (movie) => {
    const movieInfo = `
    <h1>${movie.title}</h1>
    <img src="https://image.tmdb.org/t/p/original${movie.backdrop_path}" class="poster big no-hover">
    <p class="break-text">${movie.overview}</p>
    <p>Release date: ${new String(movie.release_date).split('-').reverse().toString().replaceAll(',', '/')}</p>
    <p>Rating: <span style="color:${ratingColor(movie.vote_average)};">${movie.vote_average}</span></p>
    <button id="back" class="back">Go back</button>
    `;

    moviesTemplate.innerHTML = movieInfo;

    document.getElementById('back').addEventListener('click', () => {
        moviesTemplate.innerHTML = moviesHTMLCached;

        setMoviesPage(dataCached);
    });
};

const ratingColor = (rating) => {
    if (rating === 0) {
        return '#292929'; // gray
    }
    else if (rating >= 0.1 && rating <= 2.5) {
        return '#ed2939'; // red
    }
    else if (rating >= 2.6 && rating <= 5) {
        return '#ff5f15'; // orange
    }
    else if (rating >= 5.1 && rating <= 6.9) {
        return '#fdda0d'; // yellow
    }
    else if (rating >= 7 && rating <= 8.9) {
        return '#9acd31'; // green
    }
    else {
        return '#6495ed'; // blue
    }
};
