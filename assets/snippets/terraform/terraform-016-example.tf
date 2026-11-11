module "network" {
  source = "./modules/network"
}
output "example" {
  value = module.network.subnet_id
}
