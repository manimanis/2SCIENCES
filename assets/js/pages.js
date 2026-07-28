/**
 * Antigravity Interactive Navigation Engine - Vue.js Edition
 * Enseignant: Mohamed Anis MANI - Cours Informatique 2e Sciences
 */

document.addEventListener('DOMContentLoaded', () => {
  const asideNavbar = document.querySelector('aside #aside_navbar');
  const articlesEl = document.querySelectorAll('main article');
  if (!articlesEl.length) return;

  const isSingleArticle = articlesEl.length === 1;

  // Build reactive articles data structure from HTML DOM
  const articlesData = [];
  articlesEl.forEach((artElem, artIdx) => {
    const titleEl = artElem.querySelector('h2');
    const title = titleEl ? titleEl.textContent.trim() : `Chapitre ${artIdx + 1}`;
    
    const sectionsEl = artElem.querySelectorAll('section');
    const sections = [];
    sectionsEl.forEach((sectElem, sectIdx) => {
      const h3 = sectElem.querySelector('h3');
      const sTitle = h3 ? h3.textContent.trim() : `Page ${sectIdx + 1}`;
      
      // Assign ID to section element for anchor linking (#section-1, #section-2...)
      const secId = isSingleArticle 
        ? `section-${sectIdx + 1}` 
        : `section-${artIdx + 1}-${sectIdx + 1}`;
      sectElem.id = secId;

      sections.push({
        index: sectIdx,
        title: sTitle,
        href: `#${secId}`,
        el: sectElem
      });
    });

    articlesData.push({
      index: artIdx,
      title: title,
      el: artElem,
      sections: sections
    });
  });

  // Helper function to parse hash (#section-1 or #section-1-2)
  const parseHash = () => {
    const hash = location.hash;
    let aIdx = 0;
    let sIdx = 0;
    if (hash.startsWith('#section-')) {
      const parts = hash.replace('#section-', '').split('-');
      if (parts.length === 1) {
        sIdx = Math.max(0, (parseInt(parts[0]) || 1) - 1);
      } else if (parts.length >= 2) {
        aIdx = Math.max(0, (parseInt(parts[0]) || 1) - 1);
        sIdx = Math.max(0, (parseInt(parts[1]) || 1) - 1);
      }
    }
    return { aIdx, sIdx };
  };

  const initial = parseHash();
  const STORAGE_KEY = location.pathname + '#art_obj';

  let initialArticleIndex = initial.aIdx;
  let initialSectionIndex = initial.sIdx;

  if (!location.hash) {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
      if (saved && typeof saved.article_index === 'number') {
        initialArticleIndex = saved.article_index;
        initialSectionIndex = saved.section_index || 0;
      }
    } catch (e) {}
  }

  // Helper to update DOM visibility for sections (displaying 1 section at a time)
  function updateSectionVisibility(targetArtIdx, targetSectIdx) {
    // 1. Hide ALL articles and ALL sections
    articlesData.forEach((art) => {
      art.el.classList.add('d-none');
      art.sections.forEach((sect) => {
        sect.el.classList.add('d-none');
      });
    });

    // 2. Show ONLY the single target article and ONLY the single target section
    const targetArt = articlesData[targetArtIdx];
    if (targetArt) {
      targetArt.el.classList.remove('d-none');
      const targetSect = targetArt.sections[targetSectIdx];
      if (targetSect) {
        targetSect.el.classList.remove('d-none');
      }
    }

    // 3. Highlight active link in sidebar
    if (typeof window.syncSidebarActiveLink === 'function') {
      window.syncSidebarActiveLink();
    }
  }



  // Create global navVueApp API compatible with sidebar.js
  window.navVueApp = {
    articles: articlesData,
    currentArticleIndex: initialArticleIndex,
    currentSectionIndex: initialSectionIndex,
    navigate(artIdx, sectIdx, event) {
      this.currentArticleIndex = artIdx;
      this.currentSectionIndex = sectIdx;
      this.updateVisibility();
      this.saveState();
    },
    updateVisibility() {
      updateSectionVisibility(this.currentArticleIndex, this.currentSectionIndex);
    },
    saveState() {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({
          article_index: this.currentArticleIndex,
          section_index: this.currentSectionIndex
        }));
      } catch (e) {}
    }
  };

  // Enforce 1-section-at-a-time visibility on initial load!
  window.navVueApp.updateVisibility();

  // Listen to hashchange events in browser URL bar
  window.addEventListener('hashchange', () => {
    const { aIdx, sIdx } = parseHash();
    if (window.navVueApp) {
      window.navVueApp.currentArticleIndex = aIdx;
      window.navVueApp.currentSectionIndex = sIdx;
      window.navVueApp.updateVisibility();
      window.navVueApp.saveState();
    }
  });
});