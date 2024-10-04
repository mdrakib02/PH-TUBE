

const loadCategories = () => {

    // Fetch-----------------
    fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
        .then((res) => res.json())
        .then((data) => displayCatagories(data.categories))
        .catch((error) => console.log(error))
}

// The function is for using for display videos loaded  (fetch API)
const loadVideos = () => {
    // Fetch-----------------
    fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
        .then((res) => res.json())
        .then((data) => displayVideos(data.videos))
        .catch((error) => console.log(error))
}



const displayVideos = (videos) => {
    const videoContainer = document.getElementById("videoContainer");
   
    videoContainer.innerHTML = "";

    if(videos.length === 0){
      videoContainer.classList.remove("grid")
      videoContainer.innerHTML =   `
      <dib class="main-h-screen mx-auto flex flex-col gap-5 justify-center items-center"> 
      <img  src="./asset/Icon.png" />
      <h2 class="text-xl font-bold text-center text-gray-500">There is no content </h2>
      </dib>
      `;
        return
    } else{
         videoContainer.classList.add("grid")
    }


    videos.forEach((video) => {
        console.log(video)
        const card = document.createElement("div");
        card.classList = "card"
        card.innerHTML = `
     <figure class = "h-[200px] rounded-lg relative">
         <img
         class = "w-full h-full object-cover"
         src="${video.thumbnail} "
        alt="Shoes" />
        ${video.others.posted_date?.length === 0
            ? "" : `<span class="absolute right-2 bottom-2 bg-black p-1 rounded-md text-white text-xs">${getPostTime(video.others.posted_date)}</span>`}
    </figure>
    <div class="px-0 py-2 flex gap-2">
        <div>
        <img class="w-10 h-10 rounded-full object-cover" src = "${video.authors[0].profile_picture}" />
        </div>
        <div>
        <h2 class ="font-bold">${video.title}<h2/>
        <div class="flex gap-x-2 items-center"> 
        <p class="text-gray-400">${video.authors[0].profile_name}</p>
         ${video.authors[0].verified === true ? '<img class="w-5" src ="https://img.icons8.com/?size=48&id=SRJUuaAShjVD&format=png" />' : ''}
        </div>
        <p class="text-xs text-gray-400">${video.others.views}</p>
        </div>
        
     </div>
        `
        videoContainer.append(card);
    })
}


// display category sections 

const categoryButton = (id) => {
    fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
        .then((res) => res.json())
        .then((data) => {
            activeColorBtn();
            const activeButton = document.getElementById(`btn-${id}`)
            activeButton.classList.add("active")
            displayVideos(data.category)
        })
        .catch((error) => console.log(error))
}


// Category sections

const activeColorBtn = () =>{
    const categoryBtn = document.getElementsByClassName("category-btn");
    for(btn of categoryBtn){
        btn.classList.remove("active");
    }
}
// Display Categories Button 
const displayCatagories = (categories) => {
    const categoriesContainer = document.getElementById("categories-container");

    categories.forEach((item) => {
        console.log(item)
        const buttonContainer = document.createElement("button");
        buttonContainer.innerHTML = `
        <button id="btn-${item.category_id}" onclick = "categoryButton(${item.category_id})" class="btn category-btn">${item.category}</button>
        `
        categoriesContainer.append(buttonContainer);

    })
}

// The Function using for counting time 
function getPostTime (time){
    const hours = parseInt(time / 3600);
    const remainingTime = (time % 3600);
    const minute = parseInt(remainingTime / 60);
    const second = (remainingTime % 60);
    return `${hours}:${minute}:${second} sec ago`
}

loadCategories();
loadVideos();




