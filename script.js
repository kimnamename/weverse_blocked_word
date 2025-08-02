const baseWords = [
  "개년", "개새", "걸레", "고자", "구멍",
  "꼴통", "납치", "니미", "뒤질", "동거", 
  "망가", "메갈", "못생겼", "보지", "섹스", 
  "빠가", "빠라", "살인", "시바", "씹",
  "야사", "음부", "음탕", "일베", "임신",
  "자살", "자지", "젖", "좇", "죽어", "죽여", "지들이",
  "짱깨", "쪽바리", "후장", "나체", "호로", "쳐먹", "처먹"
];

function generateVariants(word) {
  const variants = new Set();
  variants.add(word);

  const chars = word.split('');
  const seps = [" ", "\n"];

  for (let sep of seps) {
    variants.add(chars.join(sep));
  }

  const recursiveInsert = (arr, seps, depth = 0) => {
    if (arr.length < 2 || depth >= arr.length - 1) return [arr.join('')];
    let results = [];
    for (let sep of seps) {
      let copy = [...arr];
      copy[depth] += sep;
      results = results.concat(recursiveInsert(copy, seps, depth + 1));
    }
    return results;
  };

  recursiveInsert(chars, seps).forEach(v => variants.add(v));
  return Array.from(variants);
}

const bannedWords = baseWords.flatMap(generateVariants);

const cleanedBannedWords = bannedWords.map(word =>
  word.replace(/\s+/g, '').replace(/[\n\t]/g, '').toLowerCase()
);

function sanitizeText(text) {
  return text.toLowerCase().replace(/\s+/g, '').replace(/[\n\t]/g, '');
}

function highlightBannedWords(originalText) {
  let highlighted = originalText;

  bannedWords.forEach(banned => {
    const pattern = new RegExp(banned.replace(/[\n\t]/g, '').replace(/\s+/g, ''), 'gi');
    const cleanedOriginal = originalText.replace(/\s+/g, '').replace(/[\n\t]/g, '');
    
    if (pattern.test(sanitizeText(originalText))) {
      highlighted = highlighted.replace(new RegExp(banned, 'gi'), match =>
        `<span style="font-weight:bold; color:red;">${match}</span>`
      );
    }
  });

  return highlighted;
}

function checkBannedWords() {
  const userText = document.getElementById("userInput").value;
  const resultBox = document.getElementById("result");

  if (containsBannedWord(userText)) {
    resultBox.innerHTML = "🚨 금지어가 포함되어 있습니다:<br><br>" + highlightBannedWords(userText);
    resultBox.style.color = "black";
  } else {
    resultBox.innerText = "✅ 금지어는 없습니다.";
    resultBox.style.color = "green";
  }
}

function containsBannedWord(text) {
  const cleaned = sanitizeText(text);
  return cleanedBannedWords.some(word => cleaned.includes(word));
}


