import { ethers } from "hardhat";

// Contract deployed to: 0xdC57509CCd0171660BEB86BA1B6c00e252eF31F1

async function main() {
  const Apartna = await ethers.getContractFactory("Apartna");
  const apartna = await Apartna.deploy();

  await apartna.deployed();

  console.log(`Contract deployed to: ${apartna.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
