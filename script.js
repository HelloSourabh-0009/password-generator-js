const inputSlider = document.getElementById("inputSlider");
const passBox = document.getElementById("passBox");
const genBtn = document.getElementById("genBtn");
const sliderValue = document.getElementById("sliderValue");
const uppercase = document.getElementById("upperCase");
const lowercase = document.getElementById("lowerCase");
const numbers = document.getElementById("numbers");
const symbols = document.getElementById("symbols");
const copyIcon = document.getElementById("copyIcon");
const eyeBtn = document.getElementById("eyeBtn");
const strengthBar = document.getElementById("strengthBar");
const strengthText = document.getElementById("strengthText");


//Showing input slider value
sliderValue.textContent = inputSlider.value;
inputSlider.addEventListener("input", () => {
    sliderValue.textContent = inputSlider.value;
});

genBtn.addEventListener("click", generatePassword);


//Password Charactrs
const upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowerChars = "abcdefghijklmnopqrstuvwxyz";
const numberChars = "0123456789";
const symbolChars = "!@#$%^&*()_+{}[]<>?-";


//Function to generate Password

function generatePassword() {
    let length = inputSlider.value;
    let allChars = "";
    let password = "";

    if(uppercase.checked) allChars += upperChars;
    if(lowercase.checked) allChars += lowerChars;
    if(numbers.checked) allChars += numberChars;
    if(symbols.checked) allChars += symbolChars;

    if(allChars === ""){
        passBox.value = "";
        strengthBar.style.width = "0%";
        strengthText.innerText = "Select at least one option"
        return;
    }
    

    for (let i = 0; i < length; i++) {
        let randomIndex = Math.floor(Math.random() * allChars.length);
        password += allChars[randomIndex];
    } 

    passBox.value = password;
    updateStrengthUI(password);

}

//Copy button function

copyIcon.addEventListener("click", () => {
    if(passBox.value.length > 0){
        navigator.clipboard.writeText(passBox.value);
        copyIcon.innerText = "check"
        copyIcon.title = "Password Copied";

        setTimeout(() => {
            copyIcon.innerText = "copy_all";
            copyIcon.title = "";
        }, 2000);
    }
});

//view button fuction

eyeBtn.addEventListener("click", () => {
    if(passBox.type === "password") {
        passBox.type = "text";
    } else {
        passBox.type = "password";
    }

    eyeBtn.classList.toggle("fa-eye");
    eyeBtn.classList.toggle("fa-eye-slash");
});

//Function for Live Strength Bar
function checkStrength(password) {
    let strength = 0;

    if(password.length >= 8) strength++;
    if(/[A-Z]/.test(password)) strength++;
    if(/[a-z]/.test(password)) strength++;
    if(/[0-9]/.test(password)) strength++;
    if(/[^A-Za-z0-9]/.test(password)) strength++;

    return strength;
}

//UI update
function updateStrengthUI(password) {
    const strength = checkStrength(password);

    if(strength <= 2) {
        strengthBar.style.width = "30%";
        strengthBar.style.background = "red";
        strengthText.innerText = "Weak";
    } else if (strength <= 4) {
        strengthBar.style.width = "60%";
        strengthBar.style.background = "orange";
        strengthText.innerText = "Medium";
    } else {
        strengthBar.style.width = "100%";
        strengthBar.style.background = "green";
        strengthText.innerText = "Strong";
    }
}
