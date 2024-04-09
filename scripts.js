function WyswietlGalerie(){
    document.getElementById("page_content").innerHTML = '';
    document.getElementById("page_content").appendChild(gallery);
}

function WyswietlArtykul(){
    document.getElementById("page_content").innerHTML = '';
    document.getElementById("page_content").appendChild(article);
}

function WyswietlGlownyObraz(obraz){
    var image = obraz.firstChild;
    image.classList = "";
    document.getElementById("gallery_shownPhotoimg").classList = "";

    
    var oldPhoto = document.getElementById("gallery_shownPhoto").innerHTML;
    document.getElementById("gallery_shownPhotoimg").setAttribute("src",obraz.firstChild.getAttribute("src"));
    document.getElementById("gallery_photoCaption").innerHTML = obraz.firstChild.getAttribute("alt");
    var newPhoto = document.getElementById("gallery_shownPhoto").innerHTML;
    // var DuzyObraz = document.getElementById("gallery_shownPhotoimg").cloneNode(true);
    // document.getElementById("gallery_shownPhotoimg").setAttribute("hidden");

    
    var targetElement = document.getElementById("gallery_shownPhotoimg");

    var imageRect = image.getBoundingClientRect();
    var targetRect = targetElement.getBoundingClientRect();
    var offsetX = targetRect.left - imageRect.left + (targetRect.right - targetRect.left)/2 - (imageRect.right - imageRect.left)/2;
    var offsetY = targetRect.top - imageRect.top + (targetRect.bottom - targetRect.top)/2 - (imageRect.bottom - imageRect.top)/2;
    image.style.setProperty("--offset-x", offsetX + "px");
    image.style.setProperty("--offset-y", offsetY + "px");

    var scaleX = targetRect.width / imageRect.width*1.03;
    var scaleY = targetRect.height / imageRect.height*1.03;
    image.style.setProperty("--scaleX", scaleX);
    image.style.setProperty("--scaleY", scaleY);
    // console.log(`skala x: ${scaleX}, skala y: ${scaleY}`)


    // var shownPhoto = document.getElementById("gallery_shownPhoto").innerHTML;
    // document.getElementById("gallery_shownPhoto").innerHTML = '';
    // document.getElementById("gallery_shownPhoto").style.visibility = "hidden";
    document.getElementById("gallery_shownPhoto").innerHTML = oldPhoto;
    document.getElementById("gallery_shownPhotoimg").classList.add("scale-out-horizontal");

    image.classList.add("move-to-target");
    image.addEventListener("animationend", function outerAnimationEndHandler() {
    image.removeEventListener("animationend", outerAnimationEndHandler);
    image.classList.remove("move-to-target");
    document.getElementById("gallery_shownPhotoimg").classList.remove("scale-out-horizontal");
    document.getElementById("gallery_shownPhoto").innerHTML = newPhoto;
    const animacja = ["scale-out-horizontal-reverse","fade-in-bck","rotate-in-center"]
    image.classList.add(animacja[Math.floor(Math.random()*3)]);
    image.addEventListener("animationend", function innerAnimationEndHandler() {
        image.classList = "";
        image.style.animation = "";
        image.removeEventListener("animationend", innerAnimationEndHandler);
    });
});

}
function WyswietlCanvas(){
    document.getElementById("page_content").innerHTML = '';
    document.getElementById("page_content").appendChild(canvas);
}