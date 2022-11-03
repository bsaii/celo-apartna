import { ethers } from "hardhat";

// Contract deployed to: 0x1333c1dA9b634C0729a4175DdD08E92446AD527e

async function main() {
  const amt = ethers.utils.parseEther("1.5");

  const Apartna = await ethers.getContractFactory("Apartna");
  const apartna = await Apartna.deploy({value: amt});

  await apartna.deployed();

  console.log(`Contract deployed to: ${apartna.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
