// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const Multicall2Module = buildModule("Multicall2Module", (m) => {
  const multicall = m.contract("Multicall2");

  return { multicall };
});

export default Multicall2Module;
