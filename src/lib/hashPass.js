const bcrypt = require('bcrypt');

export default async function hashPass(unHashed) {
    let pass = await bcrypt.hash(unHashed, 10);
    return pass;
}
