// Quotes Section Carousel
$(document).ready(function() {
    $.ajax({
        url: 'https://smileschool-api.hbtn.info/quotes',
        type: 'GET',
        beforeSend: function() {
            $("#MyLoader").show();
        },
        success: function(request) {
            $("MyLoader").hide();
            for (const i = 0; i < request.length; i++) {
                const $html = $()
            }
        }
    })
})