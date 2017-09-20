/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
var data = [
  {
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
      text:
        "If I have seen further it is by standing on the shoulders of giants"
    },
    created_at: 1461116232227
  },
  {
    user: {
      name: "Descartes",
      avatars: {
        small: "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
        regular: "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
        large: "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
      },
      handle: "@rd"
    },
    content: {
      text: "Je pense , donc je suis"
    },
    created_at: 1461113959088
  },
  {
    user: {
      name: "Johann von Goethe",
      avatars: {
        small: "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
        regular: "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
        large: "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
      },
      handle: "@johann49"
    },
    content: {
      text: "Es ist nichts schrecklicher als eine tätige Unwissenheit."
    },
    created_at: 1461113796368
  }
];

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

function renderTweets(tweets) {
  tweets.forEach(tweet => {
    createTweetElement(tweet);
  });
  return tweets;
}
renderTweets(data);
