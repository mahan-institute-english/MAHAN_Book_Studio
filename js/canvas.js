<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MAHAN Book Studio PRO+</title>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/fabric.js/5.3.1/fabric.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <header class="topbar">
        <div class="logo">
            <h2>MAHAN<sup style="font-size: 14px;">®</sup> <span>Book Studio PRO+</span></h2>
        </div>
        <div class="project-tools">
            <button id="btnNew"><i class="fas fa-file"></i> New Project</button>
            <button id="btnSave"><i class="fas fa-save"></i> Save</button>
            <button id="btnExportPDF" class="btn-primary"><i class="fas fa-file-pdf"></i> Export Book (with Cover)</button>
        </div>
    </header>

    <div class="workspace">
        <aside class="sidebar-left">
            <div class="panel">
                <h3><i class="fas fa-plus-circle"></i> Add Content</h3>
                <button id="btnUploadPages"><i class="fas fa-images"></i> Upload Pages</button>
                <input type="file" id="fileUploader" multiple accept="image/*" style="display: none;">
                
                <button id="btnAddText"><i class="fas fa-font"></i> Add Text Overlay</button>
            </div>
            
            <div class="panel">
                <h3><i class="fas fa-cog"></i> Page Settings</h3>
                <input type="text" id="pageHeading" placeholder="Page Heading">
                <textarea id="pageQuote" placeholder="સુવિચાર (Unique for this page)"></textarea>
            </div>
        </aside>

        <main class="canvas-container-wrapper">
            <div class="canvas-header">
                <span id="currentPageIndicator">Page 1 / 1</span>
                <div class="history-tools">
                    <button id="btnUndo"><i class="fas fa-undo"></i></button>
                    <button id="btnRedo"><i class="fas fa-redo"></i></button>
                    <button id="btnRestore" class="btn-warning"><i class="fas fa-history"></i> Original</button>
                </div>
            </div>
            <div style="border: 2px solid #55c3ba; background: #092029; display: inline-block;">
                <canvas id="mainEditorCanvas"></canvas>
            </div>
        </main>

        <aside class="sidebar-right">
            <div class="panel">
                <h3><i class="fas fa-paint-brush"></i> Theme & Brand</h3>
                <button id="btnApplyBg"><i class="fas fa-fill-drip"></i> Set Background</button>
                <div class="toggle-switch" style="margin-top: 10px;">
                    <input type="checkbox" id="toggleMahanLogo" checked style="margin-right: 5px;">
                    <label for="toggleMahanLogo">Show MAHAN Logo</label>
                </div>
            </div>
        </aside>
    </div>

    <footer class="thumbnail-bar" id="pageThumbnails"></footer>

    <script src="js/app.js"></script>
    <script src="js/canvas.js"></script>
    <script src="js/upload.js"></script>
    <script src="js/export.js"></script>
</body>
</html>
