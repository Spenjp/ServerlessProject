const API_URL =
  "https://qfw4vyfr40.execute-api.us-east-1.amazonaws.com/characters";

fetch(API_URL)
  .then((res) => res.json())
  .then((characters) => {
    const grid = document.getElementById("characterGrid");
    characters.forEach((c) => {
      grid.innerHTML += `
        <div class="card">
          <img src="${c.imageURL}" alt="${c.name}" />
          <h2>${c.name}</h2>
          <p>${c.description || ""}</p>
          ${c.category ? `<span class="tag">${c.category}</span>` : ""}
        </div>
      `;
    });
  })
  .catch((err) => {
    console.error("Error fetching characters:", err);
    document.getElementById("characterGrid").innerHTML =
      "<p>Could not load Christmas characters. Please try again later.</p>";
  });
