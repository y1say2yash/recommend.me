// --- DOM Elements ---
const inputState = document.getElementById('input-state');
const moodState = document.getElementById('mood-state');
const recommendationState = document.getElementById('recommendation-state');

const titleForm = document.getElementById('title-form');
const titleInput = document.getElementById('title-input');
const userTitleSpan = document.getElementById('user-title');

const moodSelectionContainer = document.getElementById('mood-selection');
const findRecommendationsBtn = document.getElementById('find-recommendations-btn');

const recommendationCardsContainer = document.getElementById('recommendation-cards');
const startOverBtn = document.getElementById('start-over-btn');

// --- Mock Data ---
// In a real app, this would come from the AI backend
const mockMoods = ["Intense", "Hopeful", "Bittersweet", "Uplifting", "Haunting", "Comforting", "Mysterious"];

const mockRecommendations = [{
    title: "Better Call Saul",
    description: "A slow-burn character study that explores moral ambiguity with intense, dramatic storytelling.",
    imageUrl: "https://placehold.co/400x600/2D3748/F7FAFC?text=Better+Call+Saul"
}, {
    title: "Ozark",
    description: "Dive into a dark, high-stakes world where an ordinary family navigates a life of crime.",
    imageUrl: "https://placehold.co/400x600/2D3748/F7FAFC?text=Ozark"
}, {
    title: "The Good Place",
    description: "A thoughtful and hilarious exploration of ethics, the afterlife, and what it means to be good.",
    imageUrl: "https://placehold.co/400x600/2D3748/F7FAFC?text=The+Good+Place"
}];

// --- State Transition Functions ---
function showState(stateElement) {
    inputState.classList.add('hidden');
    moodState.classList.add('hidden');
    recommendationState.classList.add('hidden');

    stateElement.classList.remove('hidden');
    stateElement.classList.add('fade-in');
}

// --- Event Handlers ---
titleForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const userTitle = titleInput.value.trim();
    if (userTitle) {
        userTitleSpan.textContent = `'${userTitle}'`;
        populateMoods();
        showState(moodState);
    }
});

findRecommendationsBtn.addEventListener('click', () => {
    populateRecommendations();
    showState(recommendationState);
});

startOverBtn.addEventListener('click', () => {
    titleInput.value = '';
    showState(inputState);
});

// --- Dynamic Content Functions ---
function populateMoods() {
    moodSelectionContainer.innerHTML = ''; // Clear previous moods
    mockMoods.forEach((mood, index) => {
        const checkboxId = `mood-${index}`;
        const moodElement = `
            <div>
                <input type="checkbox" id="${checkboxId}" class="mood-checkbox hidden" />
                <label for="${checkboxId}" class="cursor-pointer block bg-gray-700 border-2 border-gray-600 text-gray-300 rounded-full py-2 px-5 hover:border-gray-500 hover:bg-gray-600 transition duration-300">
                    ${mood}
                </label>
            </div>
        `;
        moodSelectionContainer.innerHTML += moodElement;
    });
}

function populateRecommendations() {
    recommendationCardsContainer.innerHTML = ''; // Clear previous recommendations
    mockRecommendations.forEach(rec => {
        const card = `
            <div class="bg-gray-800 rounded-xl shadow-lg overflow-hidden text-left transform hover:-translate-y-2 transition duration-300">
                <img src="${rec.imageUrl}" alt="Cover for ${rec.title}" class="w-full h-64 object-cover" onerror="this.onerror=null;this.src='https://placehold.co/400x600/2D3748/F7FAFC?text=Image+Not+Found';">
                <div class="p-5">
                    <h3 class="text-xl font-bold text-white mb-2">${rec.title}</h3>
                    <p class="text-gray-400 text-sm">${rec.description}</p>
                </div>
            </div>
        `;
        recommendationCardsContainer.innerHTML += card;
    });
}
