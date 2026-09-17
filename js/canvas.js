// js/canvas.js - Visual Editor Module
console.log("Canvas module loaded");

const EditorCanvas = {
    canvas: null,

    init: function() {
        // કેનવાસ તૈયાર કરો
        this.canvas = new fabric.Canvas('mainEditorCanvas', {
            width: 800,  
            height: 1123, 
            backgroundColor: '#1a1a1a' 
        });
        
        this.bindEvents();
    },

    bindEvents: function() {
        // લખાણ ઉમેરવા માટેનું બટન
        const btnAddText = document.getElementById('btnAddText');
        if(btnAddText) {
            btnAddText.addEventListener('click', () => {
                const text = new fabric.IText('અહીં લખાણ ટાઈપ કરો...', {
                    left: 50, 
                    top: 100, 
                    fill: '#ff8c00', // ઓરેન્જ કલર
                    fontSize: 40, 
                    editable: true
                });
                this.canvas.add(text);
                this.canvas.setActiveObject(text);
                this.canvas.renderAll();
            });
        }
    },
    
    // ફોટો અપલોડ થાય ત્યારે તેને કેનવાસ પર સેટ કરવાનું ફંક્શન
    loadPageToCanvas: function(imageSrc) {
        fabric.Image.fromURL(imageSrc, (img) => {
            if (!img) {
                alert("ફોટો લોડ થવામાં એરર આવી રહી છે!");
                return;
            }
            
            // ફોટાને કેનવાસની પહોળાઈ (800px) મુજબ સેટ કરો
            img.scaleToWidth(800);
            
            this.canvas.setBackgroundImage(img, this.canvas.renderAll.bind(this.canvas), {
                originX: 'left',
                originY: 'top'
            });
            
            // ફોટાની સાઈઝ મુજબ કેનવાસની ઊંચાઈ જાતે સેટ કરો
            this.canvas.setHeight(img.getScaledHeight());
            this.canvas.renderAll();
            
            // પ્રોસેસ પૂરી થાય એટલે મેસેજ બતાવો
            alert("✅ ફોટો સફળતાપૂર્વક કેનવાસ પર આવી ગયો છે! હવે તમે તેમાં લખાણ ઉમેરી શકો છો.");
        });
    }
};

// બ્રાઉઝર પૂરી રીતે લોડ થાય પછી જ કેનવાસ ચાલુ કરો
document.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => { EditorCanvas.init(); }, 500);
});
