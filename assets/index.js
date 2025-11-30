
var selector = document.querySelector(".selector_box");
selector.addEventListener('click', () => {
    if (selector.classList.contains("selector_open")){
        selector.classList.remove("selector_open")
    }else{
        selector.classList.add("selector_open")
    }
})

document.querySelectorAll(".date_input").forEach((element) => {
    element.addEventListener('click', () => {
        document.querySelector(".date").classList.remove("error_shown")
    })
})

var sex = "m"

document.querySelectorAll(".selector_option").forEach((option) => {
    option.addEventListener('click', () => {
        sex = option.id;
        document.querySelector(".selected_text").innerHTML = option.innerHTML;
    })
})

var upload = document.querySelector(".upload");

var imageInput = document.createElement("input");
imageInput.type = "file";
imageInput.accept = ".jpeg,.png,.gif";

document.querySelectorAll(".input_holder").forEach((element) => {

    var input = element.querySelector(".input");
    input.addEventListener('click', () => {
        element.classList.remove("error_shown");
    })

});

upload.addEventListener('click', () => {
    imageInput.click();
    upload.classList.remove("error_shown")
});

imageInput.addEventListener('change', (event) => {

    upload.classList.remove("upload_loaded");
    upload.classList.add("upload_loading");

    upload.removeAttribute("selected")

    var file = imageInput.files[0];
    if (!file) {
        upload.classList.remove("upload_loading");
        return;
    }

    // Sprawdź czy plik jest obrazem
    if (!file.type.match('image.*')) {
        upload.classList.remove("upload_loading");
        upload.classList.add("error_shown");
        return;
    }

    // Użyj FileReader do konwersji obrazu na base64
    var reader = new FileReader();
    
    reader.onload = function(e) {
        try {
            var url = e.target.result; // base64 data URL
            
            if (!url || url.length === 0) {
                throw new Error("Nie udało się odczytać obrazu");
            }
            
            console.log("Zdjęcie załadowane pomyślnie, rozmiar:", url.length, "znaków");
            
            upload.classList.remove("error_shown");
            upload.setAttribute("selected", url);
            upload.classList.add("upload_loaded");
            upload.classList.remove("upload_loading");
            
            var uploadedImg = upload.querySelector(".upload_uploaded");
            if (uploadedImg) {
                uploadedImg.src = url;
            }
            
            console.log("Atrybut 'selected' ustawiony:", upload.hasAttribute("selected"));
        } catch (error) {
            upload.classList.remove("upload_loading");
            upload.classList.add("error_shown");
            console.error("Błąd podczas przetwarzania zdjęcia:", error);
        }
    };
    
    reader.onerror = function(error) {
        // Błąd podczas odczytu pliku
        upload.classList.remove("upload_loading");
        upload.classList.add("error_shown");
        console.error("Błąd podczas odczytu pliku:", error);
    };
    
    reader.onabort = function() {
        // Użytkownik przerwał odczyt
        upload.classList.remove("upload_loading");
    };
    
    // Odczytaj plik jako data URL (base64)
    try {
        reader.readAsDataURL(file);
    } catch (error) {
        upload.classList.remove("upload_loading");
        upload.classList.add("error_shown");
        console.error("Błąd podczas rozpoczynania odczytu pliku:", error);
    }

})

document.querySelector(".go").addEventListener('click', () => {

    var empty = [];

    var params = new URLSearchParams();

    params.set("sex", sex)
    
    // Sprawdź czy zdjęcie jest wybrane i załadowane
    var imageUrl = upload.getAttribute("selected");
    if (!imageUrl || imageUrl.length === 0 || upload.classList.contains("upload_loading")){
        empty.push(upload);
        upload.classList.add("error_shown");
        if (upload.classList.contains("upload_loading")) {
            console.log("Zdjęcie jest w trakcie ładowania, proszę poczekać...");
        } else {
            console.log("Zdjęcie nie zostało wybrane");
        }
    }else{
        // Zapisz zdjęcie do localStorage zamiast przekazywać przez URL (URL ma limit długości)
        localStorage.setItem("userImage", imageUrl);
        console.log("Zdjęcie zapisane do localStorage");
    }

    var birthday = "";
    var dateEmpty = false;
    document.querySelectorAll(".date_input").forEach((element) => {
        birthday = birthday + "." + element.value
        if (isEmpty(element.value)){
            dateEmpty = true;
        }
    })

    birthday = birthday.substring(1);

    if (dateEmpty){
        var dateElement = document.querySelector(".date");
        dateElement.classList.add("error_shown");
        empty.push(dateElement);
    }else{
        params.set("birthday", birthday)
    }

    document.querySelectorAll(".input_holder").forEach((element) => {

        var input = element.querySelector(".input");

        if (isEmpty(input.value)){
            empty.push(element);
            element.classList.add("error_shown");
        }else{
            params.set(input.id, input.value)
        }

    })

    if (empty.length != 0){
        empty[0].scrollIntoView();
    }else{

        forwardToId(params);
    }

});

function isEmpty(value){

    let pattern = /^\s*$/
    return pattern.test(value);

}

function forwardToId(params){

    location.href = "id.html?" + params

}

var guide = document.querySelector(".guide_holder");
guide.addEventListener('click', () => {

    if (guide.classList.contains("unfolded")){
        guide.classList.remove("unfolded");
    }else{
        guide.classList.add("unfolded");
    }

})











































































































































































































































































































































