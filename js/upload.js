// js/upload.js - Complete Upload & Page Management Module
console.log("Upload Module Loaded");

document.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {
        const uploadBtn = document.getElementById('btnUploadPages');
        const fileInput = document.getElementById('fileUploader');

        if (!uploadBtn || !fileInput) return;

        uploadBtn.addEventListener('click', () => {
            fileInput.click();
        });

        fileInput.addEventListener('change', (e) => {
            const files = e.target.files;
            if (!files || files.length === 0) return;

            const thumbBar = document.getElementById('pageThumbnails');

            Array.from(files).forEach((file, index) => {
                const reader = new FileReader();
                reader.onload = (event) => {
                    const imgSrc = event.target.result;
                    
                    // સેવ કરો જેથી એક્સપોર્ટ વખતે એરર ન આવે
                    if (typeof MahanStudio !== 'undefined') {
                        MahanStudio.pages.push({
                            id: Date.now() + index,
                            originalImage: imgSrc,
                            objects: []
                        });
                    }

                    // થંબનેલ બનાવો
                    if (thumbBar) {
                        const thumb = document.createElement('div');
                        thumb.style.width = '70px';
                        thumb.style.height = '100px';
                        thumb.style.backgroundImage = `url(${imgSrc})`;
                        thumb.style.backgroundSize = 'cover';
                        thumb.style.border = '2px solid #55c3ba';
                        thumb.style.borderRadius = '4px';
                        thumb.style.cursor = 'pointer';
                        thumb.style.flexShrink = '0';
                        thumb.style.marginRight = '8px';
                        
                        thumb.onclick = () => {
                            if (window.EditorCanvas) {
                                window.EditorCanvas.loadPageToCanvas(imgSrc);
                            }
                        };
                        thumbBar.appendChild(thumb);
                    }

                    // કેનવાસ પર પહેલો ફોટો લોડ કરો
                    if (window.EditorCanvas) {
                        window.EditorCanvas.loadPageToCanvas(imgSrc);
                    }
                };
                reader.readAsDataURL(file);
            });
            
            alert("✅ પેજ સફળતાપૂર્વક અપલોડ થઈ ગયું છે!");
        });
    }, 1000);
});
