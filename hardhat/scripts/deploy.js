const hre = require("hardhat");

async function main() {
    console.log("🚀 Deploying Donate contract...");
    
    const [deployer] = await hre.ethers.getSigners();
    console.log("📝 Deploying with account:", deployer.address);
    
    const balance = await hre.ethers.provider.getBalance(deployer.address);
    console.log("💰 Account balance:", hre.ethers.formatEther(balance), "ETH");
    
    const Donate = await hre.ethers.getContractFactory("Donate");
    console.log("⏳ Deploying contract...");
    
    const donate = await Donate.deploy();
    console.log("⏳ Waiting for deployment confirmation...");
    
    await donate.waitForDeployment();
    
    const contractAddress = await donate.getAddress();
    
    console.log("\n✅ SUCCESS! Donate contract deployed!");
    console.log("📍 Contract Address:", contractAddress);
    console.log("\n📋 COPY THIS TO YOUR client/.env FILE:");
    console.log(`VITE_CONTRACT_ADDRESS="${contractAddress}"`);
    console.log("\n✨ Deployment complete!\n");
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error("❌ Deployment failed:", error);
        process.exit(1);
    });
