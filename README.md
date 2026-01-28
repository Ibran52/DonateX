
<a name="readme-top"></a>

<!-- PROJECT LOGO -->
<br />
<div align="center">

  <h1 align="center">DonateX</h1>

  <p align="center">
    DonateX is a user-friendly platform that allows individuals to make charitable contributions securely and transparently using blockchain technology. It empowers users to donate to various causes and track their contributions with ease.
    <br />
    
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project 

[![Product Name Screen Shot][product-screenshot]](https://donate-dapp.vercel.app/)

## [Live Project Link 🚀](https://donate-dapp.vercel.app/)

### Built With

- **React** - used to write frontend code
- **Tailwind** - used to style the frontend
- **Ethers V6** - used to interact with app on chain 
- **Hardhat** - used to write contract

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Technical Aspect / Features

- **Smart Contracts**: Handle donations, manage campaign funds, and ensure transparency and security.
- **Blockchain Integration**: Ensure all transactions are recorded on the blockchain for transparency.
- **Wallet Integration:** Support popular digital wallets for seamless transactions.

<!-- GETTING STARTED -->
## Getting Started


### Prerequisites

This is an example of how to list things you need to use the software and how to install them.
* npm
  ```sh
  npm install npm@latest -g
  ```


### Installation

#### Install and deploy you smart contract
1. git clone this repo
```
git clone https://github.com/tusharnagar17/donate-dapp.git
```

2. deploy smart contract
```
cd hardhat
npm install
npx hardhat compile
```

3. add these credentails in you .env
- Get RPC url from Infura, Alchemy
- Get private key from Metamask
```
RPC_URL=""
PRIVATE_KEY=""
```

4. Deploy you contract on RPC url
```
npx hardhat ignition ignition/modules/Donate.js
```

5. You will get Contract Address or you can get it from etherscan.

#### Get you frontend ready
1. First go to your `client` directory
```
cd client
npm install
```

2. Paste the contract Address in `.env` file
```
VITE_CONTRACT_ADDRESS=""
```

3. Now you can run and test you project at [http://localhost:5173/](http://localhost:5173)
```
npm run dev
```



