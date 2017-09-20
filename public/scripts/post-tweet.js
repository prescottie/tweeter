$(function() {
  $("form").on("click", "input", event => {
    event.preventDefault();
    const tweetContent = $("form").serialize();
    $.post("/tweets", tweetContent, function(result) {
      console.log(result);
    });
  });
});
