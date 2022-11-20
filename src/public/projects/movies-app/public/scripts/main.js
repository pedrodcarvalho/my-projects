const moviesTemplate = document.querySelector('.movies');

document.getElementById('search').addEventListener('click', () => {
    const movieName = document.getElementById('movie-name').value;

    fetch(`/movie?name=${movieName}`).then((res) => {
        return res.json();
    }).then((data) => {
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

            const movies = document.querySelectorAll('.movie-frame');

            movies.forEach((movie) => {
                movie.addEventListener('click', () => {
                    const movieId = movie.id;

                    getMovieDetailedInfo(movieId, data);
                });
            });
        }
        catch (err) {
            moviesTemplate.innerHTML = '<h1>No movies found</h1>';
        }
    });
});

getMovieDetailedInfo = (movieId, data) => {
    const detailedInfo = data.results.find((movie) => {
        return movie.id === parseInt(movieId);
    });

    setMovieDetailedInfo(detailedInfo);
};

setMovieDetailedInfo = (movie) => {
    const movieInfo = `
      <div>
        <h1>${movie.title}</h1>
        <p>${movie.overview}</p>
      </div>
    `;

    moviesTemplate.innerHTML = movieInfo;
};
