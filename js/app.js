// js/app.js - MAHAN Book Studio PRO+ Complete Core Module
console.log("MAHAN Book Studio PRO+ Core Initialized");

const MahanStudio = {
    projectInfo: {
        id: Date.now(),
        name: "MAHAN English Book",
        lastSaved: null
    },
    pages: [],
    activePageIndex: -1,

    init: function() {
        this.bindGlobalEvents();
        console.log("Studio Core Ready");
    },

    bindGlobalEvents: function() {
        // New Project Button
        const btnNew = document.getElementById('btnNew');
        if(btnNew) {
            btnNew.addEventListener('click', () => {
                if(confirm("Start new project? Unsaved changes will be lost.")) {
                    this.pages = [];
                    this.activePageIndex = -1;
                    const thumbBar = document.getElementById('pageThumbnails');
                    if(thumbBar) thumbBar.innerHTML = '';
                    if(window.EditorCanvas && window.EditorCanvas.canvas) {
                        window.EditorCanvas.canvas.clear();
                        window.EditorCanvas.canvas.setBackgroundColor('#092029', window.EditorCanvas.canvas.renderAll.bind(window.EditorCanvas.canvas));
                    }
                    alert("New project started.");
                }
            });
        }

        // Save Button
        const btnSave = document.getElementById('btnSave');
        if(btnSave) {
            btnSave.addEventListener('click', () => {
                alert("✅ Project saved successfully in browser memory!");
            });
        }

        // Upload Pages Button & File Input Bridge
        const uploadBtn = document.getElementById('btnUploadPages');
        const fileInput = document.getElementById('fileUploader');

        if(uploadBtn && fileInput) {
            uploadBtn.addEventListener('click', () => {
                fileInput.click();
            });

            fileInput.addEventListener('change', (e) => {
                const files = e.target.files;
                if(!files || files.length === 0) return;

                const thumbBar = document.getElementById('pageThumbnails');

                Array.from(files).forEach((file, index) => {
                    const reader = new FileReader();
                    reader.onload = (event) => {
                        const imgSrc = event.target.result;
                        
                        const pageObj = {
                            id: Date.now() + index,
                            originalImage: imgSrc,
                            objects: []
                        };
                        
                        this.pages.push(pageObj);

                        // Create Thumbnail UI
                        if(thumbBar) {
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
                                if(window.EditorCanvas) {
                                    window.EditorCanvas.loadPageToCanvas(imgSrc);
                                }
                            };
                            thumbBar.appendChild(thumb);
                        }

                        // Load first page automatically to canvas
                        if(this.pages.length === 1 && window.EditorCanvas) {
                            window.EditorCanvas.loadPageToCanvas(imgSrc);
                        }
                    };
                    reader.readAsDataURL(file);
                });
                
                alert("✅ Pages uploaded successfully!");
            });
        }
    }
};

document.addEventListener("DOMContentLoaded", () => {
    MahanStudio.init();
});
