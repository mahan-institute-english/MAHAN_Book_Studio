// js/export.js - Mahan Institute Ultimate Production Ready v13.0 (Solid HD White Text & Clean Rendering)
console.log("Mahan Ultimate V13 Export Module Loaded");

document.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {
        const btnExport = document.getElementById('btnExportPDF');
        if(!btnExport) return;

        btnExport.addEventListener('click', async () => {
            if (typeof MahanStudio === 'undefined' || !MahanStudio.pages || MahanStudio.pages.length === 0) {
                alert("⚠️ કૃપા કરીને પહેલા 'Upload Pages' બટન દબાવીને ઓછામાં ઓછું એક પેજ અપલોડ કરો!");
                return;
            }

            const jsPDFLib = window.jspdf ? window.jspdf.jsPDF : window.jsPDF;
            if (!jsPDFLib) {
                alert("❌ એરર: jsPDF લાઈબ્રેરી લોડ થઈ નથી.");
                return;
            }

            alert("⏳ MAHAN Full HD Professional PDF જનરેટ થઈ રહી છે, કૃપા કરીને રાહ જુઓ...");

            try {
                const pdf = new jsPDFLib('p', 'mm', 'a4');
                const pageWidth = 210;
                const pageHeight = 297;

                // ગ્લોબલ ટેક્સ્ટ કલર રીડ કરો (డిఫాల్ట్ શુદ્ધ સફેદ #FFFFFF)
                const globalColorInput = document.getElementById('globalFontColor');
                const textColorHex = globalColorInput ? globalColorInput.value : '#FFFFFF';
                
                // Convert Hex color to RGB array for jsPDF
                const rgbColor = hexToRgb(textColorHex);

                // --- ૧. Professional Cover Page (Clean Title & Perfect Logo) ---
                pdf.setFillColor(9, 32, 41); // Navy Blue Theme (#092029)
                pdf.rect(0, 0, pageWidth, pageHeight, 'F');

                // આકર્ષક ડબલ આઉટર બોર્ડર ફ્રેમ
                pdf.setDrawColor(85, 195, 186);
                pdf.setLineWidth(1.2);
                pdf.roundedRect(15, 15, pageWidth - 30, pageHeight - 30, 6, 6, 'S');

                pdf.setDrawColor(255, 140, 0);
                pdf.setLineWidth(0.6);
                pdf.roundedRect(18, 18, pageWidth - 36, pageHeight - 36, 4, 4, 'S');

                // શુદ્ધ MAHAN લોગો બોક્સ (વગર '®')
                pdf.setFillColor(13, 48, 60);
                pdf.roundedRect(pageWidth / 2 - 65, 45, 130, 42, 8, 8, 'FD');

                pdf.setTextColor(85, 195, 186); // Cyan
                pdf.setFontSize(36);
                pdf.setFont("helvetica", "bold");
                pdf.text("MAHAN", pageWidth / 2, 66, { align: 'center' });

                pdf.setTextColor(255, 255, 255);
                pdf.setFontSize(14);
                pdf.text("The Institute Of English", pageWidth / 2, 79, { align: 'center' });

                // કવર ટાઇટલ (International વગરનું શુદ્ધ ટાઇટલ)
                pdf.setFontSize(26);
                pdf.setTextColor(255, 255, 255);
                pdf.text("English Spoken", pageWidth / 2, 142, { align: 'center' });
                
                pdf.setFontSize(22);
                pdf.setTextColor(85, 195, 186);
                pdf.text("& Grammar Book", pageWidth / 2, 157, { align: 'center' });

                pdf.setFontSize(13);
                pdf.setTextColor(180, 220, 220);
                pdf.text("Professional Course Material • Morbi, Gujarat, India", pageWidth / 2, 230, { align: 'center' });

                // --- ૨. Uploaded Pages with Solid HD Text & Clean Background ---
                for (let i = 0; i < MahanStudio.pages.length; i++) {
                    pdf.addPage();
                    const pageData = MahanStudio.pages[i];

                    // સોલિડ અને આઉટલાઈન વગરની ક્લીન એચડી ઈમેજ પ્રોસેસિંગ
                    const solidCleanImage = await processImageSolidHD(pageData.originalImage, rgbColor);

                    // આખા પેજનું બેકગ્રાઉન્ડ શુદ્ધ નેવી બ્લુ કરો (#092029)
                    pdf.setFillColor(9, 32, 41);
                    pdf.rect(0, 0, pageWidth, pageHeight, 'F');

                    // સુંદર સ્યાન (Cyan) આઉટર બોર્ડર ફ્રેમ
                    pdf.setDrawColor(85, 195, 186);
                    pdf.setLineWidth(0.8);
                    pdf.rect(10, 10, pageWidth - 20, pageHeight - 20);

                    // હેડર લોગો (પિલ્લર લોગો, વગર '®')
                    pdf.setDrawColor(85, 195, 186);
                    pdf.setLineWidth(0.5);
                    pdf.setFillColor(13, 48, 60);
                    pdf.roundedRect(45, 14, 120, 15, 4, 4, 'FD');

                    pdf.setTextColor(85, 195, 186);
                    pdf.setFontSize(11);
                    pdf.setFont("helvetica", "bold");
                    pdf.text("MAHAN", pageWidth / 2 - 15, 23, { align: 'center' });

                    pdf.setTextColor(255, 255, 255);
                    pdf.setFontSize(8);
                    pdf.text("The Institute Of English", pageWidth / 2 + 18, 23, { align: 'center' });

                    // પ્રોસેસ્ડ ઈમેજ બરાબર વચ્ચે ફિટ કરો
                    const imgWidth = 184;
                    const imgHeight = 238;
                    const imgX = (pageWidth - imgWidth) / 2;
                    const imgY = 32;

                    pdf.addImage(solidCleanImage, 'PNG', imgX, imgY, imgWidth, imgHeight);

                    // બોટમ ફૂટર લાઈન અને પેજ નંબર
                    pdf.setDrawColor(85, 195, 186);
                    pdf.line(15, pageHeight - 15, pageWidth - 15, pageHeight - 15);

                    pdf.setTextColor(rgbColor.r, rgbColor.g, rgbColor.b);
                    pdf.setFontSize(10);
                    const pageNumStr = String(i + 2).padStart(2, '0');
                    pdf.text(pageNumStr, pageWidth - 20, pageHeight - 9, { align: 'right' });
                }

                // --- ૩. Download PDF ---
                pdf.save("MAHAN_Spoken_Grammar_Book.pdf");
                alert("✅ તમારી MAHAN PDF ફાઈલ સફળતાપૂર્વક ડાઉનલોડ થઈ ગઈ છે!");

            } catch (error) {
                console.error("PDF Error:", error);
                alert("❌ PDF બનાવતી વખતે એરર આવી છે: " + error.message);
            }
        });
    }, 1000);
});

