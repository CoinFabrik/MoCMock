// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const Multicall3Module = buildModule("Multicall3Module", (m) => {
  const multicall = m.contract("Multicall3");

  return { multicall };
});

export default Multicall3Module;
