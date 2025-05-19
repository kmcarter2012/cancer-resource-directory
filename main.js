// JavaScript for search functionality
function performSearch() {
    const query = document.getElementById("siteSearch").value.toLowerCase();
    const sections = document.querySelectorAll('.resource-section');
    let resultsHtml = '';
    let found = false;

    sections.forEach(section => {
        const sectionTitle = section.querySelector('h2').textContent.toLowerCase();
        // Check section title
        if (sectionTitle.includes(query)) {
             resultsHtml += `<p><a href="#${section.id}">${section.querySelector('h2').textContent}</a></p>`;
             found = true;
        }
        // Check subheadings
        const subheadings = section.querySelectorAll('h3');
        subheadings.forEach(subheading => {
             const subheadingText = subheading.textContent.toLowerCase();
             if (subheadingText.includes(query)) {
                 resultsHtml += `<p><a href="#${subheading.id}">${subheading.textContent}</a> in ${section.querySelector('h2').textContent}</p>`;
                 found = true;
             }
        });
        // Check list items
        const listItems = section.querySelectorAll('li');
        listItems.forEach(item => {
            const itemText = item.textContent.toLowerCase();
            if (itemText.includes(query)) {
                 // Find the closest subheading or section title for context
                 let context = '';
                 const closestHeading = item.closest('section').querySelector('h3') || item.closest('section').querySelector('h2');
                 if (closestHeading) {
                     context = ` in ${closestHeading.textContent}`;
                 }
                 // Link directly to the resource if it has an anchor or link within the LI, otherwise just show the text.
                 const itemLink = item.querySelector('a');
                 if (itemLink && itemLink.href) {
                     resultsHtml += `<p><a href="${itemLink.href}">${item.textContent}</a>${context}</p>`;
                 } else {
                     resultsHtml += `<p>${item.textContent}${context}</p>`;
                 }
                 found = true;
            }
        });
    });

    const searchResultsDiv = document.getElementById("searchResults");
    if (found) {
        searchResultsDiv.innerHTML = `<h3>Search Results for "${query}"</h3>` + resultsHtml;
    } else {
        searchResultsDiv.innerHTML = `<p>No results found for "${query}".</p>`;
    }
}

// Back to Top Button functionality
const backToTopButton = document.querySelector(".back-to-top");

window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
        backToTopButton.classList.add("show");
    } else {
        backToTopButton.classList.remove("show");
    }
});

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

// Optional: Add accordion functionality for mobile if needed
// You would uncomment and adapt this if you want to implement the accordion styles
// const accordions = document.querySelectorAll(".accordion");
// accordions.forEach(accordion => {
//     accordion.addEventListener("click", function() {
//         this.classList.toggle("active");
//         const panel = this.nextElementSibling;
//         if (panel.style.maxHeight) {
//             panel.style.maxHeight = null;
//         } else {
//             panel.style.maxHeight = panel.scrollHeight + "px";
//         }
//     });
// });

// You can add other JavaScript functions here later
