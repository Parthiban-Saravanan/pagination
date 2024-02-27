const paginationContainer = document.getElementById('pagination-container');
const apiUrl = 'https://raw.githubusercontent.com/Rajavasanthan/jsondata/master/pagenation.json';
const itemsPerPage = 1;

let currentPage = 1;
let jsonData = [];

async function fetchData() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        jsonData = data;
        renderPage(currentPage);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function renderPage(page) {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const itemsToShow = jsonData.slice(startIndex, endIndex);

    paginationContainer.innerHTML = '';

    const prevButton = document.createElement('button');
    prevButton.textContent = 'Previous';
    prevButton.addEventListener('click', () => {
        if (currentPage > 1) {
            renderPage(currentPage - 1);
        }
    });
    paginationContainer.appendChild(prevButton);

    // Create pagination buttons
    const totalPages = Math.ceil(jsonData.length / itemsPerPage);
    for (let i = 1; i <= totalPages; i++) {
        const button = document.createElement('button');
        button.textContent = i;
        button.addEventListener('click', () => renderPage(i));
        paginationContainer.appendChild(button);
    }

    const nextButton = document.createElement('button');
    nextButton.textContent = 'Next';
    nextButton.addEventListener('click', () => {
        if (currentPage < totalPages) {
            renderPage(currentPage + 1);
        }
    });
    paginationContainer.appendChild(nextButton);

    const table = document.createElement('table');
    table.classList.add('table', 'table-bordered');
    const headerRow = table.insertRow();
    ['ID', 'Name', 'Email'].forEach(headerText => {
        const th = document.createElement('th');
        th.textContent = headerText;
        headerRow.appendChild(th);
    });

    itemsToShow.forEach(item => {
        const row = table.insertRow();
        Object.values(item).forEach(value => {
            const cell = row.insertCell();
            cell.textContent = value;
        });
    });

    const pageContent = document.createElement('div');
    pageContent.classList.add('page-content');
    pageContent.appendChild(table);
    paginationContainer.appendChild(pageContent);

    currentPage = page;
}

fetchData();
