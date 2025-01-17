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
    const mocMock = await MoCMock.deploy();
    return { mocMock, owner, otherAccount };
  }

  describe('Deployment', function () {
    it('Should init with zero', async function () {
      const { mocMock } = await loadFixture(deployOneYearMoCMockFixture);
      expect(await mocMock.mylen()).to.equal(0);
      const _len = await mocMock.getlen();
      expect(_len).to.equal(0);
    });

    it('Push/pop/reset works..', async function () {
      const { mocMock, owner } = await loadFixture(deployOneYearMoCMockFixture);
      expect(await mocMock.getlen()).to.equal(0);
      await mocMock.push(4);
      expect(await mocMock.getlen()).to.equal(1);
      await mocMock.push(4);
      expect(await mocMock.getlen()).to.equal(2);
      await mocMock.push(5);
      expect(await mocMock.getlen()).to.equal(3);
      await mocMock.pop();
      expect(await mocMock.getlen()).to.equal(2);
      await mocMock.reset();
      expect(await mocMock.getlen()).to.equal(0);
    });
  });
});
