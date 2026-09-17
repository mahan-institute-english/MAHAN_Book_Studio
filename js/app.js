// js/app.js - Main Application State

const MahanStudio = {
    projectInfo: {
        id: Date.now(),
        name: "Untitled Book",
        lastSaved: null
    },
    
    pages: [], 
    activePageIndex: -1,

    init: function() {
        console.log("MAHAN Book Studio PRO+ Initialize...");
        this.bindEvents();
    },

    bindEvents: function() {
        document.getElementById('btnNew').addEventListener('click', () => {
            if(confirm("Start new project? Unsaved changes will be lost.")) {
                this.pages = [];
                this.activePageIndex = -1;
                this.updateUI();
            }
        });
        
        document.getElementById('btnExportPDF').addEventListener('click', () => {
            console.log("Triggering Advanced PDF Export with Cover Page...");
        });
    },

    updateUI: function() {
    }
};

document.addEventListener("DOMContentLoaded", () => {
    MahanStudio.init();
});
