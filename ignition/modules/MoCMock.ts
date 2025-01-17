// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

import { buildModule } from '@nomicfoundation/hardhat-ignition/modules';

const MoCMockModule = buildModule('MoCMockModule', (m) => {
  const lock = m.contract('MoCMock');

  return { lock };
});

export default MoCMockModule;
