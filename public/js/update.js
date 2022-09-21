const post_id = window.location.toString().split("/")[
  window.location.toString().split("/").length - 1
];

const editFormHandler = async function (event) {
  event.preventDefault();

  const titleEl = document.querySelector("#post-title").value;
  const bodyEl = document.querySelector("#post-content").value;

  await fetch(`/api/post/${post_id}`, {
    method: "PUT",
    body: JSON.stringify({
      id: post_id,
      title: titleEl,
      contents: bodyEl,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  console.log(post_id);

  document.location.replace("/dashboard");
};

const deleteClickHandler = async function () {
  await fetch(`/api/post/${post_id}`, {
    method: "DELETE",
  });

  document.location.replace("/dashboard");
};

document
  .querySelector("#edit-post-form")
  .addEventListener("submit", editFormHandler);
document
  .querySelector("#delete-post-btn")
  .addEventListener("click", deleteClickHandler);
