// Partial component names for creating tab
export const TABLINK = "TabLink";
export const TABPANEL = "TabPanel";
export const TABLINKBORDERBOTTOM = "TabLinkBorderBottom";

const getLinksAndPanels = (tabId) => {
    const tab = document.getElementById(tabId);
    const tabLinks = tab.getElementsByClassName(`${tabId}-link`);
    const tabPanels = tab.getElementsByClassName(`${tabId}-panel`);

    return {tabLinks, tabPanels};
};

const setBorderTabActiveLink = (tabLinks, tabPanelId) => {
    [...tabLinks].forEach((tabLink) => {
        const classList = tabLink.firstElementChild.classList;
        
        if(classList.contains("w3-border-red")) {
            classList.remove("w3-border-red");
        }

        document.getElementById(`${tabPanelId}-link`).firstElementChild.classList.add("w3-border-red");
    });
};

const setMainTabActiveLink = (tabLinks, tabPanelId) => {
    [...tabLinks].forEach((tabLink) => {
        const LinlClassList = tabLink.classList;
            
        if(LinlClassList.contains("w3-red")) {
            LinlClassList.remove("w3-red");
        }
    });

    document.getElementById(`${tabPanelId}-link`).classList.add("w3-red");
};

const setActivePanel = (tabPanels, tabPanelId) => {
    [...tabPanels].forEach((tabPanel) => {
        const PanelClassList = tabPanel.classList;
        
        if(PanelClassList.contains('show')) {
            PanelClassList.remove('show');
            PanelClassList.add('hide');
        }
    });

    const activePanelClassList = document.getElementById(tabPanelId).classList;
    activePanelClassList.remove('hide');
    activePanelClassList.add('show');
};

export const openBorderTab = (tabId, tabPanelId) => {
    const {tabLinks, tabPanels} = getLinksAndPanels(tabId);
    
    setBorderTabActiveLink(tabLinks, tabPanelId);
    setActivePanel(tabPanels, tabPanelId);
};

export const openMainTab = (tabId, tabPanelId) => {
    const {tabLinks, tabPanels} = getLinksAndPanels(tabId);
    
    setMainTabActiveLink(tabLinks, tabPanelId);
    setActivePanel(tabPanels, tabPanelId);
};

export const toggleSidebar = (elementId, marginLeft) => {
    const slidebarEl = document.getElementById(elementId);

    if(slidebarEl.firstElementChild.style.display === "none") {
        slidebarEl.firstElementChild.style.display = "block";
        slidebarEl.lastElementChild.style.marginLeft = `${marginLeft}px`;
    } else {
        slidebarEl.firstElementChild.style.display = "none";
        slidebarEl.lastElementChild.style.marginLeft = '0px';
    }
        
};

export const toLowerCaseAndDash = (str) => {
    return str.trim().replace(/\s+/g, '-').toLowerCase();
}