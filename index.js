const loadPosts = async (searchText = 'comedy') => {
    const res = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts?category=${searchText}`)
    const post = await res.json();
    const postsDetails = post.posts;
    displayPosts(postsDetails);
    loadLatestPosts();
}

const displayPosts = (posts) => {
    const postContainer = document.getElementById('lets-discus');
    postContainer.textContent = '';

    posts.forEach((post) => {
        // console.log(post);

        if (post.isActive === true) {
            active = `<div id="active" class="bg-[#10B981] w-[14px] h-[14px] rounded-full -top-1 -right-1 absolute"></div>`
        }
        else {
            active = `<div id="active" class="bg-red-500 w-[14px] h-[14px] rounded-full -top-1 -right-1 absolute"></div>`
        }

        const postCard = document.createElement('div');
        postCard.innerHTML = `
                    <div
                        class="flex lg:flex-row flex-col bg-[#F3F3F5] lg:rounded-3xl rounded-xl p-5 lg:p-6 w-[400px] mx-auto lg:w-[772px] gap-6">
                        <div class=" w-[72px] relative  h-[72px]">
                            <img class="rounded-xl w-16" src="${post.image}">
                            ${active}
                        </div>
                        <div class="lg:w-[669px]">
                            <div class="flex text-[#12132DCC] text-sm gap-5 font-medium">
                                <p class=""># ${post.category}</p>
                                <p>Author : ${post.author.name}</p>
                            </div>
                            <h3 class="text-xl font-bold text-[#12132D] mt-3">${post.title}</h3>
                            <p class="text-[#12132D99] mt-4">${post.description}</p>
                            <hr class="border-dashed my-5 border-[#12132D3F]">
                            <div class="flex justify-between ">
                                <div class="flex gap-6 lg:gap-6 w-full">
                                    <p class="flex items-center lg:gap-3 gap-2"><img src="images/chat.png" alt="">${post.comment_count}</p>
                                    <p class="flex items-center lg:gap-3 gap-2"><img src="images/open-eye.png" alt="">${post.view_count}</p>
                                    <p class="flex items-center lg:gap-3 gap-2"><img src="images/time.png" alt=""><span>${post.posted_time}</span>min</p>
                                </div>
                                <div class="lg:mt-4">
                                    <button onclick="massegeRead('${post.title}', '${post.view_count}')"><img src="images/communication.png" alt=""></button>
                                </div>
                            </div>
                        </div>
                    </div>
        `;
        postContainer.appendChild(postCard);
    })
    toggleLoadingSpinner(false);
}

const handleSearch = () => {
    toggleLoadingSpinner(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    console.log(searchText);
    loadPosts(searchText);
}

const toggleLoadingSpinner = (isLoading) => {
    const loadingSpinner = document.getElementById('loading-spinner');
    if (isLoading) {
        loadingSpinner.classList.remove('hidden');
    }
    else {
        loadingSpinner.classList.add('hidden');
    }
}

const massegeRead = (title, view) => {
    let cardCount = document.getElementById('cart-count');
    let countText = cardCount.innerText;
    let count = parseInt(countText) + 1;
    cardCount.innerText = count;

    const readContainer = document.getElementById('right-card');
    const div = document.createElement('div');
    div.classList = `bg-white grid grid-cols-2 items-center p-4 rounded-2xl mb-1`;
    div.innerHTML = `
        <p class="text-[#12132D] font-semibold">${title}</p>
        <div class="flex gap-2 items-center justify-end">
            <img src="images/open-eye.png" alt="">
            <p class="text-[#12132D99]">${view}</p>
    `;
    readContainer.appendChild(div);
}

const loadLatestPosts = async () => {
    const res = await fetch(`https://openapi.programming-hero.com/api/retro-forum/latest-posts`)
    const latestPost = await res.json();
    displayLatestPosts(latestPost);
}

const displayLatestPosts = (latestPost) => {
    const latestPosts = document.getElementById('latest-post');

    latestPost.forEach(post => {
        // console.log(post);
        const latestPostCard = document.createElement('div');
        latestPostCard.classList = `card border-2 border-[#12132D26] lg:rounded-3xl rounded-xl p-6`;
        latestPostCard.innerHTML = `
                    <figure>
                        <img class="rounded-2xl"
                            src="${post?.cover_image}"
                            alt="Shoes" />
                    </figure>
                    <div class="mt-6">
                        <div class="flex gap-3 items-center">
                            <img src="images/calendar.png" alt="">
                            <p class="text-[#12132D99]">${post?.author?.posted_date || 'No date published'}</p>
                        </div>
                        <h2 class="text-[#12132D] font-extrabold mt-4">${post.title}</h2>
                        <p class="text-[#12132D99] mt-3">${post.description}</p>
                        <div class="flex items-center mt-4 gap-4">
                            <img class="rounded-full w-16" src="${post.profile_image}" alt="">
                            <div>
                                <h3 class="text-[#12132D] font-bold ">${post.author.name}</h3>
                                <p class="text-[#12132D99]">${post?.author?.designation || 'Unknown'}</p>
                            </div>
                        </div>
                    </div>
        `;
        latestPosts.appendChild(latestPostCard);
    })
}

loadPosts();