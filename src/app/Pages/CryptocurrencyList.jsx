import React from "react";
import InfoIcon from "../../resources/images/icon-info.png";

const CryptocurrencyList = () => (
  <div className="cryptocurrency-list">
    <div className="container">
      <h1 className="title">Kriptovaliutos</h1>
      <table class="table table-hover">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Pavadinimas</th>
            <th scope="col">Kaina</th>
            <th scope="col">Rinkos riba</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>Bitoin</td>
            <td>$6,425.93</td>

            <td className="flex-row">
              17,360,525 BTC <img src={InfoIcon} />
            </td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>Bitoin</td>
            <td>$6,425.93</td>
            <td className="flex-row">
              17,360,525 BTC <img src={InfoIcon} />
            </td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td>Bitoin</td>
            <td>$6,425.93</td>
            <td className="flex-row">
              17,360,525 BTC <img src={InfoIcon} />
            </td>
          </tr>
          <tr>
            <th scope="row">4</th>
            <td>Bitoin</td>
            <td>$6,425.93</td>
            <td className="flex-row">
              17,360,525 BTC <img src={InfoIcon} />
            </td>
          </tr>
          <tr>
            <th scope="row">5</th>
            <td>Bitoin</td>
            <td>$6,425.93</td>
            <td className="flex-row">
              17,360,525 BTC <img src={InfoIcon} />
            </td>
          </tr>
          <tr>
            <th scope="row">6</th>
            <td>Bitoin</td>
            <td>$6,425.93</td>
            <td className="flex-row">
              17,360,525 BTC <img src={InfoIcon} />
            </td>
          </tr>
          <tr>
            <th scope="row">7</th>
            <td>Bitoin</td>
            <td>$6,425.93</td>
            <td className="flex-row">
              17,360,525 BTC <img src={InfoIcon} />
            </td>
          </tr>
          <tr>
            <th scope="row">8</th>
            <td>Bitoin</td>
            <td>$6,425.93</td>
            <td className="flex-row">
              17,360,525 BTC <img src={InfoIcon} />
            </td>
          </tr>
          <tr>
            <th scope="row">9</th>
            <td>Bitoin</td>
            <td>$6,425.93</td>
            <td className="flex-row">
              17,360,525 BTC <img src={InfoIcon} />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
);
export default CryptocurrencyList;
