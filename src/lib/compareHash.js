const bcrypt = require('bcrypt');


export default async function compareHash(unHashed, hash) {
    let comparado = await bcrypt.compare(unHashed, hash);
    return comparado;
}