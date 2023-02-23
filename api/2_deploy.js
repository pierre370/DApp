const Migrations = artifacts.require("contracts/Migrations.sol")

export default function(deployer) {
  deployer.deploy(Migrations)
}
