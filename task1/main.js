const btn = document.querySelector('.btn');

btn.addEventListener('click', ()=>{
    document.querySelectorAll('.icon').forEach(icon=>{
        icon.classList.toggle('hidden');
    })
})