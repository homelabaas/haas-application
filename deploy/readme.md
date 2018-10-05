# Deployment Notes

## Docker Swarm Deployment

Use the docker-stack-prod.yaml file and deploy HaaS into a swarm. Ensure there is an existing overlay network to attach to for the load balancerm which can be found here [Swarm Bootstrap Compose](https://github.com/homelabaas/haas-content/tree/master/deployment-compose/swarm-bootstrap).

* Deploy using the shell script.
* Find the logs from the minio container to get the access key and secret key.
* Log into minio and create a bucket.
* Configure the homelabaas service with the new access key and secret key.
* Copy all the contents folder into the prod bucket.
