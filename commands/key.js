const colors = require('colors');
const KeyManager = require('../lib/KeyManager');
const key = {
    async set() {
        const keyManager = new KeyManager();

        // Use dynamic import to resolve the ERR_REQUIRE_ESM issue
        const inquirer = await import('inquirer');
        const { prompt } = inquirer.default || inquirer;

        let isValid = false;
        let apiKey;
        while (!isValid){
            const input = await prompt([
                {
                    type: 'input',
                    name: 'key',
                    message: 'Enter Api Key: '.yellow + '(coinapi.io)',
                    validate: function(value){
                        if (!value){
                            return 'This value is required';
                        } else {
                            isValid = true;
                            return true;
                        }
                    }
                }
            ]);
            apiKey = keyManager.setKey(input.key);
        }
        

        

        if (apiKey) {
            console.log('Api Key Set'.green);
        }
    },
    async show() {
        try {
            const keyManager = new KeyManager();
            const key = await keyManager.getKey();

            console.log('Current Api Key: ', key.green);
            return key;
        } catch (error) {
            console.error(error.message)
        }
    },
    async remove() {
        try {
            const keyManager = new KeyManager();
            await keyManager.deleteKey();
            console.log('Key Removed'. red);
            return;
        } catch (error) {
            console.error(error.message)
        }
    }
}

module.exports = key;
