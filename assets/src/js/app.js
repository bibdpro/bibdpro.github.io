// app.js

const data = () => {
  return {
    detail: {
      villagers: [],
      ximages: [],
      xposters: [],
      xvideos: [],
      xstream: {},
    },
currentPage: 1,
    itemsPerPage: 51,
    get paginatedPosters() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.detail.xposters.slice(startIndex, endIndex);
    },
    init() {
      fetch('./assets/media/data.json')
        .then((ress) => {
          if (!ress.ok) {
            throw new Error('Failed to retrieve data: ' + ress.status);
          }
          return ress.json();
        })
        .then((encryptedData) => {
          const decodeAndParse = (data) => JSON.parse(atob(data));

          const imagesArray = decodeAndParse(encryptedData.images);
          const videosArray = decodeAndParse(encryptedData.videos);
          const postersArray = decodeAndParse(encryptedData.posters);

          const shuffleArray = (array) => {
              for (let i = array.length - 1; i > 0; i--) {
                  const j = Math.floor(Math.random() * (i + 1));
                  [array[i], array[j]] = [array[j], array[i]];
              }
              return array;
          };

          const shuffledImagesArray = shuffleArray(imagesArray);
          const shuffledPostersArray = shuffleArray(postersArray);
          const shuffledVideosArray = shuffleArray(videosArray);

          this.detail.ximages = shuffledImagesArray;
          this.detail.xposters = shuffledPostersArray;
          this.detail.xvideos = shuffledVideosArray;
          this.detail.villagers = [...shuffledImagesArray, ...shuffledVideosArray, ...shuffledPostersArray];

          this.openRandomVideo();

          var currentURL = window.location.href;
          setInterval(function() {
            if (window.location.href !== currentURL) {
              currentURL = window.location.href;
              window.location.reload();
            }
          }, 100);

          function ambilTeksPathDariURL() {
            var url = window.location.href;
            var teksPath = url.split('?to=')[1];
            return teksPath;
          }

          var path = ambilTeksPathDariURL();

          if (path && this.detail.villagers.length > 0) {
            const foundVideo = this.detail.villagers.find(villager => villager.name === path);
            if (foundVideo) {
              this.detail.xstream.name = foundVideo.name;
              this.detail.xstream.path = foundVideo.path;
            }
          }
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    },
    openRandomVideo() {
      if (this.detail.xvideos.length > 0) {
        const randomIndex = Math.floor(Math.random() * this.detail.xvideos.length);
        this.detail.xstream = this.detail.xvideos[randomIndex];
      }
    },
    openVideo(video) {}
  };
};

// Full screen
function toggleFullscreen() {
  const isFullscreen = document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement;

  if (!this.isClicked && !isFullscreen) {
    if (checkFullscreenSupport()) {
      requestFullscreen(document.documentElement);
    } else {
      alert("Tidak Dapat Masuk ke Mode Layar Penuh", "Peramban Anda tidak mendukung mode layar penuh.", "error");
    }
  } else {
    if (isFullscreen) {
      exitFullscreen();
    }
  }

  this.isClicked = !this.isClicked;
}

function checkFullscreenSupport() {
  return document.fullscreenEnabled || document.webkitFullscreenEnabled || document.mozFullScreenEnabled || document.msFullscreenEnabled;
}

function requestFullscreen(element) {
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.msRequestFullscreen) {
    element.msRequestFullscreen();
  } else if (element.mozRequestFullScreen) {
    element.mozRequestFullScreen();
  } else if (element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen();
  } else {
    console.error('Fullscreen API is not supported');
  }
}

function exitFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen();
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  } else {
    console.error('Fullscreen API is not supported');
  }
}
