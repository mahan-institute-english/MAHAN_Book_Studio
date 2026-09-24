// js/export.js - Mahan Institute Ultimate Production Ready v11.0 (Memory Safe)
console.log("Mahan Ultimate V11 Export Module Loaded");

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

            alert("⏳ MAHAN Professional PDF જનરેટ થઈ રહી છે, કૃપા કરીને રાહ જુઓ...");

            try {
                const pdf = new jsPDFLib('p', 'mm', 'a4');
                const pageWidth = 210;
                const pageHeight = 297;

                // --- ૧. International Spoken English & Grammar Book - Professional Cover Page ---
                pdf.setFillColor(9, 32, 41); // Navy Blue Theme (#092029)
                pdf.rect(0, 0, pageWidth, pageHeight, 'F');

                // આકર્ષક ડબલ આઉટર બોર્ડર ફ્રેમ
                pdf.setDrawColor(85, 195, 186);
                pdf.setLineWidth(1.2);
                pdf.roundedRect(15, 15, pageWidth - 30, pageHeight - 30, 6, 6, 'S');

                pdf.setDrawColor(255, 140, 0);
                pdf.setLineWidth(0.6);
                pdf.roundedRect(18, 18, pageWidth - 36, pageHeight - 36, 4, 4, 'S');

                // શુદ્ધ MAHAN લોગો (કોઈ '®' નહીં)
                pdf.setFillColor(13, 48, 60);
                pdf.roundedRect(pageWidth / 2 - 65, 45, 130, 42, 8, 8, 'FD');

                pdf.setTextColor(85, 195, 186); // Cyan
                pdf.setFontSize(36);
                pdf.setFont("helvetica", "bold");
                pdf.text("MAHAN", pageWidth / 2, 66, { align: 'center' });

                pdf.setTextColor(255, 255, 255);
                pdf.setFontSize(14);
                pdf.text("The Institute Of English", pageWidth / 2, 79, { align: 'center' });

                // કવર ટાઇટલ - International Spoken English
                pdf.setFontSize(24);
                pdf.setTextColor(255, 255, 255);
                pdf.text("Spoken English", pageWidth / 2, 140, { align: 'center' });
                
                pdf.setFontSize(20);
                pdf.setTextColor(85, 195, 186);
                pdf.text("& Grammar Book", pageWidth / 2, 153, { align: 'center' });

                pdf.setFontSize(13);
                pdf.setTextColor(180, 220, 220);
                pdf.text("Professional Course Material • Morbi, Gujarat, India", pageWidth / 2, 230, { align: 'center' });

                // --- ૨. Uploaded Pages with Safe Memory Scaling & Clean Navy Background ---
                for (let i = 0; i < MahanStudio.pages.length; i++) {
                    pdf.addPage();
                    const pageData = MahanStudio.pages[i];

                    // સેફ મેમરી સ્કેલિંગ સાથે બેકગ્રાઉન્ડ ક્લિનિંગ ફંક્શન
                    const cleanImage = await processImageSafely(pageData.originalImage);

                    // આખા પેજનું બેકગ્રાઉન્ડ શુદ્ધ નેવી બ્લુ કરો (#092029)
                    pdf.setFillColor(9, 32, 41);
                    pdf.rect(0, 0, pageWidth, pageHeight, 'F');

                    // સુંદર સ્યાન (Cyan) આઉટર બોર્ડર ફ્રેમ
                    pdf.setDrawColor(85, 195, 186);
                    pdf.setLineWidth(0.8);
                    pdf.rect(10, 10, pageWidth - 20, pageHeight - 20);

                    // હેડર લોગો ('®' વગરનો શુદ્ધ પિલ્લર લોગો)
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

                    pdf.addImage(cleanImage, 'JPEG', imgX, imgY, imgWidth, imgHeight);

                    // બોટમ ફૂટર લાઈન અને પેજ નંબર
                    pdf.setDrawColor(85, 195, 186);
                    pdf.line(15, pageHeight - 15, pageWidth - 15, pageHeight - 15);

                    pdf.setTextColor(255, 255, 255);
                    pdf.setFontSize(10);
                    const pageNumStr = String(i + 2).padStart(2, '0');
                    pdf.text(pageNumStr, pageWidth - 20, pageHeight - 9, { align: 'right' });
                }

                // --- ૩. Download PDF ---
                pdf.save("MAHAN_International_Spoken_Book.pdf");
                alert("✅ તમારી MAHAN PDF ફાઈલ સફળતાપૂર્વક ડાઉનલોડ થઈ ગઈ છે!");

            } catch (error) {
                console.error("PDF Error:", error);
                alert("❌ PDF બનાવતી વખતે એરર આવી છે: " + error.message);
            }
        });
    }, 1000);
});

// Helper Function: મેમરી સેફ્ટી સાથે ઈમેજ પ્રોસેસિંગ અને બેકગ્રાઉન્ડ કલર સેટિંગ
function processImageSafely(imgSrc) {
    return new Promise((resolve) => {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.onload = () => {
            const canvas = document.createElement('canvas');
            // મેમરી એરર (Invalid string length) અટકાવવા માટે ઓપ્ટિમાઈઝ્ડ સાઈઝ
            canvas.width = Math.min(img.width * 1.5, 2000);
            canvas.height = Math.min(img.height * 1.5, 2800);
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

                // સફેદ બેકગ્રાઉન્ડ અને નીચેના પડછાયાને સાફ કરો
                if (avg > 140) {
                    data[i] = 9;       // Red
                    data[i+1] = 32;    // Green
                    data[i+2] = 41;    // Blue
                } else {
                    // અક્ષરો શાર્પ રાખો
                    data[i] = 255;     
                    data[i+1] = 255;   
                    data[i+2] = 255;   
                }
            }

            ctx.putImageData(imgData, 0, 0);
            resolve(canvas.toDataURL('image/jpeg', 0.9));
        };
        img.src = imgSrc;
    });
                    }
