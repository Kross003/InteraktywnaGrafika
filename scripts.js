function clearPageContent(){

}

function WyswietlGalerie(){
    document.getElementById("page_content").innerHTML = '';
    //document.removeChild()
    document.getElementById("page_content").appendChild(gallery);
}

function WyswietlArtykul(){
    document.getElementById("page_content").innerHTML = '';
    document.getElementById("page_content").appendChild(article);
}

function WyswietlGlownyObraz(obraz){
    document.getElementById("gallery_shownPhotoimg").classList.remove("scale-out-horizontal");

    
    var oldPhoto = document.getElementById("gallery_shownPhoto").innerHTML;
    document.getElementById("gallery_shownPhotoimg").setAttribute("src",obraz.firstChild.getAttribute("src"));
    document.getElementById("gallery_photoCaption").innerHTML = obraz.firstChild.getAttribute("alt");
    var newPhoto = document.getElementById("gallery_shownPhoto").innerHTML;
    // var DuzyObraz = document.getElementById("gallery_shownPhotoimg").cloneNode(true);
    // document.getElementById("gallery_shownPhotoimg").setAttribute("hidden");

    var image = obraz.firstChild;
    var targetElement = document.getElementById("gallery_shownPhotoimg");

    var imageRect = image.getBoundingClientRect();
    var targetRect = targetElement.getBoundingClientRect();
    var offsetX = targetRect.left - imageRect.left + (targetRect.right - targetRect.left)/2 - (imageRect.right - imageRect.left)/2;
    var offsetY = targetRect.top - imageRect.top + (targetRect.bottom - targetRect.top)/2 - (imageRect.bottom - imageRect.top)/2;
    image.style.setProperty("--offset-x", offsetX + "px");
    image.style.setProperty("--offset-y", offsetY + "px");

    var scaleX = Math.round((targetRect.right - targetRect.left) / (imageRect.right - imageRect.left)*100)/100;
    var scaleY = Math.round((targetRect.bottom - targetRect.top) / (imageRect.bottom - imageRect.top)*100)/100;
    image.style.setProperty("--scaleX", scaleX);
    image.style.setProperty("--scaleY", scaleY);
    // console.log(`skala x: ${scaleX}, skala y: ${scaleY}`)


    // var shownPhoto = document.getElementById("gallery_shownPhoto").innerHTML;
    // document.getElementById("gallery_shownPhoto").innerHTML = '';
    // document.getElementById("gallery_shownPhoto").style.visibility = "hidden";
    document.getElementById("gallery_shownPhoto").innerHTML = oldPhoto;
    document.getElementById("gallery_shownPhotoimg").classList.add("scale-out-horizontal");

    image.classList.add("move-to-target");
    image.addEventListener("animationend", function() {
        image.classList.remove("move-to-target");
        // document.getElementById("gallery_shownPhoto").style.visibility = "visible";
        document.getElementById("gallery_shownPhotoimg").classList.remove("scale-out-horizontal");
        document.getElementById("gallery_shownPhoto").innerHTML = newPhoto;
    });
    

}