// Helper Function: અક્ષરો સોલિડ અને સાફ રાખનાર તથા આઉટલાઈન હટાવનાર ફંક્શન
function processImageSolidHD(imgSrc, targetRgb) {
    return new Promise((resolve) => {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = img.width * 2;
            canvas.height = img.height * 2;
            const ctx = canvas.getContext('2d');

            // બેકગ્રાઉન્ડમાં સચોટ MAHAN નેવી બ્લુ કલર ભરો (#092029)
            ctx.fillStyle = '#092029';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.imageSmoothingEnabled = true;
            ctx.imageSmoothingQuality = 'high';
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

            const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const data = imgData.data;

            for (let i = 0; i < data.length; i += 4) {
                const r = data[i];
                const g = data[i+1];
                const b = data[i+2];

                const avg = (r + g + b) / 3;

                // જો બેકગ્રાઉન્ડ કે હળવો સફેદ ભાગ હોય તો તેને નેવી બ્લુમાં ફેરવો
                if (avg > 150) {
                    data[i] = 9;       // Red (#09)
                    data[i+1] = 32;    // Green (#20)
                    data[i+2] = 41;    // Blue (#29)
                } else {
                    // બાકીના અક્ષરોને યુઝરે પસંદ કરેલા સોલિડ કલરમાં પરિવર્તિત કરો (કોઈ આઉટલાઈન કે પોલાણ નહીં)
                    data[i] = targetRgb.r;     
                    data[i+1] = targetRgb.g;   
                    data[i+2] = targetRgb.b;   
                }
            }

            ctx.putImageData(imgData, 0, 0);
            resolve(canvas.toDataURL('image/png'));
        };
        img.src = imgSrc;
    });
}

// Helper: Hex color to RGB converter
function hexToRgb(hex) {
    let cleanedHex = hex.replace('#', '');
    if (cleanedHex.length === 3) {
        cleanedHex = cleanedHex.split('').map(c => c + c).join('');
    }
    const num = parseInt(cleanedHex, 16);
    return {
        r: (num >> 16) & 255,
        g: (num >> 8) & 255,
        b: num & 255
    };
        }
