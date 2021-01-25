import cst from "./config.js";

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

    // Delete the old message
    const oldmsg = document.querySelector('.result');
    if (oldmsg) {
        input.removeChild(oldmsg);
    }

    if (/^https:\/\/www\.faceit\.com\/[a-z]{2}\/championship\/[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}/.test(link)) {
        const msg = document.createElement('p');
        msg.className = "result good";
        msg.textContent = "Fetching Faceit API...";
        get_json(link);
        input.appendChild(msg);
    } else {
        const msg = document.createElement('p');
        msg.className = "result bad";
        msg.textContent = "There is a mistake in the link.";
        input.appendChild(msg);
    }
}

async function get_json(link) {

    const res = await fetch(`https://open.faceit.com/data/v4/championships/${link.slice(39, 75)}/subscriptions?offset=0&limit=10`, {
        headers: {
            'accept': 'application/json',
            'Authorization': `Bearer ${cst.FACEIT_API_KEY}`
        }
    });

    // Delete the old message
    const input = document.querySelector('.input');
    const oldmsg = document.querySelector('.result');
    input.removeChild(oldmsg);

    if (res.ok) {

        const data = await res.json();

        // Adding the new message
        const msg = document.createElement('p');
        msg.className = "result good";
        msg.textContent = `Processing..`;
        input.appendChild(msg);

        process(data);

    } else {

        // Adding the new message
        const msg = document.createElement('p');
        msg.className = "result bad";
        msg.textContent = `Error (${res.status}) when trying to fetch the Faceit API !`;
        input.appendChild(msg);

    }
}

function process(code) {

    const pre = document.querySelector('.code');
    pre.innerHTML = code
}
