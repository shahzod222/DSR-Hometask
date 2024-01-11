export function logout() {
  fetch("http://localhost:3000/api/v1/logout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
}
