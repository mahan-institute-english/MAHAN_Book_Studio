// js/export.js - Mahan Institute Full HD Sharp Navy Blue Converter
console.log("Mahan Full HD Export Module Loaded");

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

            alert("⏳ MAHAN Full HD PDF જનરેટ થઈ રહી છે, કૃપા કરીને રાહ જુઓ...");

            try {
                const pdf = new jsPDFLib('p', 'mm', 'a4');
                const pageWidth = 210;
                const pageHeight = 297;

                // --- ૧. MAHAN Professional Cover Page ---
                pdf.setFillColor(9, 32, 41); // Navy Blue Theme (#092029)
                pdf.rect(0, 0, pageWidth, pageHeight, 'F');

                pdf.setTextColor(85, 195, 186); // Cyan
                pdf.setFontSize(32);
                pdf.setFont("helvetica", "bold");
                pdf.text("MAHAN®", pageWidth / 2, 75, { align: 'center' });

                pdf.setTextColor(255, 255, 255);
                pdf.setFontSize(18);
                pdf.text("The Institute Of English", pageWidth / 2, 90, { align: 'center' });

                // Orange Outer Border
                pdf.setDrawColor(255, 140, 0); 
                pdf.setLineWidth(1.5);
                pdf.rect(15, 15, pageWidth - 30, pageHeight - 30);

                pdf.setFontSize(24);
                pdf.text("English Spoken & Grammar Book", pageWidth / 2, 160, { align: 'center' });
                
                pdf.setFontSize(14);
                pdf.setTextColor(153, 214, 214);
                pdf.text("Professional Course Material - Morbi, Gujarat", pageWidth / 2, 180, { align: 'center' });

                // --- ૨. Uploaded Pages with Full HD White-to-Navy Blue Conversion ---
                for (let i = 0; i < MahanStudio.pages.length; i++) {
                    pdf.addPage();
                    const pageData = MahanStudio.pages[i];

                    // જાતે જ સફેદ બેકગ્રાઉન્ડ હટાવીને અક્ષરોને ફુલ એચડી શાર્પ અને નેવી બ્લુ બેકગ્રાઉન્ડ આપતું ફંક્શન
                    const hdCleanImage = await convertToFullHDNavyTheme(pageData.originalImage);

                    // 1. આખા પેજનું બેકગ્રાઉન્ડ શુદ્ધ નેવી બ્લુ કરો (#092029)
                    pdf.setFillColor(9, 32, 41);
                    pdf.rect(0, 0, pageWidth, pageHeight, 'F');

                    // 2. સુંદર સ્યાન (Cyan) આઉટર બોર્ડર ફ્રેમ
                    pdf.setDrawColor(85, 195, 186);
                    pdf.setLineWidth(0.8);
                    pdf.rect(10, 10, pageWidth - 20, pageHeight - 20);

                    // 3. ટોપ બ્રાન્ડ હેડર બોક્સ
                    pdf.setFillColor(13, 48, 60);
                    pdf.rect(15, 14, pageWidth - 30, 14, 'F');
                    
                    pdf.setTextColor(85, 195, 186);
                    pdf.setFontSize(12);
                    pdf.setFont("helvetica", "bold");
                    pdf.text("MAHAN® - The Institute Of English", pageWidth / 2, 23, { align: 'center' });

                    // 4. ફુલ એચડી પ્રોસેસ્ડ ઈમેજ બરાબર વચ્ચે ફિટ કરો
                    const imgWidth = 180;
                    const imgHeight = 225;
                    const imgX = (pageWidth - imgWidth) / 2;
                    const imgY = 32;

                    pdf.addImage(hdCleanImage, 'PNG', imgX, imgY, imgWidth, imgHeight);

                    // 5. બોટમ ફૂટર લાઈન અને સાચો પેજ નંબર
                    pdf.setDrawColor(85, 195, 186);
                    pdf.line(15, pageHeight - 18, pageWidth - 15, pageHeight - 18);

                    pdf.setTextColor(255, 255, 255);
                    pdf.setFontSize(10);
                    pdf.text("The heaven lies at the feet of mother.", 20, pageHeight - 12);
                    
                    const pageNumStr = String(i + 2).padStart(2, '0');
                    pdf.text(pageNumStr, pageWidth - 25, pageHeight - 12, { align: 'right' });
                }

                // --- ૩. Download PDF ---
                pdf.save("MAHAN_FullHD_Book.pdf");
                alert("✅ તમારી MAHAN Full HD PDF સફળતાપૂર્વક ડાઉનલોડ થઈ ગઈ છે!");

            } catch (error) {
                console.error("PDF Error:", error);
                alert("❌ PDF બનાવતી વખતે એરર આવી છે: " + error.message);
            }
        });
    }, 1000);
});

// Helper Function: સફેદ બેકગ્રાઉન્ડને કાયમ માટે હટાવીને નેવી બ્લુ બેકગ્રાઉન્ડ અને ફુલ એચડી શાર્પ અક્ષરો બનાવવા માટે
function convertToFullHDNavyTheme(imgSrc) {
    return new Promise((resolve) => {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = img.width * 2; // હાઈ રેઝોલ્યુશન (HD) માટે સાઈઝ ડબલ કરો
            canvas.height = img.height * 2;
            const ctx = canvas.getContext('2d');

            // બેકગ્રાઉન્ડમાં સચોટ MAHAN નેવી બ્લુ કલર ભરો (#092029)
            ctx.fillStyle = '#092029';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // હાઈ ક્વોલિટી સ્મૂધિંગ સાથે ઈમેજ ડ્રો કરો
            ctx.imageSmoothingEnabled = true;
            ctx.imageSmoothingQuality = 'high';
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

            const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const data = imgData.data;

            // પિક્સેલ પ્રોસેસિંગ: સફેદ/ઝાખું બેકગ્રાઉન્ડ સાફ કરો અને અક્ષરોને એકદમ ડાર્ક અને શાર્પ બનાવો
            for (let i = 0; i < data.length; i += 4) {
                const r = data[i];
                const g = data[i+1];
                const b = data[i+2];

                // ગ્રે સ્કેલ વેલ્યુ કાઢો
                const avg = (r + g + b) / 3;

                if (avg > 160) {
                    // જો બેકગ્રાઉન્ડ સફેદ કે હળવો ભાગ હોય તો તેને એકદમ નેવી બ્લુ રંગમાં ફેરવી નાખો
                    data[i] = 9;       // Red
                    data[i+1] = 32;    // Green
                    data[i+2] = 41;    // Blue
                } else {
                    // જો અક્ષર કે બોર્ડર હોય તો તેને એકદમ શાર્પ ડાર્ક/વ્હાઇટ બનાવો જેથી HD દેખાય
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
