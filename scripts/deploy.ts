import { ethers } from "hardhat";

async function main() {
  const Apartna = await ethers.getContractFactory("Apartna");
  const apartna = await Apartna.deploy();

  await apartna.deployed();

  console.log(`Contract deployed to ${apartna.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
