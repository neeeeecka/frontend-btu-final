class MoviesList {
  constructor(selector, movies, selectedSessions) {
    this.selector = selector;

    this.selectedSessions = selectedSessions;
    this.movies = movies;

    this.element = document.querySelector(selector);
    this.element.addEventListener("click", this.handleClick);

    this.render();
  }

  handleClick = (e) => {
    if (e.target.dataset.title) {
      const title = e.target.dataset.title;
      const id = e.target.dataset.id;

      this.onSessionSelected(title, id);
    }
  };

  render = () => {
    const { element, movies, filter, selectedSession } = this;

    element.innerHTML = `
        <span class="movies__title">Movies</span>
        <div class="movie-list">
        ${
          movies.length
            ? movies
                .map((movie) => {
                  const sessionPicked = this.isSessionPicked(movie);

                  return `
                <div class="movie-preview">
                    <div 
                    class="movie-preview__image" 
                    style="background-image:url(${movie.cover})"></div>

                    <div class="movie-preview__buttons">
                      <h1 class="movie-preview__heading">${movie.title}</h1>
                  
                      <button 
                      class="movie-preview__button${
                        sessionPicked ? "--picked" : ""
                      }" 
                      data-title="${movie.title}" 
                      data-id="${movie.id}"
                      >
                          Pick session for Sunday 10:00
                      </button>
                    </div>
                </div>
            `;
                })
                .join("")
            : `<div class="movie-preview__loader">
<svg width="200px" height="200px"  xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" style="background: none;">
    <circle cx="75" cy="50"  r="6.39718">
        <animate attributeName="r" values="4.8;4.8;8;4.8;4.8" times="0;0.1;0.2;0.3;1" dur="1s" repeatCount="indefinite" begin="-0.875s"></animate>
    </circle>
    <circle cx="67.678" cy="67.678"  r="4.8">
        <animate attributeName="r" values="4.8;4.8;8;4.8;4.8" times="0;0.1;0.2;0.3;1" dur="1s" repeatCount="indefinite" begin="-0.75s"></animate>
    </circle>
    <circle cx="50" cy="75"  r="4.8">
        <animate attributeName="r" values="4.8;4.8;8;4.8;4.8" times="0;0.1;0.2;0.3;1" dur="1s" repeatCount="indefinite" begin="-0.625s"></animate>
    </circle>
    <circle cx="32.322" cy="67.678"  r="4.8">
        <animate attributeName="r" values="4.8;4.8;8;4.8;4.8" times="0;0.1;0.2;0.3;1" dur="1s" repeatCount="indefinite" begin="-0.5s"></animate>
    </circle>
    <circle cx="25" cy="50"  r="4.8">
        <animate attributeName="r" values="4.8;4.8;8;4.8;4.8" times="0;0.1;0.2;0.3;1" dur="1s" repeatCount="indefinite" begin="-0.375s"></animate>
    </circle>
    <circle cx="32.322" cy="32.322"  r="4.80282">
        <animate attributeName="r" values="4.8;4.8;8;4.8;4.8" times="0;0.1;0.2;0.3;1" dur="1s" repeatCount="indefinite" begin="-0.25s"></animate>
    </circle>
    <circle cx="50" cy="25"  r="6.40282">
        <animate attributeName="r" values="4.8;4.8;8;4.8;4.8" times="0;0.1;0.2;0.3;1" dur="1s" repeatCount="indefinite" begin="-0.125s"></animate>
    </circle>
    <circle cx="67.678" cy="32.322"  r="7.99718">
        <animate attributeName="r" values="4.8;4.8;8;4.8;4.8" times="0;0.1;0.2;0.3;1" dur="1s" repeatCount="indefinite" begin="0s"></animate>
    </circle>
</svg>
          </div>`
        }
        </div>
    `;

    return this.innerHTML;
  };

  isSessionPicked = (movie) => {
    const { selectedSessions } = this;

    for (let i = 0; i < selectedSessions.length; i++) {
      const ss = selectedSessions[i];
      if (movie.id == ss.id && movie.start <= ss.time && ss.time <= movie.end) {
        return true;
      }
    }

    return false;
  };
}

export default MoviesList;
