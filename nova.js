// function newNova(){
//     let fNova = document.getElementById('fNova');
//     fNova.textContent = "Innovation"
// }

// let fNova = document.getElementById('fNova');

// fNova.addEventListener('click', newNova);

let btn = document.getElementById('fNova');

btn.addEventListener("click", () => {
    if (btn.textContent === "Nova") {
        btn.textContent = "Innovation";
    } else {
        btn.textContent = "Nova";
    }
});
{
let btn = document.getElementById('logo');

btn.addEventListener("click", () => {
    if (btn.textContent === "NOVA") {
        btn.textContent = "Innovation";
    } else {
        btn.textContent = "NOVA";
    }
});
}