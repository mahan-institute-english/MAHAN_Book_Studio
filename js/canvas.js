// js/canvas.js - Perfect A4 Canvas & Image Fitting Module
console.log("Professional Canvas Module Loaded");

const EditorCanvas = {
    canvas: null,

    init: function() {
        // A4 Size Proportion Setup (800 x 1131 pixels)
        this.canvas = new fabric.Canvas('mainEditorCanvas', {
            width: 800,  
            height: 1131, 
            backgroundColor: '#092029' // MAHAN Theme Dark Background
        });
        
        this.bindEvents();
    },

    bindEvents: function() {
        // Text Overlay Button
        const btnAddText = document.getElementById('btnAddText');
        if(btnAddText) {
            btnAddText.addEventListener('click', () => {
                const text = new fabric.IText('અહીં લખાણ ટાઈપ કરો...', {
                    left: 100, 
                    top: 150, 
                    fill: '#ff8c00', // Orange Accent Color
                    fontSize: 36, 
                    editable: true
                });
                this.canvas.add(text);
                this.canvas.setActiveObject(text);
                this.canvas.renderAll();
            });
        }

        // Set Background Color Button
        const btnApplyBg = document.getElementById('btnApplyBg');
        if(btnApplyBg) {
            btnApplyBg.addEventListener('click', () => {
                this.canvas.setBackgroundColor('#113642', this.canvas.renderAll.bind(this.canvas));
            });
        }
    },
    
    // ફોટો અપલોડ થાય એટલે A4 સાઈઝ અને બેકગ્રાઉન્ડ કલર સાથે પરફેક્ટ ગોઠવણી
    loadPageToCanvas: function(imageSrc) {
        fabric.Image.fromURL(imageSrc, (img) => {
            if (!img) {
                alert("ફોટો લોડ કરવામાં એરર આવી છે!");
                return;
            }
            
            // A4 સાઈઝની પહોળાઈ (800px) મુજબ પરફેક્ટ સ્કેલ કરો
            img.scaleToWidth(800);
            
            // કેનવાસનું બેકગ્રાઉન્ડ અને ઈમેજ સેટ કરો
            this.canvas.setBackgroundImage(img, this.canvas.renderAll.bind(this.canvas), {
                originX: 'left',
                originY: 'top',
                left: 0,
                top: 0
            });
            
            // કેનવાસની ઊંચાઈ A4 પ્રપોર્શન મુજબ સેટ કરો
            this.canvas.setHeight(1131);
            this.canvas.renderAll();
            
            console.log("Image loaded successfully on A4 Canvas");
        });
    }
};

document.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => { 
        if(window.fabric) {
            EditorCanvas.init(); 
        }
    }, 500);
});
