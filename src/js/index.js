console.log("test");

class Test {
    title = "";
    #secret = "";

    constructor(title, secret) {
        this.title = title;
        this.#secret = secret;
    }

    getSecret() {
        return this.#secret;
    }
}

const test1 = new Test("Main", "haha");

console.log(test1.title, test1.secret, test1.getSecret());
