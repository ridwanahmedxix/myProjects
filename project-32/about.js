 function openSidebar() {
    const openSidebar = document.querySelector(".sideBar")
    openSidebar.style.display = 'flex'
 }
 function closeSidebar() {
    const closeSidebar = document.querySelector(".sideBar")
    closeSidebar.style.display = 'none'
 }


document.querySelectorAll('.sideBar a').forEach(link => {
  link.addEventListener('click', function() {
    document.querySelector('.sideBar').style.display = 'none';
  });
});
