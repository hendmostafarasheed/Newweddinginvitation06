// Add your Google Photos album link here.
// Example: const PHOTOS_LINK = "https://photos.app.goo.gl/your-album-link";
const PHOTOS_LINK = "";

const openAlbum = document.getElementById("openAlbum");
const albumMessage = document.getElementById("albumMessage");

openAlbum.addEventListener("click", () => {
  if (PHOTOS_LINK.trim()) {
    window.open(PHOTOS_LINK, "_blank", "noopener");
  } else {
    // Placeholder destination until the real album link is available.
    window.location.href = "photos.html#album";
    albumMessage.textContent = "Our wedding album will be available here soon. 💕";
  }
});
