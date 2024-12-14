chrome.storage.local.get(["urls"], (result) => {
  const urls = result.urls || [];

  if (urls.some((url) => window.location.href.includes(url))) {
    const button = document.createElement("button");
    button.innerText = "Delete Elements";
    button.id = "delete-div-button";

    button.style.position = "fixed";
    button.style.bottom = "20px";
    button.style.right = "20px";
    button.style.zIndex = "10000";
    button.style.padding = "10px 20px";
    button.style.fontSize = "16px";
    button.style.color = "#fff";
    button.style.backgroundColor = "#007bff";
    button.style.border = "none";
    button.style.borderRadius = "5px";
    button.style.cursor = "pointer";

    document.body.appendChild(button);
    button.addEventListener("click", () => {
      chrome.storage.local.get(["classes"], (result) => {
        const classes = result.classes || [];
        if (classes.length === 0) {
          alert("No class names available!");
          return;
        }
        let deletedCount = 0;
        classes.forEach((className) => {
          const elements = document.querySelectorAll(`.${className}`);
          elements.forEach((element) => {
            element.remove();
            deletedCount++;
          });
        });
        button.innerText = "Deleted";
        button.style.backgroundColor = "#007bff";
        button.style.color = "#fff";
        button.style.cursor = "default";
        button.style.pointerEvents = "none";
        setTimeout(() => {
          button.style.display = "none";
        }, 1500);
      });
    });
  }
});
