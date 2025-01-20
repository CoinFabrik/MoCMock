import { HardhatUserConfig, task } from 'hardhat/config';
import '@nomicfoundation/hardhat-toolbox';

//const MoCMockModule = require("../ignition/modules/MoCMock");
//const { lock } = await hre.ignition.deploy(ApolloModule);
//console.log(`Apollo deployed to: ${await lock.getAddress()}`);

task('query', 'Query state value: parameters: address')
  .addPositionalParam('address', 'The contract address')
  .setAction(async (taskArgs, hre, runSuper) => {
    const MyContract = await ethers.getContractFactory('MoCMock');
    const contract = MyContract.attach(taskArgs.address);
    console.log('getlen:', await contract.getlen());
  });

task('reset', 'Reset state value')
  .addPositionalParam('address', 'The contract address')
  .setAction(async (taskArgs, hre, runSuper) => {
    const MyContract = await ethers.getContractFactory('MoCMock');
    const contract = MyContract.attach(taskArgs.address);
    const tx = await contract.reset();
    console.log('reset:', tx);
  });

task('set', 'Set state value')
  .addPositionalParam('address', 'The contract address')
  .setAction(async (taskArgs, hre, runSuper) => {
    const MyContract = await ethers.getContractFactory('MoCMock');
    const contract = MyContract.attach(taskArgs.address);
    const tx = await contract.push(42);
    console.log('set:', tx);
  });

// *******************************************
// Set each value to evaluate cond_pub == TRUE
// *******************************************
task('setQAClock-t', 'Set qACLockedInPending to 1 (Condition: qACLockedInPending > 0')
  .addPositionalParam('address', 'The contract address')
  .setAction(async (taskArgs, hre, runSuper) => {
    const MyContract = await ethers.getContractFactory('MoCMock');
    const contract = MyContract.attach(taskArgs.address);
    try {
      const tx = await contract.setQACLockedInPending(1);
      console.log('tx:', tx);
    } catch (e) {
      throw new Error(`Unexpected error: ${e}`);
    }
  });

task('setEmaBool-t', 'Set emaBool var to `true` (Condition: emaBool == true)')
  .addPositionalParam('address', 'The contract address')
  .setAction(async (taskArgs, hre, runSuper) => {
    const MyContract = await ethers.getContractFactory('MoCMock');
    const contract = MyContract.attach(taskArgs.address);
    try {
      const tx = await contract.setEmaBool(1);
      console.log('tx:', tx);
    } catch (e) {
      throw new Error(`Unexpected error: ${e}`);
    }
  });

task('setBts-t', 'Set bts var to 0 (Condition: bts == 0')
  .addPositionalParam('address', 'The contract address')
  .setAction(async (taskArgs, hre, runSuper) => {
    const MyContract = await ethers.getContractFactory('MoCMock');
    const contract = MyContract.attach(taskArgs.address);
    try {
      const tx = await contract.setBts(0);
      console.log('tx:', tx);
    } catch (e) {
      throw new Error(`Unexpected error: ${e}`);
    }
  });

task(
  'setNextTC-t',
  'Set nextTCInterestPayment to `currentBlock - 1` (Condition: currentBlock > nextTCInterestPayment)'
)
  .addPositionalParam('address', 'The contract address')
  .setAction(async (taskArgs, hre, runSuper) => {
    const MyContract = await ethers.getContractFactory('MoCMock');
    const contract = MyContract.attach(taskArgs.address);
    try {
      const currentBlock = await ethers.provider.getBlockNumber();
      const tx = await contract.setNextTCInterestPayment(currentBlock - 1);
      console.log('******************');
      console.log('currentBlock: ', currentBlock);
      console.log('******************');
      console.log('tx:', tx);
    } catch (e) {
      throw new Error(`Unexpected error: ${e}`);
    }
  });

// **********************
// Set to arbitrary value
// **********************
task('setQAClock', 'Set qACLockedInPending var to an arbitrary value')
  .addPositionalParam('address', 'The contract address')
  .addPositionalParam('val', 'qACLockedInPending desired value')
  .setAction(async (taskArgs, hre, runSuper) => {
    const MyContract = await ethers.getContractFactory('MoCMock');
    const contract = MyContract.attach(taskArgs.address);
    try {
      const tx = await contract.setQACLockedInPending(taskArgs.val);
      console.log('tx:', tx);
    } catch (e) {
      throw new Error(`Unexpected error: ${e}`);
    }
  });

task('setEmaBool', 'Set emaBool var -  0 (false) : 1 (true)')
  .addPositionalParam('address', 'The contract address')
  .addPositionalParam('val', '0 (false) : 1 (true)')
  .setAction(async (taskArgs, hre, runSuper) => {
    const MyContract = await ethers.getContractFactory('MoCMock');
    const contract = MyContract.attach(taskArgs.address);
    try {
      const tx = await contract.setEmaBool(Number(taskArgs.val));
      console.log('tx:', tx);
    } catch (e) {
      throw new Error(`Unexpected error: ${e}`);
    }
  });

