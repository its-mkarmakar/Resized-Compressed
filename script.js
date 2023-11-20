var loader = document.getElementById("preloader");

window.addEventListener("load", function () {
  loader.style.display = "none";
});

const navbar = document.getElementById("navbar");
let isScrolled = false;

window.addEventListener("scroll", () => {
  if (window.scrollY > 0 && !isScrolled) {
    navbar.classList.add("scrolled");
    isScrolled = true;
  } else if (window.scrollY === 0 && isScrolled) {
    navbar.classList.remove("scrolled");
    isScrolled = false;
  }
});

const uploadBox = document.querySelector(".upload-box"),
  previewImg = uploadBox.querySelector("img"),
  fileInput = uploadBox.querySelector("input"),
  widthInput = document.querySelector(".width input"),
  heightInput = document.querySelector(".height input"),
  ratioInput = document.querySelector(".ratio input"),
  qualityInput = document.querySelector(".quality input"),
  downloadBtn = document.querySelector(".download-btn");

let ogImageRatio;

const loadFile = (e) => {
  const file = e.target.files[0];
  if (!file) return;
  previewImg.src = URL.createObjectURL(file);
  previewImg.addEventListener("load", () => {
    // once the img is loaded
    widthInput.value = previewImg.naturalWidth;
    heightInput.value = previewImg.naturalHeight;
    ogImageRatio = previewImg.naturalWidth / previewImg.naturalHeight;
    document.querySelector(".wrapper").classList.add("active");
  });
};

widthInput.addEventListener("keyup", () => {
  const height = ratioInput.checked
    ? widthInput.value / ogImageRatio
    : heightInput.value;
  heightInput.value = Math.floor(height);
});

heightInput.addEventListener("keyup", () => {
  const width = ratioInput.checked
    ? heightInput.value * ogImageRatio
    : widthInput.value;
  widthInput.value = Math.floor(width);
});

const resizeAndDownload = () => {
  const canvas = document.createElement("canvas");
  const a = document.createElement("a");
  const ctx = canvas.getContext("2d");

  const imgQuality = qualityInput.checked ? 0.5 : 1.0;

  canvas.width = widthInput.value;
  canvas.height = heightInput.value;

  ctx.drawImage(previewImg, 0, 0, canvas.width, canvas.height);

  a.href = canvas.toDataURL("image/jpeg", imgQuality);
  a.download = new Date().getTime();
  a.click();
};

downloadBtn.addEventListener("click", resizeAndDownload);
fileInput.addEventListener("change", loadFile);
uploadBox.addEventListener("click", () => fileInput.click());

const toggleButton = document.querySelector(".toggle-button");
const body = document.body;

function toggleDarkMode() {
  body.classList.toggle("dark-mode");

  if (body.classList.contains("dark-mode")) {
    icon.classList.remove("moon");
    icon.classList.add("sun");
  } else {
    icon.classList.remove("sun");
    icon.classList.add("moon");
  }
}
toggleButton.addEventListener("click", toggleDarkMode);
