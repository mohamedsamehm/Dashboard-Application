var circleChart,
  refreshChartJs;
$(document).ready(function() {
  "use strict";

  /*Global*/
  var refreshVolume,
    refreshDoughtChartJs,
    refreshBar;
  // Button (convert to Dark Mode)
  const darkBtn = document.getElementById("checkboxToggle");
  let currentTheme = localStorage.getItem("theme");
  var $fontColor = "#646464",
    $rippleColor = "#ffffff",
    $gridLines = "#F1F4FB",
    $doughtColor = "#424242";
  if (currentTheme == "dark") {
    document.body.classList.add("dark-theme");
    document.body.classList.remove("light-theme");
    $fontColor = "#7383AB";
    $rippleColor = "#ffffff",
      $gridLines = "#303245";
    $doughtColor = "#CEDAFA";
    darkBtn.checked = true;
  } else if (currentTheme == "light") {
    document.body.classList.add("light-theme");
    document.body.classList.remove("dark-theme");
    darkBtn.checked = false;
    $fontColor = "#646464";
    $rippleColor = "#999999",
      $gridLines = "#F1F4FB";
    $doughtColor = "#424242";
  }
  // Add Animation Effect On button
  $('.ripple').on('click', function(event) {
    event.preventDefault();
    var $btn = $(this),
      $div = $('<div/>'),
      btnOffset = $btn.offset(),
      xPos = event.pageX - btnOffset.left,
      yPos = event.pageY - btnOffset.top;
    $div.addClass('ripple-effect');
    $div
      .css({
        height: $btn.height(),
        width: $btn.height(),
        top: yPos - ($div.height() / 2),
        left: xPos - ($div.width() / 2),
        background: $rippleColor
      });
    $btn.append($div);
    window.setTimeout(function() {
      $div.remove();
    }, 2000);
  });
  $('select').select2();
  darkBtn.addEventListener("change", function() {
    if (!document.body.classList.contains("dark-theme")) {
      document.body.classList.toggle("dark-theme");
      document.body.classList.toggle("light-theme");
      var theme = "dark";
      $fontColor = "#7383AB";
      $rippleColor = "#ffffff",
        $gridLines = "#303245";
      $doughtColor = "#CEDAFA";
    } else {
      document.body.classList.toggle("light-theme");
      document.body.classList.toggle("dark-theme");
      var theme = "light";
      $fontColor = "#646464";
      $rippleColor = "#999999",
        $gridLines = "#F1F4FB";
      $doughtColor = "#424242";
    }
    localStorage.setItem("theme", theme);
    refreshChartJs();
  });
  // function to toggle full screen
  function toggleFullscreen(elem, icon) {
    elem = elem || document.documentElement;
    if (!document.fullscreenElement &&
      !document.mozFullScreenElement &&
      !document.webkitFullscreenElement &&
      !document.msFullscreenElement
    ) {
      icon.removeClass("fa-expand").addClass("fa-compress");
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if (elem.webkitRequestFullscreen) { /* Safari */
        elem.webkitRequestFullscreen();
      } else if (elem.msRequestFullscreen) { /* IE11 */
        elem.msRequestFullscreen();
      }
    } else {
      icon.addClass("fa-expand").removeClass("fa-compress");
      if (document.exitFullscreen) {
        document.exitFullscreen()
          .then(() => console.log("Document Exited form Full screen mode"))
          .catch((err) => console.error(err));
      } else if (document.webkitExitFullscreen) { /* Safari */
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) { /* IE11 */
        document.msExitFullscreen();
      }
    }
  }
  $(".icon-full-screen").on("click", function() {
    toggleFullscreen(this.parentNode.parentNode, $(this).find("i"));
    var $Canvas = $(this).parent().parent();
    setTimeout(() => {
      if ($Canvas.hasClass("volume")) {
        refreshVolume();
      } else if ($Canvas.hasClass("sentiments")) {
        refreshDoughtChartJs();
      } else if ($Canvas.hasClass("interactions")) {
        refreshBar();
      } else {
        if (
          document.fullscreenElement ||
          document.mozFullScreenElement ||
          document.webkitFullscreenElement ||
          document.msFullscreenElement
        ) {
          circleChart(500);
        } else {
          if (window.innerWidth <= 600) {
            circleChart(200);
          } else {
            circleChart(274);
          }
        }
      }
    }, 500);
  });
  document.addEventListener("keyup", event => {
    if (event.key === 27) { // escape key maps to keycode `27`
      $(".icon-full-screen i.fas.fa-compress").addClass("fa-expand").removeClass("fa-compress");
    }
  });
  // use datetimepicker
  var d = new Date();
  $(".datepicker-container .datetimepicker-input").on("focus click", function() {
    $(this).parent().datetimepicker({
      format: "L",
      minDate: new Date(d.getFullYear() - 3, 12),
      maxDate: new Date(),
    });
  });
  if ($(".datetimepicker-input").length == 2) {
    $("#datetimepicker1").datetimepicker({
      format: "L",
      minDate: new Date(d.getFullYear() - 3, 12),
      maxDate: new Date(),
    });
    $("#datetimepicker2").datetimepicker({
      format: "L",
      minDate: new Date(d.getFullYear() - 3, 12),
      maxDate: new Date(),
    });
  } else if ($(".datetimepicker-input").length == 4) {
    $("#datetimepicker1").datetimepicker({
      format: "L",
      minDate: new Date(d.getFullYear() - 3, 12),
      maxDate: new Date(),
    });
    $("#datetimepicker2").datetimepicker({
      format: "L",
      minDate: new Date(d.getFullYear() - 3, 12),
      maxDate: new Date(),
    });
    $("#datetimepicker3").datetimepicker({
      format: "L",
      minDate: new Date(d.getFullYear() - 3, 12),
      maxDate: new Date(),
    });
    $("#datetimepicker4").datetimepicker({
      format: "L",
      minDate: new Date(d.getFullYear() - 3, 12),
      maxDate: new Date(),
    });
  }
  $('a[href*="#"]').click(function(event) {
    event.preventDefault();
  });
  //convert svg image into svg
  jQuery("img.svg").each(function() {
    var $img = jQuery(this);
    var imgID = $img.attr("id");
    var imgClass = $img.attr("class");
    var imgURL = $img.attr("src");
    jQuery.get(
      imgURL,
      function(data) {
        // Get the SVG tag, ignore the rest
        var $svg = jQuery(data).find("svg");
        // Add replaced image's ID to the new SVG
        if (typeof imgID !== "undefined") {
          $svg = $svg.attr("id", imgID);
        }
        // Add replaced image's classes to the new SVG
        if (typeof imgClass !== "undefined") {
          $svg = $svg.attr("class", imgClass + " replaced-svg");
        }
        // Remove any invalid XML tags as per http://validator.w3.org
        $svg = $svg.removeAttr("xmlns:a");
        // Replace image with new SVG
        $img.replaceWith($svg);
      },
      "xml"
    );
  });
  $("select").on("change", function() {
    $(this).blur();
  });
  $(".labelclick").on("click", function() {
    $(this).parent().find("label").click();
  });
  /*Global*/
  //===================================================//

  /**Dropdowns Customization */
  $(".dropdown-label").on("click", function(e) {
    e.stopPropagation();
    var $this = $(this).parent();
    $(".dropdown.on").each(function() {
      if (!$(this).is($this)) {
        $(this).removeClass("on");
      }
    });
    $this.toggleClass("on");
  });
  $(document).on("click", function(e) {
    if (!$(e.target).parents().hasClass("dropdown")) {
      $(".dropdown.on").removeClass("on");
    }
  });
  $(".dropdown .dropdown-option").on("click", function() {
    $(this).addClass("selected").siblings().removeClass("selected");
    if ($(this).parent().parent().hasClass("dropdown-icon")) {
      $(this).parent().parent().find(".dropdown-label span").html($(this).html());
    } else {
      $(this).parent().parent().find(".dropdown-label").html($(this).html());
    }
    $(this).parent().parent().removeClass("on");
    if ($(this).data("toggle") == "check-all") {
      var $checkAll = $(this).parent().find('[data-toggle="check-all"]').first(),
        $inputs = $(this).parent().find('[type="checkbox"]'),
        $label = $(this).parent().parent().find(".dropdown-label");
      $checkAll.toggleClass("active");
      if ($checkAll.hasClass("active")) {
        $inputs.prop("checked", true);
        $label.html("All Selected");
      } else {
        $inputs.prop("checked", false);
        $label.html($(this).parent().find(".checkbox .dropdown-option").eq(0).html());
      }
    }
  });
  $(".dropdown .option").on("click", function() {
    $(this).find(".dropdown-option").addClass("selected").siblings().find(".dropdown-option").removeClass("selected");
    $(this).parent().parent().find(".dropdown-label span").html($(this).find(".dropdown-option").html());
    $(this).parent().parent().find(".dropdown-label .icon").remove();
    $(this).find(".icon").clone().prependTo($(this).parent().parent().find(".dropdown-label"));
    $(this).parent().parent().removeClass("on");
  });
  $(".dropdown .checkbox").on("click", function() {
    var checked = $(this).parent().find(":checked"),
      $label = $(this).parent().parent().find(".dropdown-label"),
      $inputs = $(this).parent().find('[type="checkbox"]');
    if (checked.length <= 0) {
      // do nothing
    } else if (checked.length === 1) {
      $label.html(checked.parent().find("label").text());
    } else if (checked.length === $inputs.length) {
      $label.html("All Selected");
    } else {
      $label.html(checked.length + " Selected");
    }
  });
  $(".dropdown").each(function() {
    if ($(this).hasClass("filter-dropdown")) {
      $(this).find(".dropdown-label span").html($(this).find(".dropdown-option.selected").html());
    } else {
      $(this).find(".dropdown-label").html($(this).find(".dropdown-option.selected").html());
    }
  });
  /**Dropdowns Customization */
  //===================================================//

  // Search page (Magic Search)
  $(".magic-search button").on("click", function() {
    if ($(this).data("search") !== "" && $(this).data("search") !== undefined) {
      $(this).addClass("active").siblings().removeClass("active");
      $(".search-container").fadeOut(500);
      $($(this).data("search")).fadeIn(500);
    }
  });
  //===================================================//

  //===================================================//
  // Dashboard Page
  if (window.innerWidth >= 1200) {
    $('.drag').draggable({
      revert: "invalid",
      cursor: "move",
      cursorAt: { top: 50, left: 50 },
    });
    $('.drop').droppable({
      activeClass: "ui-hover",
      hoverClass: "ui-active",
      accept: '.drag',
      drop: function(event, ui) {
        $(this).append(ui.draggable.css({
          width: "100%",
          left: '0px',
          top: '0px',
          position: "relative"
        }))
        $(this).find('span').hide()
        if ($(".charts .blocks").children().length == 0) {
          $(".charts").hide()
        }
        $(".drop").each(function() {
          if ($(this).children().length <= 1) {
            $(this).find('span').show()
          }
        })
      }
    });
    $('.drop .drag').draggable({
      revert: "invalid",
      cursorAt: { top: 0, left: 0 },
    });
    $('.charts .blocks').droppable({
      accept: '.drop .drag',
      drop: function(event, ui) {
        $(this).append(ui.draggable.css({
          width: "100%",
          left: '0px',
          top: '0px',
        }))
        $(".drop").each(function() {
          if ($(this).children().length <= 1) {
            $(this).find('span').show()
          }
        })
      }
    });
    $("#generate").on("click", function() {
      let genAlert = "",
        i = 0;
      $(".drop").each(function() {
        i++;
        if ($(this).find(".block").length > 0) {
          genAlert += `col ${i}: `;
          let $this = $(this);
          $(this).find(".block").each(function() {
            if ($(this).index() == $this.find(".block").length) {
              genAlert += `${$(this).data("name")}`;
            } else {
              genAlert += `${$(this).data("name")}, `;
            }
          });
          genAlert += `\n`;
        }
      });
      alert(genAlert);
    });
    $("#columns .dropdown .dropdown-option").on("click", function() {
      let columns = parseInt($(this).html()),
        i = 1;
      if (columns == 1) {
        $(".dropBlocks .drop").eq(0).css("margin-right", "0px");
        $(".dropBlocks .drop").each(function() {
          $(".charts").show();
          if ($(this).index() !== 0) {
            $(this).find('span').show();
            $(this).find(".drag").each(function() {
              $(".charts .blocks").append($(this));
            })
          }
        })
      } else {
        $(".dropBlocks .drop").eq(0).css("margin-right", "32px");
      }
      if ($(".dropBlocks .drop").length >= columns) {
        $(".drop").each(function() {
          if (i > columns) {
            $(this).hide();
          } else {
            $(this).show();
          }
          $(this).css("max-width", "100%");
          i++;
        });
      } else {
        for (var j = 0; j < columns - $(".dropBlocks .drop").length; j++) {
          $(".dropBlocks .drop").eq(0).clone().appendTo(".dropBlocks");
        }
      }
    });
    $("#width .dropdown .dropdown-option").on("click", function() {
      if (parseInt($("#columns .dropdown .dropdown-option.selected").html()) !== 1) {
        $(".dropBlocks .drop").eq(0).css("margin-right", "32px");
        let width1 = $(this).html().substring(0, 3);
        let width2 = $(this).html().substring(6, 9);
        $(".dropBlocks .drop").eq(0).css("max-width", width1);
        $(".dropBlocks .drop").eq(1).css("max-width", width2);
      } else {
        $(".dropBlocks .drop").eq(0).css("margin-right", "0px");
      }
    });
  }
  //===================================================//

  /**Navbar */
  // display notifications
  $(".settings-container .notifications").on("click", function() {
    $(".notifications-container").toggleClass("show");
    $(".profile-container").removeClass("show");
  });
  // display settings
  $(".profile, .settings").on("click", function() {
    $(".profile-container").toggleClass("show");
    $(".notifications-container").removeClass("show");
  });
  if (window.innerWidth <= 600) {
    $("<div class='navbar-mobile'></div>").appendTo("nav.navbar.header");
    $("nav.navbar ul.navbar-nav").css("display", "flex");
    $("nav.navbar form").css("display", "flex");
    $(".navbar-mobile").prepend($("nav.navbar ul.navbar-nav"));
    $(".navbar-mobile").prepend($("nav.navbar form"));
  }
  if (window.innerWidth <= 1400) {
    $(".profile .profile-container").prepend($("#checkboxToggle").parent());
    $(".checkboxToggle").css("display", "inline-flex");
  }
  $("nav.navbar .toggler").on("click", function(e) {
    e.stopPropagation();
    $(this).toggleClass("active");
    if ($(this).hasClass("active")) {
      $(".sidebar-container .sidebar-overlay").fadeIn();
      $(".sidebar-container .sidebar").css("transform", "translateX(0)");
    } else {
      $(".sidebar-container .sidebar-overlay").fadeOut();
      $(".sidebar-container .sidebar").css("transform", "translateX(-100px)");
    }
  });
  $(".sidebar-container .close-btn").on("click", function(e) {
    $("nav.navbar .toggler").removeClass("active");
    $(".sidebar-container .sidebar-overlay").fadeOut();
    $(".sidebar-container .sidebar").css("transform", "translateX(-100px)");
  })
  $(".sidebar-container .sidebar,.notifications-container,.notifications,.profile-container,.profile, .settings").on("click", function(e) {
    e.stopPropagation();
  });
  $("body, html").on("click", function() {
    if (window.innerWidth <= 1400) {
      $("nav.navbar .toggler").removeClass("active");
      $(".sidebar-container .sidebar-overlay").fadeOut();
      $(".sidebar-container .sidebar").css("transform", "translateX(-100px)");
    }
    $(".notifications-container").removeClass("show");
    $(".profile-container").removeClass("show");
  });
  $(".monitor a").on("click", function() {
    $(this).toggleClass("active");
    $(".monitor-container").toggleClass("collapsed");
  });
  $(".navbar-mobile")
    .hover(function() {
      $(this).addClass("open");
    }, function() {
      if (!$(".monitor-container").hasClass("collapsed")) {
        $(this).removeClass("open");
        $(".monitor-container").removeClass("collapsed");
        $(".monitor a").removeClass("active");
      }
    });
  /**Navbar */
  //===================================================//
  /*Blocks*/
  $(".info-filters .filter li").on("click", function() {
    $(this).addClass("active").siblings().removeClass("active");
  });
  $(".thedata .thedata-block:not(" + $(
    ".info-filters .filter .dropdown .dropdown-list .option .dropdown-option.selected"
  ).parent().data("type") + ")").fadeOut();
  $(
    ".info-filters .filter li,.info-filters .filter .dropdown .dropdown-list .option"
  ).on("click", function() {
    let $this = $(this),
      dataType = $this.data("type");
    if (dataType == "all") {
      $(".thedata .thedata-block").fadeIn(300);
    } else {
      $(".thedata .thedata-block:not(" + dataType + ")").fadeOut();
      $(".thedata .thedata-block" + dataType).fadeIn(300);
    }
  });
  $(".info-filters .filter .icons .icon").on("click", function() {
    if (!$(this).hasClass("active")) {
      $(this).addClass("active").siblings().removeClass("active");
      if ($(this).data("class") !== "") {
        $(".info-filters .thedata").addClass($(this).data("class"));
      } else {
        $(".info-filters .thedata").removeClass(
          $(this).siblings().data("class")
        );
      }
    }
  });
  /*Blocks*/
  //===================================================//
  /*chartJs*/
  circleChart = function(width) {
    if ($(".progress-ring").length > 0) {
      let r1 = (width / 2) - 10,
        r2 = ((width - 74) / 2) - 10;
      $(".progress-ring").attr("width", width);
      $(".progress-ring").attr("height", width);
      $(".progress-ring circle").eq(0).attr("stroke-dashoffset", 2 * r1 * Math.PI * 0.25);
      $(".progress-ring circle").eq(0).attr("stroke-dasharray", 2 * r1 * Math.PI);
      $(".progress-ring circle").eq(1).attr("stroke-dashoffset", 2 * r1 * Math.PI * 0.5);
      $(".progress-ring circle").eq(1).attr("stroke-dasharray", 2 * r1 * Math.PI);
      $(".progress-ring circle").attr("r", r1);
      $(".progress-ring circle").attr("cx", width / 2);
      $(".progress-ring circle").attr("cy", width / 2);
      $(".progress-ring-small").attr("width", width - 74);
      $(".progress-ring-small").attr("height", width - 74);
      $(".progress-ring-small circle").attr("r", r2);
      $(".progress-ring-small circle").attr("cx", (width - 74) / 2);
      $(".progress-ring-small circle").attr("cy", (width - 74) / 2);
      $(".progress-ring-small circle").eq(0).attr("stroke-dashoffset", 2 * r2 * Math.PI * 0.25);
      $(".progress-ring-small circle").eq(0).attr("stroke-dasharray", 2 * r2 * Math.PI);
      $(".progress-ring-small circle").eq(1).attr("stroke-dashoffset", 2 * r2 * Math.PI * 0.35);
      $(".progress-ring-small circle").eq(1).attr("stroke-dasharray", 2 * r2 * Math.PI);
      $(".svg-container").removeClass("transform");
      setTimeout(() => {
        $(".svg-container").addClass("transform");
      }, 1000);
    } else {
      return false;
    }
  }

  function BuildChartJs() {
    let $fontSize = (window.innerWidth >= 600) ? 16 : 13;
    if ($("#myChart").length > 0) {
      var sentiments = document.getElementById("myChart"),
        dataSentiments = {
          labels: ["Netural", "Positive", "Negative"],
          datasets: [{
            label: "# of Votes",
            data: [68, 15, 17],
            backgroundColor: ["#00FFDB", "#387DFD", "#FF5A4E"],
            borderColor: ["#00FFDB", "#387DFD", "#FF5A4E"],
            borderAlign: "center",
            borderWidth: 1,
          }, ],
        },
        optionsSentiments = {
          maintainAspectRatio: false,
          cutoutPercentage: 85,
          layout: {
            padding: 0,
          },
          legend: {
            display: true,
            position: "bottom",
            reverse: true,
            labels: {
              fontColor: $doughtColor,
              padding: 28,
              fontSize: $fontSize,
              boxWidth: 20,
              fontFamily: "Poppins",
            },
          },
          tooltips: {
            enabled: true,
            mode: "index",
          },
        }
      var myDoughnutChart = new Chart(sentiments, {
        type: "doughnut",
        data: dataSentiments,
        options: optionsSentiments,
      });
    }
    if ($("#interactions").length > 0) {
      var bar = document.getElementById("interactions"),
        dataBar = {
          datasets: [{
              label: "first",
              data: [0, 0, 13, 15, 0, 8, 0, 13, 0, 0],
              showLine: true,
              backgroundColor: [
                "",
                "",
                "#387DFD",
                "#387DFD",
                "",
                "#387DFD",
                "",
                "#00FFDB",
                "",
                "",
              ],
            },
            {
              label: "second",
              barPercentage: 0.5,
              barThickness: 6,
              maxBarThickness: 8,
              minBarLength: 2,
              showLine: true,
              data: [0, 10, 0, 11, 0, 17, 0, 7, 0, 0],
              backgroundColor: [
                "",
                "#FF5A4E",
                "",
                "#00FFDB",
                "",
                "#FF5A4E",
                "",
                "#387DFD",
                "",
                "",
              ],
              borderWidth: 1,
            },
          ],
          labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        },
        optionsBar = {
          maintainAspectRatio: false,
          aspectRatio: 4,
          legend: {
            display: false,
          },
          tooltips: {
            mode: "index",
            axis: "y",
            callbacks: {
              label: function(tooltipItem) {
                return tooltipItem.yLabel;
              },
            },
          },
          scales: {
            xAxes: [{
              ticks: {
                beginAtZero: true,
                fontColor: $fontColor,
              },
              gridLines: {
                color: $gridLines,
                lineWidth: 2,
              },
            }, ],
            yAxes: [{
              ticks: {
                min: 6,
                max: 18,
                stepSize: 3,
                suggestedMin: 0,
                fontColor: $fontColor,
                suggestedMax: 18,
                callback: function(label, index, labels) {
                  if (label >= 12) {
                    if (label >= 10) {
                      return label + ":00 PM";
                    } else {
                      return "0" + label + ":00 PM";
                    }
                  } else {
                    if (label >= 10) {
                      return label + ":00 AM";
                    } else {
                      return "0" + label + ":00 AM";
                    }
                  }
                },
              },
              gridLines: {
                color: $gridLines,
                lineWidth: 2,
              },
            }, ],
          },
        };
      var myBar = new Chart(bar, {
        type: "bar",
        data: dataBar,
        options: optionsBar,
      });
    }
    if ($("#volume").length > 0) {
      var volume = document.getElementById("volume"),
        volumeContext = volume.getContext("2d"),
        gradient = volumeContext.createLinearGradient(0, 0, 0, 450),
        dataVolume = {
          datasets: [{
            label: "first",
            data: [9, 11.3, 12.2, 11.3, 9.2, 9, 10, 15, 14.8, 7.6],
            backgroundColor: gradient,
            borderColor: "#387DFD",
            borderWidth: 2,
          }, ],
          labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        },
        optionsVolume = {
          maintainAspectRatio: false,
          animation: {
            easing: "easeInOutQuad",
            duration: 520,
          },
          elements: {
            point: {
              radius: 0,
            },
          },
          legend: {
            display: false,
          },
          tooltips: {
            mode: "index",
            axis: "y",
            callbacks: {
              label: function(tooltipItem) {
                return tooltipItem.yLabel;
              },
            },
          },
          scales: {
            xAxes: [{
              ticks: {
                beginAtZero: true,
                fontColor: $fontColor,
              },
              gridLines: {
                color: $gridLines,
                lineWidth: 2,
              },
            }, ],
            yAxes: [{
              ticks: {
                min: 6,
                max: 18,
                stepSize: 3,
                suggestedMin: 0,
                fontColor: $fontColor,
                suggestedMax: 18,
                callback: function(label, index, labels) {
                  if (label >= 12) {
                    if (label >= 10) {
                      return label + ":00 PM";
                    } else {
                      return "0" + label + ":00 PM";
                    }
                  } else {
                    if (label >= 10) {
                      return label + ":00 AM";
                    } else {
                      return "0" + label + ":00 AM";
                    }
                  }
                },
              },
              gridLines: {
                color: $gridLines,
                lineWidth: 2,
              },
            }, ],
          },
        };
      if (document.body.classList.contains("dark-theme")) {
        gradient.addColorStop(0, "#387DFD");
        gradient.addColorStop(0.4, "rgba(39, 42, 61, 0.05)");
      } else {
        gradient.addColorStop(0, "#D6E4FF");
        gradient.addColorStop(0.4, "rgba(214, 228, 255, 0)");
      }
      var myvolume = new Chart(volume, {
        type: "line",
        data: dataVolume,
        options: optionsVolume,
      });
    }
    refreshVolume = function() {
      if ($("#volume").length > 0) {
        $fontSize = (window.innerWidth >= 600) ? 16 : 13;
        myvolume.destroy();
        gradient = volumeContext.createLinearGradient(0, 0, 0, 450);
        if (document.body.classList.contains("dark-theme")) {
          gradient.addColorStop(0, "#387DFD");
          gradient.addColorStop(0.4, "rgba(39, 42, 61, 0.05)");
        } else {
          gradient.addColorStop(0, "#D6E4FF");
          gradient.addColorStop(0.4, "rgba(214, 228, 255, 0)");
        }
        let optionsVolume1 = {
            maintainAspectRatio: false,
            animation: {
              easing: "easeInOutQuad",
              duration: 520,
            },
            elements: {
              point: {
                radius: 0,
              },
            },
            legend: {
              display: false,
            },
            tooltips: {
              mode: "index",
              axis: "y",
              callbacks: {
                label: function(tooltipItem) {
                  return tooltipItem.yLabel;
                },
              },
            },
            scales: {
              xAxes: [{
                ticks: {
                  beginAtZero: true,
                  fontColor: $fontColor,
                },
                gridLines: {
                  color: $gridLines,
                  lineWidth: 2,
                },
              }, ],
              yAxes: [{
                ticks: {
                  min: 6,
                  max: 18,
                  stepSize: 3,
                  suggestedMin: 0,
                  fontColor: $fontColor,
                  suggestedMax: 18,
                  callback: function(label, index, labels) {
                    if (label >= 12) {
                      if (label >= 10) {
                        return label + ":00 PM";
                      } else {
                        return "0" + label + ":00 PM";
                      }
                    } else {
                      if (label >= 10) {
                        return label + ":00 AM";
                      } else {
                        return "0" + label + ":00 AM";
                      }
                    }
                  },
                },
                gridLines: {
                  color: $gridLines,
                  lineWidth: 2,
                },
              }, ],
            },
          },
          dataVolume = {
            datasets: [{
              label: "first",
              data: [9, 11.3, 12.2, 11.3, 9.2, 9, 10, 15, 14.8, 7.6],
              backgroundColor: gradient,
              borderColor: "#387DFD",
              borderWidth: 2,
            }, ],
            labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
          };
        myvolume = new Chart(volume, {
          type: "line",
          data: dataVolume,
          options: optionsVolume1,
        });
      } else {
        return false;
      }
    };
    refreshDoughtChartJs = function() {
      if ($("#myChart").length > 0) {
        $fontSize = (window.innerWidth >= 600) ? 16 : 13;
        myDoughnutChart.destroy();
        let optionsSentiments1 = {
          maintainAspectRatio: false,
          cutoutPercentage: 85,
          layout: {
            padding: 0,
          },
          legend: {
            display: true,
            position: "bottom",
            reverse: true,
            labels: {
              fontColor: $doughtColor,
              padding: 28,
              fontSize: $fontSize,
              boxWidth: 20,
              fontFamily: "Poppins",
            },
          },
          tooltips: {
            enabled: true,
            mode: "index",
          },
        };
        myDoughnutChart = new Chart(sentiments, {
          type: "doughnut",
          data: dataSentiments,
          options: optionsSentiments1,
        });
      } else {
        return false;
      }
    };
    refreshBar = function() {
      if ($("#interactions").length > 0) {
        $fontSize = (window.innerWidth >= 600) ? 16 : 13;
        myBar.destroy();
        let optionsBar1 = {
          maintainAspectRatio: false,
          aspectRatio: 4,
          legend: {
            display: false,
          },
          tooltips: {
            mode: "index",
            axis: "y",
            callbacks: {
              label: function(tooltipItem) {
                return tooltipItem.yLabel;
              },
            },
          },
          scales: {
            xAxes: [{
              ticks: {
                beginAtZero: true,
                fontColor: $fontColor,
              },
              gridLines: {
                color: $gridLines,
                lineWidth: 2,
              },
            }, ],
            yAxes: [{
              ticks: {
                min: 6,
                max: 18,
                stepSize: 3,
                suggestedMin: 0,
                fontColor: $fontColor,
                suggestedMax: 18,
                callback: function(label, index, labels) {
                  if (label >= 12) {
                    if (label >= 10) {
                      return label + ":00 PM";
                    } else {
                      return "0" + label + ":00 PM";
                    }
                  } else {
                    if (label >= 10) {
                      return label + ":00 AM";
                    } else {
                      return "0" + label + ":00 AM";
                    }
                  }
                },
              },
              gridLines: {
                color: $gridLines,
                lineWidth: 2,
              },
            }, ],
          },
        };
        myBar = new Chart(bar, {
          type: "bar",
          data: dataBar,
          options: optionsBar1,
        });
      }
    };
    refreshChartJs = function() {
      refreshVolume();
      refreshDoughtChartJs();
      refreshBar();
      if (
        document.fullscreenElement ||
        document.mozFullScreenElement ||
        document.webkitFullscreenElement ||
        document.msFullscreenElement
      ) {
        circleChart(500);
      } else {
        if (window.innerWidth <= 600) {
          circleChart(200);
        } else {
          circleChart(274);
        }
      }
    }
  }

  function chartJs() {
    if ($("#myChart").length > 0 || $("#interactions").length > 0 || $("#volume").length > 0 || $("#engagement").length > 0) {
      BuildChartJs();
    } else {
      refreshChartJs = function() {
        return false;
      }
    }
  }
  chartJs();

  /*chartJs*/
  //===================================================//
});
// Search bar Add Tags
(function() {
  "use strict";

  jQuery(".search-tags .icon").on("click", function() {
    jQuery(".tags-block .thetags .tag").remove();
    for (var i = 1; i <= 10; i++) {
      jQuery(".tags-block .thetags").append("<div class='tag tag" + i + "'>+ " + jQuery(this).parent().find(".tag .tag__name").html() + " " + i + "</div>");
      jQuery(".tags-block .thetags .tag" + i).hide();
    }
    setTimeout(() => {
      for (var i = 1; i <= 10; i++) {
        jQuery(".tags-block .thetags .tag" + i).fadeIn(500);
      }
    }, 500);
  });
  // Helpers
  function $$(selectors, context) {
    return typeof selectors === "string" ?
      (context || document).querySelectorAll(selectors) : [selectors];
  }

  function $(selector, context) {
    return typeof selector === "string" ?
      (context || document).querySelector(selector) :
      selector;
  }

  function create(tag, attr) {
    var element = document.createElement(tag);
    if (attr) {
      for (var name in attr) {
        if (element[name] !== undefined) {
          element[name] = attr[name];
        }
      }
    }
    return element;
  }

  function whichTransitionEnd() {
    var root = document.documentElement;
    var transitions = {
      transition: "transitionend",
      WebkitTransition: "webkitTransitionEnd",
      MozTransition: "mozTransitionEnd",
      OTransition: "oTransitionEnd otransitionend",
    };

    for (var t in transitions) {
      if (root.style[t] !== undefined) {
        return transitions[t];
      }
    }
    return false;
  }

  function oneListener(el, type, fn, capture) {
    capture = capture || false;
    el.addEventListener(
      type,
      function handler(e) {
        fn.call(this, e);
        el.removeEventListener(e.type, handler, capture);
      },
      capture
    );
  }

  function hasClass(cls, el) {
    return new RegExp("(^|\\s+)" + cls + "(\\s+|$)").test(el.className);
  }

  function addClass(cls, el) {
    if (!hasClass(cls, el))
      return (el.className += el.className === "" ? cls : " " + cls);
  }

  function removeClass(cls, el) {
    el.className = el.className.replace(
      new RegExp("(^|\\s+)" + cls + "(\\s+|$)"),
      ""
    );
  }

  function toggleClass(cls, el) {
    !hasClass(cls, el) ? addClass(cls, el) : removeClass(cls, el);
  }

  function Tags(tag) {
    var el = $(tag);

    if (el.instance) return;
    el.instance = this;

    var type = el.type;
    var transitionEnd = whichTransitionEnd();

    var tagsArray = [];
    var KEYS = {
      ENTER: 13,
      COMMA: 188,
      BACK: 8,
    };
    var isPressed = false;

    var timer;
    var wrap;
    var field;
    var parent;

    jQuery(".search-tags").on("mouseleave", function() {
      var target = jQuery(this).parent().find("input.tag-input"),
        name = target.val().trim();
      target.blur();

      addTag(name);

      if (timer) clearTimeout(timer);
      timer = setTimeout(function() {
        target.focus();
      }, 10);
    });
    jQuery("body").on("click", ".tags-block .thetags .tag", function() {
      var name = jQuery(this).html().substring(2);
      addTag(name);
    });

    function init() {
      // create and add wrapper
      wrap = create("div", {
        className: "tags-container scrollbar",
      });
      parent = create("div", {
        className: "tags-parent",
      });
      field = create("input", {
        type: "text",
        className: "tag-input",
        placeholder: el.placeholder || "",
      });
      parent.appendChild(wrap);
      parent.appendChild(field);
      if (el.value.trim() !== "") {
        hasTags();
      }
      el.type = "hidden";
      el.parentNode.insertBefore(parent, el);
      el.parentNode.addEventListener("click", btnRemove, false);
      field.addEventListener("keydown", keyHandler, false);
      field.addEventListener("keyup", backHandler, false);
    }

    function hasTags() {
      var arr = el.value.trim().split(",");
      arr.forEach(function(item) {
        item = item.trim();
        if (~tagsArray.indexOf(item)) {
          return;
        }
        var tag = createTag(item);
        tagsArray.push(item);
        wrap.appendChild(tag);
      });
    }

    function createTag(name) {
      var tag = create("div", {
        className: "tag",
        innerHTML: '<span class="tag__name">' +
          name +
          "</span>" +
          '<div class="tag__remove">&times;</div>',
      });
      return tag;
    }

    function btnRemove(e) {
      e.preventDefault();
      if (e.target.className === "tag__remove") {
        var tag = e.target.parentNode;
        var name = $(".tag__name", tag);
        wrap.removeChild(tag);
        tagsArray.splice(tagsArray.indexOf(name.textContent), 1);
        el.value = tagsArray.join(",");
      }
      field.focus();
    }

    function keyHandler(e) {
      if (e.target.tagName === "INPUT" && e.target.className === "tag-input") {
        var target = e.target;
        var code = e.which || e.keyCode;

        if (field.previousSibling && code !== KEYS.BACK) {
          removeClass("tag--marked", field.previousSibling);
        }

        var name = target.value.trim();

        // if(code === KEYS.ENTER || code === KEYS.COMMA) {
        if (code === KEYS.ENTER || code === KEYS.COMMA) {
          target.blur();

          addTag(name);

          if (timer) clearTimeout(timer);
          timer = setTimeout(function() {
            target.focus();
          }, 10);
        } else if (code === KEYS.BACK) {
          if (e.target.value === "" && !isPressed) {
            isPressed = true;
            removeTag();
          }
        }
      }
    }

    function backHandler(e) {
      isPressed = false;
    }

    function addTag(name) {
      // delete comma if comma exists
      name = name.toString().replace(/,/g, "").trim();

      if (name === "") return (field.value = "");

      if (~tagsArray.indexOf(name)) {
        var exist = $$(".tag", wrap);

        Array.prototype.forEach.call(exist, function(tag) {
          if (tag.firstChild.textContent === name) {
            addClass("tag--exists", tag);

            if (transitionEnd) {
              oneListener(tag, transitionEnd, function() {
                removeClass("tag--exists", tag);
              });
            } else {
              removeClass("tag--exists", tag);
            }
          }
        });

        return (field.value = "");
      }

      var tag = createTag(name);
      wrap.appendChild(tag);
      tagsArray.push(name);
      field.value = "";
      el.value += el.value === "" ? name : "," + name;
    }

    function removeTag() {
      if (tagsArray.length === 0) return;

      var tags = $$(".tag", wrap);
      var tag = tags[tags.length - 1];

      if (!hasClass("tag--marked", tag)) {
        addClass("tag--marked", tag);
        return;
      }

      tagsArray.pop();

      wrap.removeChild(tag);

      el.value = tagsArray.join(",");
    }

    init();
  }
  if (jQuery("body .page").hasClass("magic-search-page")) {
    window.Tags = Tags;
  }
})();
if (jQuery("body .page").hasClass("magic-search-page")) {
  // Use
  var tags = new Tags(".tagged");
}
// ===== plugins.js
// Avoid `console` errors in browsers that lack a console.
(function() {
  for (
    var a,
      e = function() {},
      b = "assert clear count debug dir dirxml error exception group groupCollapsed groupEnd info log markTimeline profile profileEnd table time timeEnd timeStamp trace warn".split(
        " "
      ),
      c = b.length,
      d = (window.console = window.console || {}); c--;

  )
    (a = b[c]), d[a] || (d[a] = e);
})();

