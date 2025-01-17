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
      const qACLockedInPending = await mocMock.qACLockedInPending();
      expect(qACLockedInPending).to.eq(0);
      const emaBool = await mocMock.emaBool();
      expect(emaBool).to.be.false;
      const bts = await mocMock.getBts();
      expect(bts).to.eq(0);
      const nextTCInterestPayment = await mocMock.nextTCInterestPayment();
      expect(nextTCInterestPayment).to.eq(
        await hre.ethers.provider.getBlockNumber()
      );
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

    it('setQA.../setEmaBool/ works', async () => {
      const { mocMock } = await loadFixture(deployOneYearMoCMockFixture);
      await mocMock.setQACLockedInPending(42);
      expect(await mocMock.qACLockedInPending()).to.eq(42);
      await mocMock.setEmaBool(true);
      expect(await mocMock.emaBool()).to.be.true;
      await mocMock.setBts(42);
      expect(await mocMock.getBts()).to.eq(42);
      await mocMock.setNextTCInterestPayment(42);
      expect(await mocMock.nextTCInterestPayment()).to.eq(42);

      // Reset contract
      await mocMock.reset();
      expect(await mocMock.emaBool()).to.be.false;
      expect(await mocMock.qACLockedInPending()).to.eq(0);
      expect(await mocMock.getBts()).to.eq(0);
      expect(await mocMock.nextTCInterestPayment()).to.eq(
        await hre.ethers.provider.getBlockNumber()
      );
    });
  });
});
