// js/export.js - Ultimate Navy Blue Theme Book Generator with Smart Background Blending
console.log("Ultimate Export Module Loaded");

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

                // --- ૨. Uploaded Pages with Smart Canvas Dark Theme Conversion ---
                for (let i = 0; i < MahanStudio.pages.length; i++) {
                    pdf.addPage();
                    const pageData = MahanStudio.pages[i];

                    // જાતે જ કેનવાસ દ્વારા ફોટાના બેકગ્રાઉન્ડને ડાર્ક બ્લુમાં કન્વર્ટ કરો
                    const processedDataUrl = await processImageToDarkTheme(pageData.originalImage);

                    // 1. આખા પેજનું બેકગ્રાઉન્ડ નેવી બ્લુ (#092029)
                    pdf.setFillColor(9, 32, 41);
                    pdf.rect(0, 0, pageWidth, pageHeight, 'F');

                    // 2. સુંદર આઉટર બોર્ડર ફ્રેમ
                    pdf.setDrawColor(85, 195, 186);
                    pdf.setLineWidth(0.8);
                    pdf.rect(10, 10, pageWidth - 20, pageHeight - 20);

                    // 3. ટોપ બ્રાન્ડ હેડર બોક્સ (Image 3 જેવું)
                    pdf.setFillColor(13, 48, 60);
                    pdf.rect(15, 14, pageWidth - 30, 14, 'F');
                    
                    pdf.setTextColor(85, 195, 186);
                    pdf.setFontSize(12);
                    pdf.setFont("helvetica", "bold");
                    pdf.text("MAHAN® - The Institute Of English", pageWidth / 2, 23, { align: 'center' });

                    // 4. પ્રોસેસ કરેલી ક્લીન ઈમેજ મૂકો
                    pdf.addImage(processedDataUrl, 'PNG', 15, 32, pageWidth - 30, pageHeight - 52);

                    // 5. બોટમ ફૂટર લાઈન અને પેજ નંબર (Image 3 જેવું)
                    pdf.setDrawColor(85, 195, 186);
                    pdf.line(15, pageHeight - 18, pageWidth - 15, pageHeight - 18);

                    pdf.setTextColor(255, 255, 255);
                    pdf.setFontSize(10);
                    pdf.text("The heaven lies at the feet of mother.", 20, pageHeight - 12);
                    
                    const pageNumStr = String(i + 2).padStart(2, '0');
                    pdf.text(pageNumStr, pageWidth - 25, pageHeight - 12, { align: 'right' });
                }

                // --- ૩. Download PDF ---
                pdf.save("MAHAN_Professional_Book.pdf");
                alert("✅ તમારી MAHAN PDF સફળતાપૂર્વક ડાઉનલોડ થઈ ગઈ છે!");

            } catch (error) {
                console.error("PDF Error:", error);
                alert("❌ PDF બનાવતી વખતે એરર આવી છે: " + error.message);
            }
        });
    }, 1000);
});

// Helper function: ફોટાના સફેદ બેકગ્રાઉન્ડને ડાર્ક બ્લુ થીમમાં ઓટોમેટિક ફેરવવા માટે
function processImageToDarkTheme(imgSrc) {
    return new Promise((resolve) => {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d');

            // પેલા બેકગ્રાઉન્ડમાં નેવી બ્લુ કલર ભરો
            ctx.fillStyle = '#092029';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // ફોટો ડ્રો કરો
            ctx.drawImage(img, 0, 0);

            // પિક્સેલ્સ રીડ કરીને સફેદ બેકગ્રાઉન્ડને ડાર્ક બ્લુ સાથે મિક્સ કરો
            const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const data = imgData.data;
            for (let i = 0; i < data.length; i += 4) {
                const r = data[i];
                const g = data[i+1];
                const b = data[i+2];
                // જો પિક્સેલ ઘણો the સફેદ (White/Light) હોય તો તેને ડાર્ક થીમ મુજબ બદલો
                if (r > 200 && g > 200 && b > 200) {
                    data[i] = 9;     // R
                    data[i+1] = 32;  // G
                    data[i+2] = 41;  // B
                }
            }
            ctx.putImageData(imgData, 0, 0);
            resolve(canvas.toDataURL('image/png'));
        };
        img.src = imgSrc;
    });
                      }
