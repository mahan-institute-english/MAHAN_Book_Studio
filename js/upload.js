// js/upload.js - Final Single-Copy Fixed Upload Module
console.log("Final Upload Module Loaded");

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
            if (thumbBar) thumbBar.innerHTML = ''; // જૂની બધી થંબનેલ ક્લિયર કરો
            
            if (typeof MahanStudio !== 'undefined') {
                MahanStudio.pages = []; // એરે પણ સાફ કરો જેથી ડબલ ન થાય
            }

            // ડબલ કોપી અટકાવવા માટે ફાઈલોને ફિલ્ટર કરો (યુનિક ફાઈલ નામ આધારે)
            const uniqueFiles = Array.from(files).filter((file, index, self) => 
                index === self.findIndex(f => f.name === file.name && f.size === file.size)
            );

            uniqueFiles.forEach((file, index) => {
                const reader = new FileReader();
                reader.onload = (event) => {
                    const imgSrc = event.target.result;
                    
                    if (typeof MahanStudio !== 'undefined') {
                        // ડબલ એન્ટ્રી રોકવા ચેક કરો કે આ આઈડી પહેલેથી છે કે નહીં
                        const exists = MahanStudio.pages.some(p => p.originalImage === imgSrc);
                        if (!exists) {
                            MahanStudio.pages.push({
                                id: Date.now() + index,
                                originalImage: imgSrc,
                                objects: []
                            });

                            // થંબનેલ UI બનાવવું (માત્ર એક જ વાર)
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
                        }
                    }

                    // પહેલો ફોટો કેનવાસ પર લોડ કરો
                    if (index === 0 && window.EditorCanvas) {
                        window.EditorCanvas.loadPageToCanvas(imgSrc);
                    }
                };
                reader.readAsDataURL(file);
            });
            
            alert("✅ પેજ સફળતાપૂર્વક અપલોડ થઈ ગયું છે!");
        });
    }, 1000);
});
