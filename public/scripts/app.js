/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(function() {
  $("#nav-bar").on("click", "button", function(event) {
    $(this).toggleClass("compose-toggle");
    $(".new-tweet").slideToggle("fast");
    $("textarea").focus();
  });
  function timeSince(date) {
    var seconds = Math.floor((new Date() - date) / 1000);
    var interval = Math.floor(seconds / 31536000);
    if (interval > 1) {
      return interval + " years ago";
    }
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
      return interval + " months ago";
    }
    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
      return interval + " days ago";
    }
    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
      return interval + " hours ago";
    }
    interval = Math.floor(seconds / 60);
    if (interval > 1) {
      return interval + " minutes ago";
    }
    if (seconds < 5) {
      return "Just now";
    }
    return Math.floor(seconds) + " seconds ago";
  }

  function createTweetElement(tweetObj) {
    const $article = $("<article>").addClass("tweet");
    const $img = $("<img>").attr("src", tweetObj.user.avatars.small);
    const $h1 = $("<h1>").text(tweetObj.user.name);
    const $userHandle = $("<p>").text(tweetObj.user.handle);

    const $header = $("<header>")
      .append($img)
      .append($h1)
      .append($userHandle);

    $article.append($header);

    const $tweetContent = $("<p>").text(tweetObj.content.text);
    const $main = $("<main>").append($tweetContent);

    $article.append($main);

    const tweetDate = timeSince(tweetObj.created_at);
    const $timestamp = $("<p>").text(tweetDate);
    const $flagIcon = $("<i>").addClass("fa fa-flag tweet-actions");
    const $retweetIcon = $("<i>").addClass("fa fa-retweet tweet-actions");
    const $favIcon = $("<i>").addClass("fa fa-heart-o tweet-actions");
    const $footer = $("<footer>")
      .append($timestamp)
      .append($flagIcon)
      .append($retweetIcon)
      .append($favIcon);

    $article.append($footer);

    return $article;
  }

  $("form").on("click", "input", function(event) {
    event.preventDefault();
    const input = $("textarea");
    const emptyTweet = $(
      "<div>NO POSTING EMPTY TWEETS, YOU TWIT</div>"
    ).addClass("error");
    const tooManyChars = $("<div>Character Limit Exceeded!</div>").addClass(
      "error"
    );
    if (input.val().length > 140) {
      $(".new-tweet").prepend(tooManyChars);
      tooManyChars.fadeOut(5000);
      return;
    }
    if (!input.val() || input.val() === null) {
      $(".new-tweet").prepend(emptyTweet);
      emptyTweet.fadeOut(5000);
      return;
    }
    const tweetContent = $("form").serialize();
    $.post("/tweets", tweetContent, function(result) {
      input.val("");
      loadTweets();
    });
  });

  function loadTweets() {
    $.get("/tweets", function(tweets) {
      renderTweets(tweets);
    });
  }

  loadTweets();

  function renderTweets(tweets) {
    $("#tweets-container").empty();
    tweets.forEach(tweet => {
      $("#tweets-container").prepend(createTweetElement(tweet));
    });
    return tweets;
  }
});
