const blockedWords = ["개년", "개새", "걸레", "고자", "구멍", "꼴통", "납치", "니미", "뒤질", "망가", "메갈", "못생겼", "보지", "빠가", "빠라", "살인", "시바", "씹", "야사", "음부", "음탕", "일베", "임신", "자살", "자지", "젖", "좇", "죽어", "죽여", "지들이", "짱깨", "쪽바리", "후장"];

function detect() {
  let text = document.getElementById("inputText").value;
  blockedWords.forEach(word => {
    const regex = new RegExp(word, "g");
    text = text.replace(regex, `<strong style="color:red;">${word}</strong>`);
  });
  document.getElementById("result").innerHTML = `<pre>${text}</pre>`;
}