// js/export.js - Mahan Institute Final HD Production Ready Code (v8_wonder)
console.log("Mahan Production Export Module Loaded - V8 Wonder");

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

                // Get global text color setting
                const globalTextColor = window.MahanStudioConfig ? MahanStudioConfig.globalFontColor : '#FFFFFF';

                // --- ૧. MAHAN Professional Cover Page ---
                pdf.setFillColor(9, 32, 41); // Navy Blue Theme (#092029)
                pdf.rect(0, 0, pageWidth, pageHeight, 'F');

                // Image 2 મુજબ શાનદાર કવર લોગો બોક્સ (Glow effect)
                pdf.setDrawColor(85, 195, 186);
                pdf.setLineWidth(0.8);
                pdf.roundedRect(pageWidth / 2 - 55, 60, 110, 35, 5, 5, 'S');

                pdf.setTextColor(85, 195, 186); // Cyan
                pdf.setFontSize(30);
                pdf.setFont("helvetica", "bold");
                pdf.text("MAHAN®", pageWidth / 2, 77, { align: 'center' });

                pdf.setTextColor(255, 255, 255);
                pdf.setFontSize(14);
                pdf.text("The Institute Of English", pageWidth / 2, 88, { align: 'center' });

                // Orange Outer Border
                pdf.setDrawColor(255, 140, 0); 
                pdf.setLineWidth(1.5);
                pdf.rect(15, 15, pageWidth - 30, pageHeight - 30);

                pdf.setFontSize(22);
                pdf.text("International Spoken English & Grammar Book", pageWidth / 2, 160, { align: 'center' });
                
                pdf.setFontSize(13);
                pdf.setTextColor(153, 214, 214);
                pdf.text("Professional Course Material - Morbi, Gujarat", pageWidth / 2, 178, { align: 'center' });

                // --- ૨. Uploaded Pages with HD Logo & Clean Navy Blue Theme ---
                for (let i = 0; i < MahanStudio.pages.length; i++) {
                    pdf.addPage();
                    const pageData = MahanStudio.pages[i];

                    // 1. ફુલ HD ક્લિનિંગ અને નેવી બ્લુ બેકગ્રાઉન્ડ કન્વર્ઝન
                    const hdCleanImage = await convertToFullHDNavyThemeClean(pageData.originalImage);

                    // આખા પેજનું બેકગ્રાઉન્ડ શુદ્ધ નેવી બ્લુ કરો (#092029)
                    pdf.setFillColor(9, 32, 41);
                    pdf.rect(0, 0, pageWidth, pageHeight, 'F');

                    // સુંદર સ્યાન (Cyan) આઉટર બોર્ડર ફ્રેમ
                    pdf.setDrawColor(85, 195, 186);
                    pdf.setLineWidth(0.8);
                    pdf.rect(10, 10, pageWidth - 20, pageHeight - 20);

                    // 2. Image 2 મુજબ ઉપર પિલ્લર આકારનું શાનદાર MAHAN HD લોગો બોક્સ
                    pdf.setDrawColor(85, 195, 186);
                    pdf.setLineWidth(0.5);
                    pdf.setFillColor(13, 48, 60);
                    pdf.roundedRect(45, 14, 120, 15, 4, 4, 'FD');

                    pdf.setTextColor(85, 195, 186);
                    pdf.setFontSize(11);
                    pdf.setFont("helvetica", "bold");
                    pdf.text("MAHAN®", pageWidth / 2 - 12, 21, { align: 'center' });

                    pdf.setTextColor(255, 255, 255);
                    pdf.setFontSize(8);
                    pdf.text("The Institute Of English", pageWidth / 2 + 18, 21, { align: 'center' });

                    // 3. ફુલ એચડી પ્રોસેસ્ડ ઈમેજ બરાબર વચ્ચે ફિટ કરો (સફેદ પ્રકાશ/શેડો સંપૂર્ણ ગાયબ)
                    const imgWidth = 184;
                    const imgHeight = 238;
                    const imgX = (pageWidth - imgWidth) / 2;
                    const imgY = 32;

                    pdf.addImage(hdCleanImage, 'PNG', imgX, imgY, imgWidth, imgHeight);

                    // 4. બોટમ ફૂટર લાઈન અને માત્ર સાચો પેજ નંબર (સુવિચાર સંપૂર્ણ હટાવી દીધેલ છે)
                    pdf.setDrawColor(85, 195, 186);
                    pdf.line(15, pageHeight - 15, pageWidth - 15, pageHeight - 15);

                    pdf.setTextColor(globalTextColor);
                    pdf.setFontSize(10);
                    const pageNumStr = String(i + 2).padStart(2, '0');
                    pdf.text(pageNumStr, pageWidth - 20, pageHeight - 9, { align: 'right' });
                }

                // --- ૩. Download PDF ---
                pdf.save("MAHAN_FullHD_Professional_Book.pdf");
                alert("✅ તમારી MAHAN Full HD PDF ફાઈલ સફળતાપૂર્વક ડાઉનલોડ થઈ ગઈ છે!");

            } catch (error) {
                console.error("PDF Error:", error);
                alert("❌ PDF બનાવતી વખતે એરર આવી છે: " + error.message);
            }
        });
    }, 1000);
});

// Helper Function: સફેદ બેકગ્રાઉન્ડ અને લાઈટ ફ્લેર (પ્રકાશ) હટાવીને ફુલ એચડી નેવી બ્લુ થીમ બનાવનાર ફંક્શન
function convertToFullHDNavyThemeClean(imgSrc) {
    return new Promise((resolve) => {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = img.width * 2; // હાઈ રેઝોલ્યુશન (HD Zoom Fix)
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

            // પિક્સેલ ફિલ્ટરિંગ: સફેદ બેકગ્રાઉન્ડ અને નીચેનો પ્રકાશ/શેડો એકદમ સાફ કરીને નેવી બ્લુમાં મિક્સ કરો
            for (let i = 0; i < data.length; i += 4) {
                const r = data[i];
                const g = data[i+1];
                const b = data[i+2];

                const avg = (r + g + b) / 3;

                // જો બેકગ્રાઉન્ડ કે હળવો સફેદ પ્રકાશ હોય તો તેને નેવી બ્લુમાં ફેરવો
                if (avg > 150) {
                    data[i] = 9;       // Red
                    data[i+1] = 32;    // Green
                    data[i+2] = 41;    // Blue
                } else {
                    // અક્ષરો અને બોર્ડરને એકદમ શાર્પ HD વ્હાઇટ બનાવો
                    data[i] = 255;     // Red
                    data[i+1] = 255;   // Green
                    data[i+2] = 255;   // Blue
                }
            }

            ctx.putImageData(imgData, 0, 0);
            resolve(canvas.toDataURL('image/png'));
        };
        img.src = imgSrc;
    });
        }
