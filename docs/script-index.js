/*/ INDEX - OVERVIEW /*/
/* ===========================
   INTRO VIDEO LOGIC (FINAL)
=========================== */

window.addEventListener("DOMContentLoaded", () => {
    const heroSection = document.querySelector(".hero");
    const heroDesktop = document.getElementById("hero-video-desktop");
    const hasPlayed = sessionStorage.getItem("videoPlayed");
    const transitionOverlay = document.querySelector(".transition-overlay");



    /* ------------------------
       RETURN VISIT (NO VIDEO)
    ------------------------- */
if (hasPlayed) {
    heroSection.style.display = "none";

    // FORCE a stagger delay only on return
    const items = document.querySelectorAll('.grid-item');
    items.forEach((item, i) => {
        item.style.animationDelay = `${0.2 + i * 0.025}s`; 
    });

    document.body.classList.add("content-ready");
    return;
}



    /* ------------------------
       FIRST VISIT (PLAY VIDEO)
    ------------------------- */
    sessionStorage.setItem("videoPlayed", "true");

    heroDesktop?.addEventListener("ended", handleVideoEnd);
});


// Smooth scroll + reveal content on FIRST visit only
function handleVideoEnd() {
    const heroSection = document.querySelector(".hero");
    const target = document.querySelector(".overview");

    const start = window.scrollY;
    const end = target.getBoundingClientRect().top + start;
    const distance = end - start;
    const duration = 10; // keep yours
    let startTime = null;

    function step(timestamp) {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);

        // ease in-out
        const eased = progress < 0.5
            ? 2 * progress * progress
            : -1 + (4 - 2 * progress) * progress;

        window.scrollTo(0, start + distance * eased);

        if (progress < 1) {
            requestAnimationFrame(step);
        } else {
            // after scroll, slide hero away & show content WITH delays
            heroSection.style.display = "none";

            // DO NOT add no-delay here → first visit should have delays
            document.body.classList.add("content-ready");
        }
    }

    requestAnimationFrame(step);
}



