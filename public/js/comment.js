async function commentFormHandler(event) {
  event.preventDefault();

  const comment = document.querySelector(`#comment-body`).value.trim();

  const post_id =
    window.Location.toString().split("/")[
      window.Location.toString().split("/").length - 1
    ];

  if (comment) {
    const response = await fetch("/api/comment", {
      method: "POST",
      body: JSON.stringify({
        post_id,
        comment,
      }),
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
