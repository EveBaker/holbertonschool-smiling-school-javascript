// Quotes Section Carousel
$(document).ready(function() {
  $.ajax({
      url: 'https://smileschool-api.hbtn.info/quotes',
      type: 'GET',
      beforeSend: function() {
          $("#loaderDiv").show();
      },
      success: function(request) {
          $("#loaderDiv").hide();
          for (let i = 0; i < request.length; i++) {
              let $html = $(`
              <div class="carousel-item carousel-item-content ${i === 0 ? 'active' : ''}">
                  <div class="row">
                      <div class="col-sm-3 text-center">
                          <img class="rounded-circle d-block w-100" src="${request[i].pic_url}" alt="Profile Image">
                      </div>
                      <div class="col-sm-8 ml-3 d-flex flex-column">
                          <div>&lt;&lt; ${request[i].text} &gt;&gt;</div>
                          <div class="font-weight-bold mt-3">${request[i].name}</div>
                          <div>${request[i].title}</div>
                      </div>
                  </div>
              </div>`);
              $("#carousel-inner").append($html);
          }
      },
      error: function(error) {
          console.log("Error: ", error);
          $("#loaderDiv").hide();
      }
  });
});



$.ajax({
  url: 'https://smileschool-api.hbtn.info/popular-tutorials',
  type: 'GET',
  beforeSend: function() {
      $("#VideoLoader").show();
  },
  success: function(request) {
      $("#VideoLoader").hide();
      for (let i = 0; i < request.length; i++) {
          let $reviewstars = "";
          for (let j = 0; j < request[i].star; j++) {
              $reviewstars += '<img src="./images/star_on.png" class="mr-1 carousel-star-icon" alt="review start purple">';
          }
          for (let j = request[i].star; j < 5; j++) {
              $reviewstars += '<img src="./images/star_off.png" class="carousel-star-icon" alt="review star gray">';
          }
          let $html = $(`
              <div class="carousel-item ${i === 0 ? 'active' : ''}">
                  <div class="text-center col-12 col-sm-6 col-md-3">
                      <img class="w-100" src="${request[i].thumb_url}" alt="smile image">
                      <div class="mx-3">
                          <div class="font-weight-bold text-dark text-left mt-3">
                              ${request[i].title}
                          </div>
                          <div class="text-secondary text-left mt-3 mb-3">
                              ${request[i]["sub-title"]}
                          </div>
                          <div class="d-flex align-items-center mb-3">
                              <img src="${request[i].author_pic_url}" class="rounded-circle mr-3 video-carousel-img-profile" alt="profile image">
                              <div class="purple-text font-weight-bold">${request[i].author}</div>
                          </div>
                          <div class="d-flex justify-content-between">
                              <div class="d-flex pt-1">
                                  ${$reviewstars}
                              </div>
                              <div class="purple-text font-weight-bold">
                                  ${request[i].duration}
                              </div>
                          </div>
                      </div>
                  </div>
              </div>`);
          $("#tutorial").append($html);
      }
  },
});


