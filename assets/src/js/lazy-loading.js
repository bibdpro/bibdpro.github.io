var lazyImages = document.querySelectorAll('img[loading="lazy"]');
var lazyVideos = document.querySelectorAll('video[loading="lazy"]');

function lazyLoad(element) {
  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function(entries, observer) {
      entries.forEach(function(entry) {
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

lazyImages.forEach(function(lazyImage) {
  lazyLoad(lazyImage);
});

lazyVideos.forEach(function(lazyVideo) {
  lazyLoad(lazyVideo);
});
