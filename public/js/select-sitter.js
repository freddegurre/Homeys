$(document).on("click", "#bookSitter", function (){
    event.preventDefault();
    var sitter = $(this).data("sitter");
    console.log("i have been clicked and sitter id" + sitter);
})