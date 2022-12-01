/** Command-line tool to generate Markov text. */

const fs = require('fs');
const process = require('process');
const axios = require('axios');
const { MarkovMachine } = require("./markov");

// handle output: write to file if out given, else print
function handleOutput(text, out) {
    if (out) {
        try {
            fs.writeFileSync(out, text);
            console.log(`Successfully wrote contents to ${out}`);
        } catch (err) {
            console.error(`Couldn't write ${out}: ${err}`);
            process.exit(1);
        }
    } else {
        console.log(text);
    }
}

// read file at path and do output

function makeTextFromFile(path, out) {
    try {
        const contents = fs.readFileSync(path, 'utf8');
        let mm = new MarkovMachine(contents)
        handleOutput(mm.makeText(), out)
    } catch (err) {
        console.error(`Error reading ${path}: ${err}`);
        process.exit(1);
    }
}

// read page at URL and do output

async function makeTextFromWeb(url, out) {
    try {
        const resp = await axios.get(url);
        let mm = new MarkovMachine(resp.data)
        handleOutput(mm.makeText(), out)
    } catch (err) {
        console.error(`Error fetching ${url}: ${err}`);
        process.exit(1);
    }
}

let path;
let out;

if (process.argv[2] === '--out') {
    out = process.argv[3];
    kind = process.argv[4];
    path = process.argv[5];
} else {
    kind = process.argv[2];
    path = process.argv[3];
}

// determine if input path is a file path or a web URL and call appropriate function

if (kind === "url") {
    makeTextFromWeb(path, out);
} else {
    makeTextFromFile(path, out);
}