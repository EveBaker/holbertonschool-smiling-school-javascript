// Quotes Section Carousel
$(document).ready(function() {
    $.ajax({
        url: 'https://smileschool-api.hbtn.info/quotes',
        type: 'GET',
        beforeSend: function() {
            $("#MyLoader").show();
        }
    })
})