// jQuery easing 1.3
jQuery.easing.jswing = jQuery.easing.swing;
jQuery.extend(jQuery.easing, {
  def: "easeOutQuad",
  swing: function(e, a, c, b, d) {
    return jQuery.easing[jQuery.easing.def](e, a, c, b, d);
  },
  easeInQuad: function(e, a, c, b, d) {
    return b * (a /= d) * a + c;
  },
  easeOutQuad: function(e, a, c, b, d) {
    return -b * (a /= d) * (a - 2) + c;
  },
  easeInOutQuad: function(e, a, c, b, d) {
    return 1 > (a /= d / 2) ?
      (b / 2) * a * a + c :
      (-b / 2) * (--a * (a - 2) - 1) + c;
  },
  easeInCubic: function(e, a, c, b, d) {
    return b * (a /= d) * a * a + c;
  },
  easeOutCubic: function(e, a, c, b, d) {
    return b * ((a = a / d - 1) * a * a + 1) + c;
  },
  easeInOutCubic: function(e, a, c, b, d) {
    return 1 > (a /= d / 2) ?
      (b / 2) * a * a * a + c :
      (b / 2) * ((a -= 2) * a * a + 2) + c;
  },
  easeInQuart: function(e, a, c, b, d) {
    return b * (a /= d) * a * a * a + c;
  },
  easeOutQuart: function(e, a, c, b, d) {
    return -b * ((a = a / d - 1) * a * a * a - 1) + c;
  },
  easeInOutQuart: function(e, a, c, b, d) {
    return 1 > (a /= d / 2) ?
      (b / 2) * a * a * a * a + c :
      (-b / 2) * ((a -= 2) * a * a * a - 2) + c;
  },
  easeInQuint: function(e, a, c, b, d) {
    return b * (a /= d) * a * a * a * a + c;
  },
  easeOutQuint: function(e, a, c, b, d) {
    return b * ((a = a / d - 1) * a * a * a * a + 1) + c;
  },
  easeInOutQuint: function(e, a, c, b, d) {
    return 1 > (a /= d / 2) ?
      (b / 2) * a * a * a * a * a + c :
      (b / 2) * ((a -= 2) * a * a * a * a + 2) + c;
  },
  easeInSine: function(e, a, c, b, d) {
    return -b * Math.cos((a / d) * (Math.PI / 2)) + b + c;
  },
  easeOutSine: function(e, a, c, b, d) {
    return b * Math.sin((a / d) * (Math.PI / 2)) + c;
  },
  easeInOutSine: function(e, a, c, b, d) {
    return (-b / 2) * (Math.cos((Math.PI * a) / d) - 1) + c;
  },
  easeInExpo: function(e, a, c, b, d) {
    return 0 == a ? c : b * Math.pow(2, 10 * (a / d - 1)) + c;
  },
  easeOutExpo: function(e, a, c, b, d) {
    return a == d ? c + b : b * (-Math.pow(2, (-10 * a) / d) + 1) + c;
  },
  easeInOutExpo: function(e, a, c, b, d) {
    return 0 == a ?
      c :
      a == d ?
      c + b :
      1 > (a /= d / 2) ?
      (b / 2) * Math.pow(2, 10 * (a - 1)) + c :
      (b / 2) * (-Math.pow(2, -10 * --a) + 2) + c;
  },
  easeInCirc: function(e, a, c, b, d) {
    return -b * (Math.sqrt(1 - (a /= d) * a) - 1) + c;
  },
  easeOutCirc: function(e, a, c, b, d) {
    return b * Math.sqrt(1 - (a = a / d - 1) * a) + c;
  },
  easeInOutCirc: function(e, a, c, b, d) {
    return 1 > (a /= d / 2) ?
      (-b / 2) * (Math.sqrt(1 - a * a) - 1) + c :
      (b / 2) * (Math.sqrt(1 - (a -= 2) * a) + 1) + c;
  },
  easeInElastic: function(e, a, c, b, d) {
    var e = 1.70158,
      f = 0,
      g = b;
    if (0 == a) return c;
    if (1 == (a /= d)) return c + b;
    f || (f = 0.3 * d);
    g < Math.abs(b) ?
      ((g = b), (e = f / 4)) :
      (e = (f / (2 * Math.PI)) * Math.asin(b / g));
    return (-(
      g *
      Math.pow(2, 10 * (a -= 1)) *
      Math.sin(((a * d - e) * 2 * Math.PI) / f)
    ) + c);
  },
  easeOutElastic: function(e, a, c, b, d) {
    var e = 1.70158,
      f = 0,
      g = b;
    if (0 == a) return c;
    if (1 == (a /= d)) return c + b;
    f || (f = 0.3 * d);
    g < Math.abs(b) ?
      ((g = b), (e = f / 4)) :
      (e = (f / (2 * Math.PI)) * Math.asin(b / g));
    return (
      g * Math.pow(2, -10 * a) * Math.sin(((a * d - e) * 2 * Math.PI) / f) +
      b +
      c
    );
  },
  easeInOutElastic: function(e, a, c, b, d) {
    var e = 1.70158,
      f = 0,
      g = b;
    if (0 == a) return c;
    if (2 == (a /= d / 2)) return c + b;
    f || (f = d * 0.3 * 1.5);
    g < Math.abs(b) ?
      ((g = b), (e = f / 4)) :
      (e = (f / (2 * Math.PI)) * Math.asin(b / g));
    return 1 > a ?
      -0.5 *
      g *
      Math.pow(2, 10 * (a -= 1)) *
      Math.sin(((a * d - e) * 2 * Math.PI) / f) +
      c :
      0.5 *
      g *
      Math.pow(2, -10 * (a -= 1)) *
      Math.sin(((a * d - e) * 2 * Math.PI) / f) +
      b +
      c;
  },
  easeInBack: function(e, a, c, b, d, f) {
    void 0 == f && (f = 1.70158);
    return b * (a /= d) * a * ((f + 1) * a - f) + c;
  },
  easeOutBack: function(e, a, c, b, d, f) {
    void 0 == f && (f = 1.70158);
    return b * ((a = a / d - 1) * a * ((f + 1) * a + f) + 1) + c;
  },
  easeInOutBack: function(e, a, c, b, d, f) {
    void 0 == f && (f = 1.70158);
    return 1 > (a /= d / 2) ?
      (b / 2) * a * a * (((f *= 1.525) + 1) * a - f) + c :
      (b / 2) * ((a -= 2) * a * (((f *= 1.525) + 1) * a + f) + 2) + c;
  },
  easeInBounce: function(e, a, c, b, d) {
    return b - jQuery.easing.easeOutBounce(e, d - a, 0, b, d) + c;
  },
  easeOutBounce: function(e, a, c, b, d) {
    return (a /= d) < 1 / 2.75 ?
      b * 7.5625 * a * a + c :
      a < 2 / 2.75 ?
      b * (7.5625 * (a -= 1.5 / 2.75) * a + 0.75) + c :
      a < 2.5 / 2.75 ?
      b * (7.5625 * (a -= 2.25 / 2.75) * a + 0.9375) + c :
      b * (7.5625 * (a -= 2.625 / 2.75) * a + 0.984375) + c;
  },
  easeInOutBounce: function(e, a, c, b, d) {
    return a < d / 2 ?
      0.5 * jQuery.easing.easeInBounce(e, 2 * a, 0, b, d) + c :
      0.5 * jQuery.easing.easeOutBounce(e, 2 * a - d, 0, b, d) + 0.5 * b + c;
  },
});

