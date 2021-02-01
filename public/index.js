'use strict';

// Paste
const btn_paste = document.querySelector('.paste');

btn_paste.addEventListener('click', async () => {
    if (navigator.clipboard) {
        const link = await navigator.clipboard.readText();
        const input = document.querySelector('input');
        input.value = link;
        verif(link);
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

// Input
const input = document.querySelector('.searchbar');

input.addEventListener('input', async () => {
    verif(input.value)
});

function verif (link) {

    const input = document.querySelector('.input');
    const oldmsg = document.querySelector('.result');
    if (oldmsg) input.removeChild(oldmsg);

    if (/^https:\/\/www\.faceit\.com\/[a-z]{2}\/championship\/[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}/.test(link)) {

        const msg = document.createElement('p');
        msg.className = "result good";
        msg.textContent = "Fetching Faceit API...";
        input.appendChild(msg);

        fetching(link.slice(39, 75));

    } else {
        const msg = document.createElement('p');
        msg.textContent = "There is a mistake in the link.";
        msg.className = "result bad";
        input.appendChild(msg);
    }
}

async function fetching(id) {

    const url = window.location.href;

    const res1 = await fetch(url + 'faceit/standing/' + id)
    const res2 = await fetch(url + 'faceit/bracket/' + id)
    const res3 = await fetch(url + 'faceit/seed/' + id)

    const input = document.querySelector('.input');
    const oldmsg = document.querySelector('.result');
    input.removeChild(oldmsg);


    if (res1.ok && res2.ok && res3.ok) {

        const msg = document.createElement('p');
        msg.className = "result good";
        msg.textContent = `Processing..`;
        input.appendChild(msg);

        process(id, res1.data, res2.data, res3.data);

    } else {
        const msg = document.createElement('p');
        msg.className = "result bad";
        msg.textContent = `Error (${res1.ok?res2.status:res1.status}) when trying to fetch the Faceit API !`;
        input.appendChild(msg);
    }

}

function process(id, standing, bracket, seed) {

    const result = reformat_32SE(bracket, seed);
    const text = bracket_32SE(id, result);
    
    const code = document.querySelector('.code');
    code.innerHTML = text

    // Delete the old message
    const input = document.querySelector('.input');
    const oldmsg = document.querySelector('.result');
    input.removeChild(oldmsg);

    // Adding the new message
    const msg = document.createElement('p');
    msg.className = "result good";
    msg.textContent = `All good, you can copy !`;
    input.appendChild(msg);
}
