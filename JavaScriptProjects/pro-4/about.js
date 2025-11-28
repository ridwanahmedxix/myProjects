const count = document.querySelector(".count") ;
const btnMinus = document.querySelector(".btnMinus") ;
const btnPlus = document.querySelector(".btnPlus") ;
const reset = document.querySelector(".reset") ;

btnMinus.addEventListener('click' , () => {
const countValue = parseInt(count.innerText) ;
count.innerText = countValue -1 ;
})

btnPlus.addEventListener('click' , () => {
const countValue = parseInt(count.innerText) ;
count.innerText = countValue + 1 ;

})

reset.addEventListener('click' , () => {
count.innerText = 0 ;

})