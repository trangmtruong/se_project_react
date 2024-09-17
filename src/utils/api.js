const baseUrl = "http://localhost:3001";

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  // if the server returns an error, reject the promise
  return Promise.reject(`Error: ${res.status}`);
  //throw new Error(`Error: ${res.status}`);
}

function request(url, options) {
  return fetch(url, options).then(checkResponse);
}

function getItems() {
  return request(`${baseUrl}/items`);
}

function createCard({ name, imageUrl, weather, token }) {
  return request(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json", // Add Content-Type header
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name,
      imageUrl,
      weather,
    }),
  });
}

function deleteCard(cardId, token) {
  return request(`${baseUrl}/items/${cardId}`, {
    method: "DELETE",
    authorization: `Bearer ${token}`,
  });
}

export { getItems, createCard, deleteCard, request, checkResponse, baseUrl };
