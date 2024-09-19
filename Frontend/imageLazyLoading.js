<!-- Add lazy loading to product images -->
<img src="placeholder.jpg" data-src="actual-image.jpg" class="lazy-image">

<script>
    // Lazy loading images
    document.addEventListener('DOMContentLoaded', function() {
        const lazyImages = document.querySelectorAll('.lazy-image');
        
        const lazyLoad = (image) => {
            const src = image.getAttribute('data-src');
            if (src) {
                image.src = src;
                image.removeAttribute('data-src');
            }
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    lazyLoad(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        });

        lazyImages.forEach(image => {
            observer.observe(image);
        });
    });
</script>
  
