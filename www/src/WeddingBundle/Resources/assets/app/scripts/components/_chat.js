$(function() {
    console.log("chatbox");
    $(".box-header").on('click', (e) => {
        $(e.currentTarget).closest("div.box-wrapper").toggleClass("box-closed");
    });
});