const axios = require('axios');
const colors = require('colors');

class CryptoApi {
    constructor(apiKey){
        this.apiKey = apiKey;
        this.baseURL = 'https://rest.coinapi.io/v1';
    }

    async getData(coin, currency){
        try {
          const response = await axios.get(`${this.baseURL}/apiKey-${this.apiKey}/exchangerate/${coin}/${currency}`);
          return response;
        } catch (error) {
            handleApiError(error);
        }
    }
}

function handleApiError(error){
    if (error.response.status === 401){
        throw new Error('Invalid Api Key - Go to coinapi.io')
    } else if (error.response.status === 404) {
        throw new Error('Api key is not responding');
    } else {
        throw new Error('Something went wrong');
    }
}

module.exports = CryptoApi;