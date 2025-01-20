import { loadFixture } from '@nomicfoundation/hardhat-toolbox/network-helpers';
import { expect } from 'chai';
import hre, { ethers } from 'hardhat';
import { condPubStatus } from './utils';
import { MoCMock } from '../typechain-types';

describe('MoCMock', function () {
  async function deployOneYearMoCMockFixture() {
    const [owner, otherAccount] = await hre.ethers.getSigners();
    const MoCMock = await hre.ethers.getContractFactory('MoCMock');
    const mocMock = await MoCMock.deploy();
    return { mocMock, owner, otherAccount };
  }

  describe('Deployment', function () {
    it('Should init with cond pub == FALSE', async function () {
      const { mocMock } = await loadFixture(deployOneYearMoCMockFixture);
      expect(await mocMock.mylen()).to.equal(0);
      const _len = await mocMock.getlen();
      expect(_len).to.equal(0);
      const qACLockedInPending = await mocMock.qACLockedInPending();
      expect(qACLockedInPending).to.eq(0);
      const emaBool = await mocMock.emaBool();
      expect(emaBool).to.be.false;
      const bts = await mocMock.getBts();
      expect(bts).to.eq(1);
      const nextTCInterestPayment = await mocMock.nextTCInterestPayment();
      expect(nextTCInterestPayment).to.eq(
        (await hre.ethers.provider.getBlockNumber()) + 1000
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
      expect(await mocMock.getBts()).to.eq(1);
      expect(await mocMock.nextTCInterestPayment()).to.eq(
        (await hre.ethers.provider.getBlockNumber()) + 1000
      );
    });
  });

  describe('Conditional publishing conditions', function () {
    let mocMock: MoCMock;
    this.beforeAll(async () => {
      ({ mocMock } = await loadFixture(deployOneYearMoCMockFixture));
    });

    it('Cond pub should evaluate to false on deploy', async () => {
      const currentBlock = await ethers.provider.getBlockNumber();

      const [
        qACLockedInPending,
        shouldCalculateEma,
        bts,
        nextTCInterestPayment,
      ] = await Promise.all([
        mocMock.qACLockedInPending(),
        mocMock.shouldCalculateEma(),
        mocMock.getBts(),
        mocMock.nextTCInterestPayment(),
      ]);

      expect(
        condPubStatus({
          qACLockedInPending,
          ema: shouldCalculateEma,
          bts,
          nextTCArgs: {
            nextTCInterestPayment,
            currentBlock,
          },
        })
      ).to.be.false;
    });

    it('Cond pub should evaluate to true if qACLockedInPending > 0', async () => {
      await mocMock.setQACLockedInPending(1);

      const qACLockedInPending = await mocMock.qACLockedInPending();

      expect(condPubStatus({ qACLockedInPending })).to.be.true;
    });

    it('Cond pub should evaluate to true if shouldCalculateEma returns true', async () => {
      await mocMock.setEmaBool(true);

      const ema = await mocMock.shouldCalculateEma();

      expect(condPubStatus({ ema })).to.be.true;
    });

    it('Cond pub should evaluate to true if getBts returns 0', async () => {
      await mocMock.setBts(0);

      const bts = await mocMock.getBts();

      expect(condPubStatus({ bts })).to.be.true;
    });

    it('Cond pub should evaluate to true if currentBlock > nextTCInterestPayment', async () => {
      const currentBlock = await ethers.provider.getBlockNumber();
      await mocMock.setNextTCInterestPayment(currentBlock - 1);

      const nextTCInterestPayment = await mocMock.nextTCInterestPayment();

      expect(
        condPubStatus({ nextTCArgs: { nextTCInterestPayment, currentBlock } })
      ).to.be.true;
    });

    it('After a reset, con pub should evaluate to false', async () => {
      const currentBlock = await ethers.provider.getBlockNumber();

      await Promise.all([
        mocMock.setQACLockedInPending(1),
        mocMock.setEmaBool(true),
        mocMock.setBts(0),
        mocMock.setNextTCInterestPayment(currentBlock - 1),
      ]);

      const [
        qACLockedInPending,
        shouldCalculateEma,
        bts,
        nextTCInterestPayment,
      ] = await Promise.all([
        mocMock.qACLockedInPending(),
        mocMock.shouldCalculateEma(),
        mocMock.getBts(),
        mocMock.nextTCInterestPayment(),
      ]);

      expect(
        condPubStatus({
          qACLockedInPending,
          ema: shouldCalculateEma,
          bts,
          nextTCArgs: {
            nextTCInterestPayment,
            currentBlock,
          },
        })
      ).to.be.true;

      await mocMock.reset();

      // AR = After Reset
      const currentBlockAR = await ethers.provider.getBlockNumber();

      const [
        qACLockedInPendingAR,
        shouldCalculateEmaAR,
        btsAR,
        nextTCInterestPaymentAR,
      ] = await Promise.all([
        mocMock.qACLockedInPending(),
        mocMock.shouldCalculateEma(),
        mocMock.getBts(),
        mocMock.nextTCInterestPayment(),
      ]);

      expect(
        condPubStatus({
          qACLockedInPending: qACLockedInPendingAR,
          ema: shouldCalculateEmaAR,
          bts: btsAR,
          nextTCArgs: {
            nextTCInterestPayment: nextTCInterestPaymentAR,
            currentBlock: currentBlockAR,
          },
        })
      ).to.be.false;
    });
  });
});
