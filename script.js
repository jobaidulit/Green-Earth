
const categoriesContainer = document.getElementById("categoriesContainer");
// Category btn
async function loadCategories() {
  // async await
  const res = await fetch(
    "https://openapi.programming-hero.com/api/categories",
  );
  const data = await res.json();
  //   console.log(data);
  //   console.log(categoriesContainer);
  data.categories.forEach((category) => {
    // console.log(category);
    const btn = document.createElement("button");
    btn.className = "btn btn-outline w-full";
    btn.textContent = category.category_name;
    btn.onclick = () => selectCategory(category.id, btn);
    categoriesContainer.appendChild(btn);
  });
}

async function loadTrees() {
  const res = await fetch("https://openapi.programming-hero.com/api/plants");
  const data = await res.json();
  displayTrees(data.plants);
}

function displayTrees(trees){
 trees.forEach((tree)=>{
     const card = document.createElement("div");
    card.className = `card bg-white shadow-sm border-b-2 ${tree.price > 500 ? "border-red-500" : "border-green-500"}`;
    card.innerHTML = `<figure>
        <img
          src="${tree.image}"
          alt="${tree.name}"
          title="${tree.name}"
          class="h-48 w-full object-cover cursor-pointer"
          onclick="openTreeModal(${tree.id})"
        />
      </figure>
      <div class="card-body">
        <h2 class="card-title cursor-pointer hover:text-[#4ade80]" onclick="openTreeModal(${tree.id})">${tree.name}</h2>
        <p class="line-clamp-2">
          ${tree.description}
        </p>
        <div class="badge badge-success badge-outline">${tree.category}</div>

        <div class="flex justify-between items-center">
          <h2 class="font-bold text-xl ${tree.price > 500 ? "text-red-500" : "text-[#4ade80]"}">$${tree.price}</h2>
          <button class="btn btn-primary" onclick="addToCart(${tree.id}, '${tree.name}', ${tree.price})">Cart</button>
        </div>
      </div>`;
    treesContainer.appendChild(card);
  })
}

loadCategories()
loadTrees()

