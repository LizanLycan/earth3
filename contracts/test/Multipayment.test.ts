import {SignerWithAddress} from '@nomiclabs/hardhat-ethers/signers';
import {ethers} from 'hardhat';
import {expect} from 'chai';

import {IERC20, Multipayment} from '../typechain-types';
import {network} from 'hardhat';

let tokenA: IERC20;
let tokenB: IERC20;
let tokenC: IERC20;
let multipayment: Multipayment;
let payer: SignerWithAddress;
let userA: SignerWithAddress;
let userB: SignerWithAddress;

describe('Contract: Multipayment', () => {
  beforeEach(async () => {
    await network.provider.request({
      method: 'hardhat_reset',
    });
    [payer, userA, userB] = await ethers.getSigners();

    const Token = await ethers.getContractFactory('Token');
    tokenA = (await Token.deploy('Token_A', 'TKA')) as IERC20;
    tokenB = (await Token.deploy('Token_B', 'TKB')) as IERC20;
    tokenC = (await Token.deploy('Token_C', 'TKC')) as IERC20;

    const Multipayment = await ethers.getContractFactory('Multipayment');
    multipayment = (await Multipayment.deploy()) as Multipayment;
    await multipayment.initialize();

    await tokenB.transfer(payer.address, 1000000);
  });

  describe('performMultiPayment', () => {
    beforeEach(async () => {
      await tokenB.connect(payer).approve(multipayment.address, 1000000);
      await tokenA.connect(payer).approve(multipayment.address, 1000000);
      await tokenC.connect(payer).approve(multipayment.address, 1000000);
    });

    it('should performMultiPayment transfer', async () => {
      const payments: Multipayment.PaymentStruct[] = [
        {
          token: tokenB.address,
          receivers: [userA.address, userB.address],
          amountsToTransfer: [50, 50],
        },
      ];

      await multipayment.connect(payer).performMultiPayment(payments);

      expect(await tokenB.balanceOf(userA.address)).to.equal(50);
      expect(await tokenB.balanceOf(userB.address)).to.equal(50);
    });

    it('should revert because amountsToTransfers and receivers length', async () => {
      const payments: Multipayment.PaymentStruct[] = [
        {
          token: tokenB.address,
          receivers: [userA.address, userB.address],
          amountsToTransfer: [50, 50, 50],
        },
      ];

      await expect(multipayment.connect(payer).performMultiPayment(payments)).to.be.revertedWith(
        'Arrays must have same length'
      );
    });

    it('should revert because one receiver is a zero address', async () => {
      const payments: Multipayment.PaymentStruct[] = [
        {
          token: tokenB.address,
          receivers: [userA.address, ethers.constants.AddressZero],
          amountsToTransfer: [50, 50],
        },
      ];

      await expect(multipayment.connect(payer).performMultiPayment(payments)).to.be.revertedWith(
        'Cannot send to a 0 address'
      );
    });

  });
});
