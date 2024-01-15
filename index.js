/* eslint-disable */

// My Starter JavaScript Template

// Journal Entry Form

const entryForm = document.querySelector(`#entryForm`);
const entryResultsSection = document.querySelector(`#entryResultsSection`);
const entryResultRow = document.querySelector(`.entryResultRow`);
const getEntryTitle = document.getElementsByClassName(`entry-text-title`);
const getEntryText = document.getElementsByClassName(`entry-text-box`);

function addEntryToDom(event) {
    event.preventDefault();

    // Create a unique identifier for each entry (timestamp)
    const entryId = Date.now().toString();

    // Create an object to represent the entry
    const entry = {
        id: entryId,
        title: getEntryTitle[0].value,
        text: getEntryText[0].value,
        date: new Date().toLocaleString(),
    };

    // Store the entry in local storage
    saveEntryToLocalStorage(entry);

    // Add the entry to the DOM
    const entryDiv = document.createElement(`div`);
    entryDiv.className = `single-entry-div`;
    entryDiv.dataset.entryId = entryId; // Set the data attribute for identifying the entry
    entryResultRow.appendChild(entryDiv);

    const entryHeading = document.createElement(`h3`);
    entryHeading.className = `single-entry-heading`;
    entryHeading.textContent = entry.title;
    entryDiv.appendChild(entryHeading);

    const entryDate = document.createElement(`p`);
    entryDate.className = `single-entry-date`;
    entryDiv.appendChild(entryDate);

    const entryParagraph = document.createElement(`p`);
    entryParagraph.className = `single-entry-text`;
    entryParagraph.textContent = entry.text;
    entryDiv.appendChild(entryParagraph);

    // Function to update date and time when the entry was submitted
    function updateDateTime() {
        entryDate.textContent = `Submitted: ${entry.date}`;
    }

    // Call the updateDateTime function
    updateDateTime();

    // Clear the form fields
    getEntryTitle[0].value = '';
    getEntryText[0].value = '';
}

function saveEntryToLocalStorage(entry) {
    // Retrieve existing entries from local storage
    const existingEntries = JSON.parse(localStorage.getItem('journalEntries')) || [];

    // Add the new entry to the existing entries
    existingEntries.push(entry);

    // Save the updated entries back to local storage
    localStorage.setItem('journalEntries', JSON.stringify(existingEntries));
}

// Function to load entries from local storage and display them on the page
function loadEntriesFromLocalStorage() {
    const existingEntries = JSON.parse(localStorage.getItem('journalEntries')) || [];

    existingEntries.forEach(entry => {
        const entryDiv = document.createElement(`div`);
        entryDiv.className = `single-entry-div`;
        entryDiv.dataset.entryId = entry.id;
        entryResultRow.appendChild(entryDiv);

        const entryHeading = document.createElement(`h3`);
        entryHeading.className = `single-entry-heading`;
        entryHeading.textContent = entry.title;
        entryDiv.appendChild(entryHeading);

        const entryDate = document.createElement(`p`);
        entryDate.className = `single-entry-date`;
        entryDiv.appendChild(entryDate);

        const entryParagraph = document.createElement(`p`);
        entryParagraph.className = `single-entry-text`;
        entryParagraph.textContent = entry.text;
        entryDiv.appendChild(entryParagraph);

        // Function to update date and time when the entry was submitted
        function updateDateTime() {
            entryDate.textContent = `Submitted: ${entry.date}`;
        }

        // Call the updateDateTime function
        updateDateTime();
    });
}

// Load existing entries when the page loads
loadEntriesFromLocalStorage();

entryForm.addEventListener(`submit`, addEntryToDom);
