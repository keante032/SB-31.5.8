const { MarkovMachine } = require("./markov");

describe("testing my MarkovMachine", function () {
    let mm;
    beforeAll(function () {
        mm = new MarkovMachine(`Sam!
If you will let me be,
I will try them.
You will see.

Say!
I like green eggs and ham!
I do! I like them, Sam-I-am!
And I would eat them in a boat!
And I would eat them with a goat...
And I will eat them in the rain.
And in the dark. And on a train.
And in a car. And in a tree.
They are so good so good you see!

So I will eat them in a box.
And I will eat them with a fox.
And I will eat them in a house.
And I will eat them with a mouse.
And I will eat them here and there.
Say! I will eat them anywhere!

I do so like
Green eggs and ham!
Thank you!
Thank you,
Sam-I-am`);
    });

    test("chains exist", function () {
        let word = "eggs and ham!";
        expect(mm.chains.get(word).length).toBeGreaterThanOrEqual(1);
        word = "eat them with";
        expect(mm.chains.get(word).length).toBeGreaterThanOrEqual(1);
    })

    test("can make text", function () {
        let theText = mm.makeText();
        expect(typeof theText).toEqual("string");
        expect(theText.length).toBeGreaterThanOrEqual(1);
    })

    test("num of words does not exceed input limit", function () {
        let tenWords = mm.makeText(10);
        expect(tenWords.split(" ").length).toBeLessThanOrEqual(10);
        let twentyWords = mm.makeText(20);
        expect(twentyWords.split(" ").length).toBeLessThanOrEqual(20);
        let fiftyWords = mm.makeText(50);
        expect(fiftyWords.split(" ").length).toBeLessThanOrEqual(50);
    })
})