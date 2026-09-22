// js/export.js - Mahan Institute Ultimate Background Remover & Navy Blue Converter
console.log("Ultimate Background Remover Loaded");

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

                // --- ૨. Uploaded Pages with Automatic White Background Removal ---
                for (let i = 0; i < MahanStudio.pages.length; i++) {
                    pdf.addPage();
                    const pageData = MahanStudio.pages[i];

                    // જાતે જ સફેદ બેકગ્રાઉન્ડ હટાવીને નેવી બ્લુ સાથે મર્જ કરનાર ફંક્શન કોલ કરો
                    const cleanImageData = await removeWhiteBackgroundAndConvertToNavy(pageData.originalImage);

                    // 1. આખા પેજનું બેકગ્રાઉન્ડ નેવી બ્લુ કરો (#092029)
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

                    // 4. ક્લીન કરેલી ઈમેજ પ્રોપોર્શનમાં ગોઠવો
                    const imgWidth = 180;
                    const imgHeight = 225;
                    const imgX = (pageWidth - imgWidth) / 2;
                    const imgY = 32;

                    pdf.addImage(cleanImageData, 'PNG', imgX, imgY, imgWidth, imgHeight);

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
                pdf.save("MAHAN_Perfect_Book.pdf");
                alert("✅ તમારી MAHAN PDF સફળતાપૂર્વક ડાઉનલોડ થઈ ગઈ છે!");

            } catch (error) {
                console.error("PDF Error:", error);
                alert("❌ PDF બનાવતી વખતે એરર આવી છે: " + error.message);
            }
        });
    }, 1000);
});

// Helper Function: સફેદ બેકગ્રાઉન્ડને ગાયબ કરીને નેવી બ્લુ થીમમાં કન્વર્ટ કરવા માટે
function removeWhiteBackgroundAndConvertToNavy(imgSrc) {
    return new Promise((resolve) => {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d');

            // બેકગ્રાઉન્ડમાં MAHAN ડાર્ક નેવી બ્લુ કલર (#092029) ભરો
            ctx.fillStyle = '#092029';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // ઓરિજિનલ ફોટો ડ્રો કરો
            ctx.drawImage(img, 0, 0);

            const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const data = imgData.data;

            // પિક્સેલ ચેક કરો: જો કલર સફેદ (White/Light) હોય તો તેને નેવી બ્લુ બેકગ્રાઉન્ડ સાથે મિક્સ કરી દો
            for (let i = 0; i < data.length; i += 4) {
                const r = data[i];
                const g = data[i+1];
                const b = data[i+2];

                // જો બેકગ્રાઉન્ડ સફેદ કે ચોખ્ખો પ્રકાશવાળો ભાગ હોય તો તેને ડાર્ક બ્લુમાં ફેરવો
                if (r > 190 && g > 190 && b > 190) {
                    data[i] = 9;       // Red -> 9
                    data[i+1] = 32;    // Green -> 32
                    data[i+2] = 41;    // Blue -> 41
                }
            }

            ctx.putImageData(imgData, 0, 0);
            resolve(canvas.toDataURL('image/png'));
        };
        img.src = imgSrc;
    });
                }
