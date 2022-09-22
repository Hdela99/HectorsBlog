const signupFormHandler = async function (event) {
  event.preventDefault();

  const usernameEl = document.querySelector("#username-signup");
  const passwordEl = document.querySelector("#password-signup");

  const response = await fetch("/api/user", {
    method: "POST",
    body: JSON.stringify({
      username: usernameEl.value.trim(),
      password: passwordEl.value.trim(),
    }),
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    document.location.replace("/dashboard");
  } else {
    alert("Failed to sign up");
  }
};

document
  .querySelector("#signup-form")
  .addEventListener("submit", signupFormHandler);
