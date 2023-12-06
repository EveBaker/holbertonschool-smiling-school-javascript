// Quotes Section Carousel
$(document).ready(function() {
    $.ajax({
        url: 'https://smileschool-api.hbtn.info/quotes',
        type: 'GET',
        beforeSend: function() {
            $("#loaderDiv").show();
        },
        success: function(response) {
            $("#loaderDiv").hide();
            for (const i = 0; i < response.length; i++) {
                const $html = $(`
                <div class="carousel-item carousel-item-content ${i === 0 ? 'active' : ''}">
                <div class="row">
                    <div class="col-sm-3 text-center">
                        <img class="rounded-circle" src=${response[i].pic_url} class="d-block w-100" alt="random alt image">
                    </div>
                    <div class="col-sm-8 ml-3 d-flex flex-column">
                        <div>&lt;&lt; ${response[i].text} &gt;&gt;</div>
                        <div class="font-weight-bold mt-3">${response[i].name}</div>
                        <div>${response[i].title}</div>
                    </div>
                </div>
            </div>`);
            $("#carousel").append($html);
            }
        },
    })
});