// JUMP TO OVERVIEW AUTOMATICALLY
function handleVideoEnd() {
    const target = document.querySelector(".overview");
    const start = window.scrollY;
    const end = target.getBoundingClientRect().top + start;
    const distance = end - start;
    const duration = 1000;
    let startTime = null;

    function step(timestamp) {
        if (!startTime) startTime = timestamp;
        let progress = Math.min((timestamp - startTime) / duration, 1);

        // Slight acceleration: easeInOutQuad (faster in middle)
        const easedProgress = progress < 0.5
            ? 2 * progress * progress           // accelerate first half
            : -1 + (4 - 2 * progress) * progress; // decelerate second half

        window.scrollTo(0, start + distance * easedProgress);

        if (progress < 1) requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
}





/*/ OVERVIEW /*/
// GALLERY MODAL //
  const galleryData = {
      'item-A1': [
        { artworktitle: '「akoya pearls」', src: 'Images/ALL WORKS/**A_akoya/A_akoya_0.webp', caption: 'This is a test to see how the text will be displayed in each of the images. Since some images are larger / wider than others, I am curious to see how this longer or shorter text will be displayed in the different windows.'},
        { artworktitle: '「akoya pearls」', src: 'Images/ALL WORKS/**A_akoya/A_akoya_1.webp', caption: 'This is a test to see how the text will be displayed in each of the images. Since some images are larger / wider than others, I am curious to see how this longer or shorter text will be displayed in the different windows' },
        { artworktitle: '「akoya pearls」', src: 'Images/ALL WORKS/**A_akoya/A_akoya_2.webp', caption: 'This is a test to see how the text will be displayed in each of the images. Since some images are larger / wider than others, I am curious to see how this longer or shorter text will be displayed in the different windows' },
      ],
      'item-A2': [
        { artworktitle: '「BELLA VISTA」', src: 'Images/ALL WORKS/**A_bellavista/A_bellavista_0.webp', caption: 'Slide 1/5' },
        { artworktitle: '「BELLA VISTA」', src: 'Images/ALL WORKS/**A_bellavista/A_bellavista_2.webp', caption: 'Slide 2/5' },
        { artworktitle: '「BELLA VISTA」', src: 'Images/ALL WORKS/**A_bellavista/A_bellavista_3.webp', caption: 'Slide 3/5' },
        { artworktitle: '「BELLA VISTA」', src: 'Images/ALL WORKS/**A_bellavista/A_bellavista_4.webp', caption: 'Slide 4/5' },
        { artworktitle: '「BELLA VISTA」', src: 'Images/ALL WORKS/**A_bellavista/A_bellavista_5.webp', caption: 'Slide 5/5' },
      ],
      'item-A3': [
        { src: 'Images/ALL WORKS/**A_beonaroll/beonaroll_1.webp', artworktitle: '「beonaroll」', caption: 'Slide 1/4' },
        { src: 'Images/ALL WORKS/**A_beonaroll/beonaroll_2.webp', artworktitle: '「beonaroll」', caption: 'Slide 2/4' },
        { src: 'Images/ALL WORKS/**A_beonaroll/beonaroll_3.webp', artworktitle: '「beonaroll」', caption: 'Slide 3/4' },
        { src: 'Images/ALL WORKS/**A_beonaroll/beonaroll_4.webp', artworktitle: '「beonaroll」', caption: 'Slide 4/4' },
      ],
      'item-A4': [
        { src: 'Images/ALL WORKS/**A_kotobuki/A_kotobuki_0.webp', artworktitle: '「kotobuki」', caption: 'Slide 1/5' },
        { src: 'Images/ALL WORKS/**A_kotobuki/A_kotobuki_1.webp', artworktitle: '「kotobuki」', caption: 'Slide 2/5' },
        { src: 'Images/ALL WORKS/**A_kotobuki/A_kotobuki_2.webp', artworktitle: '「kotobuki」', caption: 'Slide 3/5' },
        { src: 'Images/ALL WORKS/**A_kotobuki/A_kotobuki_3.webp', artworktitle: '「kotobuki」', caption: 'Slide 4/5' },
        { src: 'Images/ALL WORKS/**A_kotobuki/A_kotobuki_4.webp', artworktitle: '「kotobuki」', caption: 'Slide 5/5' },
      ],
      'item-A5': [
        { src: 'Images/ALL WORKS/**A_Spanishshoes/shoe_1.webp', artworktitle: '「Spanish shoes」', caption: 'Slide 1/6' },
        { src: 'Images/ALL WORKS/**A_Spanishshoes/shoe_2.webp', artworktitle: '「Spanish shoes」', caption: 'Slide 2/6' },
        { src: 'Images/ALL WORKS/**A_Spanishshoes/shoe_3.webp', artworktitle: '「Spanish shoes」', caption: 'Slide 3/6' },
        { src: 'Images/ALL WORKS/**A_Spanishshoes/shoe_4.webp', artworktitle: '「Spanish shoes」', caption: 'Slide 4/6' },
        { src: 'Images/ALL WORKS/**A_Spanishshoes/shoe_5.webp', artworktitle: '「Spanish shoes」', caption: 'Slide 5/6' },
        { src: 'Images/ALL WORKS/**A_Spanishshoes/shoe_6.webp', artworktitle: '「Spanish shoes」', caption: 'Slide 6/6' },
      ],
      'item-A6': [
        { src: 'Images/ALL WORKS/**A_Takano/takano mag_1.webp', artworktitle: '「takano」', caption: 'Slide 1/5' },
        { src: 'Images/ALL WORKS/**A_Takano/takano mag_2.webp', artworktitle: '「takano」', caption: 'Slide 2/5' },
        { src: 'Images/ALL WORKS/**A_Takano/takano mag_3.webp', artworktitle: '「takano」', caption: 'Slide 3/5' },
        { src: 'Images/ALL WORKS/**A_Takano/takano mag_4.webp', artworktitle: '「takano」', caption: 'Slide 4/5' },
        { src: 'Images/ALL WORKS/**A_Takano/takano mag_5.webp', artworktitle: '「takano」', caption: 'Slide 5/5' },
      ],
      'item-A7': [
        { src: 'Images/ALL WORKS/**A_Takano Gift/Takano_gift_0.webp', artworktitle: '「Takano gift」', caption: 'Slide 1/6' },
        { src: 'Images/ALL WORKS/**A_Takano Gift/Takano_gift_1.webp', artworktitle: '「Takano gift」', caption: 'Slide 2/6' },
        { src: 'Images/ALL WORKS/**A_Takano Gift/Takano_gift_2.webp', artworktitle: '「Takano gift」', caption: 'Slide 3/6' },
        { src: 'Images/ALL WORKS/**A_Takano Gift/Takano_gift_3.webp', artworktitle: '「Takano gift」', caption: 'Slide 4/6' },
        { src: 'Images/ALL WORKS/**A_Takano Gift/Takano_gift_4.webp', artworktitle: '「Takano gift」', caption: 'Slide 5/6' },
        { src: 'Images/ALL WORKS/**A_Takano Gift/Takano_gift_5.webp', artworktitle: '「Takano gift」', caption: 'Slide 6/6' },
      ],
      'item-A8': [
        { src:'Images/ALL WORKS/**A_visacard/visa_1.webp' , artworktitle: '「visa card」', caption: 'Slide 1/3' },
        { src:'Images/ALL WORKS/**A_visacard/visa_2.webp' , artworktitle: '「visa card」', caption: 'Slide 2/3' },
        { src:'Images/ALL WORKS/**A_visacard/visa_3.webp' , artworktitle: '「visa card」', caption: 'Slide 3/3' },
      ],
      'item-A9': [
        { src: 'Images/ALL WORKS/**A_yonehachi/yonehachi_0.webp', artworktitle: '「yonehachi', caption: 'Slide 1/2' },
        { src: 'Images/ALL WORKS/**A_yonehachi/yonehachi_1.webp', artworktitle: '「yonehachi', caption: 'Slide 1/2' },


      ],
      'item-D1': [
        { src: 'Images/ALL WORKS/**D_beonaroll_2023/beonaroll_pc_01.webp', artworktitle: '「beonaroll」', caption: 'Slide 1/11' },
        { src: 'Images/ALL WORKS/**D_beonaroll_2023/beonaroll_pc_02.webp', artworktitle: '「beonaroll」', caption: 'Slide 2/11' },
        { src: 'Images/ALL WORKS/**D_beonaroll_2023/beonaroll_pc_03.webp', artworktitle: '「beonaroll」', caption: 'Slide 3/11' },
        { src: 'Images/ALL WORKS/**D_beonaroll_2023/beonaroll_pc_04.webp', artworktitle: '「beonaroll」', caption: 'Slide 4/11' },
        { src: 'Images/ALL WORKS/**D_beonaroll_2023/beonaroll_pc_05.webp', artworktitle: '「beonaroll」', caption: 'Slide 5/11' },
        { src: 'Images/ALL WORKS/**D_beonaroll_2023/beonaroll_pc_06.webp', artworktitle: '「beonaroll」', caption: 'Slide 6/11' },
        { src: 'Images/ALL WORKS/**D_beonaroll_2023/beonaroll_sp_01.webp', artworktitle: '「beonaroll」', caption: 'Slide 7/11' },
        { src: 'Images/ALL WORKS/**D_beonaroll_2023/beonaroll_sp_02.webp', artworktitle: '「beonaroll」', caption: 'Slide 8/11' },
        { src: 'Images/ALL WORKS/**D_beonaroll_2023/beonaroll_sp_03.webp', artworktitle: '「beonaroll」', caption: 'Slide 9/11' },
        { src: 'Images/ALL WORKS/**D_beonaroll_2023/beonaroll_sp_04.webp', artworktitle: '「beonaroll」', caption: 'Slide 10/11' },
        { src: 'Images/ALL WORKS/**D_beonaroll_2023/beonaroll_sp_05.webp', artworktitle: '「beonaroll」', caption: 'Slide 11/11' },
      ],
      'item-D2': [
        { src: 'Images/ALL WORKS/**D_beonaroll_2025/beonaroll_pc_01.webp', artworktitle: '「beonaroll」', caption: 'Slide 1/5' },
        { src: 'Images/ALL WORKS/**D_beonaroll_2025/beonaroll_pc_02.webp', artworktitle: '「beonaroll」', caption: 'Slide 2/5' },
        { src: 'Images/ALL WORKS/**D_beonaroll_2025/beonaroll_pc_03.webp', artworktitle: '「beonaroll」', caption: 'Slide 3/5' },
        { src: 'Images/ALL WORKS/**D_beonaroll_2025/beonaroll_sp_04.webp', artworktitle: '「beonaroll」', caption: 'Slide 4/5' },
        { src: 'Images/ALL WORKS/**D_beonaroll_2025/beonaroll_insta_05.webp', artworktitle: '「beonaroll」', caption: 'Slide 5/5' },


      ],

      'item-D3': [
        { src: 'Images/ALL WORKS/**D_wako/wako-0.webp', artworktitle: '「wako」', caption: 'Slide 1/6' },
        { src: 'Images/ALL WORKS/**D_wako/wako-1.webp', artworktitle: '「wako」', caption: 'Slide 2/6' },
        { src: 'Images/ALL WORKS/**D_wako/wako-2.webp', artworktitle: '「wako」', caption: 'Slide 3/6' },
        { src: 'Images/ALL WORKS/**D_wako/wako-3.webp', artworktitle: '「wako」', caption: 'Slide 4/6' },
        { src: 'Images/ALL WORKS/**D_wako/wako-4.webp', artworktitle: '「wako」', caption: 'Slide 5/6' },
        { src: 'Images/ALL WORKS/**D_wako/wako-5.webp', artworktitle: '「wako」', caption: 'Slide 6/6' },
      ],

      'item-D4': [
        { src: 'Images/ALL WORKS/**D_Yoga_insta/yoga-1.webp', artworktitle: '「yoga」', caption: 'Slide 1/2' },
        { src: 'Images/ALL WORKS/**D_Yoga_insta/yoga-2.webp', artworktitle: '「yoga」', caption: 'Slide 2/2' },
      ],

        'item-E1': [
        { src: 'Images/ALL WORKS/**E_cookbook/cook_1.webp', artworktitle: '「cookbook」', caption: 'Slide 1/5' },
        { src: 'Images/ALL WORKS/**E_cookbook/cook_2.webp', artworktitle: '「cookbook」', caption: 'Slide 1/5' },
        { src: 'Images/ALL WORKS/**E_cookbook/cook_3.webp', artworktitle: '「cookbook」', caption: 'Slide 1/5' },
        { src: 'Images/ALL WORKS/**E_cookbook/cook_4.webp', artworktitle: '「cookbook」', caption: 'Slide 1/5' },
        { src: 'Images/ALL WORKS/**E_cookbook/cook_5.webp', artworktitle: '「cookbook」', caption: 'Slide 1/5' },
      ],
      
        'item-E2': [
        { src: 'Images/ALL WORKS/**E_Elle/E_Elle_0.webp', artworktitle: '「ELLE」', caption: 'Slide 1/5' },
        { src: 'Images/ALL WORKS/**E_Elle/E_Elle_1.webp', artworktitle: '「ELLE」', caption: 'Slide 2/5' },
        { src: 'Images/ALL WORKS/**E_Elle/E_Elle_2.webp', artworktitle: '「ELLE」', caption: 'Slide 3/5' },
        { src: 'Images/ALL WORKS/**E_Elle/E_Elle_3.webp', artworktitle: '「ELLE」', caption: 'Slide 4/5' },
        { src: 'Images/ALL WORKS/**E_Elle/E_Elle_4.webp', artworktitle: '「ELLE」', caption: 'Slide 5/5' },
      ],

        'item-E3': [
        { src: 'Images/ALL WORKS/**E_finsum report/FS report_1.webp', artworktitle: '「finsum report」', caption: 'Slide 1/6' },
        { src: 'Images/ALL WORKS/**E_finsum report/FS report_2.webp', artworktitle: '「finsum report」', caption: 'Slide 2/6' },
        { src: 'Images/ALL WORKS/**E_finsum report/FS report_3.webp', artworktitle: '「finsum report」', caption: 'Slide 3/6' },
        { src: 'Images/ALL WORKS/**E_finsum report/FS report_4.webp', artworktitle: '「finsum report」', caption: 'Slide 4/6' },
        { src: 'Images/ALL WORKS/**E_finsum report/FS report_5.webp', artworktitle: '「finsum report」', caption: 'Slide 5/6' },
        { src: 'Images/ALL WORKS/**E_finsum report/FS report_6.webp', artworktitle: '「finsum report」', caption: 'Slide 6/6' },
      ],

        'item-E4': [
        { src: 'Images/ALL WORKS/**E_FinSum_tabloid/FS_0.webp', artworktitle: '「FinSum tabloid」', caption: 'Slide 1/3' },
        { src: 'Images/ALL WORKS/**E_FinSum_tabloid/FS_1.webp', artworktitle: '「FinSum tabloid」', caption: 'Slide 2/3' },
        { src: 'Images/ALL WORKS/**E_FinSum_tabloid/FS_2.webp', artworktitle: '「FinSum tabloid」', caption: 'Slide 3/3' },
      ],

        'item-E5': [
        { src: 'Images/ALL WORKS/**E_fukushima/fukushima_Jap_1.webp', artworktitle: '「fukushima Jap」', caption: 'Slide 1/3' },
        { src: 'Images/ALL WORKS/**E_fukushima/fukushima_Jap_2.webp', artworktitle: '「fukushima Jap」', caption: 'Slide 2/3' },
        { src: 'Images/ALL WORKS/**E_fukushima/fukushima_Jap_3.webp', artworktitle: '「fukushima Jap」', caption: 'Slide 3/3' },
      ],

        'item-E6': [
        { src: 'Images/ALL WORKS/**E_Gaho/Gaho_0.webp', artworktitle: '「gaho」', caption: 'Slide 1/9' },
        { src: 'Images/ALL WORKS/**E_Gaho/Gaho_1.webp', artworktitle: '「gaho」', caption: 'Slide 1/9' },
        { src: 'Images/ALL WORKS/**E_Gaho/Gaho_2.webp', artworktitle: '「gaho」', caption: 'Slide 1/9' },
        { src: 'Images/ALL WORKS/**E_Gaho/Gaho_3.webp', artworktitle: '「gaho」', caption: 'Slide 1/9' },
        { src: 'Images/ALL WORKS/**E_Gaho/Gaho_4.webp', artworktitle: '「gaho」', caption: 'Slide 1/9' },
        { src: 'Images/ALL WORKS/**E_Gaho/Gaho_5.webp', artworktitle: '「gaho」', caption: 'Slide 1/9' },
        { src: 'Images/ALL WORKS/**E_Gaho/Gaho_6.webp', artworktitle: '「gaho」', caption: 'Slide 1/9' },
        { src: 'Images/ALL WORKS/**E_Gaho/Gaho_7.webp', artworktitle: '「gaho」', caption: 'Slide 1/9' },
        { src: 'Images/ALL WORKS/**E_Gaho/Gaho_8.webp', artworktitle: '「gaho」', caption: 'Slide 1/9' },
      ],
      
        'item-E7': [
        { src: 'Images/ALL WORKS/**E_Gaho_catalogue/gaho_catalogue_1.webp', artworktitle: '「gaho catalogue」', caption: 'Slide 1/3' },
        { src: 'Images/ALL WORKS/**E_Gaho_catalogue/gaho_catalogue_2.webp', artworktitle: '「gaho catalogue」', caption: 'Slide 1/3' },
        { src: 'Images/ALL WORKS/**E_Gaho_catalogue/gaho_catalogue_3.webp', artworktitle: '「gaho catalogue」', caption: 'Slide 1/3' },
      ],

        'item-E8': [
        { src: 'Images/ALL WORKS/**E_IBARAKI_book/IBARAKI_1.webp', artworktitle: '「IBARAKI」', caption: 'Slide 1/5' },
        { src: 'Images/ALL WORKS/**E_IBARAKI_book/IBARAKI_2.webp', artworktitle: '「IBARAKI」', caption: 'Slide 2/5' },
        { src: 'Images/ALL WORKS/**E_IBARAKI_book/IBARAKI_3.webp', artworktitle: '「IBARAKI」', caption: 'Slide 3/5' },
        { src: 'Images/ALL WORKS/**E_IBARAKI_book/IBARAKI_4.webp', artworktitle: '「IBARAKI」', caption: 'Slide 4/5' },
        { src: 'Images/ALL WORKS/**E_IBARAKI_book/IBARAKI_5.webp', artworktitle: '「IBARAKI」', caption: 'Slide 5/5' },
      ],
    
        'item-E9': [
        { src: 'Images/ALL WORKS/**E_ibaraki_guide/ibaraki_guide_0.webp', artworktitle: '「ibaraki guide」', caption: 'Slide 1/5' },
        { src: 'Images/ALL WORKS/**E_ibaraki_guide/ibaraki_guide_1.webp', artworktitle: '「ibaraki guide」', caption: 'Slide 2/5' },
        { src: 'Images/ALL WORKS/**E_ibaraki_guide/ibaraki_guide_2.webp', artworktitle: '「ibaraki guide」', caption: 'Slide 3/5' },
        { src: 'Images/ALL WORKS/**E_ibaraki_guide/ibaraki_guide_3.webp', artworktitle: '「ibaraki guide」', caption: 'Slide 4/5' },
        { src: 'Images/ALL WORKS/**E_ibaraki_guide/ibaraki_guide_4.webp', artworktitle: '「ibaraki guide」', caption: 'Slide 5/5' },
      ],

        'item-E10': [
        { src: 'Images/ALL WORKS/**E_imamori/imamori-1.webp', artworktitle: '「imamori」', caption: 'Slide 1/8' },
        { src: 'Images/ALL WORKS/**E_imamori/imamori-2.webp', artworktitle: '「imamori」', caption: 'Slide 2/8' },
        { src: 'Images/ALL WORKS/**E_imamori/imamori-3.webp', artworktitle: '「imamori」', caption: 'Slide 3/8' },
        { src: 'Images/ALL WORKS/**E_imamori/imamori-4.webp', artworktitle: '「imamori」', caption: 'Slide 4/8' },
        { src: 'Images/ALL WORKS/**E_imamori/imamori-5.webp', artworktitle: '「imamori」', caption: 'Slide 5/8' },
        { src: 'Images/ALL WORKS/**E_imamori/imamori-6.webp', artworktitle: '「imamori」', caption: 'Slide 6/8' },
        { src: 'Images/ALL WORKS/**E_imamori/imamori-7.webp', artworktitle: '「imamori」', caption: 'Slide 7/8' },
        { src: 'Images/ALL WORKS/**E_imamori/imamori-8.webp', artworktitle: '「imamori」', caption: 'Slide 8/8' },
      ],

        'item-E11': [
        { src: 'Images/ALL WORKS/**E_Ishikawa/Ishikawa_Eng_0.webp', artworktitle: '「ishikawa」', caption: 'Slide 1/3' },
        { src: 'Images/ALL WORKS/**E_Ishikawa/Ishikawa_Eng_1.webp', artworktitle: '「ishikawa」', caption: 'Slide 2/3' },
        { src: 'Images/ALL WORKS/**E_Ishikawa/Ishikawa_Eng_2.webp', artworktitle: '「ishikawa」', caption: 'Slide 3/3' },
      ],

        'item-E12': [
        { src: 'Images/ALL WORKS/**E_Kanazawa/kanazawa_1.webp', artworktitle: '「kanazawa」', caption: 'Slide 1/6' },
        { src: 'Images/ALL WORKS/**E_Kanazawa/kanazawa_2.webp', artworktitle: '「kanazawa」', caption: 'Slide 2/6' },
        { src: 'Images/ALL WORKS/**E_Kanazawa/kanazawa_3.webp', artworktitle: '「kanazawa」', caption: 'Slide 3/6' },
        { src: 'Images/ALL WORKS/**E_Kanazawa/kanazawa_4.webp', artworktitle: '「kanazawa」', caption: 'Slide 4/6' },
        { src: 'Images/ALL WORKS/**E_Kanazawa/kanazawa_5.webp', artworktitle: '「kanazawa」', caption: 'Slide 5/6' },
        { src: 'Images/ALL WORKS/**E_Kanazawa/kanazawa_6.webp', artworktitle: '「kanazawa」', caption: 'Slide 6/6' },
      ],

        'item-E13': [
        { src: 'Images/ALL WORKS/**E_KGIE/KGIE-1.webp', artworktitle: '「KGIE」', caption: 'Slide 1/6' },
        { src: 'Images/ALL WORKS/**E_KGIE/KGIE-2.webp', artworktitle: '「KGIE」', caption: 'Slide 2/6' },
        { src: 'Images/ALL WORKS/**E_KGIE/KGIE-3.webp', artworktitle: '「KGIE」', caption: 'Slide 3/6' },
        { src: 'Images/ALL WORKS/**E_KGIE/KGIE-4.webp', artworktitle: '「KGIE」', caption: 'Slide 4/6' },
        { src: 'Images/ALL WORKS/**E_KGIE/KGIE-5.webp', artworktitle: '「KGIE」', caption: 'Slide 5/6' },
        { src: 'Images/ALL WORKS/**E_KGIE/KGIE-6.webp', artworktitle: '「KGIE」', caption: 'Slide 6/6' },
      ],

        'item-E14': [
        { src: 'Images/ALL WORKS/**E_Kyoto/Kyoto_0.webp', artworktitle: '「kyoto」', caption: 'Slide 1/6' },
        { src: 'Images/ALL WORKS/**E_Kyoto/Kyoto_1.webp', artworktitle: '「kyoto」', caption: 'Slide 2/6' },
        { src: 'Images/ALL WORKS/**E_Kyoto/Kyoto_2.webp', artworktitle: '「kyoto」', caption: 'Slide 3/6' },
        { src: 'Images/ALL WORKS/**E_Kyoto/Kyoto_3.webp', artworktitle: '「kyoto」', caption: 'Slide 4/6' },
        { src: 'Images/ALL WORKS/**E_Kyoto/Kyoto_4.webp', artworktitle: '「kyoto」', caption: 'Slide 5/6' },
        { src: 'Images/ALL WORKS/**E_Kyoto/Kyoto_5.webp', artworktitle: '「kyoto」', caption: 'Slide 6/6' },
      ],

        'item-E15': [
        { src: 'Images/ALL WORKS/**E_Luci/Luci_0.webp', artworktitle: '「luci」', caption: 'Slide 1/5' },
        { src: 'Images/ALL WORKS/**E_Luci/Luci_1.webp', artworktitle: '「luci」', caption: 'Slide 2/5' },
        { src: 'Images/ALL WORKS/**E_Luci/Luci_2.webp', artworktitle: '「luci」', caption: 'Slide 3/5' },
        { src: 'Images/ALL WORKS/**E_Luci/Luci_3.webp', artworktitle: '「luci」', caption: 'Slide 4/5' },
        { src: 'Images/ALL WORKS/**E_Luci/Luci_4.webp', artworktitle: '「luci」', caption: 'Slide 5/5' },
      ],

      'item-E16': [
        { src: 'Images/ALL WORKS/**E_Luire/Luire_1.webp', artworktitle: '「luire」', caption: 'Slide 1/4' },
        { src: 'Images/ALL WORKS/**E_Luire/Luire_2.webp', artworktitle: '「luire」', caption: 'Slide 2/4' },
        { src: 'Images/ALL WORKS/**E_Luire/Luire_3.webp', artworktitle: '「luire」', caption: 'Slide 3/4' },
        { src: 'Images/ALL WORKS/**E_Luire/Luire_4.webp', artworktitle: '「luire」', caption: 'Slide 4/4' },
      ],
        
        'item-E17': [
        { src: 'Images/ALL WORKS/**E_maroa/maroa_1.webp', artworktitle: '「maroa」', caption: 'Slide 1/4' },
        { src: 'Images/ALL WORKS/**E_maroa/maroa_2.webp', artworktitle: '「maroa」', caption: 'Slide 2/4' },
        { src: 'Images/ALL WORKS/**E_maroa/maroa_3.webp', artworktitle: '「maroa」', caption: 'Slide 3/4' },
        { src: 'Images/ALL WORKS/**E_maroa/maroa_4.webp', artworktitle: '「maroa」', caption: 'Slide 4/4' },
      ],

      'item-E18': [
        { src: 'Images/ALL WORKS/**E_miwabook/miwabook_0.webp', artworktitle: '「miwabook」', caption: 'Slide 1/2' },
        { src: 'Images/ALL WORKS/**E_miwabook/miwabook_1.webp', artworktitle: '「miwabook」', caption: 'Slide 2/2' },
      ],


          'item-E19': [
        { src: 'Images/ALL WORKS/**E_Senshu/KIX_1.webp', artworktitle: '「senshu」', caption: 'Slide 1/5' },
        { src: 'Images/ALL WORKS/**E_Senshu/KIX_2.webp', artworktitle: '「senshu」', caption: 'Slide 2/5' },
        { src: 'Images/ALL WORKS/**E_Senshu/KIX_3.webp', artworktitle: '「senshu」', caption: 'Slide 3/5' },
        { src: 'Images/ALL WORKS/**E_Senshu/KIX_6.webp', artworktitle: '「senshu」', caption: 'Slide 4/5' },
        { src: 'Images/ALL WORKS/**E_Senshu/KIX_7.webp', artworktitle: '「senshu」', caption: 'Slide 5/5' },
      ],



        'item-E20':[
        { src: 'Images/ALL WORKS/**E_Toyotimes/Toyotimes_0.webp', artworktitle: '「toyo times」', caption: 'Slide 1/7' },
        { src: 'Images/ALL WORKS/**E_Toyotimes/Toyotimes_1.webp', artworktitle: '「toyo times」', caption: 'Slide 2/7' },
        { src: 'Images/ALL WORKS/**E_Toyotimes/Toyotimes_2.webp', artworktitle: '「toyo times」', caption: 'Slide 3/7' },
        { src: 'Images/ALL WORKS/**E_Toyotimes/Toyotimes_3.webp', artworktitle: '「toyo times」', caption: 'Slide 4/7' },
        { src: 'Images/ALL WORKS/**E_Toyotimes/Toyotimes_4.webp', artworktitle: '「toyo times」', caption: 'Slide 5/7' },
        { src: 'Images/ALL WORKS/**E_Toyotimes/Toyotimes_5.webp', artworktitle: '「toyo times」', caption: 'Slide 6/7' },
        { src: 'Images/ALL WORKS/**E_Toyotimes/Toyotimes_6.webp', artworktitle: '「toyo times」', caption: 'Slide 7/7' },
      ],

        'item-E21':[
        { src: 'Images/ALL WORKS/**E_vogue/Vogue_1.webp', artworktitle: '「vogue」', caption: 'Slide 1/5' },
        { src: 'Images/ALL WORKS/**E_vogue/Vogue_2.webp', artworktitle: '「vogue」', caption: 'Slide 2/5' },
        { src: 'Images/ALL WORKS/**E_vogue/Vogue_3.webp', artworktitle: '「vogue」', caption: 'Slide 3/5' },
        { src: 'Images/ALL WORKS/**E_vogue/Vogue_4.webp', artworktitle: '「vogue」', caption: 'Slide 4/5' },
        { src: 'Images/ALL WORKS/**E_vogue/Vogue_5.webp', artworktitle: '「vogue」', caption: 'Slide 5/5' },
      ],
        
        'item-G1':[
        { src: 'Images/ALL WORKS/**G_Beroep/beroep_1.webp', artworktitle: '「berope」', caption: 'Slide 1/1' },
      ],

        'item-G2':[
        { src: 'Images/ALL WORKS/**G_FouFow/G_FouFow_0.webp', artworktitle: '「FouFow」', caption: 'Slide 1/5' },
        { src: 'Images/ALL WORKS/**G_FouFow/G_FouFow_1.webp', artworktitle: '「FouFow」', caption: 'Slide 2/5' },
        { src: 'Images/ALL WORKS/**G_FouFow/G_FouFow_2.webp', artworktitle: '「FouFow」', caption: 'Slide 3/5' },
        { src: 'Images/ALL WORKS/**G_FouFow/G_FouFow_4.webp', artworktitle: '「FouFow」', caption: 'Slide 4/5' },
        { src: 'Images/ALL WORKS/**G_FouFow/G_FouFow_5.webp', artworktitle: '「FouFow」', caption: 'Slide 5/5' },
      ],

          'item-G3':[
        { src: 'Images/ALL WORKS/**G_gyoen/gyoen_0.webp', artworktitle: '「gyōen」', caption: 'Slide 1/5' },
        { src: 'Images/ALL WORKS/**G_gyoen/gyoen_1.webp', artworktitle: '「gyōen」', caption: 'Slide 2/5' },
        { src: 'Images/ALL WORKS/**G_gyoen/gyoen_2.webp', artworktitle: '「gyōen」', caption: 'Slide 3/5' },
        { src: 'Images/ALL WORKS/**G_gyoen/gyoen_3.webp', artworktitle: '「gyōen」', caption: 'Slide 4/5' },
        { src: 'Images/ALL WORKS/**G_gyoen/gyoen_4.webp', artworktitle: '「gyōen」', caption: 'Slide 5/5' },
      ],

        'item-G4':[
        { src: 'Images/ALL WORKS/**G_Nick/G_nickposter_0.jpg', artworktitle: '「nick」', caption: 'Slide 1/1' },
      ],

        'item-G5':[
        { src: 'Images/ALL WORKS/**G_parismiki/DM-retro-blue.webp', artworktitle: '「paris miki」', caption: 'Slide 1/2' },
        { src: 'Images/ALL WORKS/**G_parismiki/DM-visioncheck_green.webp', artworktitle: '「paris miki」', caption: 'Slide 2/2' },
      ],

        'item-E22':[
        { src: 'Images/ALL WORKS/**E_TakanoSalad/salad-book-0.jpg', artworktitle: '「salad book」', caption: 'Slide 1/6' },
        { src: 'Images/ALL WORKS/**E_TakanoSalad/salad-book-1.webp', artworktitle: '「salad book」', caption: 'Slide 2/6' },
        { src: 'Images/ALL WORKS/**E_TakanoSalad/salad-book-2.webp', artworktitle: '「salad book」', caption: 'Slide 3/6' },
        { src: 'Images/ALL WORKS/**E_TakanoSalad/salad-book-3.webp', artworktitle: '「salad book」', caption: 'Slide 4/6' },
        { src: 'Images/ALL WORKS/**E_TakanoSalad/salad-book-4.webp', artworktitle: '「salad book」', caption: 'Slide 5/6' },
        { src: 'Images/ALL WORKS/**E_TakanoSalad/salad-book-5.webp', artworktitle: '「salad book」', caption: 'Slide 6/6' },
      ],

      // Add more as needed...
};

  const modal = document.querySelector('.gallery-modal');
  const modalImg = document.querySelector('.gallery-img');
  // const modalCaption = document.querySelector('.gallery-caption');
  const modalArtworkTitle = document.querySelector('.gallery-artworktitle');
  const closeBtn = document.querySelector('.close-button');
  // const leftBtn = document.querySelector('.arrow.left');
  // const rightBtn = document.querySelector('.arrow.right');
  const allItems = document.querySelectorAll('.grid-item');
  const galleryImgContainer = document.querySelector('.gallery-img-container');

  let currentGallery = [];
  let currentIndex = 0;

 // Build thumbnail strip
function buildThumbnails() {
  // Remove any old thumbnails first
  let existingThumbs = galleryImgContainer.querySelector('.thumbnail-strip');
  if (existingThumbs) existingThumbs.remove();

  const thumbStrip = document.createElement('div');
  thumbStrip.className = 'thumbnail-strip';

  currentGallery.forEach((item, idx) => {
  const thumb = document.createElement('img');
  thumb.src = item.src;
  thumb.alt = item.caption || "Thumbnail";
  thumb.className = "gallery-thumb";
  if (idx === currentIndex) thumb.classList.add('active');
  thumb.addEventListener('click', () => {
    currentIndex = idx;
    updateModal();
  });
  thumbStrip.appendChild(thumb);
  });

  galleryImgContainer.appendChild(thumbStrip);
}
// Open gallery by ID
function openGallery(id) {
  currentGallery = galleryData[id];
  if (!currentGallery || !modal) return;

  currentIndex = 0;
  updateModal();
  buildThumbnails();

  modal.classList.add('active');
  console.log("Gallery opened:", id);

  // Trigger close button animation
  if (closeBtn) {
  requestAnimationFrame(() => {
    closeBtn.classList.remove('is-animating');
    void closeBtn.offsetWidth; // force reflow
    closeBtn.classList.add('is-animating');
  });
  }
}
// Update modal content (image, caption, artwork title)
function updateModal() {
  if (!modalImg || !modalArtworkTitle) return;
  // if using the "gallery caption" insert "|| !modalCaption" to the above function conditional
  modalImg.src = currentGallery[currentIndex].src;
  // modalCaption.textContent = currentGallery[currentIndex].caption;
  modalArtworkTitle.textContent = currentGallery[currentIndex].artworktitle;

  // Update active thumbnail
  const thumbs = document.querySelectorAll('.gallery-thumb');
  thumbs.forEach((thumb, i) => {
  thumb.classList.toggle('active', i === currentIndex);
  });
}
// Close button
if (closeBtn) {
  closeBtn.addEventListener('click', () => {
  modal.classList.remove('active');
  closeBtn.classList.remove('is-animating');
  console.log("Gallery modal closed");
  });
}

// Click grid items to open gallery
allItems.forEach(item => {
  const id = item.getAttribute('data-gallery-id');
  if (id) {
  item.addEventListener('click', () => openGallery(id));
  }
});


// SHOW HEADER NAV BAR DELAY
/* Utility to reveal header + grid with configurable outer delay
   - delayMs: how long to wait before starting the reveal
   - keep the per-item micro-stagger (index * 0.03s) always
*/
function scheduleReveal(delayMs = 5200) {
  const run = () => {
    // header
    document.querySelector('#index-header')?.classList.add('active');

    // grid stagger - keep micro stagger but trigger immediately
    const itemsPerRow = 10;
    document.querySelectorAll('.grid-item').forEach((thumb, i) => {
      const indexInRow = i % itemsPerRow;
      // keep the small micro-stagger between items
      thumb.style.animationDelay = `${indexInRow * 0.03}s`;
      // ensure we force a reflow for reliable restart if needed:
      thumb.classList.remove('is-visible');
      void thumb.offsetWidth;
      thumb.classList.add('is-visible');
    });
  };

  if (delayMs > 0) {
    // normal (first visit): wait then run
    setTimeout(run, delayMs);
  } else {
    // return visit: run right away (no outer wait)
    run();
  }
}

/* Decide which delay to use based on session flag set earlier.
   (This matches the logic used for videoPlayed detection.)
*/
const outerDelay = sessionStorage.getItem("videoPlayed") ? 0 : 5200;
scheduleReveal(outerDelay);



// TOP TEXT REVEAL //
const reveals = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
if (entry.isIntersecting) {
  entry.target.classList.add('is-visible');
  io.unobserve(entry.target);
  }
});
}, { threshold: 0.2 });

reveals.forEach(r => io.observe(r));
} 
else {
reveals.forEach(r => r.classList.add('is-visible'));
}



// OVERVIEW SMOOTH SCROLL //
const wrapper = document.getElementById("wrapper");
const content = document.getElementById("content");

let targetScroll1 = 0;

window.addEventListener("wheel", e => {
  e.preventDefault();
  targetScroll1 += e.deltaY;
  targetScroll1 = Math.max(0, Math.min(targetScroll1, content.scrollHeight - wrapper.clientHeight));
}, { passive: false });

function overviewSmoothScroll() {
  wrapper.scrollTop += (targetScroll1 - wrapper.scrollTop) * 0.07;
  requestAnimationFrame(overviewSmoothScroll);
}

requestAnimationFrame(overviewSmoothScroll);

