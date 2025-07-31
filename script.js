const blockedWords = ["고자", "동거"];

function detect() {
  let text = document.getElementById("inputText").value;
  blockedWords.forEach(word => {
    const regex = new RegExp(word, "g");
    text = text.replace(regex, `<strong style="color:red;">${word}</strong>`);
  });
  document.getElementById("result").innerHTML = `<pre>${text}</pre>`;
}
