const classNameInput = document.getElementById("class-name");
const addClassButton = document.getElementById("add-class");
const classListDiv = document.getElementById("class-list");

const websiteUrlInput = document.getElementById("website-url");
const addUrlButton = document.getElementById("add-url");
const urlListDiv = document.getElementById("url-list");

function renderList(container, items, type) {
  container.innerHTML = "";
  items.forEach((item, index) => {
    const div = document.createElement("div");
    div.className = "item";
    div.innerHTML = `
      <span>${item}</span>
      <button data-index="${index}" class="remove-${type}">Remove</button>
    `;
    container.appendChild(div);
  });

  document.querySelectorAll(`.remove-${type}`).forEach((button) => {
    button.addEventListener("click", () => {
      const index = parseInt(button.getAttribute("data-index"), 10);
      chrome.storage.local.get([type], (result) => {
        const items = result[type] || [];
        items.splice(index, 1);
        chrome.storage.local.set({ [type]: items }, () => {
          renderList(container, items, type);
        });
      });
    });
  });
}

chrome.storage.local.get(["classes", "urls"], (result) => {
  renderList(classListDiv, result.classes || [], "classes");
  renderList(urlListDiv, result.urls || [], "urls");
});

addClassButton.addEventListener("click", () => {
  const newClass = classNameInput.value.trim();
  if (newClass) {
    chrome.storage.local.get(["classes"], (result) => {
      const classes = result.classes || [];
      if (!classes.includes(newClass)) {
        classes.push(newClass);
        chrome.storage.local.set({ classes }, () => {
          renderList(classListDiv, classes, "classes");
          classNameInput.value = "";
        });
      } else {
        alert("Class name already added!");
      }
    });
  }
});

addUrlButton.addEventListener("click", () => {
  const newUrl = websiteUrlInput.value.trim();
  if (newUrl) {
    chrome.storage.local.get(["urls"], (result) => {
      const urls = result.urls || [];
      if (!urls.includes(newUrl)) {
        urls.push(newUrl);
        chrome.storage.local.set({ urls }, () => {
          renderList(urlListDiv, urls, "urls");
          websiteUrlInput.value = "";
        });
      } else {
        alert("URL already added!");
      }
    });
  }
});
