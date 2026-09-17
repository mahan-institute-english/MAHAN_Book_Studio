// js/upload.js - Page Upload (MOBILE FIXED)
console.log("Upload module loaded");

document.addEventListener("DOMContentLoaded", () => {
    const fileInput = document.getElementById('fileUploader');

    if (!fileInput) {
        console.error("Upload input not found");
        return;
    }

    // જ્યારે યુઝર ગેલેરીમાંથી ફોટો સિલેક્ટ કરે ત્યારે
    fileInput.addEventListener('change', function(e) {
        const files = e.target.files;
        if(files.length === 0) return;

        const thumbBar = document.getElementById('pageThumbnails');
        
        Array.from(files).forEach((file, index) => {
            const reader = new FileReader();
            reader.onload = function(f) {
                const imgSrc = f.target.result;
                
                // ડેટાબેઝમાં ઉમેરો
                MahanStudio.pages.push({
                    id: Date.now() + index,
                    originalImage: imgSrc,
                    objects: [] 
                });

                // નીચે નાનો થંબનેલ ફોટો બનાવો
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
                
                // થંબનેલ પર ક્લિક કરવાથી પેજ કેનવાસમાં ખુલશે
                thumb.onclick = () => {
                    EditorCanvas.loadPageToCanvas(imgSrc);
                };

                thumbBar.appendChild(thumb);
                
                // પહેલો ફોટો સિલેક્ટ કરતા જ તે આપમેળે મોટી સ્ક્રીન પર આવી જશે
                if(MahanStudio.pages.length === 1) {
                    EditorCanvas.loadPageToCanvas(imgSrc);
                }
            };
            reader.readAsDataURL(file);
        });
    });
});
