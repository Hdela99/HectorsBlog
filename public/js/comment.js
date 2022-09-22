async function commentFormHandler(event) {
  event.preventDefault();
  const comment = document.querySelector(`#comment-body`).value.trim();

  const post_id = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
  ];
  parseInt(post_id, 10);
  if (comment) {
    const response = await fetch("/api/comment", {
      method: "POST",
      body: JSON.stringify({
        content: comment,
        post_id: post_id,
      }),
      headers: {
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
