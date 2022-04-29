let PreloadLogo = document.createElement("img");
PreloadLogo.src = "/img/DDR.png";
delete PreloadLogo;

window.addEventListener("load", () =>
{
    const LogoList = ["/img/logo.png", "/img/DDR.png"];
    const LogoBackgroundColor = ["#007FFF", "red"];
    const Logo = document.querySelector("img.custom-logo-image");
    const LogoBackground = document.querySelector("div.site-brand-container");
    let Next = 1;
    let Mutex = false;
    LogoBackground.addEventListener("mouseenter", () =>
    {
        if (Mutex) return;
        Mutex = true;
        Logo.style.opacity = "0";
        LogoBackground.style.backgroundColor = "black";
        setTimeout(() =>
        {
            Logo.src = LogoList[Next];
            LogoBackground.style.backgroundColor = LogoBackgroundColor[Next];
            Next++;
            if (Next === LogoList.length)
                Next = 0;
            Logo.style.opacity = "1";
            setTimeout(() => { Mutex = false; }, 1000);
        }, 1000);
    });
});