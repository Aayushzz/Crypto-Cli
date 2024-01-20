const KeyManager = require('../lib/KeyManager');
const CryptoApi = require('../lib/cryptoApi');
const colors = require('colors');
const check = {
    async price(cmd){
        try {
            const keyManager = new KeyManager();
            const key = await keyManager.getKey();
            const api = new CryptoApi(key);

            const response = await api.getData(cmd.coin, cmd.currency);
            let output = `Coin - ${response.data.asset_id_base.yellow}, Price in ${response.data.asset_id_quote.blue} - ${response.data.rate.toFixed(2).green}`;
            console.log(output);
        } catch (error) {
           console.log(error.message);
        }
    }
}

module.exports = check