export const scrollspy = (navbar, _offset) => {
    let sectionScrollTops = {};

    const offset = _offset;
    const activeClass = 'w3-text-red';
    const commonClass = 'w3-bar-item';
    const omitEl = 'btn-home';
    const vrosNavbarEl = document.getElementById(navbar);
    const sections = document.getElementsByClassName('section');
    
    [...sections].forEach((e) => {
        sectionScrollTops[e.id] = e.offsetTop + offset;
    });
    
    addEventListener('scroll', () => {
        const scrollPosition = document.documentElement.scrollTop || document.body.scrollTop;
        
        for(let i in sectionScrollTops) {
            if(sectionScrollTops[i] <= scrollPosition) {
                const btns = vrosNavbarEl.getElementsByClassName(commonClass);
                
                [...btns].forEach((btn) => {
                    btn.classList.contains(activeClass) ? btn.classList.remove(activeClass) : '';
                    btn.getAttribute('id') === `btn-${i}` ? btn.classList.add(activeClass) : '';
                    btn.getAttribute('id') === omitEl ? btn.classList.remove(activeClass) : '';
                    
                });
            }
        }
    });
};
