
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
        get_html(link);
        const msg = document.createElement('p');
        msg.className = "result good";
        msg.textContent = "Getting the html source code...";
        input.appendChild(msg);
    } else {
        const msg = document.createElement('p');
        msg.className = "result bad";
        msg.textContent = "There is a mistake in the link.";
        input.appendChild(msg);
    }
}

function get_html(link) {
        
    const input = document.querySelector('.input');

    $.ajax({
        url : link,
        dataType : 'html',
        success : (code_html, statut) =>  {
            process(code_html)
            
            // Delete the old message
            const oldmsg = document.querySelector('.result');
            input.removeChild(oldmsg);

            // Adding the new message
            const msg = document.createElement('p');
            msg.className = "result good";
            msg.textContent = `Processing..`;
            input.appendChild(msg);
        },
        error : (res, statut, error) => {
            console.error(error)
            
            // Delete the old message
            const oldmsg = document.querySelector('.result');
            input.removeChild(oldmsg);

            // Adding the new message
            const msg = document.createElement('p');
            msg.className = "result bad";
            msg.textContent = `Error when trying to get the html source code :/`;
            input.appendChild(msg);
        }
    });
}

function process(code) {
    console.log(code);
}
