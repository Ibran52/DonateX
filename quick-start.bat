@echo off
echo ========================================
echo   Donate Dapp - Quick Start Script
echo ========================================
echo.

echo [1/4] Checking Node.js...
node --version
npm --version
echo.

echo [2/4] Installing Hardhat dependencies...
cd hardhat
if not exist "node_modules" (
    npm install
) else (
    echo Dependencies already installed!
)
echo.

echo [3/4] Installing Client dependencies...
cd ../client
if not exist "node_modules" (
    npm install
) else (
    echo Dependencies already installed!
)
echo.

echo [4/4] Setup Complete!
echo.
echo ========================================
echo  Next Steps:
echo ========================================
echo 1. Setup environment variables:
echo    - hardhat/.env (RPC_URL and PRIVATE_KEY)
echo    - client/.env (VITE_CONTRACT_ADDRESS)
echo.
echo 2. Compile smart contract:
echo    cd hardhat
echo    npx hardhatcompile
echo.
echo 3. Deploy contract:
echo    npx hardhat ignition deploy ignition/modules/Donate.js --network sepolia
echo.
echo 4. Run frontend:
echo    cd client
echo    npm run dev
echo.
echo See SETUP_GUIDE.md for detailed instructions!
echo ========================================
pause
