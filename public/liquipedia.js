'use strict';
const months = [ "January", "February", "March", "April", "May", "June", 
           "July", "August", "September", "October", "November", "December" ];

function reformat_32SE(bracket, seed) {

    let result = {};

    const start_round = seed.payload.rounds.length - 5;
    for (let r = 0; r < 5; r++) {
        for (let g = 0; g < seed.payload.rounds[start_round + r].matches.length; g++) {
            result[`R${r+1}G${g+1}`] = {
                name: `R${r+1}G${g+1}`,
                round: `${r+1}`,
                game: `${g+1}`
            };
            result[`R${r+1}G${g+1}`].id = seed.payload.rounds[start_round + r].matches[g];
        }
    }

    const matches = seed.payload.matches;
    const names = Object.keys(result);
    for (const name of names) {
        const status = matches[result[name].id].status;

        switch (status) {
            case "finished":
                result[name].finished = "true";
                result[name].originId = matches[result[name].id].originId;
                if (matches[result[name].id].factions[0].entity.id === "bye") {
                    result[name].team1 = "bye";
                    result[name].team2 = matches[result[name].id].factions[1].entity.name;
                    result[name].win2 = "1";

                } else if (matches[result[name].id].factions[1].entity.id === "bye") {
                    result[name].team1 = matches[result[name].id].factions[0].entity.name;
                    result[name].win1 = "1";
                    result[name].team2 = "bye";
                    
                } else {
                    result[name].team1 = matches[result[name].id].factions[0].entity.name;
                    result[name].win1 = "1" && matches[result[name].id].factions[0].winner;
                    result[name].team2 = matches[result[name].id].factions[1].entity.name;
                    result[name].win2 = "1" && matches[result[name].id].factions[1].winner;
                }
                break;
            case "created":
                result[name].originId = matches[result[name].id].originId;
                result[name].team1 = matches[result[name].id].factions[0].entity.name;
                result[name].team2 = matches[result[name].id].factions[1].entity.name;
                break;
        }
    }

    for (const match of bracket.items) {

        const i = names.findIndex(name => result[name].originId === match.match_id);

        if (i != -1) {

            const match_name = Object.keys(result)[i]
            const swap = result[match_name].team1 != match.teams.faction1.name

            if (match.hasOwnProperty("voting")) {
                let map = match.voting.map.pick
                if (map == "Club House") {
                    map = "Clubhouse"
                }
                result[match_name].map = map
            }

            if (match.hasOwnProperty("results")) {
                if (!swap) {
                    result[match_name].score1 = match.results.score.faction1
                    result[match_name].score2 = match.results.score.faction2
                } else {
                    result[match_name].score1 = match.results.score.faction2
                    result[match_name].score2 = match.results.score.faction1
                }
            }
            
            if (match.hasOwnProperty("started_at")) {
                const date = new Date(match.started_at * 1000);
                result[match_name].date = `${months[date.getUTCMonth()]} ${date.getUTCDate()}, ${date.getUTCFullYear()} - ${date.getUTCHours()}:${date.getUTCMinutes()} {{Abbr/UTC}}`;
            }
        }
    }

    return result
}

function t (item) {
    if (item === undefined) {
        return "";
    } else {
        return item;
    }
}

function format_match(info) {

    let text = `|R${info.round}${info.round==1?"D":"W"}${info.game*2-1}team=${t(info.team1)} |R${info.round}${info.round==1?"D":"W"}${info.game*2-1}score=${t(info.score1)} |R${info.round}${info.round==1?"D":"W"}${info.game*2-1}win=${info.win1?"1":""}\n`;
    text += `|R${info.round}${info.round==1?"D":"W"}${info.game*2}team=${t(info.team2)} |R${info.round}${info.round==1?"D":"W"}${info.game*2}score=${t(info.score2)} |R${info.round}${info.round==1?"D":"W"}${info.game*2}win=${info.win2?"1":""}\n`;
    text += `|${info.name}details={{BracketMatchSummary\n`;
    text += `|date=${t(info.date)} |finished=${t(info.finished)}\n`;
    text += `|map1=${t(info.map)} |map1score=${t(info.score1)}-${t(info.score2)} |map1win=${info.win1?"1":"2"}\n`;;
    text += `|faceit=${t(info.originId)}\n`;
    text += `}}\n`;

    return text
}

function bracket_32SE(id, result) {

    let text = `===Playoffs===\n`;
    text += `:''See all the bracket  [https://www.faceit.com/en/championship/${id}//standings/column|here].''\n\n`;
    text += `{{32SETeamBracket\n`;
    for (const [_, game] of Object.entries(result)) {
        if (game.game == 1) {
            switch (game.round) {
                case "1":
                    text += `\n&lt;!-- ROUND OF 32 --&gt;\n`;
                    break;
                case "2":
                    text += `\n&lt;!-- ROUND OF 16 --&gt;\n`;
                    break;
                case "3":
                    text += `\n&lt;!-- QUARTERFINALS --&gt;\n`;
                    break;
                case "4":
                    text += `\n&lt;!-- SEMIFINALS --&gt;\n`;
                    break;
                case "5":
                    text += `\n&lt;!-- FINALS --&gt;\n`;
                    break;
            }
        }
        text += format_match(game)
    }
    text += `}}\n`;

    return text
}