$.ajax({
    url: 'https://smileschool-api.hbtn.info/latest-videos',
    type: "get",
    beforeSend: function() {
      $("#myloader").show(); // Show the loader before making the request
    },
    success: function(response) {
      $("#myloader").hide();
      for (let i = 0; i < response.length; i++) {
        let $card_stars = '';
        let $play_button = '<img src="images/play.png" class="play-btn1" alt="..."   width="64" height="64">';
        for (let j = 0; j < response[i].star; j++) {
          $card_stars += '<img src="images/star_on.png" class=" star-size mr-1" alt="..." width="15" height="15">';
        }
        for (let j = 0; j < 5 - response[i].star; j++) {
          $card_stars += '<img src="images/star_off.png" class=" star-size" alt="..." width="15" height="15">';
        }
        let $html = $(`
          <div class="text-center col-12 col-sm-6 col-md-3">
            <div class="carousel-item active">
              <img class="w-100" src="${response[i].thumb_url}" alt="">
              <div class="mx-3">
                <div class="font-weight-bold text-dark text-left mt-3">
                  ${response[i].title}
                </div>
                <div class="text-secondary text-left mt-3 mb-3">
                  ${response[i]["sub-title"]}
                </div>
                <div class="">
                  ${$play_button}
                  <img src="${response[i].author_pic_url}" class="carousel-img rounded-circle mr-3" alt="..."   width="30" height="30">
                  <div class="pink-text font-weight-bold">${response[i].author}</div>
                </div>
                <div class="d-flex justify-content-between mb-5">
                  <div class="d-flex pt-1">
                    ${$card_stars}
                  </div>
                  <div class="purple-text font-weight-bold">
                    ${response[i].duration}
                  </div>
                </div>
              </div>
            </div>
          </div>`);
        $("#latestvideos").append($html);
      }
    }
  });
  
  $.ajax({
    url: 'https://smileschool-api.hbtn.info/courses',
    type: 'GET',
    data: {
      action: 'query',
      list: 'search',
      format: 'json',
      // q: '',
      // topic: 'all',
      // sort: 'most_viewed',
    },
    beforeSend: function() {
  $("#CoursesLoader").show();
},
    success: function(request) {
      $("#CoursesLoader").hide();
      let $t = request.topics;
        $("#topic-menu-container").append(`<button class="btn btn-secondary border-0 rounded-0 search-element w-100 text-left" type="button" id="current-topic" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          ${$t[0].substr(0,1).toUpperCase()+ $t[0].substr(1)}
        </button>
        <div class="dropdown-menu" id="topic-menu" aria-labelledby="topic-menu-container"></div>`);
      let $topics = '';
      for (let i = 0; i < $t.length; i++) {
        $topics += `<button data-value="${$t[i]}" class="dropdown-item" type="button">${$t[i].substr(0,1).toUpperCase()+ $t[i].substr(1)}</button>`;
      }
      $("#topic-menu").append($topics);


      let $s = request.sorts;
        $("#sort-menu-container").append(`<button class="btn btn-secondary border-0 rounded-0 search-element w-100 text-left" type="button" id="current-sort" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          ${$s[0].substr(0,1).toUpperCase()+ $s[0].substr(1,3) + ' ' + $s[0].substr(5,1).toUpperCase() + $s[0].substr(6)}
        </button>
        <div class="dropdown-menu" id="sort-menu" aria-labelledby="sort-menu-container"></div>`);
      let $sorts = '';
      for (let i = 0; i < $s.length; i++) {
        $sorts += `<button data-value="${$s[i]}" class="dropdown-item" type="button">${$s[i].substr(0,1).toUpperCase()+ $s[i].substr(1,3) + ' ' + $s[i].substr(5,1).toUpperCase() + $s[i].substr(6)}</button>`;
      }
      $("#sort-menu").append($sorts);
      $.displayCourses('', $('#current-topic').text().trim(), $('#current-sort').text().trim());

      let $topicVal;
      $('#topic-menu button').click(function(e) {
        $topicVal = e.target.getAttribute('data-value');
        $('#current-topic').text(e.target.textContent);
        $.displayCourses($("#user_search").val(), $('#current-topic').text().trim(), $('#current-sort').text().trim());
        console.log($("#user_search").val());
      });
      $('#sort-menu button').click(function(e) {
        $topicVal = e.target.getAttribute('data-value');
        $('#current-sort').text(e.target.textContent);
        $.displayCourses($("#user_search").val(), $('#current-topic').text().trim(), $('#current-sort').text().trim());
      });
      $('#user_search').on('input', function(e) {
        setTimeout(function() {
          $.displayCourses($("#user_search").val(), $('#current-topic').text().trim(), $('#current-sort').text().trim());
        }, 500);
      });

    }
  });

  $.displayCourses = function($q, $t, $s) {
    $.ajax({
          url: 'https://smileschool-api.hbtn.info/courses',
          type: 'GET',
          data: {
            action: 'query',
            list: 'search',
            format: 'json',
            q: $q,
            topic: $t,
            sort: $s,
          },
          beforeSend: function() {
        $("#CoursesLoader").show();
      },
          success: function(request) {
            $("#CoursesLoader").hide();
            let $c = request.courses;
            $("#coursesvideos").empty();
            $("#numberofvideos").text(`${$c.length === 1 ? '1 video' : $c.length + ' videos'}`);
            for (let i = 0; i < $c.length; i++) {
              let $stars = '';
              for (let j = 0; j < $c[i].star; j++) {
                $stars += '<img src="./images/star_on.png" class="mr-1 carousel-star-icon" alt="star icon filled in purple">';
              }
              for (let j = 0; j < 5 - $c[i].star; j++) {
                $stars += '<img src="./images/star_off.png" class="carousel-star-icon" alt="star icon filled in grey">';
              }
              let $html = $(`
                  <div class="text-center col-12 col-sm-6 col-md-3">
                      <div class="carousel-item active">
                          <img class="w-100" src="${$c[i].thumb_url}" alt="smile image">
                          <div class="mx-3">
                              <div class="font-weight-bold text-dark text-left mt-3">
                                  ${$c[i].title}
                              </div>
                              <div class="text-secondary text-left mt-3 mb-3">
                                  ${$c[i]["sub-title"]}
                              </div>
                              <div class="d-flex align-items-center mb-3">
                                  <img src="${$c[i].author_pic_url}" class="rounded-circle mr-3 video-carousel-img-profile" alt="profile image">
                                  <div class="purple-text font-weight-bold">${$c[i].author}</div>
                              </div>
                              <div class="d-flex justify-content-between">
                                  <div class="d-flex pt-1">
                                  ${$stars}
                                  </div>
                                  <div class="purple-text font-weight-bold">
                                      ${$c[i].duration}
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>`);
                  $("#coursesvideos").append($html);
                }
            }
        });
    }