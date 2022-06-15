document.addEventListener("DOMContentLoaded", function() {
  var accordions = document.getElementsByClassName("accordion");
  var iterator;

  for (iterator = 0; iterator < accordions.length; iterator++) {

    accordions[iterator].getElementsByClassName("accordion-header")[0].addEventListener("click", function() {
      this.parentElement.classList.toggle("active");
      var accordionBody = this.parentElement.getElementsByClassName("accordion-body")[0];
      if (accordionBody.style.opacity) {
        accordionBody.style.opacity = null;
        accordionBody.style.maxHeight = "0px";
      } else {
        accordionBody.style.opacity = 1;
        accordionBody.style.maxHeight = "10000px";
        this.scrollIntoView(true);
      }
    });
  }
});
