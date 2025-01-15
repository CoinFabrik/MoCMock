import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: "0.8.28",
  networks: {
    docker: {
      url: 'http://192.168.1.54:8545/'
    }
  }
};

export default config;
