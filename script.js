// Quotes Section Carousel
$(document).ready(function() {
    $.ajax({
        url: 'https://smileschool-api.hbtn.info/quotes',
        type: 'get',
        beforeSend: function() {
            $("#loaderDiv").show();
        },
        success: function(response) {
            $("#loaderDiv").hide();
            for (let i = 0; i < response.length; i++) {
                const $html = $(`
                    <div class="carousel-item carousel-item-content ${i === 0 ? 'active' : ''}">
                        <div class="row">
                            <div class="col-sm-3 text-center">
                                <img class="rounded-circle d-block w-100" src="${response[i].pic_url}" alt="Profile picture of ${response[i].name}">
                            </div>
                            <div class="col-sm-8 ml-3 d-flex flex-column">
                                <div>&lt;&lt; ${response[i].text} &gt;&gt;</div>
                                <div class="font-weight-bold mt-3">${response[i].name}</div>
                                <div>${response[i].title}</div>
                            </div>
                        </div>
                    </div>
                `);
                $("#carousel-inner").append($html);
            }
        },
        error: function(xhr, status, error) {
            console.error("Error in AJAX request: " + error);
            $("#loaderDiv").hide();
        }
    });
});

$.ajax({
    url: 'https://smileschool-api.hbtn.info/popular-tutorials',
    type: "get",
    beforeSend: function () {
        $("#VideoLoader").show();
    },
    success: function (response) {
        $("#VideoLoader").hide();
        for (const i = 0; i < response.length; i++) {
            const $stars = '';
            for (const j = 0; j < response[i].star; j++) {
                $stars += '<img src="./images/star_on.png" class="mr-1 carousel-star-icon" alt="star icon filled in purple"  width="15" height="15">';
            }
            for (const j = 0; j < 5 - response[i].star; j++) {
                $stars += '<img src="./images/star_off.png" class="carousel-star-icon" alt="star icon filled in grey"  width="15" height="15">';
            }
            const $html = $(`
        <div class="text-center col-12 col-sm-6 col-md-3">
            <div class="carousel-item active">
                <img class="w-100" src="${response[i].thumb_url}" alt="smile image">
                <img src="/images/play.png" alt="play"  class="play-btn rounded-circle" width="64" height="64">
                <div class="mx-3">
                    <div class="font-weight-bold text-dark text-left mt-3">
                        ${response[i].title}
                    </div>
                    <div class="text-secondary text-left mt-3 mb-3">
                        ${response[i]["sub-title"]}
                    </div>
                    <div class="d-flex align-items-center mb-3">
                        <img src="${response[i].author_pic_url}" class="rounded-circle mr-3 video-carousel-img-profile" alt="profile image"  width="30" height="30">
                        <div class="purple-text font-weight-bold">${response[i].author}</div>
                    </div>
                    <div class="d-flex justify-content-between">
                        <div class="d-flex pt-1">
                        ${$stars}
                        </div>
                        <div class="purple-text font-weight-bold">
                            ${response[i].duration}
                        </div>
                    </div>
                </div>
            </div>
        </div>`);
            $("#tutorial").append($html);
        }
    },
});