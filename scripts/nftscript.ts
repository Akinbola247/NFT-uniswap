import {ethers} from "hardhat";

async function mains() {
    const mintAddr = "0x7bf78028E53e76a322b4B07bdA6362720D4E64F3";
  const [owner, owner2] = await ethers.getSigners()
//   const nftContract = await ethers.getContractFactory("KenNFT");
//   const deployedNFTContract = await nftContract.deploy();
//   await deployedNFTContract.deployed();

//   console.log("NFT Contract Address:", deployedNFTContract.address);

//   const Ownerbalance = await deployedNFTContract.balanceOf(owner.address);
//   const own = await deployedNFTContract.ownerOf(0);
//   console.log(await Ownerbalance);
//   console.log(own);

//   const Owner2balance = await deployedNFTContract.balanceOf(owner2.address);
//   console.log(`balance before owner2 mint ${Owner2balance}`);

//   const minting = await deployedNFTContract.safeMint(owner2.address, 2);
//   const Owner2balanceCheck = await deployedNFTContract.balanceOf(owner2.address);
//   console.log(`balance of owner2 after mint ${Owner2balanceCheck}`);

const dep = await ethers.getContractAt("INFT", "0xFb4b50e1BFEFc367c45152B7cC70C83D3b51be16");
// await dep.safeMint(mintAddr, "https://ipfs.filebase.io/ipfs/QmQZcX5PAizWAB8JG4WUeYtBoWtUJ624zRKJzuKqs6WPXn");
const checkmintAddr = await dep.balanceOf(mintAddr)

}

mains()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });