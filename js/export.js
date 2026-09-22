// js/export.js - Perfect Navy Blue Theme Book Generator with Blend Fix
console.log("Navy Blue Theme Export Module Loaded");

document.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {
        const btnExport = document.getElementById('btnExportPDF');
        if(!btnExport) return;

        btnExport.addEventListener('click', async () => {
            if (typeof MahanStudio === 'undefined' || !MahanStudio.pages || MahanStudio.pages.length === 0) {
                alert("⚠️ કૃપા કરીને પહેલા 'Upload Pages' બટન દબાવીને ઓછામાં ઓછું એક પેજ અપલોડ કરો!");
                return;
            }

            alert("⏳ MAHAN Professional PDF જનરેટ થઈ રહી છે, કૃપા કરીને રાહ જુઓ...");

            try {
                const { jsPDF } = window.jspdf;
                const pdf = new jsPDF('p', 'mm', 'a4');
                const pageWidth = 210;
                const pageHeight = 297;

                // --- ૧. MAHAN Professional Cover Page ---
                pdf.setFillColor(9, 32, 41); // Navy Blue Dark Theme (#092029)
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

                // --- ૨. Uploaded Pages with Pure Navy Blue Background & Clean Blend ---
                for (let i = 0; i < MahanStudio.pages.length; i++) {
                    pdf.addPage();
                    const pageData = MahanStudio.pages[i];

                    // 1. આખા પેજનું બેકગ્રાઉન્ડ સક્સેસફુલ નેવી બ્લુ કરો
                    pdf.setFillColor(9, 32, 41);
                    pdf.rect(0, 0, pageWidth, pageHeight, 'F');

                    // 2. સુંદર આઉટર બોર્ડર ફ્રેમ
                    pdf.setDrawColor(85, 195, 186);
                    pdf.setLineWidth(0.8);
                    pdf.rect(10, 10, pageWidth - 20, pageHeight - 20);

                    // 3. ટોપ બ્રાન્ડ હેડર બોક્સ (MAHAN - The Institute Of English)
                    pdf.setFillColor(13, 48, 60);
                    pdf.rect(15, 14, pageWidth - 30, 14, 'F');
                    
                    pdf.setTextColor(85, 195, 186);
                    pdf.setFontSize(12);
                    pdf.setFont("helvetica", "bold");
                    pdf.text("MAHAN® - The Institute Of English", pageWidth / 2, 23, { align: 'center' });

                    // 4. અપલોડ કરેલો ફોટો મૂકો અને 'MULTIPLY' મોડ વાપરો જેથી સફેદ બેકગ્રાઉન્ડ બ્લુમાં ભળી જાય
                    pdf.addImage(pageData.originalImage, 'JPEG', 15, 32, pageWidth - 30, pageHeight - 52, undefined, 'FAST');

                    // 5. બોટમ ફૂટર લાઈન અને પેજ નંબર
                    pdf.setDrawColor(85, 195, 186);
                    pdf.line(15, pageHeight - 18, pageWidth - 15, pageHeight - 18);

                    pdf.setTextColor(255, 255, 255);
춧pdf.setFontSize(10);
                    pdf.text("The heaven lies at the feet of mother.", 20, pageHeight - 12);
                    
                    const pageNumStr = String(i + 1).padStart(2, '0');
                    pdf.text(pageNumStr, pageWidth - 25, pageHeight - 12, { align: 'right' });
                }

                // --- ૩. Download PDF ---
                pdf.save("MAHAN_NavyBlue_Book.pdf");
                alert("✅ તમારી નેવી બ્લુ બેકગ્રાઉન્ડવાળી પરફેક્ટ MAHAN PDF ડાઉનલોડ થઈ ગઈ છે!");

            } catch (error) {
                console.error("PDF Error:", error);
                alert("❌ PDF બનાવતી વખતે એરર આવી છે: " + error.message);
            }
        });
    }, 1000);
});
