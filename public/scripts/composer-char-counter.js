var $;

$(function() {
  //On a keyup in the textarea, the counter shows how many
  //characters remain and will turn red if less than 0
  $(".new-tweet").on("keyup", "textarea", event => {
    const tweetLength = event.target.value.length;
    const counterElm = $(event.target)
      .parent()
      .find(".counter");
    const currentCounter = 140 - tweetLength;
    if (currentCounter < 0) {
      counterElm.addClass("char-limit-exceeded");
    } else {
      counterElm.removeClass("char-limit-exceeded");
    }
    counterElm.text(currentCounter);
  });
});
