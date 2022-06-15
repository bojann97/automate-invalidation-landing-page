const EventName = Object.freeze({
  "lead": "Lead",
  "initiateCheckout": "InitiateCheckout"
});

function pushFacebookEvent(eventName) {
  switch (eventName) {
    case EventName.lead:
    case EventName.initiateCheckout:
      if (typeof fbq === "function") {
        fbq('track', eventName);
      }
    default:
      break;
  }
}

document.addEventListener("DOMContentLoaded", function() {
  var checkoutButtons = document.getElementsByClassName("track-checkout-button");
  for (iterator = 0; iterator < checkoutButtons.length; iterator++) {
    checkoutButtons[iterator].addEventListener("click", function() {
      pushFacebookEvent(EventName.initiateCheckout);
    });
  }
});
