let debug = false;

const charactersUpper = ["A", "B", "C", "D", "E", "F", "G", "H", "J", "K", "M", "N", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
const charactersLower = ["a", "b", "c", "d", "e", "f", "g", "h", "j", "k", "m", "n", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
const charactersNumber = ["2", "3", "4", "5", "6", "7", "8", "9"];
const charactersSymbol = ["!", "#", "$", "%", "&", "*", "+", "-", "?", "@"];
const charactersWhiteSpace = [" "];
const charactersLowerSimilar = ["i", "l", "o"];
const charactersUpperSimilar = ["I", "L", "O"];
const charactersNumberSimilar = ["1", "0"];
const charactersSymbolSimilar = ["|", "\"", "'", "(", ")", ",", ".", "/", ":", ";", "<", "=", ">", "[", "\\", "]", "^", "_", "`", "{", "}", "~"];

const generatorsPasswordBoxWrapperCssSelector = ".generator--password__box-wrapper";
const generatorsPasswordOutputContainerCssSelector = ".generator--password__output";
const generatorsPasswordBoxClassNameList = ["generator__box"];


function copyStringToClipboard(string) {
    // https://stackoverflow.com/questions/46041831/copy-to-clipboard-with-break-line
    const mySmartTextarea = document.createElement('textarea');
    mySmartTextarea.innerHTML = string;
    const parentElement = document.querySelector('body');
    parentElement.appendChild(mySmartTextarea);
    mySmartTextarea.select();
    document.execCommand('copy');
    parentElement.removeChild(mySmartTextarea);
}


let passwordConfig = {
    quantity: 0,
    length: 0,
    uppercase: false,
    lowercase: false,
    number: false,
    symbol: false,
    whitespace: false,
    easyToRead: false,
    whitespace: false,
    characterList: []
}

function getPasswordConfig() {
    passwordConfig.quantity = document.querySelector(".form__password-quantity").value;
    passwordConfig.length = document.querySelector(".form__password-length").value;

    passwordConfig.uppercase = document.querySelector(".form__password-uppercase").checked;
    passwordConfig.lowercase = document.querySelector(".form__password-lowercase").checked;
    passwordConfig.number = document.querySelector(".form__password-number").checked;
    passwordConfig.symbol = document.querySelector(".form__password-symbol").checked;
    passwordConfig.whitespace = document.querySelector(".form__password-whitespace").checked;

    passwordConfig.easyToRead = document.querySelector(".form__password-easyToRead").checked;
    generateCharacterList();
}

function generateCharacterList() {
    passwordConfig.characterList = [];  // reset it before generating
    if (passwordConfig.uppercase) passwordConfig.characterList = passwordConfig.characterList.concat(charactersUpper);
    if (passwordConfig.lowercase) passwordConfig.characterList = passwordConfig.characterList.concat(charactersLower);
    if (passwordConfig.number) passwordConfig.characterList = passwordConfig.characterList.concat(charactersNumber);
    if (passwordConfig.symbol) passwordConfig.characterList = passwordConfig.characterList.concat(charactersSymbol);
    if (passwordConfig.whitespace) passwordConfig.characterList = passwordConfig.characterList.concat(charactersWhiteSpace);
    if (!passwordConfig.easyToRead) {
        if (passwordConfig.uppercase) passwordConfig.characterList = passwordConfig.characterList.concat(charactersUpperSimilar);
        if (passwordConfig.lowercase) passwordConfig.characterList = passwordConfig.characterList.concat(charactersLowerSimilar);
        if (passwordConfig.number) passwordConfig.characterList = passwordConfig.characterList.concat(charactersNumberSimilar);
        if (passwordConfig.symbol) passwordConfig.characterList = passwordConfig.characterList.concat(charactersSymbolSimilar);
    }
}

function renderPasswords() {

    function getRandomCharacter() {
        let randomChar = Math.floor(Math.random() * passwordConfig.characterList.length)
        return passwordConfig.characterList[randomChar]
    }

    function generatePassword() {
        let password = "";
        for (let i = 0; i < passwordConfig.length; i++) {
            let randomChar = getRandomCharacter();
            // don't allow space in first or last character
            if (i === 0 || i === (passwordConfig.length - 1)) {
                while (randomChar === " ") {
                    randomChar = getRandomCharacter();
                }
            }
            password += getRandomCharacter();
        }
        if (debug) console.log("generatePassword(): " + password);
        return password;
    }

    function resetPasswordBoxes() {
        document.querySelector(generatorsPasswordOutputContainerCssSelector).style.visibility = "visible";
        document.querySelector(generatorsPasswordBoxWrapperCssSelector).innerHTML = '';
    }

    function createPasswordBox(password = "") {
        const passwordBox = document.createElement("div");
        for (let i = 0; i < generatorsPasswordBoxClassNameList.length; i++) {
            passwordBox.classList.add(generatorsPasswordBoxClassNameList[i]);
        }
        passwordBox.innerText = password;
        passwordBox.onclick = function copyPasswordToClipboard() {
            copyStringToClipboard(password);
            alert("Password copied to clipboard!");
        }
        document.querySelector(generatorsPasswordBoxWrapperCssSelector).appendChild(passwordBox);
    }

    function render() {
        getPasswordConfig();
        resetPasswordBoxes()

        if (passwordConfig.characterList.length < 1) {
            alert("You must select a character set")
        } else if (passwordConfig.characterList.length === 1) {
            alert("You cannot use only whitespace for a password")
        } else {
            for (let i = 0; i < passwordConfig.quantity; i++) {
                if (debug)
                    console.log("renderPasswords(): " + i);
                createPasswordBox(generatePassword());
            }
        }
    }
    render();

}
renderPasswords()
