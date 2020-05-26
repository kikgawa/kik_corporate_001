let burger = document.getElementById("burger");

burger.addEventListener("click", e => {
  e.preventDefault();
  document.body.classList.toggle("open");
  burger.classList.toggle("open");
});

$(function() {
  var imgHeight = $(".jumbotron").outerHeight(); //画像の高さを取得。これがイベント発火位置になる。
  var header = $(".global-header-desktop"); //ヘッダーコンテンツ

  $(window).on("load scroll", function() {
    if ($(window).scrollTop() < imgHeight) {
      header.removeClass("header-black");
    } else {
      header.addClass("header-black");
    }
    console.log(imgHeight);
  });
});
