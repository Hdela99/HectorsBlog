async function commentFormHandler(event) {
  event.preventDefault();
  const comment = document.querySelector(`#comment-body`).value.trim();

  const post_id = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
  ];
  parseInt(post_id, 10);
  console.log("THIS IS MY POST_ID:" + post_id);
  console.log(typeof post_id);
  console.log("This is my content " + comment);
  if (comment) {
    const response = await fetch("/api/comment", {
      method: "POST",
      body: {
        content: comment,
        post_id: post_id,
      },
      header: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      document.location.reload();
    } else {
      alert(response.statusText);
    }
  }
}
commentForm = document.querySelector("#comment-form");
if (commentForm) {
  commentForm.addEventListener("submit", commentFormHandler);
}
