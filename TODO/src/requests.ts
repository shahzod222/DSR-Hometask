export function logout() {
  fetch("http://localhost:3000/api/v1/logout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
}

export async function me() {
  const response = await fetch("http://localhost:3000/api/v1/me", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  const data = await response.json();

  return data;
}
