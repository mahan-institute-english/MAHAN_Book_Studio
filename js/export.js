// js/export.js - Mahan Institute Ultimate Production Ready v10.0
console.log("Mahan Ultimate V10 Export Module Loaded");

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

                // શુદ્ધ MAHAN લોગો (કોઈ '®' નહીં, કોઈ જૂની નિશાની નહીં)
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
                pdf.text("International Spoken English", pageWidth / 2, 140, { align: 'center' });
                
                pdf.setFontSize(20);
                pdf.setTextColor(85, 195, 186);
                pdf.text("& Grammar Book", pageWidth / 2, 153, { align: 'center' });

                pdf.setFontSize(13);
                pdf.setTextColor(180, 220, 220);
                pdf.text("Professional Course Material • Morbi, Gujarat, India", pageWidth / 2, 230, { align: 'center' });

                // --- ૨. Uploaded Pages with Perfect Shadow Removal & Clean Navy Background ---
                for (let i = 0; i < MahanStudio.pages.length; i++) {
                    pdf.addPage();
                    const pageData = MahanStudio.pages[i];

                    // ફુલ એચડી શાર્પનિંગ અને નીચેનો સફેદ પડછાયો/પ્રકાશ સંપૂર્ણ કાઢી નાખનાર ફંક્શન
                    const hdCleanImage = await convertToFullHDWithoutShadow(pageData.originalImage);

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

                    // પ્રોસેસ્ડ એચડી ઈમેજ બરાબર વચ્ચે ફિટ કરો
                    const imgWidth = 184;
                    const imgHeight = 238;
                    const imgX = (pageWidth - imgWidth) / 2;
                    const imgY = 32;

                    pdf.addImage(hdCleanImage, 'PNG', imgX, imgY, imgWidth, imgHeight);

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
                alert("✅ તમારી MAHAN Full HD PDF ફાઈલ સફળતાપૂર્વક ડાઉનલોડ થઈ ગઈ છે!");

            } catch (error) {
                console.error("PDF Error:", error);
                alert("❌ PDF બનાવતી વખતે એરર આવી છે: " + error.message);
            }
        });
    }, 1000);
});

// Helper Function: સફેદ બેકગ્રાઉન્ડ અને નીચેના સફેદ પડછાયા/પ્રકાશને સંપૂર્ણ કટ કરીને નેવી બ્લુ બેકગ્રાઉન્ડ આપનાર ફંક્શન
function convertToFullHDWithoutShadow(imgSrc) {
    return new Promise((resolve) => {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = img.width * 3; // હાઈ રેઝોલ્યુશન
            canvas.height = img.height * 3;
            const ctx = canvas.getContext('2d');

            // બેકગ્રાઉન્ડમાં સચોટ MAHAN નેવી બ્લુ કલર ભરો (#092029)
            ctx.fillStyle = '#092029';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.imageSmoothingEnabled = true;
            ctx.imageSmoothingQuality = 'high';
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

            const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const data = imgData.data;
            const height = canvas.height;
            const width = canvas.width;

            // પિક્સેલ પ્રોસેસિંગ: સફેદ બેકગ્રાઉન્ડ અને નીચેના ભાગના પડછાયાને સંપૂર્ણ સાફ કરો
            for (let y = 0; y < height; y++) {
                for (let x = 0; x < width; x++) {
                    const idx = (y * width + x) * 4;
                    const r = data[idx];
                    const g = data[idx+1];
                    const b = data[idx+2];

                    const avg = (r + g + b) / 3;

                    // જો નીચેના ભાગમાં (Footer Area) સફેદ પડછાયો કે ફ્લેર હોય તો તેને સીધો નેવી બ્લુ કરી દો
                    // તેમજ બાકીનું સફેદ બેકગ્રાઉન્ડ પણ સાફ કરો
                    if (avg > 135) {
                        data[idx] = 9;       // Red
                        data[idx+1] = 32;    // Green
                        data[idx+2] = 41;    // Blue
                    } else {
                        // અક્ષરોને એકદમ ઘાટા અને શાર્પ સફેદ બનાવો
                        data[idx] = 255;     
                        data[idx+1] = 255;   
                        data[idx+2] = 255;   
                    }
                }
            }

            ctx.putImageData(imgData, 0, 0);
            resolve(canvas.toDataURL('image/png'));
        };
        img.src = imgSrc;
    });
                    }