// jQuery throttle / debounce - v1.1 - 3/7/2010
(function(b, c) {
  var $ = b.jQuery || b.Cowboy || (b.Cowboy = {}),
    a;
  $.throttle = a = function(e, f, j, i) {
    var h,
      d = 0;
    if (typeof f !== "boolean") {
      i = j;
      j = f;
      f = c;
    }

    function g() {
      var o = this,
        m = +new Date() - d,
        n = arguments;

      function l() {
        d = +new Date();
        j.apply(o, n);
      }

      function k() {
        h = c;
      }
      if (i && !h) {
        l();
      }
      h && clearTimeout(h);
      if (i === c && m > e) {
        l();
      } else {
        if (f !== true) {
          h = setTimeout(i ? k : l, i === c ? e - m : e);
        }
      }
    }
    if ($.guid) {
      g.guid = j.guid = j.guid || $.guid++;
    }
    return g;
  };
  $.debounce = function(d, e, f) {
    return f === c ? a(d, e, false) : a(d, f, e !== false);
  };
})(this);

(function() {
  if (window.innerWidth <= 991) {
    var $tagsBlock = $("#cycleitems").parent();
    // Call Sly on tagsBlock
    $tagsBlock.sly({
      horizontal: 1,
      itemNav: "basic",
      smart: 1,
      activateOn: "click",
      mouseDragging: 1,
      touchDragging: 1,
      releaseSwing: 1,
      startAt: 0,
      scrollBar: $("#cycleitems").parent().find(".bar"),
      scrollBy: 1,
      speed: 3000,
      elasticBounds: 1,
      easing: "easeOutExpo",
      dragHandle: 1,
      dynamicHandle: 1,
      clickBar: 1,
      cycleBy: null,
      cycleInterval: 4000,
      pauseOnHover: 1,
    });
  }
  if (window.innerWidth <= 1400) {
    $(".data-info .info").after($("#canvasItems").parent());
    var $frame = $("#canvasItems").parent();
    // Call Sly on frame
    $frame.sly({
      horizontal: 1,
      itemNav: "basic",
      smart: 1,
      activateOn: "click",
      mouseDragging: 1,
      touchDragging: 1,
      releaseSwing: 1,
      startAt: 0,
      scrollBar: $("#canvasItems").parent().find(".bar"),
      scrollBy: 1,
      speed: 1000,
      elasticBounds: 1,
      easing: "easeOutExpo",
      dragHandle: 1,
      dynamicHandle: 1,
      clickBar: 1,
      cycleBy: null,
      cycleInterval: 2000,
      pauseOnHover: 1,
    });
  }
  var resizeTimer,
    width = window.innerWidth;
  $(window).resize(function(e) {
    if (width !== window.innerWidth) {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function() {
        refreshChartJs();
        $("#cycleitems").parent().sly(false);
        $("#canvasItems").parent().sly(false);
        if (window.innerWidth <= 1400) {
          if ($(".data-info").next().find("#canvasItems").length > 0) {
            $(".data-info .info").after($("#canvasItems").parent());
          }
          setTimeout(() => {
            let $frame = $("#canvasItems").parent();
            // Call Sly on frame
            $frame.sly({
              horizontal: 1,
              itemNav: "basic",
              smart: 1,
              activateOn: "click",
              mouseDragging: 1,
              touchDragging: 1,
              releaseSwing: 1,
              startAt: 0,
              scrollBar: $("#canvasItems").parent().find(".bar"),
              scrollBy: 1,
              speed: 1000,
              elasticBounds: 1,
              easing: "easeOutExpo",
              dragHandle: 1,
              dynamicHandle: 1,
              clickBar: 1,
              cycleBy: null,
              cycleInterval: 2000,
              pauseOnHover: 1,
            });
          }, 1000);
          $(".checkboxToggle").css("display", "inline-flex");
          $(".profile .profile-container").prepend($("#checkboxToggle").parent());
          $(".sidebar-container .sidebar-overlay").hide();
          $(".sidebar-container .sidebar").css("transform", "translateX(-100px)");
          $("nav.navbar .toggler").removeClass("active");
        } else {
          if ($(".data-info").next().find("#canvasItems").length == 0) {
            $(".data-info").after($("#canvasItems").parent());
          }
          if (!$("nav.navbar .toggler").hasClass("active")) {
            $("nav.navbar .toggler").addClass("active");
            $(".sidebar-container .sidebar-overlay").fadeIn();
            $(".sidebar-container .sidebar").css("transform", "translateX(0px)");
          }
          $("nav.navbar form").after($("#checkboxToggle").parent());
        }
        if (window.innerWidth <= 991) {
          let $tagsBlock = $("#cycleitems").parent();
          // Call Sly on tagsBlock
          $tagsBlock.sly({
            horizontal: 1,
            itemNav: "basic",
            smart: 1,
            activateOn: "click",
            mouseDragging: 1,
            touchDragging: 1,
            releaseSwing: 1,
            startAt: 0,
            scrollBar: $("#cycleitems").parent().find(".bar"),
            scrollBy: 1,
            speed: 3000,
            elasticBounds: 1,
            easing: "easeOutExpo",
            dragHandle: 1,
            dynamicHandle: 1,
            clickBar: 1,
            cycleBy: null,
            cycleInterval: 4000,
            pauseOnHover: 1,
          });
        }
        if (window.innerWidth <= 600) {
          if ($(".navbar-mobile").length == 0) {
            $("<div class='navbar-mobile'></div>").appendTo("nav.navbar.header");
            $(".navbar-mobile").prepend($("nav.navbar ul.navbar-nav"));
            $("nav.navbar ul.navbar-nav").css("display", "flex");
            $("nav.navbar form").css("display", "flex");
            $(".navbar-mobile").prepend($("nav.navbar form"));
          }
        } else {
          $("nav.navbar.header .logo").after($(".navbar-mobile ul.navbar-nav"));
          $("nav.navbar.header  ul.navbar-nav").after($(".navbar-mobile form"));
          $(".navbar-mobile").remove();
        };
      }, 250);
    }
  });
})();