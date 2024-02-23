<<<<<<< HEAD
document.addEventListener("DOMContentLoaded", function() {
=======
document.addEventListener("DOMContentLoaded", function () {
>>>>>>> e650240 (Add)
  var lazyImages = document.querySelectorAll('img[loading="lazy"]');
  var lazyVideos = document.querySelectorAll('video[loading="lazy"]');

  function lazyLoad(element) {
<<<<<<< HEAD
    if ('IntersectionObserver' in window) {
      var observer = new IntersectionObserver(function(entries, observer) {
        entries.forEach(function(entry) {
=======
    if ("IntersectionObserver" in window) {
      var observer = new IntersectionObserver(function (entries, observer) {
        entries.forEach(function (entry) {
>>>>>>> e650240 (Add)
          if (entry.isIntersecting) {
            element.src = element.dataset.src;
            observer.unobserve(element);
          }
        });
      });
      observer.observe(element);
    } else {
      element.src = element.dataset.src;
    }
  }

<<<<<<< HEAD
  lazyImages.forEach(function(lazyImage) {
    lazyLoad(lazyImage);
  });

  lazyVideos.forEach(function(lazyVideo) {
    lazyLoad(lazyVideo);
  });
});
=======
  lazyImages.forEach(function (lazyImage) {
    lazyLoad(lazyImage);
  });

  lazyVideos.forEach(function (lazyVideo) {
    lazyLoad(lazyVideo);
  });
});
>>>>>>> e650240 (Add)
