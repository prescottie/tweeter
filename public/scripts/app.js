/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
var tweetData = {
  user: {
    name: "Newton",
    avatars: {
      small: "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
      regular: "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
      large: "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
    },
    handle: "@SirIsaac"
  },
  content: {
    text: "If I have seen further it is by standing on the shoulders of giants"
  },
  created_at: 1461116232227
};

function createTweetElement(tweetObj) {
  $(function() {
    const $article = $("<article>").addClass("tweet");
    $("#tweets-container").append($article);
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

    const tweetDate = Date(tweetObj.created_at);
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
  });
}

var $tweet = createTweetElement(tweetData);

// Test / driver code (temporary)
console.log($tweet); // to see what it looks like
