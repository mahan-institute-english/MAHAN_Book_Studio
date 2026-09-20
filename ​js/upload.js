// js/upload.js - Direct Mobile Upload & Canvas Link Fix
console.log("Upload & Canvas Bridge Loaded");

document.addEventListener("DOMContentLoaded", () => {
    const uploadBtn = document.getElementById('btnUploadPages');
    const fileInput = document.getElementById('fileUploader');

    if (!uploadBtn || !fileInput) return;

    uploadBtn.addEventListener('click', () => {
        fileInput.click();
    });

    fileInput.addEventListener('change', function(e) {
        const files = e.target.files;
        if(files.length === 0) return;

        const thumbBar = document.getElementById('pageThumbnails');
        if(thumbBar) thumbBar.innerHTML = ''; // જૂના થંબનેલ સાફ કરો

        Array.from(files).forEach((file, index) => {
            const reader = new FileReader();
            reader.onload = function(f) {
                const imgSrc = f.target.result;
                
                // ડેટાબેઝમાં પેજ ઉમેરો
                MahanStudio.pages.push({
                    id: Date.now() + index,
                    originalImage: imgSrc,
                    objects: [] 
                });

                // થંબનેલ બનાવવી
                const thumb = document.createElement('div');
                thumb.style.width = '80px';
                thumb.style.height = '113px';
                thumb.style.backgroundImage = `url(${imgSrc})`;
                thumb.style.backgroundSize = 'cover';
                thumb.style.border = '2px solid #55c3ba';
                thumb.style.borderRadius = '5px';
                thumb.style.cursor = 'pointer';
                thumb.style.flexShrink = '0';
                thumb.style.marginRight = '10px';
                
                thumb.onclick = () => {
                    if(window.EditorCanvas) {
                        EditorCanvas.loadPageToCanvas(imgSrc);
                    }
                };

                if(thumbBar) thumbBar.appendChild(thumb);
                
                // પહેલો ફોટો તરત જ એડિટરમાં બતાવો
                if(index === 0 && window.EditorCanvas) {
                    EditorCanvas.loadPageToCanvas(imgSrc);
                }
            };
            reader.readAsDataURL(file);
        });
        
        alert("✅ ફોટો સફળતાપૂર્વક અપલોડ થઈ ગયો છે!");
    });
});
