var $;

$(function() {
  //Clicking compose button in Nav will toggle a compose tweet section into DOM
  $(".nav-bar").on("click", "button", function() {
    $(this).toggleClass("compose-toggle");
    $(".new-tweet").stop();
    $(".new-tweet").slideToggle("fast");
    $("textarea").focus();
  });
  //Given a date (miliseconds), returns a string with time elapsed since that date
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
  //given a tweet object (from db), constructs a tweet with html elements
  function createTweetElement(tweetObj) {
    // constructs the article element
    const $article = $("<article>").addClass("tweet");
    // constructs elements that will be nested in the header element
    const $img = $("<img>")
      .addClass("user-avatar")
      .attr("src", tweetObj.user.avatars.small);
    const $h1 = $("<h1>")
      .addClass("user-name")
      .text(tweetObj.user.name);
    const $userHandle = $("<p>")
      .addClass("user-handle")
      .text(tweetObj.user.handle);

    // construts the header element appends all the nested elements
    const $header = $("<header>")
      .addClass("tweet-header")
      .append($img)
      .append($h1)
      .append($userHandle);

    $article.append($header);

    // constructs the main element and appends the nested p elemnent containing
    // the content of a tweet
    const $tweetContent = $("<p>")
      .addClass("tweet-content")
      .text(tweetObj.content.text);
    const $main = $("<main>").append($tweetContent);

    $article.append($main);

    //constructs all elements that will be nested in the tweet footer element
    const tweetDate = timeSince(tweetObj.created_at);
    const $timestamp = $("<p>")
      .addClass("tweet-timestamp")
      .text(tweetDate);
    const $flagIcon = $("<i>").addClass("fa fa-flag tweet-actions");
    const $retweetIcon = $("<i>").addClass("fa fa-retweet tweet-actions");
    const $favIcon = $("<i>").addClass("fa fa-heart-o tweet-actions");
    // constructs tweet footer element and appends nested elements
    const $footer = $("<footer>")
      .addClass("tweet-footer")
      .append($timestamp)
      .append($flagIcon)
      .append($retweetIcon)
      .append($favIcon);

    $article.append($footer);

    return $article;
  }

  // On a click event on `tweet button`, if textarea is empty or the character
  // limit is exceeded will return error message
  // otherwise will serialize the form data and POST using AJAX re-load all tweets
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
    $.post("/tweets", tweetContent, function() {
      input.val("");
      loadTweets();
    });
  });

  // Sends an get request using AJAX and loads all the tweets from DB,
  // using the render tweets function
  function loadTweets() {
    $.get("/tweets", function(tweets) {
      renderTweets(tweets);
    });
  }

  loadTweets();

  // Given an array of tweet objects, will use createTweetElement function to
  // construct tweet html elements for each tweet object passed in from db
  function renderTweets(tweets) {
    $(".tweets-container").empty();
    tweets.forEach(tweet => {
      $(".tweets-container").prepend(createTweetElement(tweet));
    });
    return tweets;
  }
});
