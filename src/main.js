import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import axios from 'axios';

const galleryContainer = document.querySelector('.gallery');
const loaderContainer = document.getElementById('loader');
const searchForm = document.getElementById('search-form');
const loadMoreBtn = document.getElementById('load-more');
const loadingIndicator = document.getElementById('loading-indicator');

const apiKey = '42175181-9f2e4ea0c75ffabf50c3ef9f9';
const ver = 1;
let currentPage = 1;
let currentQuery = '';
let currentImagesCount = 0;
let totalHits = 0;

function toastSuccess(message) {
    iziToast.success({
        title: 'Success',
        message: message,
        position: 'topRight'
    });
}

function toastError(message) {
    iziToast.error({
        title: 'Error',
        message: message,
        position: 'topRight'
    });
}

function toggleLoadMoreBtn(show) {
    loadMoreBtn.style.display = show ? 'block' : 'none';
}

function toggleLoader(show) {
    loaderContainer.style.display = show ? 'block' : 'none';
    loadingIndicator.style.display = show ? 'block' : 'none';
}

async function searchImages(query, page = 1) {
    const url = `https://pixabay.com/api/?key=${apiKey}&q=${encodeURIComponent(query)}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=15`;
    try {
        const response = await axios.get(url);
        totalHits = response.data.totalHits;
        return response.data.hits;
    } catch (error) {
        toastError('Failed to fetch images.');
        throw error;
    }
}

async function scrollToNextGroup() {    
    const cardHeight = galleryContainer.querySelector('.image-card').getBoundingClientRect().height;
    window.scrollBy({
        top: 2 * cardHeight,
        left: 0,
        behavior: 'smooth'
    });
}

searchForm.addEventListener('submit', async function (event) {
    event.preventDefault();
    toggleLoadMoreBtn(false);
    const query = document.getElementById('query').value.trim();
    if (!query) {
        iziToast.warning({ title: 'Warning', message: 'Please enter a search query.' });
        return;
    }
    try {
        toggleLoader(true);
        currentQuery = query;
        currentPage = 1;
        const images = await searchImages(query, currentPage);
        if (images.length > 0) {
            displayImages(images);
            toastSuccess(`Was found: ${images.length} images`);
            initializeLightbox();
            if (images.length < 15) {
                toastError('We are sorry, but you have reached the end of search results.');
                toggleLoadMoreBtn(false);
            } else {
                toggleLoadMoreBtn(true);
            }
        } else {
            galleryContainer.innerHTML = '';
            toastError('Sorry, there are no images matching your search query. Please try again!');
            toggleLoadMoreBtn(false);
        }
    } finally {
        toggleLoader(false);
    }
});

loadMoreBtn.addEventListener('click', async function () {
    try {
        toggleLoader(true);
        currentPage++;
        const images = await searchImages(currentQuery, currentPage);
        if (images.length > 0) {
            appendImages(images);
            toastSuccess(`Loaded additional ${images.length} images`);
            initializeLightbox();
            if (images.length < 15) {
                toastError('We are sorry, but you have reached the end of search results.');
                toggleLoadMoreBtn(false);
            }
            scrollToNextGroup();
        } else {
            toastError('No more images to load');
            toggleLoadMoreBtn(false);
        }
    } catch (error) {
        toastError('Failed to fetch additional images.');
    } finally {
        toggleLoader(false);
    }
});

function displayImages(images) {
    galleryContainer.innerHTML = '';
    appendImages(images);
}

function appendImages(images) {
    const fragment = document.createDocumentFragment();
    images.forEach(image => {
        const { largeImageURL, webformatURL, tags, likes, views, comments, downloads } = image;
        const imageCard = document.createElement('div');
        imageCard.classList.add('image-card');
        imageCard.innerHTML = `
            <a href="${largeImageURL}" data-lightbox="image-set" data-title="${tags}">
                <img src="${webformatURL}" alt="${tags}">
                <div class="info">Likes: ${likes}, Views: ${views}, Comments: ${comments}, Downloads: ${downloads}</div>
            </a>
        `;
        fragment.appendChild(imageCard);
    });
    galleryContainer.appendChild(fragment);

    currentImagesCount += images.length;   
}

function initializeLightbox() {
    new SimpleLightbox('.gallery a').refresh();
}