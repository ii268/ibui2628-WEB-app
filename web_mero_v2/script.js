const co_btn = document.querySelectorAll('.mebtn');
for (let i = 0; i < co_btn.length; i++) {
    console.log(i);
    co_btn[i].addEventListener("click", () => {
        memuid.classList.toggle('memu_open');
    });
}