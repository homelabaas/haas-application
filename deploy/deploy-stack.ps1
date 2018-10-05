# Set swarm target
$env:DOCKER_HOST="tcp://192.168.0.208:2376"

docker stack deploy -c docker-stack-prod.yaml homelabaas
