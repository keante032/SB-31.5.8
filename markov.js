/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[\s]+/);
    this.words = words.filter(c => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    let chains = new Map();

    /** base */
    // for (let i = 0; i < this.words.length; i += 1) {
    //   let word = this.words[i];
    //   let nextWord = this.words[i + 1] || null;

    //   if (chains.has(word)) { chains.get(word).push(nextWord); }
    //   else { chains.set(word, [nextWord]); }
    // }

    /** bigram */
    // for (let i = 0; i <= this.words.length - 1; i += 1) {
    //   let bigram = this.words[i] + " " + this.words[i + 1];
    //   let nextWord = this.words[i + 2] || null;

    //   if (chains.has(bigram)) chains.get(bigram).push(nextWord);
    //   else chains.set(bigram, [nextWord]);
    // }

    /** trigram */
    for (let i = 0; i <= this.words.length - 2; i += 1) {
      let trigram = this.words[i] + " " + this.words[i + 1] + " " + this.words[i + 2];
      let nextWord = this.words[i + 3] || null;

      if (chains.has(trigram)) chains.get(trigram).push(nextWord);
      else chains.set(trigram, [nextWord]);
    }

    this.chains = chains;
  }


  /** pick random choice from array */

  choice(ar) {
    return ar[Math.floor(Math.random() * ar.length)];
  }


  /** return random text from chains */

  makeText(numWords = 100) {
    // pick a random key to begin
    let keys = Array.from(this.chains.keys());
    let capitalKeys = keys.filter(text => text.charAt(0).match(/[A-Z]/));
    let key = this.choice(capitalKeys);
    let out = [];

    // produce markov chain until final word
    /** base */
    // while (out.length < numWords && key !== null) {
    //   out.push(key);
    //   key = this.choice(this.chains.get(key));
    // }

    /** bigram */
    // while (out.length < numWords && key !== null) {
    //   let [w1, w2] = key.split(" ");
    //   out.push(w1);
    //   key = w2 + " " + this.choice(this.chains.get(key));
    // }

    /** trigram */
    while (out.length < numWords && key !== null) {
      let [w1, w2, w3] = key.split(" ");
      out.push(w1);
      key = w2 + " " + w3 + " " + this.choice(this.chains.get(key));
    }

    // change output from array to string
    return out.join(" ");
  }
}

module.exports = { MarkovMachine };