
// Paste
const btn_paste = document.querySelector('.paste');

btn_paste.addEventListener('click', async () => {
    if (navigator.clipboard) {
        const link = await navigator.clipboard.readText();
        const input = document.querySelector('input');
        input.value = link;
    } else console.log('Clipboard API unavailable');
});

// Copy
const btn_copy = document.querySelector('.copy');

btn_copy.addEventListener('click', async () => {
    const code = document.querySelector('.code').textContent;
    if (navigator.clipboard) {
        await navigator.clipboard.writeText(code);
    } else console.log('Clipboard API unavailable');
});
