// Сверстайте кнопку, которая будет содержать в себе icon_01 (как в примере в последнем видео). При клике на кнопку иконка должна меняться на icon_02. Повторный клик меняет иконку обратно.

const btn = document.querySelector(".btn");
const icon1 = document.querySelector(".btn_icon");
const icon2 = document.querySelector(".btn_another-icon");
let count = 0;

btn.addEventListener('click', () => {
  count ++;
 if(count % 2 == 0){
  icon1.classList.remove("hidden");
  icon2.classList.add("hidden");
 } else {
  icon2.classList.remove("hidden");
  icon1.classList.add("hidden");
 }
  
});