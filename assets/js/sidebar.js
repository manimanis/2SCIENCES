/**
 * Sidebar Navigation Engine - Tiroir Latéral Repliable à la Demande (Fix Inaccessibilité)
 * Enseignant: Mohamed Anis MANI - Cours Informatique 2e Sciences
 */

document.addEventListener('DOMContentLoaded', () => {
  const articles = document.querySelectorAll('main article');
  if (!articles.length) return;

  const isSingleArticle = articles.length === 1;

  // Create Sidebar DOM elements if not present
  let sidebar = document.getElementById('course-sidebar');
  let backdrop = document.getElementById('sidebar-backdrop');

  if (!sidebar) {
    // Backdrop overlay
    backdrop = document.createElement('div');
    backdrop.id = 'sidebar-backdrop';
    backdrop.className = 'sidebar-backdrop';
    document.body.appendChild(backdrop);

    // Sidebar drawer container with 3 distinct flex rows
    sidebar = document.createElement('div');
    sidebar.id = 'course-sidebar';
    sidebar.className = 'course-sidebar shadow-lg bg-white border-end d-flex flex-column';

    // Get current module number from page URL
    const pagePath = location.pathname;
    let modNum = 5;
    if (pagePath.includes('module01')) modNum = 1;
    if (pagePath.includes('module02')) modNum = 2;
    if (pagePath.includes('module03')) modNum = 3;
    if (pagePath.includes('module04')) modNum = 4;
    if (pagePath.includes('module05')) modNum = 5;

    const prevMod = modNum > 1 ? `module0${modNum - 1}.html` : 'index.html';
    const nextMod = modNum < 5 ? `module0${modNum + 1}.html` : 'index.html';

    sidebar.innerHTML = `
      <!-- LIGNE 1 : Toujours visible en haut (En-tête & Raccourcis) -->
      <div class="sidebar-top flex-shrink-0 bg-dark text-white p-3 border-bottom border-secondary">
        <div class="d-flex justify-content-between align-items-center mb-2">
          <div>
            <span class="badge bg-info text-dark font-monospace">Module 0${modNum}</span>
            <span class="fw-bold fs-6 ms-1">📌 Sommaire</span>
          </div>
          <button id="btn-close-sidebar" class="btn-close btn-close-white" aria-label="Fermer"></button>
        </div>
        <div class="d-flex gap-2">
          <a href="index.html" class="btn btn-sm btn-outline-light w-50 text-center font-monospace">🏠 Accueil</a>
          <a href="playground.html" class="btn btn-sm btn-warning text-dark fw-bold w-50 text-center font-monospace" rel="noopener noreferrer" target="_blank">⚡ IDE Python</a>
        </div>
      </div>
      
      <!-- LIGNE 2 : Seule zone munie de la barre de défilement (Arborescence) -->
      <div class="sidebar-middle flex-grow-1 p-3 overflow-y-auto">
        <div id="sidebar-tree" class="nav nav-pills flex-column gap-1"></div>
      </div>

      <!-- LIGNE 3 : Toujours visible en bas (Navigation inter-modules) -->
      <div class="sidebar-bottom flex-shrink-0 p-3 bg-light border-top">
        <div class="d-flex justify-content-between gap-2">
          <a href="${prevMod}" class="btn btn-sm btn-outline-primary w-50 font-monospace text-center">◀ Précédent</a>
          <a href="${nextMod}" class="btn btn-sm btn-primary w-50 font-monospace text-center">Suivant ▶</a>
        </div>
      </div>
    `;

    document.body.appendChild(sidebar);


    // Create Floating Toggle Button (Visible on PC & Mobile)
    const toggleBtn = document.createElement('button');
    toggleBtn.id = 'btn-toggle-sidebar';
    toggleBtn.className = 'btn btn-primary shadow-lg btn-toggle-sidebar d-flex align-items-center gap-2';
    toggleBtn.innerHTML = `<span>☰</span> <span class="font-monospace small fw-bold">Sommaire</span>`;
    document.body.appendChild(toggleBtn);
  }

  const sidebarTree = document.getElementById('sidebar-tree');
  const toggleBtn = document.getElementById('btn-toggle-sidebar');
  const closeBtn = document.getElementById('btn-close-sidebar');

  // Build tree nodes from H2 & H3 elements
  if (sidebarTree) {
    let treeHTML = '';
    let itemIdx = 0;

    articles.forEach((art, artIdx) => {
      const h2 = art.querySelector('h2');
      if (h2) {
        treeHTML += `<div class="fw-bold text-primary small mt-3 mb-1 border-bottom pb-1">${h2.textContent.trim()}</div>`;
      }

      const sections = art.querySelectorAll('section');
      sections.forEach((sect, sectIdx) => {
        itemIdx++;
        const h3 = sect.querySelector('h3');
        const title = h3 ? h3.textContent.trim() : `Section ${itemIdx}`;

        // Exact ID matching with pages.js
        const secId = isSingleArticle
          ? `section-${sectIdx + 1}`
          : `section-${artIdx + 1}-${sectIdx + 1}`;
        sect.id = secId;

        treeHTML += `
          <a href="#${secId}" class="nav-link sidebar-link p-2 small text-dark rounded d-flex justify-content-between align-items-center" 
             data-art-idx="${artIdx}" data-sect-idx="${sectIdx}" data-sec="${secId}">
            <span>${title}</span>
            <span class="badge bg-light text-secondary border font-monospace">#${itemIdx}</span>
          </a>
        `;
      });
    });

    sidebarTree.innerHTML = treeHTML;
  }

  // Toggle events
  const openSidebar = () => {
    sidebar.classList.add('open');
    if (backdrop) backdrop.classList.add('show');
  };

  const closeSidebar = () => {
    sidebar.classList.remove('open');
    if (backdrop) backdrop.classList.remove('show');
  };

  if (toggleBtn) toggleBtn.addEventListener('click', () => {
    sidebar.classList.contains('open') ? closeSidebar() : openSidebar();
  });

  if (closeBtn) closeBtn.addEventListener('click', closeSidebar);
  if (backdrop) backdrop.addEventListener('click', closeSidebar);

  // Function to synchronize active link in sidebar on page load/refresh or section navigation
  function syncSidebarActiveLink() {
    if (!window.navVueApp) return;
    const curArt = window.navVueApp.currentArticleIndex;
    const curSect = window.navVueApp.currentSectionIndex;

    const links = document.querySelectorAll('.sidebar-link');
    links.forEach(l => {
      const aIdx = parseInt(l.dataset.artIdx, 10);
      const sIdx = parseInt(l.dataset.sectIdx, 10);
      if (aIdx === curArt && sIdx === curSect) {
        l.classList.add('active', 'bg-primary', 'text-white');
      } else {
        l.classList.remove('active', 'bg-primary', 'text-white');
      }
    });
  }

  window.syncSidebarActiveLink = syncSidebarActiveLink;
  setTimeout(syncSidebarActiveLink, 80);

  // Link click handler with navVueApp integration and auto-scroll
  document.addEventListener('click', (e) => {
    const link = e.target.closest('.sidebar-link');
    if (link) {
      const artIdx = parseInt(link.dataset.artIdx, 10);
      const sectIdx = parseInt(link.dataset.sectIdx, 10);
      const secId = link.dataset.sec;

      // 1. Unhide section via Vue navigation
      if (window.navVueApp && typeof window.navVueApp.navigate === 'function') {
        window.navVueApp.navigate(artIdx, sectIdx);
      }

      // Update active style in sidebar
      syncSidebarActiveLink();

      // 2. Update hash
      try {
        history.pushState(null, null, '#' + secId);
      } catch (err) { }

      // 3. Scroll to top of section content smoothly
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 50);

      closeSidebar();
    }
  });
});




