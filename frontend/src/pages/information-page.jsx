import React, { useState, useEffect } from 'react';
import styles from './InformationPage.module.css';
import AqiExplanationSection from '../components/informationPageSections/AqiExplanationSection';
import PollutantTypesSection from '../components/informationPageSections/PollutantTypesSection';
import HealthImpactsSection from '../components/informationPageSections/HealthImpactsSection';
import ProtectionTipsSection from '../components/informationPageSections/ProtectionTipsSection';
import Footer from '../components/footer';


function InformationPage() {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);

  const sections = [
    { id: "apa-itu-aqi", title: "Apa Itu AQI?", icon: "📊" },
    { id: "jenis-polutan", title: "Polutan Utama", icon: "🧪" },
    { id: "dampak-kesehatan", title: "Dampak Kesehatan", icon: "💔" },
    { id: "cara-melindungi-diri", title: "Tips Perlindungan", icon: "🛡️" },
  ];

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const navbarHeight = document.querySelector('nav.navbar')?.offsetHeight || 70;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - navbarHeight - 20;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
      if (window.innerWidth < 992) {
        setIsSidebarExpanded(false);
      }
    }
  };

  useEffect(() => {
    const checkScreenWidth = () => {
      if (window.innerWidth < 992) {
        setIsSidebarExpanded(false); 
      } else {
        setIsSidebarExpanded(true); 
      }
    };
    checkScreenWidth();
    window.addEventListener('resize', checkScreenWidth);
    return () => window.removeEventListener('resize', checkScreenWidth);
  }, []);


  return (
    <div className={`${styles.informationPageContainer} container-fluid px-0`}>
      <header className={`${styles.pageHeader} py-5 text-white text-center`}>
        <div className="container">
          <h1 className={`${styles.pageTitle} display-4 fw-bold`}>Pusat Informasi Kualitas Udara</h1>
          <p className={`${styles.pageSubtitle} lead col-lg-9 mx-auto`}>
            Temukan semua yang perlu Anda ketahui tentang kualitas udara, dampak polutan bagi kesehatan,
            dan bagaimana Sky Watch membantu Anda mengambil langkah proaktif untuk hidup lebih sehat di Jakarta.
          </p>
        </div>
      </header>

      {!isSidebarExpanded && window.innerWidth < 992 && (
        <button
          className={`${styles.sidebarGlobalToggleBtn} d-lg-none btn btn-light shadow-sm`}
          onClick={() => setIsSidebarExpanded(true)}
          aria-controls="infoPageSidebar"
          aria-expanded="false"
        >
          ››
        </button>
      )}

      <div className={`${styles.infoPageLayoutContainer}`}>
        <nav
          id="infoPageSidebar"
          className={`
            ${styles.sidebarNavWrapper}
            ${isSidebarExpanded ? styles.sidebarNavExpanded : styles.sidebarNavCollapsed}
          `}
        >
          <div className={`${styles.sidebarNavInner} sticky-top`} style={{ top: (document.querySelector('nav.navbar')?.offsetHeight || 70) + 20 }}>
            <div className={`${styles.sidebarHeader} d-flex justify-content-between align-items-center mb-3`}>
              <h5 className={`${styles.sidebarTitle} ${!isSidebarExpanded && 'd-none'}`}>Navigasi Cepat</h5>
              {isSidebarExpanded && (
                <button
                  className={`${styles.sidebarInternalCloseBtn} btn-close d-lg-none`}
                  onClick={() => setIsSidebarExpanded(false)}
                  aria-label="Tutup Navigasi"
                ></button>
              )}
            </div>

            {/* Konten Navigasi */}
            <ul className="nav flex-column">
               {sections.map(section => (
                <li className="nav-item" key={section.id} title={isSidebarExpanded ? '' : section.title}>
                  <a
                    className={`${styles.sidebarLink} nav-link`}
                    href={`#${section.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(section.id);
                    }}
                  >
                    <span className={styles.sidebarIcon}>{section.icon}</span>
                    <span className={`${styles.sidebarLinkText} ${!isSidebarExpanded && 'd-none'}`}>{section.title}</span>
                  </a>
                </li>
              ))}
            </ul>

            <button
              className={`${styles.sidebarToggleButton} d-none d-lg-block`}
              onClick={() => setIsSidebarExpanded(!isSidebarExpanded)}
              title={isSidebarExpanded ? "Sempitkan Navigasi" : "Perlebar Navigasi"}
            >
              {isSidebarExpanded ? '‹‹' : '››'}
            </button>
          </div>
        </nav>

        {/* Konten Utama */}
        <main
          className={`
            ${styles.mainContentWrapper}
            ${isSidebarExpanded ? styles.mainContentWhenSidebarExpanded : styles.mainContentWhenSidebarCollapsed}
          `}
        >
          <div className="container-fluid py-md-5 py-4 px-md-4 px-3">
            <div id="apa-itu-aqi"><AqiExplanationSection /></div>
            <hr className={styles.sectionDivider} />
            <div id="jenis-polutan"><PollutantTypesSection /></div>
            <hr className={styles.sectionDivider} />
            <div id="dampak-kesehatan"><HealthImpactsSection /></div>
            <hr className={styles.sectionDivider} />
            <div id="cara-melindungi-diri"><ProtectionTipsSection /></div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default InformationPage;