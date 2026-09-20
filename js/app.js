// js/app.js - Main Application State & Global Storage
console.log("MAHAN Book Studio PRO+ Initialize...");

const MahanStudio = {
    projectInfo: {
        id: Date.now(),
        name: "MAHAN English Book",
        lastSaved: null
    },
    
    pages: [], // આમાં અપલોડ કરેલા ફોટા સેવ થશે
    activePageIndex: -1,

    init: function() {
        console.log("Core initialized successfully");
        this.bindEvents();
    },

    bindEvents: function() {
        const btnNew = document.getElementById('btnNew');
        if(btnNew) {
            btnNew.addEventListener('click', () => {
                if(confirm("Start new project? Unsaved changes will be lost.")) {
                    this.pages = [];
                    this.activePageIndex = -1;
                    const thumbBar = document.getElementById('pageThumbnails');
                    if(thumbBar) thumbBar.innerHTML = '';
                    alert("New project started.");
                }
            });
        }
    }
};

document.addEventListener("DOMContentLoaded", () => {
    MahanStudio.init();
});
