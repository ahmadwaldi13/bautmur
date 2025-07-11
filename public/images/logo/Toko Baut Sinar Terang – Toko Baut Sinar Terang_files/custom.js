jQuery(document).ready(function($) {
    // Cegah penerjemahan di judul halaman (title)
    let originalTitle = document.title;
    setInterval(function() {
        if (document.title !== originalTitle) {
            document.title = originalTitle; // Selalu kembalikan ke aslinya
        }
    }, 500);

//     $("body *").contents().each(function() {
//         if (this.nodeType === 3 && this.nodeValue.includes("Sinar Terang")) {
//             $(this).wrap('<span class="notranslate"></span>');
//         }
//     });

    // Pastikan Google Translate tetap bisa digunakan dengan menghindari elemen terlarang
    $(".goog-te-menu-value, .goog-te-gadget, #google_translate_element").removeClass("notranslate");
});
