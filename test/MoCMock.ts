import {
  time,
  loadFixture,
} from '@nomicfoundation/hardhat-toolbox/network-helpers';
import { anyValue } from '@nomicfoundation/hardhat-chai-matchers/withArgs';
import { expect } from 'chai';
import hre from 'hardhat';

describe('MoCMock', function () {
  async function deployOneYearMoCMockFixture() {
    const [owner, otherAccount] = await hre.ethers.getSigners();
    const MoCMock = await hre.ethers.getContractFactory('MoCMock');
    const lock = await MoCMock.deploy();
    return { lock, owner, otherAccount };
  }

  describe('Deployment', function () {
    it('Should init with zero', async function () {
      const { lock } = await loadFixture(deployOneYearMoCMockFixture);
      expect(await lock.mylen()).to.equal(0);
      const _len = await lock.getlen();
      expect(_len).to.equal(0);
    });

    it('Push/pop/reset works..', async function () {
      const { lock, owner } = await loadFixture(deployOneYearMoCMockFixture);
      expect(await lock.getlen()).to.equal(0);
      await lock.push(4);
      expect(await lock.getlen()).to.equal(1);
      await lock.push(4);
      expect(await lock.getlen()).to.equal(2);
      await lock.push(5);
      expect(await lock.getlen()).to.equal(3);
      await lock.pop();
      expect(await lock.getlen()).to.equal(2);
      await lock.reset();
      expect(await lock.getlen()).to.equal(0);
    });
  });
});
