let inputText = document.querySelector(".input_text");
let outputText = document.querySelector(".output_text");
let langList = document.querySelectorAll("select");  //returning two select tag in form of array.
let selecticon = document.querySelectorAll('.selecttwo')    // selecting icons
let button = document.getElementsByClassName("button-29")[0];  //selecting translate button.
let exchangeLang = document.querySelector('.trans')     //selecting transfer icon

langList.forEach((curr, idx) => {
  for (let countryCode in languages) {
    let default_lang;
    if (idx == 0 && countryCode == "en-GB") default_lang = "selected";
    else if (idx == 1 && countryCode == "hi-IN") default_lang = "selected";
    curr.innerHTML += `<option value="${countryCode}" ${default_lang}>${languages[countryCode]}</option>`;
  }
});

button.addEventListener("click", function () {
  let content = inputText.value;
  let inputContent = langList[0].value;  //selecting the value(language code) of the input language
  let transContent = langList[1].value;   //selecting the value(language code) of the output language

  //setting up the API
  let trans_api = ` https://api.mymemory.translated.net/get?q=${content}${
    content.endsWith(".") ? "" : "."
  }&langpair=${inputContent}|${transContent}`;

  button.innerText = "loading...";
  console.log(trans_api);
  fetch(trans_api)
    .then((translate) => translate.json())
    .then((data) => {
      outputText.value = data.responseData.translatedText;
      button.innerText = "Translate";
    });
});



//setting up the text speak and copy


selecticon.forEach(icon => {
    icon.addEventListener("click", ({target}) => {
        if(!inputText.value || !outputText.value) return;
          if(target.id == "copyID") {
              navigator.clipboard.writeText(outputText.value);
           
        } else {
            let utterance;
            if(target.id == "ipVol") {
                utterance = new SpeechSynthesisUtterance(inputText.value);
                utterance.lang = langList[0].value;
            } else {
                utterance = new SpeechSynthesisUtterance(outputText.value);
                utterance.lang = langList[1].value;
            }
            speechSynthesis.speak(utterance);
        }
    });
});

//setting up the exchang features

exchangeLang.addEventListener('click', () => {
  // exchanging the texts
  let temp = inputText.value;
  inputText.value = outputText.value;
  outputText.value = temp;
  
  //exchanging the languages selection
  let tempLang = langList[0].value;
  langList[0].value = langList[1].value;
  langList[1].value = tempLang;

})