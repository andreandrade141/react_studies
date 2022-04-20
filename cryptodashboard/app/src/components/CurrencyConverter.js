import ExchangeRate from './ExchangeRate';
import { useState } from 'react';
import { axios } from 'axios';



const CurrencyConverter = () => {
    const cryptocurrencies = ['BTC', 'ETH', 'ADA', 'XRP', 'LTC', 'USD', 'BRL'];
    const [chosenPrimary, setChosenPrimary] = useState('BTC');
    const [chosenSecondary, setChosenSecondary] = useState('USD');
    const [amount1, setAmount1] = useState(1);
    const [amount2, setAmount2] = useState(1);

    console.log('Primary Chosen: ' +  chosenPrimary);
    console.log('Secondary Chosen: ' +  chosenSecondary);

    const Exchange = () => {
        const options = {
            method: 'GET',
            url: 'https://alpha-vantage.p.rapidapi.com/query',
            params: {from_currency: chosenPrimary, function: 'CURRENCY_EXCHANGE_RATE', to_currency: chosenSecondary},
            headers: {
                'x-rapidapi-host': 'alpha-vantage.p.rapidapi.com',
                'x-rapidapi-key': '4086e69ddamsh28cd8dc21636b8ap12cd64jsn1d28c6763be7'
            }
        }

        axios.request(options).then( (response) => {
            console.log('AXIOS RESPONSE: ' + response.data);
        } ).catch( (error) => {
	        console.error('AXIOS ERROR: ' + error);
        } );
        
    }

    return (
        <div className= "curr-converter">
            <h2>CurrencyConverter</h2>
            <div className="conv-table">
            <table>
            <tbody>
                <tr>
                    <td>
                        Primary Currency: 
                    </td>
                    <td>
                        <input 
                            type="number"
                            name="curr1amount"
                            value={amount1}
                            onChange={(e) => setAmount1(e.target.value)}
                            
                        />
                    </td>
                    <td>
                        <select
                            value={chosenPrimary}
                            name="curr1-opt"
                            className="curr-options"
                            onChange={(e) => setChosenPrimary(e.target.value)}
                        >
                            {cryptocurrencies.map((currency, _index) => (<option key={_index}>{currency}</option>))}

                        </select>
                    </td>
                </tr>
                <tr>
                <td>
                        Secondary Currency: 
                    </td>
                    <td>
                        <input 
                            type="number"
                            name="curr2amount"
                            value={amount2}
                            onChange={(e) => setAmount2(e.target.value)}
                            
                        />
                    </td>
                    <td>
                        <select
                            value={chosenSecondary}
                            name="curr2-opt"
                            className="curr-options"
                            onChange={(e) => setChosenSecondary(e.target.value)}
                        >
                            {cryptocurrencies.map((currency, _index) => (<option key={_index}>{currency}</option>))}

                        </select>
                    </td>
                </tr>
            </tbody>
            </table>

            <button id='send-btn' type='submit' onClick={Exchange}>Exchange</button>
            </div>
           
            <ExchangeRate />
        
        </div>
    )
};

export default CurrencyConverter;
