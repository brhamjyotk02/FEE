function createMeme() {
  const topInput = document.getElementById("topInput").value;
  const bottomInput = document.getElementById("bottomInput").value;

  document.getElementById("topText").innerText = topInput || "WHEN YOU CODE";
  document.getElementById("bottomText").innerText =
    bottomInput || "AND IT FINALLY WORKS";
}