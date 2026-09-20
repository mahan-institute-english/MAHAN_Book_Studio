// js/export.js - MAHAN Branded PDF Export & Cover Page Module
console.log("Export module loaded");

document.addEventListener("DOMContentLoaded", () => {
    const btnExport = document.getElementById('btnExportPDF');
    if(!btnExport) return;

    btnExport.addEventListener('click', async () => {
        if(typeof MahanStudio === 'undefined' || MahanStudio.pages.length === 0) {
            alert("⚠️ કૃપા કરીને પહેલા ઓછામાં ઓછું એક પેજ અપલોડ કરો!");
            return;
        }

        alert("⏳ MAHAN Professional PDF જનરેટ થઈ રહી છે, થોડી રાહ જુઓ...");

        try {
            const { jsPDF } = window.jspdf;
            const pdf = new jsPDF('p', 'mm', 'a4');
            const pageWidth = 210;
            const pageHeight = 297;

            // --- ૧. ઓટોમેટિક MAHAN કવર પેજ બનાવવું ---
            pdf.setFillColor(9, 32, 41); // MAHAN Dark Theme Color
            pdf.rect(0, 0, pageWidth, pageHeight, 'F');

            pdf.setTextColor(85, 195, 186); // Primary Cyan
            pdf.setFontSize(28);
            pdf.setFont("helvetica", "bold");
            pdf.text("MAHAN®", pageWidth / 2, 80, { align: 'center' });

            pdf.setTextColor(255, 255, 255);
            pdf.setFontSize(18);
            pdf.text("The Institute Of English", pageWidth / 2, 95, { align: 'center' });

            pdf.setDrawColor(255, 140, 0); // Accent Orange Border
            pdf.setLineWidth(1);
            pdf.rect(20, 20, pageWidth - 40, pageHeight - 40);

            pdf.setFontSize(22);
            pdf.text(MahanStudio.projectInfo.name || "English Spoken & Grammar Book", pageWidth / 2, 160, { align: 'center' });
            
            pdf.setFontSize(14);
            pdf.setTextColor(153, 214, 214);
            pdf.text("Professional Course Material", pageWidth / 2, 180, { align: 'center' });

            // --- ૨. યુઝરે અપલોડ કરેલા પેજ ઉમેરવા ---
            for (let i = 0; i < MahanStudio.pages.length; i++) {
                pdf.addPage();
                const pageData = MahanStudio.pages[i];

                pdf.addImage(pageData.originalImage, 'JPEG', 10, 15, pageWidth - 20, pageHeight - 30);

                const showLogo = document.getElementById('toggleMahanLogo')?.checked;
                if(showLogo) {
                    pdf.setFillColor(9, 32, 41);
                    pdf.rect(10, 5, pageWidth - 20, 12, 'F');
                    
                    pdf.setTextColor(85, 195, 186);
                    pdf.setFontSize(10);
                    pdf.setFont("helvetica", "bold");
                    pdf.text("MAHAN® - The Institute Of English", pageWidth / 2, 12, { align: 'center' });
                }
            }

            // --- ૩. PDF ફાઈલ ડાઉનલોડ કરો ---
            pdf.save("MAHAN_English_Book.pdf");
            alert("✅ તમારી MAHAN Branded PDF સફળતાપૂર્વક ડાઉનલોડ થઈ ગઈ છે!");

        } catch (error) {
            console.error(error);
            alert("❌ PDF બનાવતી વખતે એરર આવી છે: " + error.message);
        }
    });
});
