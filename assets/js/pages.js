/**
 * Antigravity Interactive Navigation Engine - Vue.js Edition
 * Enseignant: Mohamed Anis MANI - Cours Informatique 2e Sciences
 */

document.addEventListener('DOMContentLoaded', () => {
  const asideNavbar = document.querySelector('aside #aside_navbar');
  const articlesEl = document.querySelectorAll('main article');
  if (!asideNavbar || !articlesEl.length) return;

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

  // Create navbar container for Vue with explicit section href attributes
  asideNavbar.innerHTML = `<ul class="navbar-nav mr-auto" id="vue-nav-list">
    <li v-for="(art, aIdx) in articles" :key="aIdx" class="nav-item dropdown">
      <a class="nav-link dropdown-toggle" 
         :class="{ active: currentArticleIndex === aIdx }"
         href="#" 
         role="button" 
         data-bs-toggle="dropdown" 
         aria-haspopup="true" 
         aria-expanded="false">
        {{ art.title }}
      </a>
      <div v-if="art.sections.length" class="dropdown-menu">
        <a v-for="(sect, sIdx) in art.sections" 
           :key="sIdx"
           class="dropdown-item"
           :class="{ active: currentArticleIndex === aIdx && currentSectionIndex === sIdx }"
           :href="sect.href"
           @click="navigate(aIdx, sIdx, $event)">
          {{ sect.title }}
        </a>
      </div>
    </li>
  </ul>`;

  // Vue Navigation instance
  window.navVueApp = new Vue({
    el: '#vue-nav-list',
    data: {
      articles: articlesData,
      currentArticleIndex: initialArticleIndex,
      currentSectionIndex: initialSectionIndex
    },
    methods: {
      navigate(artIdx, sectIdx, event) {
        this.currentArticleIndex = artIdx;
        this.currentSectionIndex = sectIdx;
        this.updateVisibility();
        this.saveState();

        const sect = this.articles[artIdx]?.sections[sectIdx];
        if (sect) {
          location.hash = sect.href;
        }

        // Fermeture automatique du menu .dropdown-menu
        try {
          const link = event?.target?.closest('.dropdown-item');
          if (link) {
            const menu = link.closest('.dropdown-menu');
            if (menu) menu.classList.remove('show');
            const toggle = menu?.parentElement?.querySelector('.dropdown-toggle');
            if (toggle) {
              toggle.classList.remove('show');
              toggle.setAttribute('aria-expanded', 'false');
              if (window.bootstrap && bootstrap.Dropdown) {
                const instance = bootstrap.Dropdown.getInstance(toggle);
                if (instance) instance.hide();
              }
            }
          }
          // Masquer le menu responsive mobile si ouvert
          const mobileNav = document.querySelector('#aside_navbar.show');
          if (mobileNav) mobileNav.classList.remove('show');
        } catch (err) {}
      },
      updateVisibility() {
        this.articles.forEach((art, aIdx) => {
          if (aIdx === this.currentArticleIndex) {
            art.el.classList.remove('d-none');
            art.sections.forEach((sect, sIdx) => {
              if (sIdx === this.currentSectionIndex) {
                sect.el.classList.remove('d-none');
              } else {
                sect.el.classList.add('d-none');
              }
            });
          } else {
            art.el.classList.add('d-none');
          }
        });
      },
      saveState() {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({
          article_index: this.currentArticleIndex,
          section_index: this.currentSectionIndex
        }));
      }
    },
    mounted() {
      this.updateVisibility();
    }
  });

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