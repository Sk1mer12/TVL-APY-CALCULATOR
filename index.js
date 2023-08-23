// pages/index.js
import Table from '../app/components/Table';
import React, { useState, useEffect } from 'react';

const ApiFetcher = () => {
  const [wstETH_Price, setwstETH_Price] = useState(null);
  const [ankrETH_Price, setankrETH_Price] = useState(null);
  const [wstETH_Balance, setwstETH_Balance] = useState(null);
  const [ankrETH_Balance, setankrETH_Balance] = useState(null);

  const [feeEarned, setfeeEarned] = useState(null);
  const [totalValueLocked, settotalValueLocked] = useState(null);
  const [daysElapsed, setdaysElapsed] = useState(null);

  useEffect(() => {
    const apiUrl = 'http://api.balancer.fi/pools/0x1/0xdfe6e7e18f6cc65fa13c8d8966013d4fda74b6ba000000000000000000000558';

    fetch(apiUrl)
      .then(response => response.json())
      .then(wstETH_Price => {
        console.log(wstETH_Price)
        wstETH_Price = wstETH_Price.tokens[0].token.latestUSDPrice
        setwstETH_Price(wstETH_Price);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  useEffect(() => {
    const apiUrl = 'http://api.balancer.fi/pools/0x1/0xdfe6e7e18f6cc65fa13c8d8966013d4fda74b6ba000000000000000000000558';

    fetch(apiUrl)
      .then(response => response.json())
      .then(ankrETH_Price => {
        ankrETH_Price = ankrETH_Price.tokens[2].token.latestUSDPrice
        setankrETH_Price(ankrETH_Price);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);
  
  useEffect(() => {
    const apiUrl = 'http://api.balancer.fi/pools/0x1/0xdfe6e7e18f6cc65fa13c8d8966013d4fda74b6ba000000000000000000000558';

    fetch(apiUrl)
      .then(response => response.json())
      .then(wstETH_Balance => {
        wstETH_Balance = wstETH_Balance.tokens[1].token.pool.tokens[0].balance
        setwstETH_Balance(wstETH_Balance);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  useEffect(() => {
    const apiUrl = 'http://api.balancer.fi/pools/0x1/0xdfe6e7e18f6cc65fa13c8d8966013d4fda74b6ba000000000000000000000558';

    fetch(apiUrl)
      .then(response => response.json())
      .then(ankrETH_Balance => {
        ankrETH_Balance = ankrETH_Balance.tokens[1].token.pool.tokens[2].balance
        setankrETH_Balance(ankrETH_Balance);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  useEffect(() => {
    const apiUrl = 'http://api.balancer.fi/pools/0x1/0xdfe6e7e18f6cc65fa13c8d8966013d4fda74b6ba000000000000000000000558';

    fetch(apiUrl)
      .then(response => response.json())
      .then(totalValueLocked => {
        totalValueLocked = totalValueLocked.graphData.totalLiquidity
        settotalValueLocked(totalValueLocked);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  useEffect(() => {
    const apiUrl = 'http://api.balancer.fi/pools/0x1/0xdfe6e7e18f6cc65fa13c8d8966013d4fda74b6ba000000000000000000000558';

    fetch(apiUrl)
      .then(response => response.json())
      .then(daysElapsed => {
        daysElapsed = daysElapsed.createTime
        setdaysElapsed(daysElapsed);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);
  
  useEffect(() => {
    const apiUrl = 'http://api.balancer.fi/pools/0x1/0xdfe6e7e18f6cc65fa13c8d8966013d4fda74b6ba000000000000000000000558';

    fetch(apiUrl)
      .then(response => response.json())
      .then(feeEarned => {
        feeEarned = feeEarned.totalSwapFee
        setfeeEarned(feeEarned);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);
  

  const TVL = (parseFloat(wstETH_Price)*parseFloat(wstETH_Balance)) + (parseFloat(ankrETH_Price)*parseFloat(ankrETH_Balance))
  const APY = (1 + parseFloat(feeEarned) / parseFloat(totalValueLocked)) ** (365 / (parseFloat(daysElapsed)*384)) - 1
  

  return (
    <div className="table-container">
      <table>
        <tbody>
          <tr>
            <th>TVL</th>
            <td>{JSON.stringify(TVL, null, 2)}</td>
            <style></style>
          </tr>
          <tr>
            <th>APY</th>
            <td>{JSON.stringify(APY, null, 2)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ApiFetcher;





