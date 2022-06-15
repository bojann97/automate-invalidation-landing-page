var STAGING_API_URL = "https://3w3309rh85.execute-api.eu-central-1.amazonaws.com/staging/subscribe";
var PROD_API_URL = "https://pbpyrdndk3.execute-api.eu-central-1.amazonaws.com/production/subscribe";
var PROD_HOSTNAME = "tryberry.app";

function updateText() {
  "use strict";
  var i18n = $.i18n();

  i18n
    .load({
      en: "translations/en_3.json",
      de: "translations/de_3.json",
    })
    .done(function() {
      $("body").i18n();
    });
}

function setTranslationsForFormInputs() {
  var language = window.navigator.userLanguage || window.navigator.language;

  // when user types remove warning messages
  $("#name").attr("oninput", "setCustomValidity('')");
  $("#email").attr("oninput", "setCustomValidity('')");

  if (language.includes("de")) {
    $("#name").attr("oninvalid", "setCustomValidity('Please enter your name')");
    $("#email").attr("oninvalid", "setCustomValidity('Please enter a valid email.')");

    $("#name").attr("placeholder", "Enter your complete name");
    $("#email").attr("placeholder", "Enter your email address");
  } else {
    $("#name").attr("oninvalid", "setCustomValidity('Please enter your name')");
    $("#email").attr("oninvalid", "setCustomValidity('Please enter a valid email')");

    $("#name").attr("placeholder", "Enter your complete name");
    $("#email").attr("placeholder", "Enter your email address");
  }
}

function closeModal(e) {
  if ($(e.target).attr("class").split(" ").indexOf("close-modal") > -1) {
    $("#modal").hide();
    $("body").css({
      overflow: "visible",
    });
  }
}

$(document).ready(function($) {
  "use strict";

  updateText();
  setTranslationsForFormInputs();

  $(".close-modal").click(closeModal);

  $("#waitlist-form").submit(function(event) {
    var name = $("#name").val();
    var termsCheck = $("#terms-check").prop('checked');
    var email = $("#email").val().toLowerCase();

    function isEmailValid(emailValue) {
      var emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

      if (emailRegex.test(emailValue)) {
        return true;
      }

      return false;
    }

    if (isEmailValid(email) && termsCheck) {
      pushFacebookEvent(EventName.lead);
      $("#modal").show();
      $(".modal").hide();
      $(".loader-wrapper").show();

      $("body").css({
        overflow: "hidden",
      });

      $.ajax({
        type: "POST",
        contentType: "application/json",
        url: window.location.hostname === PROD_HOSTNAME ? PROD_API_URL : STAGING_API_URL,
        data: JSON.stringify({
          fullName: name,
          email: email
        }),
        success: function(data, status, jqXHR) {
          if (typeof gtag === "function") {
            gtag({
              'event': 'subscribed_to_waitlist'
            });
          }
          $("#name").val("");
          $("#email").val("");
          $("#terms-check").prop('checked', false);
          $(".modal").show();
          $(".loader-wrapper").hide();
        },
        error: function() {
          if (typeof gtag === "function") {
            gtag({
              'event': 'subscription_error'
            });
          }
          $("#modal").hide();
          $("body").css({
            overflow: "visible",
          });
        },
      });
    }

    event.preventDefault();
  });
});
