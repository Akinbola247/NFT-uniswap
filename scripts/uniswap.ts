import {ethers} from "hardhat";
import { BigNumber } from "ethers";

async function mains() {
    //needed addresses
    const FACTORY = "0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f"
  const ROUTER = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D";
  const DAI = "0x6B175474E89094C44Da98b954EedeAC495271d0F";
  const UNI = "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984";
  const DAIHolder = "0x748dE14197922c4Ae258c7939C7739f3ff1db573";
  const deadline = 1776588399;

//impersonation 
  const helpers = require("@nomicfoundation/hardhat-network-helpers");
  await helpers.impersonateAccount(DAIHolder);
  const impersonatedSigner = await ethers.getSigner(DAIHolder);


  const DaiContract = await ethers.getContractAt("IToken", DAI);
  const UniContract = await ethers.getContractAt("IToken", UNI);
  const holderBalance = await DaiContract.balanceOf(DAIHolder);
  console.log(`Dai balance before ${holderBalance}`);
  const holderBalance2 = await UniContract.balanceOf(DAIHolder);
  console.log(`Dai balance before ${holderBalance2}`);

//Uniswap interaction
const amountApprove = ethers.utils.parseEther("100");

const Uniswap = await ethers.getContractAt("IUniswap", ROUTER);
const DaiApproval = await DaiContract.connect(impersonatedSigner).approve(ROUTER, amountApprove);
const UniApproval = await UniContract.connect(impersonatedSigner).approve(ROUTER, amountApprove)

//add liquidity
await Uniswap.connect(impersonatedSigner).addLiquidity(UNI, DAI, amountApprove, amountApprove, 0, 0, DAIHolder, deadline);
const holderBalance3 = await DaiContract.balanceOf(DAIHolder);
  console.log(`Dai balance after first ${holderBalance3}`);
  const holderBalance4 = await UniContract.balanceOf(DAIHolder);
  console.log(`Dai balance after first ${holderBalance4}`);

//addliquidityETH



//remove liquidity
const Factory = await ethers.getContractAt("IUniswapV2Factory", FACTORY);
const pair = await Factory.getPair(UNI, DAI);
const paired = await ethers.getContractAt("IUniswapV2Pair", pair);
console.log(paired.address);
const liquidity = await paired.balanceOf(impersonatedSigner.address);
console.log(liquidity);
// const liq = BigNumber.from(liquidity);
const liqcheck = await parseInt(String(liquidity));
console.log(liqcheck);
await paired.approve(ROUTER, liqcheck);
await Uniswap.connect(impersonatedSigner).removeLiquidity(UNI, DAI, liqcheck, 0, 0, DAIHolder, deadline);

//
// const holderBalance5 = await DaiContract.balanceOf(DAIHolder);
//   console.log(`Dai balance after second ${holderBalance5}`);
//   const holderBalance6 = await UniContract.balanceOf(DAIHolder);
//   console.log(`Dai balance after second ${holderBalance6}`);


}

mains()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });