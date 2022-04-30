/* 全局禁止右键菜单 */
const ForbidContextMenu = (Event) =>
{
    Event.preventDefault();
    Event.stopPropagation();
};
window.addEventListener("contextmenu", ForbidContextMenu);


/* 全局禁止拖动元素 */
window.addEventListener("dragstart", (Event) =>
{
    Event.preventDefault();
    Event.stopPropagation();
});


/* 右下角斯卡蒂 */
const Skadi = document.createElement("div");
Skadi.id = "SkadiCorner";
Skadi.addEventListener("click", () =>
{
    let Now = Number.parseFloat(document.documentElement.scrollTop);
    let Index = 25;
    let temp = setInterval(() =>
    {
        Now -= Index;
        Index += 25;
        if (Now <= 0) clearInterval(temp);
        document.documentElement.scrollTop = Now;
    }, 20);
});


/* 斯卡蒂 webp */
const SkadiWebp = document.createElement("img");
SkadiWebp.className = "SkadiWebp";
SkadiWebp.style.display = "none";

/* 请稍等 */
const PleaseWaitForSkadi = document.createElement("h1");
PleaseWaitForSkadi.className = "SkadiWebp";
PleaseWaitForSkadi.innerText = "加载中";


/* 回到顶部 */
const BackToTop = document.createElement("div");
BackToTop.innerText = "回到顶部";
BackToTop.id = "BackToTop";


/* 插入子元素 */
Skadi.appendChild(SkadiWebp);
Skadi.appendChild(PleaseWaitForSkadi);
Skadi.appendChild(BackToTop);

/* 网页整体背景列表以及当前展示的下标 */
const BackgroundImageList = ["/img/bg0.jpg", "/img/bg1.jpg"];
let NowBackgroundImage = Math.floor(Math.random() * 2);
let PreloadBackgroundImage = document.createElement("img");
PreloadBackgroundImage.src = "/img/bg0.jpg";
PreloadBackgroundImage.src = "/img/bg1.jpg";
delete PreloadBackgroundImage;

/* 自定义右键菜单 */
const Menu = document.createElement("div");
Menu.id = "Menu";
Menu.style.display = "none";


/* 菜单列表 */
const List = document.createElement("ul");
List.id = "List";


/* 菜单列表选项 */

let ListElement = document.createElement("li");
ListElement.className = "ListElement";
ListElement.innerText = "禁用点击特效";
ListElement.style.borderBottom = "1px solid black"
let ClickEffectEnable = true;
ListElement.addEventListener("click", function ()
{
    if (ClickEffectEnable)
    {
        ClickEffectEnable = false;
        this.innerText = "启用点击特效";
        window.removeEventListener("mousedown", GlobalClickEffect);
    }
    else
    {
        ClickEffectEnable = true;
        this.innerText = "禁用点击特效";
        window.addEventListener("mousedown", GlobalClickEffect);
    }
});
List.appendChild(ListElement);

ListElement = document.createElement("li");
ListElement.className = "ListElement";
ListElement.innerText = "召唤斯卡蒂";
let SkadiIsShown = false;
let FirstLoadSkadi = true;
ListElement.addEventListener("click", function ()
{
    if (SkadiIsShown)
    {
        SkadiIsShown = false;
        this.innerText = "召唤斯卡蒂";
        document.body.removeChild(Skadi);
    }
    else
    {
        SkadiIsShown = true;
        this.innerText = "隐藏斯卡蒂";
        document.body.appendChild(Skadi);
        if (FirstLoadSkadi)
        {
            FirstLoadSkadi = false;
            SkadiWebp.src = "/img/skadi.webp";
            SkadiWebp.addEventListener("load", () =>
            {
                Skadi.removeChild(PleaseWaitForSkadi);
                SkadiWebp.style.display = "inline-block";
            });
        }
        else document.body.appendChild(Skadi);
    }
});
List.appendChild(ListElement);

ListElement = document.createElement("li");
ListElement.className = "ListElement";
ListElement.innerText = "斯卡蒂跟随";
ListElement.style.borderBottom = "1px solid black"
let SkadiIsFollow = false;
function SkadiFollowMouse(Event)
{
    Skadi.style.left = Event.clientX - 30 + "px";
    Skadi.style.top = Event.clientY - 30 + "px";
}
ListElement.addEventListener("click", function (Event)
{
    if (SkadiIsFollow)
    {
        SkadiIsFollow = false;
        this.innerText = "斯卡蒂跟随";
        Skadi.appendChild(BackToTop);
        Skadi.id = "SkadiCorner";
        window.removeEventListener("mousemove", SkadiFollowMouse);
        Skadi.style.inset = "";
        Skadi.style.right = "0";
        Skadi.style.bottom = "0";
    }
    else
    {
        SkadiIsFollow = true;
        this.innerText = "取消斯卡蒂跟随";
        Skadi.id = "SkadiFollow";
        Skadi.removeChild(BackToTop);
        window.addEventListener("mousemove", SkadiFollowMouse);
        Skadi.style.left = Event.clientX - 30 + "px";
        Skadi.style.top = Event.clientY - 30 + "px";
    }

});
List.appendChild(ListElement);

ListElement = document.createElement("li");
ListElement.className = "ListElement";
ListElement.innerText = "切换背景";
ListElement.addEventListener("click", () =>
{
    if (NowBackgroundImage === 1)
        NowBackgroundImage = 0;
    else
        NowBackgroundImage = 1;
    document.body.style.backgroundImage = `url(${BackgroundImageList[NowBackgroundImage]})`;
});
List.appendChild(ListElement);




/* 选项插入至菜单列表 */
Menu.appendChild(List);


/* 启用自定义菜单 */
window.addEventListener("load", () =>
{
    document.body.appendChild(Menu);
    document.body.style.backgroundImage = `url(${BackgroundImageList[NowBackgroundImage]})`;
    window.addEventListener("contextmenu", (Event) =>
    {
        Event.preventDefault();
        Event.stopPropagation();
        Menu.style.left = Event.clientX + "px";
        Menu.style.top = Event.clientY + "px";
        Menu.style.display = "inline-block";
        Menu.style.opacity = "1";
    });
    window.addEventListener("click", () =>
    {
        Menu.style.opacity = "0";
        setTimeout(() => { Menu.style.display = "none"; }, 250);
    });
    window.removeEventListener("contextmenu", ForbidContextMenu);
});