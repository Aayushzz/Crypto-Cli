const packageJson = require('../package.json');

class KeyManager {
    constructor() {
        // Use a promise to ensure asynchronous initialization
        this.configStorePromise = this.initConfigStore();
    }

    async initConfigStore() {
        const ConfigStoreModule = await import('configstore');
        const ConfigStore = ConfigStoreModule.default || ConfigStoreModule;
        this.conf = new ConfigStore(packageJson.name);
    }

    async setKey(key) {
        // Ensure that the ConfigStore is initialized before using it
        await this.configStorePromise;

        if (!this.conf) {
            throw new Error('ConfigStore not initialized. Call initConfigStore first.');
        }

        this.conf.set('ApiKey', key);
        return key;
    }

    async getKey() {
        // Ensure that the ConfigStore is initialized before using it
        await this.configStorePromise;

        if (!this.conf) {
            throw new Error('ConfigStore not initialized. Call initConfigStore first.');
        }

        const key = this.conf.get('ApiKey');
        if (!key) {
            throw new Error('No Api Key Found - Get at coinapi.io');
        }

        return key;
    }

    async deleteKey() {
        // Ensure that the ConfigStore is initialized before using it
        await this.configStorePromise;

        if (!this.conf) {
            throw new Error('ConfigStore not initialized. Call initConfigStore first.');
        }

        const key = this.conf.get('ApiKey');

        if (!key) {
            throw new Error('No Api Key Found - Get at coinapi.io');
        }

        this.conf.delete('ApiKey');
        return;
    }
}

module.exports = KeyManager;
