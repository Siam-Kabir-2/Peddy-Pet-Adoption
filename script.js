document.addEventListener("DOMContentLoaded", () => {
  let categoryUrl = "https://openapi.programming-hero.com/api/peddy/categories";
  let allPetsUrl = "https://openapi.programming-hero.com/api/peddy/pets";

  let category = document.querySelector(".category");

  document.querySelectorAll(".refresh").forEach((button) => {
    button.addEventListener("click", () => {
      location.reload();
    });
  });

  document.querySelector(".view-more").addEventListener("click", () => {
    document.querySelector("#adopt").scrollIntoView({ behavior: "smooth" });
  });

  async function getCategories() {
    try {
      await loadingScreen(2000);
      let res = await axios.get(categoryUrl);
      // console.log(res.data.categories);
      show(res.data.categories);
      // return res.data.categories;
    } catch (err) {
      console.log(err);
    }
  }

  let loading = document.querySelector(".loader");

  async function loadingScreen(delay) {
    loading.style.display = "flex";
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
        loading.style.display = "none";
      }, delay);
    });
  }

  async function show(item) {
    item.forEach((element) => {
      let cate = document.createElement("div");
      let im = document.createElement("img");
      let te = document.createElement("p");
      im.src = "";
      cate.innerHTML = "";
      te.innerHTML = "";
      im.src = `${element.category_icon}`;
      console.dir(im);
      te.innerHTML = `&nbsp${element.category}`;
      console.log(element.category);
      im.className = `sm:h-10  sm:w-10 h-8 w-8`;
      cate.appendChild(im);
      cate.appendChild(te);
      cate.setAttribute(
        "data-url",
        `https://openapi.programming-hero.com/api/peddy/category/${element.category}`
      );
      category.appendChild(cate);
      cate.className = `btn max-w-[312px] font-bold shadow-none  border-1 text-black  text-lg sm:text-xl  py-7 sm:py-9 px-9 bg-white border-[#0E7A8133] rounded-xl`;
      cateClick(cate);
    });
  }

  let activeCat = null;
  let bColor = ["border-[#0E7A81]", "rounded-full"];

  let clickedCatetoryURL = null;

  function cateClick(ca) {
    ca.addEventListener("click", (event) => {
      let currCat = event.currentTarget;
      if (activeCat) {
        activeCat.classList.remove(...bColor);
        activeCat.classList.add("rounded-xl");
      }
      currCat.classList.remove("rounded-xl");
      currCat.classList.add(...bColor);
      activeCat = currCat;
      // console.log(activeCat);
      console.log(event.currentTarget);
      clickedCatetoryURL = currCat.getAttribute("data-url");
      console.log(clickedCatetoryURL);
      getByCategory(clickedCatetoryURL);
    });
  }

  getCategories();
  let activePets = [];

  let showPetsContainer = document.querySelector(".showPets");

  async function getAllPets() {
    try {
      let res = await axios.get(allPetsUrl);
      console.log(res.data.pets);
      showPets(res.data.pets);
      activePets = res.data.pets;
      return res.data.pets;
    } catch (err) {
      console.log(err);
    }
  }
  let sBP = document.querySelector(".sortBy");
  sBP.addEventListener("click", sortByPrice);

  function sortByPrice() {
    activePets.sort((a, b) => a.price - b.price);
    console.log("sorting called");
    console.log(activePets);
    showPets(activePets);
  }

  let likeBtn = null;
  let adoptBtn = null;
  let detailsBtn = null;

  async function showPets(item) {
    try {
      showPetsContainer.innerHTML = "";
      if (item.length == 0) {
        showPetsContainer.classList.remove(
          "grid-cols-1",
          "xl:grid-cols-3",
          "sm:grid-cols-2"
        );
        showPetsContainer.classList.add("grid-cols-1");
        showPetsContainer.innerHTML = `<div class="flex flex-col items-center justify-center w-full rounded-2xl bg-gray-100 p-20">
    <div class="  max-w-2xl w-full mx-auto">
      
      <div class="flex justify-center mb-8">
        <div class="w-32 h-32"> 
          <img src="https://i.ibb.co.com/b0WRp6D/image.png" alt="image" border="0">
        </div>
      </div>
      
      <h2 class="text-3xl font-bold text-center mb-4">No Information Available</h2>
      
      <p class="text-center text-gray-600">
        It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a.
      </p>
      
    </div>
  </div>`;
      } else {
        showPetsContainer.classList.add(
          "grid-cols-1",
          "xl:grid-cols-3",
          "sm:grid-cols-2"
        );
        showPetsContainer.classList.remove("grid-cols-1");
      }

      item.forEach((ele) => {
        console.log(ele.image);
        let pet = document.createElement("div");
        let img = ele.image;
        pet.innerHTML = "";
        // let petImg = document.createElement("img");

        pet.innerHTML = `
      <img src="${ele.image}" alt="Pet Image" class="w-full h-40 object-cover rounded-2xl"> 
      <div class="">
       <h2 class="text-xl font-semibold mt-4 mb-2">${ele.pet_name}</h2>
    
        <div class="text-gray-600 space-y-1">
          <p>📑 Breed: ${ele.breed}</p>
          <p>📅 Birth: ${ele.date_of_birth}</p>
          <p>♀️ Gender: ${ele.gender}</p>
          <p>💲 Price: ${ele.price}$</p>
        </div>
        <hr class="my-4 opacity-10">
    
        <!-- Buttons -->
        <div class="flex justify-between mt-4 text-black">
          <button class="like border-[#0E7A8133] border  px-3 py-1 rounded-lg font-medium hover:border-[#0E7A81]"><img src="https://i.ibb.co.com/TqgNbmJ6/like.png" alt="like" class="w-4 h-4"></button>
          <button class="adopt border-[#0E7A8133] border  px-3 py-0 rounded-lg font-medium hover:border-[#0E7A81]">Adopt</button>
          <button class="details border-[#0E7A8133] border  px-3 py-2 rounded-lg font-medium hover:border-[#0E7A81]">Details</button>
        </div>
      </div>
      `;
        pet.className = `max-w-sm bg-white border border-[#00000030] hover:border-[#0E7A81] rounded-2xl shadow-md p-4 relative text-start`;
        showPetsContainer.appendChild(pet);

        likeBtn = pet.querySelector(".like");
        adoptBtn = pet.querySelector(".adopt");
        detailsBtn = pet.querySelector(".details");
        likeBtn.addEventListener("click", () => {
          showLiked(ele.image);
        });
        detailsBtn.addEventListener("click", () => {
          showDetails(ele);
        });
        adoptBtn.addEventListener("click", adoption);
      });
    } catch (err) {
      console.log(err);
    }
  }
  getAllPets();

  async function getByCategory(url) {
    try {
      await loadingScreen(2000);
      let res = await axios.get(url);
      console.log(res.data.data);
      activePets = res.data.data;
      showPetsContainer.innerHTML = "";
      showPets(res.data.data);
      return res.data.data;
    } catch (err) {
      console.log(err);
    }
  }
  let likedPets = document.querySelector(".likedPets");
  function showLiked(imgg) {
    likedPets.classList.add("border", "border-[#00000033]", "rounded-2xl");
    let likedPet = document.createElement("div");
    likedPet.innerHTML = "";
    likedPet.innerHTML = `
  <img src="${imgg}" alt="Pet Image" class="w-full h-[120px] object-cover rounded-2xl"> 
  `;
    likedPet.className = `max-w-sm bg-white rounded-2xl  relative text-start`;
    likedPets.appendChild(likedPet);
  }

  let modaal = document.querySelector(".modaal");
  function showDetails(ele) {
    console.log(ele);
    document.body.style.backfaceVisibility = "hidden";
    modaal.classList.remove("hidden");
    modaal.classList.add("flex");
    modaal.innerHTML = `
    <div class="md:flex z-40 flex-col md:w-[50%] w-[80%] max-h-screen bg-white rounded-xl p-3 m-6 md:p-6">
      <div class="md:shrink-0">
        <img class="max-h-[210px] min-w-full rounded-xl object-cover" src="${ele.image}" alt="Alessia Max">
      </div>
      <div class="py-3 w-full">
        <div class="uppercase tracking-wide text-lg text-black font-bold">${ele.pet_name} </div>
        <div class="my-2 grid grid-cols-1 md:grid-cols-2 text-[12px] text-gray-500">
          <div class="flex items-center mb-1">
            <img src="https://i.ibb.co.com/pvGqBDc5/card.png" alt="card" border="0" class="h-4 w-4 mr-3">
            <span>Breed: ${ele.breed} </span>
          </div>
          <div class="flex items-center mb-1">
          <img src="https://i.ibb.co.com/9Hvcf1mf/calendar.png" alt="calendar" border="0" class="h-4 w-4 mr-3">
            <span>Birth: ${ele.date_of_birth} </span>
          </div>
          <div class="flex items-center mb-1">
            <img src="https://i.ibb.co.com/XkZWZbXg/gender.png" alt="gender" border="0" class="h-4 w-4 mr-3">
            <span>Gender: ${ele.gender} </span>
          </div>
          <div class="flex items-center mb-1">
            <p class="mr-4 font-semibold text-sm ml-1">$</p>
            <span>Price: ${ele.price}$</span>
          </div>
          <div class="flex items-center mb-1">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Vaccinated status: ${ele.vaccinated_status} </span>
          </div>
        </div>
        <hr>
        <div class="mt-2">
          <div class="font-semibold mb-2">Details Information</div>
          <p class="text-[12px] text-gray-600">
            ${ele.pet_details} 
          </p>
          <ul class="list-disc list-inside text-[12px] text-gray-600 mt-2">
            <li>The point of using is that it has a more-or-less normal distribution of letters, as opposed to using.</li>
          </ul>
        </div>
        <div class="flex justify-end w-[100%] py-6 ">
          <button class="w-full bg-[#0E7A8138] hover:bg-gray-400 text-[#0E7A81] font-bold py-2 px-4 rounded-lg">
            Cancel
          </button>
        </div>
      </div>
    </div>
  `;
    const cancelButton = modaal.querySelector("button");
    cancelButton.addEventListener("click", () => {
      modaal.classList.add("hidden");
      counter.classList.remove("flex");
    });
    console.log(modaal);
  }

  let counter = document.querySelector(".count");

  async function adoption() {
    counter.innerText = "3";
    if (this.innerText == "Adopt") {
      counter.classList.remove("hidden");
      counter.classList.add("flex");
      for (let l = 2; l >= 0; l--) {
        setTimeout(() => {}, 1000);
        await counting(l, 1000);
      }
      counter.classList.add("hidden");
      counter.classList.remove("flex");
      // counter.innerText = "1";
      this.innerText = "Adopted";
    }
  }

  function counting(number, delay) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        counter.innerText = number;
        console.log(`Number changed to ${number}`);
        resolve("Number changed!");
      }, delay);
    });
  }
});
