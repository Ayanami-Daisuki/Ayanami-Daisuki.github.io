let ForceAutoplay = (Event) =>
{
    Event.preventDefault();
    Event.stopPropagation();
    window.removeEventListener("keydown", ForceAutoplay);
    window.removeEventListener("click", ForceAutoplay);
    document.querySelector("div.aplayer-button.aplayer-play").click();
    ForceAutoplay = null;
};

window.addEventListener("keydown", ForceAutoplay);
window.addEventListener("click", ForceAutoplay);