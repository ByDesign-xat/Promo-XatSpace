!(function () {
  ($(document).ready(function () {
    setTimeout(function () {
      $(".jd-load-xatspace").animate({ opacity: "0", "z-index": "-1" }, 500);
    }, 5000);
  }),
    VanillaTilt.init(document.querySelectorAll(".jd-item-menu"), {
      max: 25,
      speed: 400,
    }));
  var home = !0,
    about = !1,
    friend = !1,
    video = !1,
    love = !1;
  function removeMenu() {
    ($("#btn-one").animate({ top: "-150vh" }, 500),
      setTimeout(function () {
        ($("#btn-two").animate({ top: "-150vh" }, 500),
          setTimeout(function () {
            ($("#btn-tree").animate({ top: "-150vh" }, 500),
              setTimeout(function () {
                $("#btn-four").animate(
                  { top: "-150vh" },
                  {
                    duration: 500,
                    complete: function () {
                      (setTimeout(function () {
                        $(".jd-item-menu").css({ top: "150vh" });
                      }, 500),
                        $(".jd-btn-menu").addClass("show"));
                    },
                  },
                );
              }, 100));
          }, 100));
      }, 100));
  }
  function addMenu() {
    ($("#btn-one").animate({ top: "0" }, 500),
      setTimeout(function () {
        ($("#btn-two").animate({ top: "0" }, 500),
          setTimeout(function () {
            ($("#btn-tree").animate({ top: "0" }, 500),
              setTimeout(function () {
                $("#btn-four").animate({ top: "0" }, 500);
              }, 100));
          }, 100),
          $(".jd-btn-menu").removeClass("show"));
      }, 100));
  }
  ($(".jd-item-menu").each(function () {
    $(this).on("click", function () {
      removeMenu();
      var page = $(this).attr("data-page");
      setTimeout(function () {
        switch (page) {
          case "about":
            ((home = !1),
              1 == (about = !0) && $("#about").animate({ left: "50%" }, 500));
            break;
          case "friend":
            ((home = !1),
              1 == (friend = !0) && $("#friend").animate({ left: "50%" }, 500));
            break;
          case "video":
            ((home = !1),
              1 == (video = !0) && $("#video").animate({ left: "50%" }, 500));
            break;
          case "love":
            ((home = !1),
              1 == (love = !0) && $("#love").animate({ left: "50%" }, 500));
        }
      }, 500);
    });
  }),
    $(".jd-btn-close").each(function () {
      $(this).on("click", function () {
        var page = $(this).attr("data-page");
        switch (
          ($(".jd-menu-footer").removeClass("show"),
          $(".jd-bar").removeClass("close"),
          page)
        ) {
          case "about":
            1 == about &&
              ((about = !1),
              $("#about").animate(
                { left: "150vw" },
                {
                  duration: 500,
                  complete: function () {
                    ($("#about").css({ left: "-150%" }),
                      addMenu(),
                      (home = !0));
                  },
                },
              ));
            break;
          case "video":
            1 == video &&
              ((video = !1),
              $("#video").animate(
                { left: "150vw" },
                {
                  duration: 500,
                  complete: function () {
                    ($("#video").css({ left: "-150%" }),
                      addMenu(),
                      (home = !0));
                  },
                },
              ));
            break;
          case "friend":
            1 == friend &&
              ((friend = !1),
              $("#friend").animate(
                { left: "150vw" },
                {
                  duration: 500,
                  complete: function () {
                    ($("#friend").css({ left: "-150%" }),
                      addMenu(),
                      (home = !0));
                  },
                },
              ));
            break;
          case "love":
            1 == love &&
              ((love = !1),
              $("#love").animate(
                { left: "150vw" },
                {
                  duration: 500,
                  complete: function () {
                    ($("#love").css({ left: "-150%" }), addMenu(), (home = !0));
                  },
                },
              ));
        }
      });
    }),
    $(".jd-item-menu-footer").each(function () {
      $(this).on("click", function () {
        var page;
        switch ($(this).attr("data-page")) {
          case "home":
            (0 == home &&
              1 == about &&
              $("#about").animate(
                { left: "150vw" },
                {
                  duration: 500,
                  complete: function () {
                    (addMenu(),
                      $("#about").css({ left: "-150%" }),
                      $(".jd-menu-footer").removeClass("show"),
                      $(".jd-bar").removeClass("close"),
                      (home = !0),
                      (about = !1));
                  },
                },
              ),
              0 == home &&
                1 == friend &&
                $("#friend").animate(
                  { left: "150vw" },
                  {
                    duration: 500,
                    complete: function () {
                      (addMenu(),
                        $("#friend").css({ left: "-150%" }),
                        $(".jd-menu-footer").removeClass("show"),
                        $(".jd-bar").removeClass("close"),
                        (home = !0),
                        (friend = !1));
                    },
                  },
                ),
              0 == home &&
                1 == video &&
                $("#video").animate(
                  { left: "150vw" },
                  {
                    duration: 500,
                    complete: function () {
                      (addMenu(),
                        $("#video").css({ left: "-150%" }),
                        $(".jd-menu-footer").removeClass("show"),
                        $(".jd-bar").removeClass("close"),
                        (home = !0),
                        (video = !1));
                    },
                  },
                ),
              0 == home &&
                1 == love &&
                $("#love").animate(
                  { left: "150vw" },
                  {
                    duration: 500,
                    complete: function () {
                      (addMenu(),
                        $("#love").css({ left: "-150%" }),
                        $(".jd-menu-footer").removeClass("show"),
                        $(".jd-bar").removeClass("close"),
                        (home = !0),
                        (love = !1));
                    },
                  },
                ));
            break;
          case "about":
            (0 == about &&
              1 == friend &&
              $("#friend").animate(
                { left: "150vw" },
                {
                  duration: 500,
                  complete: function () {
                    ($("#friend").css({ left: "-150%" }),
                      $("#about").animate({ left: "50%" }, 500),
                      (about = !0),
                      (friend = !1));
                  },
                },
              ),
              0 == about &&
                1 == video &&
                $("#video").animate(
                  { left: "150vw" },
                  {
                    duration: 500,
                    complete: function () {
                      ($("#video").css({ left: "-150%" }),
                        $("#about").animate({ left: "50%" }, 500),
                        (about = !0),
                        (video = !1));
                    },
                  },
                ),
              0 == about &&
                1 == love &&
                $("#love").animate(
                  { left: "150vw" },
                  {
                    duration: 500,
                    complete: function () {
                      ($("#love").css({ left: "-150%" }),
                        $("#about").animate({ left: "50%" }, 500),
                        (about = !0),
                        (love = !1));
                    },
                  },
                ));
            break;
          case "video":
            (0 == video &&
              1 == friend &&
              $("#friend").animate(
                { left: "150vw" },
                {
                  duration: 500,
                  complete: function () {
                    ($("#friend").css({ left: "-150%" }),
                      $("#video").animate({ left: "50%" }, 500),
                      (video = !0),
                      (friend = !1));
                  },
                },
              ),
              0 == video &&
                1 == about &&
                $("#about").animate(
                  { left: "150vw" },
                  {
                    duration: 500,
                    complete: function () {
                      ($("#about").css({ left: "-150%" }),
                        $("#video").animate({ left: "50%" }, 500),
                        (video = !0),
                        (about = !1));
                    },
                  },
                ),
              0 == video &&
                1 == love &&
                $("#love").animate(
                  { left: "150vw" },
                  {
                    duration: 500,
                    complete: function () {
                      ($("#love").css({ left: "-150%" }),
                        $("#video").animate({ left: "50%" }, 500),
                        (video = !0),
                        (love = !1));
                    },
                  },
                ));
            break;
          case "friend":
            (0 == friend &&
              1 == about &&
              $("#about").animate(
                { left: "150vw" },
                {
                  duration: 500,
                  complete: function () {
                    ($("#about").css({ left: "-150%" }),
                      $("#friend").animate({ left: "50%" }, 500),
                      (friend = !0),
                      (about = !1));
                  },
                },
              ),
              0 == friend &&
                1 == video &&
                $("#video").animate(
                  { left: "150vw" },
                  {
                    duration: 500,
                    complete: function () {
                      ($("#video").css({ left: "-150%" }),
                        $("#friend").animate({ left: "50%" }, 500),
                        (friend = !0),
                        (video = !1));
                    },
                  },
                ),
              0 == friend &&
                1 == love &&
                $("#love").animate(
                  { left: "150vw" },
                  {
                    duration: 500,
                    complete: function () {
                      ($("#love").css({ left: "-150%" }),
                        $("#friend").animate({ left: "50%" }, 500),
                        (friend = !0),
                        (love = !1));
                    },
                  },
                ));
            break;
          case "love":
            (0 == love &&
              1 == friend &&
              $("#friend").animate(
                { left: "150vw" },
                {
                  duration: 500,
                  complete: function () {
                    ($("#friend").css({ left: "-150%" }),
                      $("#love").animate({ left: "50%" }, 500),
                      (love = !0),
                      (friend = !1));
                  },
                },
              ),
              0 == love &&
                1 == video &&
                $("#video").animate(
                  { left: "150vw" },
                  {
                    duration: 500,
                    complete: function () {
                      ($("#video").css({ left: "-150%" }),
                        $("#love").animate({ left: "50%" }, 500),
                        (love = !0),
                        (video = !1));
                    },
                  },
                ),
              0 == love &&
                1 == about &&
                $("#about").animate(
                  { left: "150vw" },
                  {
                    duration: 500,
                    complete: function () {
                      ($("#about").css({ left: "-150%" }),
                        $("#love").animate({ left: "50%" }, 500),
                        (love = !0),
                        (about = !1));
                    },
                  },
                ));
        }
      });
    }),
    $(".jd-btn-menu").on("click", function () {
      ($(".jd-bar").toggleClass("close"),
        $(".jd-menu-footer").toggleClass("show"));
    }));
  var audio = new Audio(),
    source = "https://files.catbox.moe/rshch0.mp3";
  ((audio.volume = 1),
    (audio.autoplay = true),
    (audio.src = source),
    $(".jd-sound-controll").on("click", function () {
      audio.paused
        ? ((audio.src = source), audio.play())
        : (audio.pause(),
          (audio.src = ""),
          $(".jd-txt").text("Sound Off"),
          $("#sound").addClass("fa-volume-down"),
          $("#sound").removeClass("fa-volume-up"));
    }),
    $(audio).on("playing", function () {
      ($(".jd-txt").text("Sound On"),
        $("#sound").removeClass("fa-volume-down"),
        $("#sound").addClass("fa-volume-up"));
    }),
    $(audio).on("pause", function () {
      ($(".jd-txt").text("Sound Off"),
        $("#sound").addClass("fa-volume-down"),
        $("#sound").removeClass("fa-volume-up"));
    }));
  for (
    var _friends = [
        {
          name: "Friends 1",
          url: "https://xat.me",
          img: "https://xatimg.com/image/xRsX7JQVrHJR.png",
          width: 5e3,
        },
        {
          name: "Friends 2",
          url: "https://xat.me",
          img: "https://xatimg.com/image/xRsX7JQVrHJR.png",
          width: 350,
        },
        {
          name: "Friends 3",
          url: "https://xat.me",
          img: "https://xatimg.com/image/xRsX7JQVrHJR.png",
          width: 1050,
        },
        {
          name: "Friends 4",
          url: "https://xat.me",
          img: "https://xatimg.com/image/xRsX7JQVrHJR.png",
          width: 5e3,
        },
        {
          name: "Friends 5",
          url: "https://xat.me",
          img: "https://xatimg.com/image/xRsX7JQVrHJR.png",
          width: 250,
        },
        {
          name: "Friends 6",
          url: "https://xat.me/",
          img: "https://xatimg.com/image/xRsX7JQVrHJR.png",
          width: 200,
        },
      ],
      content = document.querySelector(".jd-group-friend"),
      i = 0,
      box = "";
    i < _friends.length;
  ) {
    ((nome = _friends[i].name),
      (link = _friends[i].url),
      (avatar = _friends[i].img),
      (w = _friends[i].width));
    var _width,
      _height = 50,
      _time,
      _steps;
    ((_time = w / 50),
      (box =
        '<div class="jd-row"><div class="jd-avatar" style="width:50px;height:50px;background-image:url(' +
        avatar +
        ");background-position:left top;animation:loop " +
        _time / 10 +
        "s steps(" +
        (_steps = _time - 1) +
        ') infinite;"></div><div class="jd-data-friend"><i class="fas fa-user-circle"></i><span>' +
        nome +
        '</span><a href="' +
        link +
        '" target="_blank">xat.me</a></div></div>'),
      (content.innerHTML += box),
      i++);
  }
})();