task('setBts', 'Set bts var to an arbitrary value')
  .addPositionalParam('address', 'The contract address')
  .addPositionalParam('val', 'bts desired value')
  .setAction(async (taskArgs, hre, runSuper) => {
    const MyContract = await ethers.getContractFactory('MoCMock');
    const contract = MyContract.attach(taskArgs.address);
    try {
      const tx = await contract.setBts(taskArgs.val);
      console.log('tx:', tx);
    } catch (e) {
      throw new Error(`Unexpected error: ${e}`);
    }
  });

task('setNextTC', 'Set nextTCInterestPayment var to an arbitrary value')
  .addPositionalParam('address', 'The contract address')
  .addPositionalParam('val', 'nextTCInterestPayment desired value')
  .setAction(async (taskArgs, hre, runSuper) => {
    const MyContract = await ethers.getContractFactory('MoCMock');
    const contract = MyContract.attach(taskArgs.address);
    try {
      const tx = await contract.setNextTCInterestPayment(taskArgs.val);
      console.log('tx:', tx);
    } catch (e) {
      throw new Error(`Unexpected error: ${e}`);
    }
  });

// **************
// Query by value
// **************
task('readQAClock', 'Query qACLockedInPending var')
  .addPositionalParam('address', 'The contract address')
  .setAction(async (taskArgs, hre, runSuper) => {
    const MyContract = await ethers.getContractFactory('MoCMock');
    const contract = MyContract.attach(taskArgs.address);
    try {
      const qACLockedInPending = await contract.qACLockedInPending();
      console.log('qACLockedInPending:', qACLockedInPending);
    } catch (e) {
      throw new Error(`Unexpected error: ${e}`);
    }
  });

task('shouldCalculateEma', 'Query emaBool var')
  .addPositionalParam('address', 'The contract address')
  .setAction(async (taskArgs, hre, runSuper) => {
    const MyContract = await ethers.getContractFactory('MoCMock');
    const contract = MyContract.attach(taskArgs.address);
    try {
      const emaBool = await contract.shouldCalculateEma();
      console.log('shouldCalculateEma:', emaBool);
    } catch (e) {
      throw new Error(`Unexpected error: ${e}`);
    }
  });

task('readBts', 'Query bts var')
  .addPositionalParam('address', 'The contract address')
  .setAction(async (taskArgs, hre, runSuper) => {
    const MyContract = await ethers.getContractFactory('MoCMock');
    const contract = MyContract.attach(taskArgs.address);
    try {
      const bts = await contract.getBts();
      console.log('bts:', bts);
    } catch (e) {
      throw new Error(`Unexpected error: ${e}`);
    }
  });

task('readNextTC', 'Query nextTCInterestPayment var')
  .addPositionalParam('address', 'The contract address')
  .setAction(async (taskArgs, hre, runSuper) => {
    const MyContract = await ethers.getContractFactory('MoCMock');
    const contract = MyContract.attach(taskArgs.address);
    try {
      const nextTCInterestPayment = await contract.nextTCInterestPayment();
      console.log('nextTCInterestPayment:', nextTCInterestPayment);
    } catch (e) {
      throw new Error(`Unexpected error: ${e}`);
    }
  });

// ****************
// Query all values
// ****************
task('readAll', 'Query all state vars')
  .addPositionalParam('address', 'The contract address')
  .setAction(async (taskArgs, hre, runSuper) => {
    const MyContract = await ethers.getContractFactory('MoCMock');
    const contract = MyContract.attach(taskArgs.address);
    try {
      const [
        mylen,
        qACLockedInPending,
        shouldCalculateEma,
        bts,
        nextTCInterestPayment,
      ] = await Promise.all([
        contract.mylen(),
        contract.qACLockedInPending(),
        contract.shouldCalculateEma(),
        contract.getBts(),
        contract.nextTCInterestPayment(),
      ]);

      let state = {
        mylen,
        qACLockedInPending,
        shouldCalculateEma,
        bts,
        nextTCInterestPayment,
      };

      console.log('--------------------------');
      console.log(
        'Current blockNumber: ',
        await ethers.provider.getBlockNumber()
      );
      console.log('--------------------------');
      console.log('Mock Contract state: ', state);
    } catch (e) {
      throw new Error(`Unexpected error: ${e}`);
    }
  });

// ****************
// Hardhat config
// ****************
const config: HardhatUserConfig = {
  solidity: '0.8.28',
  networks: {
    docker: {
      url: 'http://192.168.1.54:8545/',
    },
    ganache: {
      url: 'http://localhost:8545/',
    },
  },
};

export default config;
