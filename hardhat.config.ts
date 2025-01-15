import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

//const LockModule = require("../ignition/modules/Lock");
//const { lock } = await hre.ignition.deploy(ApolloModule);
//console.log(`Apollo deployed to: ${await lock.getAddress()}`);


task("query", "Query state value: parameters: address")
	.addPositionalParam("address", "The contract address")
	.setAction(async (taskArgs, hre, runSuper) => {
    const MyContract = await ethers.getContractFactory("Lock");
    const contract = MyContract.attach(taskArgs.address);
    console.log("getlen:", await contract.getlen());
});

task("reset", "Reset state value")
	.addPositionalParam("address", "The contract address")
	.setAction(async (taskArgs, hre, runSuper) => {
    const MyContract = await ethers.getContractFactory("Lock");
    const contract = MyContract.attach(taskArgs.address);
    const tx = await contract.reset();
    console.log("reset:", tx);
});

task("set", "Set state value")
	.addPositionalParam("address", "The contract address")
	.setAction(async (taskArgs, hre, runSuper) => {
    const MyContract = await ethers.getContractFactory("Lock");
    const contract = MyContract.attach(taskArgs.address);
    const tx = await contract.push(42);
    console.log("set:", tx);
});




const config: HardhatUserConfig = {
  solidity: "0.8.28",
  networks: {
    docker: {
      url: 'http://192.168.1.54:8545/'
    }
  }
};

export default config;
