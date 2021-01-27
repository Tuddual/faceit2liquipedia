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

    const input = document.querySelector('.input');
    const oldmsg = document.querySelector('.result');
    input.removeChild(oldmsg);


    if (res1.ok && res2.ok) {

        const msg = document.createElement('p');
        msg.className = "result good";
        msg.textContent = `Processing..`;
        input.appendChild(msg);

        process(res1.data, res2.data);

    } else {
        const msg = document.createElement('p');
        msg.className = "result bad";
        msg.textContent = `Error (${res1.ok?res2.status:res1.status}) when trying to fetch the Faceit API !`;
        input.appendChild(msg);
    }

}

function process(data1, data2) {

    let text = `===Playoffs===\n`;
    text += `:''See all bracket at [test/standings/column].''\n\n`;
    text += `{{32SETeamBracket\n`;
    text += `&lt;!-- ROUND OF 32 --&gt;\n`;
    text += `|R1D1team= |R1D1score= |R1D1win=\n`;
    text += `|R1D2team= |R1D2score= |R1D2win=\n`;
    text += `|R1G1details={{BracketMatchSummary\n`;
    text += `|date= |finished=\n`;
    text += `|map1=|map1score=|map1win=\n`;;
    text += `|faceit=\n`;
    text += `}}\n`;
    text += `|R1D3team= |R1D3score= |R1D3win=\n`;
    text += `|R1D4team= |R1D4score= |R1D4win=\n`;
    text += `|R1G2details={{BracketMatchSummary\n`;
    text += `|date= |finished=\n`;
    text += `|map1=|map1score=|map1win=\n`;;
    text += `|faceit=\n`;
    text += `}}\n`;
    text += `|R1D5team= |R1D5score= |R1D5win=\n`;
    text += `|R1D6team= |R1D6score= |R1D6win=\n`;
    text += `|R1G3details={{BracketMatchSummary\n`;
    text += `|date= |finished=\n`;
    text += `|map1=|map1score=|map1win=\n`;;
    text += `|faceit=\n`;
    text += `}}\n`;
    text += `|R1D7team= |R1D7score= |R1D7win=\n`;
    text += `|R1D8team= |R1D8score= |R1D8win=\n`;
    text += `|R1G4details={{BracketMatchSummary\n`;
    text += `|date= |finished=\n`;
    text += `|map1=|map1score=|map1win=\n`;;
    text += `|faceit=\n`;
    text += `}}\n`;
    text += `|R1D9team= |R1D9score= |R1D9win=\n`;
    text += `|R1D10team= |R1D10score= |R1D10win=\n`;
    text += `|R1G5details={{BracketMatchSummary\n`;
    text += `|date= |finished=\n`;
    text += `|map1=|map1score=|map1win=\n`;;
    text += `|faceit=\n`;
    text += `}}\n`;
    text += `|R1D11team= |R1D11score= |R1D11win=\n`;
    text += `|R1D12team= |R1D12score= |R1D12win=\n`;
    text += `|R1G6details={{BracketMatchSummary\n`;
    text += `|date= |finished=\n`;
    text += `|map1=|map1score=|map1win=\n`;;
    text += `|faceit=\n`;
    text += `}}\n`;
    text += `|R1D13team= |R1D13score= |R1D13win=\n`;
    text += `|R1D14team= |R1D14score= |R1D14win=\n`;
    text += `|R1G7details={{BracketMatchSummary\n`;
    text += `|date= |finished=\n`;
    text += `|map1=|map1score=|map1win=\n`;;
    text += `|faceit=\n`;
    text += `}}\n`;
    text += `|R1D15team= |R1D15score= |R1D15win=\n`;
    text += `|R1D16team= |R1D16score= |R1D16win=\n`;
    text += `|R1G8details={{BracketMatchSummary\n`;
    text += `|date= |finished=\n`;
    text += `|map1=|map1score=|map1win=\n`;;
    text += `|faceit=\n`;
    text += `}}\n`;
    text += `|R1D17team= |R1D17score= |R1D17win=\n`;
    text += `|R1D18team= |R1D18score= |R1D18win=\n`;
    text += `|R1G9details={{BracketMatchSummary\n`;
    text += `|date= |finished=\n`;
    text += `|map1=|map1score=|map1win=\n`;;
    text += `|faceit=\n`;
    text += `}}\n`;
    text += `|R1D19team= |R1D19score= |R1D19win=\n`;
    text += `|R1D20team= |R1D20score= |R1D20win=\n`;
    text += `|R1G10details={{BracketMatchSummary\n`;
    text += `|date= |finished=\n`;
    text += `|map1=|map1score=|map1win=\n`;;
    text += `|faceit=\n`;
    text += `}}\n`;
    text += `|R1D21team= |R1D21score= |R1D21win=\n`;
    text += `|R1D22team= |R1D22score= |R1D22win=\n`;
    text += `|R1G11details={{BracketMatchSummary\n`;
    text += `|date= |finished=\n`;
    text += `|map1=|map1score=|map1win=\n`;;
    text += `|faceit=\n`;
    text += `}}\n`;
    text += `|R1D23team= |R1D23score= |R1D23win=\n`;
    text += `|R1D24team= |R1D24score= |R1D24win=\n`;
    text += `|R1G12details={{BracketMatchSummary\n`;
    text += `|date= |finished=\n`;
    text += `|map1=|map1score=|map1win=\n`;;
    text += `|faceit=\n`;
    text += `}}\n`;
    text += `|R1D25team= |R1D25score= |R1D25win=\n`;
    text += `|R1D26team= |R1D26score= |R1D26win=\n`;
    text += `|R1G13details={{BracketMatchSummary\n`;
    text += `|date= |finished=\n`;
    text += `|map1=|map1score=|map1win=\n`;;
    text += `|faceit=\n`;
    text += `}}\n`;
    text += `|R1D27team= |R1D27score= |R1D27win=\n`;
    text += `|R1D28team= |R1D28score= |R1D28win=\n`;
    text += `|R1G14details={{BracketMatchSummary\n`;
    text += `|date= |finished=\n`;
    text += `|map1=|map1score=|map1win=\n`;;
    text += `|faceit=\n`;
    text += `}}\n`;
    text += `|R1D29team= |R1D29score= |R1D29win=\n`;
    text += `|R1D30team= |R1D30score= |R1D30win=\n`;
    text += `|R1G15details={{BracketMatchSummary\n`;
    text += `|date= |finished=\n`;
    text += `|map1=|map1score=|map1win=\n`;;
    text += `|faceit=\n`;
    text += `}}\n`;
    text += `|R1D31team= |R1D31score= |R1D31win=\n`;
    text += `|R1D32team= |R1D32score= |R1D32win=\n`;
    text += `|R1G16details={{BracketMatchSummary\n`;
    text += `|date= |finished=\n`;
    text += `|map1=|map1score=|map1win=\n`;;
    text += `|faceit=\n`;
    text += `}}\n\n`;
    text += `&lt;!-- ROUND OF 16 --&gt;\n`;
    text += `|R2W1team= |R2W1score= |R2W1win=\n`;
    text += `|R2W2team= |R2W2score= |R2W2win=\n`;
    text += `|R2G1details={{BracketMatchSummary\n`;
    text += `|date= |finished=\n`;
    text += `|map1=|map1score=|map1win=\n`;;
    text += `|faceit=\n`;
    text += `}}\n`;
    text += `|R2W3team= |R2W3score= |R2W3win=\n`;
    text += `|R2W4team= |R2W4score= |R2W4win=\n`;
    text += `|R2G2details={{BracketMatchSummary\n`;
    text += `|date= |finished=\n`;
    text += `|map1=|map1score=|map1win=\n`;;
    text += `|faceit=\n`;
    text += `}}\n`;
    text += `|R2W5team= |R2W5score= |R2W5win=\n`;
    text += `|R2W6team= |R2W6score= |R2W6win=\n`;
    text += `|R2G3details={{BracketMatchSummary\n`;
    text += `|date= |finished=\n`;
    text += `|map1=|map1score=|map1win=\n`;;
    text += `|faceit=\n`;
    text += `}}\n`;
    text += `|R2W7team= |R2W7score= |R2W7win=\n`;
    text += `|R2W8team= |R2W8score= |R2W8win=\n`;
    text += `|R2G4details={{BracketMatchSummary\n`;
    text += `|date= |finished=\n`;
    text += `|map1=|map1score=|map1win=\n`;;
    text += `|faceit=\n`;
    text += `}}\n`;
    text += `|R2W9team= |R2W9score= |R2W9win=\n`;
    text += `|R2W10team= |R2W10score= |R2W10win=\n`;
    text += `|R2G5details={{BracketMatchSummary\n`;
    text += `|date= |finished=\n`;
    text += `|map1=|map1score=|map1win=\n`;;
    text += `|faceit=\n`;
    text += `}}\n`;
    text += `|R2W11team= |R2W11score= |R2W11win=\n`;
    text += `|R2W12team= |R2W12score= |R2W12win=\n`;
    text += `|R2G6details={{BracketMatchSummary\n`;
    text += `|date= |finished=\n`;
    text += `|map1=|map1score=|map1win=\n`;;
    text += `|faceit=\n`;
    text += `}}\n`;
    text += `|R2W13team= |R2W13score= |R2W13win=\n`;
    text += `|R2W14team= |R2W14score= |R2W14win=\n`;
    text += `|R2G7details={{BracketMatchSummary\n`;
    text += `|date= |finished=\n`;
    text += `|map1=|map1score=|map1win=\n`;;
    text += `|faceit=\n`;
    text += `}}\n`;
    text += `|R2W15team= |R2W15score= |R2W15win=\n`;
    text += `|R2W16team= |R2W16score= |R2W16win=\n`;
    text += `|R2G8details={{BracketMatchSummary\n`;
    text += `|date= |finished=\n`;
    text += `|map1=|map1score=|map1win=\n`;;
    text += `|faceit=\n`;
    text += `}}\n\n`;
    text += `&lt;!-- QUARTERFINALS --&gt;\n`;
    text += `|R3W1team= |R3W1score= |R3W1win=\n`;
    text += `|R3W2team= |R3W2score= |R3W2win=\n`;
    text += `|R3G1details={{BracketMatchSummary\n`;
    text += `|date= |finished=\n`;
    text += `|map1=|map1score=|map1win=\n`;;
    text += `|faceit=\n`;
    text += `}}\n`;
    text += `|R3W3team= |R3W3score= |R3W3win=\n`;
    text += `|R3W4team= |R3W4score= |R3W4win=\n`;
    text += `|R3G2details={{BracketMatchSummary\n`;
    text += `|date= |finished=\n`;
    text += `|map1=|map1score=|map1win=\n`;;
    text += `|faceit=\n`;
    text += `}}\n`;
    text += `|R3W5team= |R3W5score= |R3W5win=\n`;
    text += `|R3W6team= |R3W6score= |R3W6win=\n`;
    text += `|R3G3details={{BracketMatchSummary\n`;
    text += `|date= |finished=\n`;
    text += `|map1=|map1score=|map1win=\n`;;
    text += `|faceit=\n`;
    text += `}}\n`;
    text += `|R3W7team= |R3W7score= |R3W7win=\n`;
    text += `|R3W8team= |R3W8score= |R3W8win=\n`;
    text += `|R3G4details={{BracketMatchSummary\n`;
    text += `|date= |finished=\n`;
    text += `|map1=|map1score=|map1win=\n`;;
    text += `|faceit=\n`;
    text += `}}\n\n`;
    text += `&lt;!-- SEMIFINALS --&gt;\n`;
    text += `|R4W1team= |R4W1score= |R4W1win=\n`;
    text += `|R4W2team= |R4W2score= |R4W2win=\n`;
    text += `|R4G1details={{BracketMatchSummary\n`;
    text += `|date= |finished=\n`;
    text += `|map1=|map1score=|map1win=\n`;;
    text += `|faceit=\n`;
    text += `}}\n`;
    text += `|R4W3team= |R4W3score= |R4W3win=\n`;
    text += `|R4W4team= |R4W4score= |R4W4win=\n`;
    text += `|R4G2details={{BracketMatchSummary\n`;
    text += `|date= |finished=\n`;
    text += `|map1=|map1score=|map1win=\n`;;
    text += `|faceit=\n`;
    text += `}}\n\n`;
    text += `&lt;!-- FINALS --&gt;\n`;
    text += `|R5W1team= |R5W1score= |R5W1win=\n`;
    text += `|R5W2team= |R5W2score= |R5W2win=\n`;
    text += `|R5G1details={{BracketMatchSummary\n`;
    text += `|date= |finished=\n`;
    text += `|map1=|map1score=|map1win=\n`;;
    text += `|faceit=\n`;
    text += `}}\n\n`;
    text += `&lt;!-- 3RD PLACE (optional) --&gt;\n`;
    text += `|R5D1team= |R5D1score= |R5D1win=\n`;
    text += `|R5D2team= |R5D2score= |R5D2win=\n`;
    text += `|R5G2details={{BracketMatchSummary\n`;
    text += `|date= |finished=\n`;
    text += `|map1=|map1score=|map1win=\n`;;
    text += `|faceit=\n`;
    text += `}}\n`;
    text += `}}\n`;
    
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
