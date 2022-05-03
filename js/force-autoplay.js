let ForceAutoplay = (Event) =>
{
    window.removeEventListener("keydown", ForceAutoplay);
    window.removeEventListener("click", ForceAutoplay);
    document.querySelector("div.aplayer-button.aplayer-play").click();
};

window.addEventListener("load", () =>
{
    window.addEventListener("keydown", ForceAutoplay);
    window.addEventListener("click", ForceAutoplay);
});