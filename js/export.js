// js/export.js - Final Robust PDF & Cover Export Module
console.log("Export Module Initialized");

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

                // --- ૧. MAHAN Branded Cover Page ---
                pdf.setFillColor(9, 32, 41); // Dark Theme
                pdf.rect(0, 0, pageWidth, pageHeight, 'F');

                pdf.setTextColor(85, 195, 186); // Cyan
                pdf.setFontSize(30);
                pdf.setFont("helvetica", "bold");
                pdf.text("MAHAN®", pageWidth / 2, 80, { align: 'center' });

                pdf.setTextColor(255, 255, 255);
                pdf.setFontSize(18);
                pdf.text("The Institute Of English", pageWidth / 2, 95, { align: 'center' });

                pdf.setDrawColor(255, 140, 0); // Orange Border
                pdf.setLineWidth(1.5);
                pdf.rect(15, 15, pageWidth - 30, pageHeight - 30);

                pdf.setFontSize(22);
                pdf.text("English Spoken & Grammar Book", pageWidth / 2, 160, { align: 'center' });
                
                pdf.setFontSize(14);
                pdf.setTextColor(153, 214, 214);
                pdf.text("Professional Course Material - Morbi, Gujarat", pageWidth / 2, 180, { align: 'center' });

                // --- ૨. Uploaded Pages ---
                for (let i = 0; i < MahanStudio.pages.length; i++) {
                    pdf.addPage();
                    const pageData = MahanStudio.pages[i];

                    // Add Image to A4 PDF page
                    pdf.addImage(pageData.originalImage, 'JPEG', 10, 15, pageWidth - 20, pageHeight - 30);

                    // Top Branding Header
                    const showLogo = document.getElementById('toggleMahanLogo')?.checked;
                    if(showLogo !== false) {
                        pdf.setFillColor(9, 32, 41);
                        pdf.rect(10, 5, pageWidth - 20, 10, 'F');
                        
                        pdf.setTextColor(85, 195, 186);
                        pdf.setFontSize(10);
                        pdf.setFont("helvetica", "bold");
                        pdf.text("MAHAN® - The Institute Of English", pageWidth / 2, 11, { align: 'center' });
                    }
                }

                // --- ૩. Save / Download PDF ---
                pdf.save("MAHAN_English_Book_PRO.pdf");
                alert("✅ તમારી MAHAN Branded PDF ફાઈલ સફળતાપૂર્વક ડાઉનલોડ થઈ ગઈ છે!");

            } catch (error) {
                console.error("PDF Error:", error);
                alert("❌ PDF બનાવતી વખતે એરર આવી છે: " + error.message);
            }
        });
    }, 1000);
});
