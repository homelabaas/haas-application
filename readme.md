# Homelab Builder

The idea of this application is to provide a great developer/ops experience for a homelab environment, taking a lot of influence from how various cloud vendors present their services in such an easy to consume way.

This is a web application which can manage the building and provisioning of VMs and general infrastructure for a home lab environment. It focuses on having a great way to provision new servers, plus running docker swarm with load balacing and DNS integration. This application is designed to work with a very particular set of technologies for a home lab.

Documentation is very early days, but can be viewed at <http://homelabaas-website.s3-website-ap-southeast-2.amazonaws.com/>.

## Services

This application uses a lot of other tech to achieve a small subset of services similar to cloud tools like OpenStack, AWS, Azure and the Google Cloud.

* VM Builds - Automate the build of VMs with easy set up and run, using packer and targeting vcenter. Output of builds is tracked and managed, to make consumption of the output easy for provisioning and other builds.
* VM Provisioning - Using cloud-init on top of linux, allow for quick, flexible and easy provisioning and configuration of linux machines. Uses the output of the VM builds for the base VM images.
* DNS - Integration with DNS tool, PowerDNS, to automate the creation of DNS records. Similar to Route53.
* Load Balancing - Designed for the express purpose of load balancing across docker containers, not a general load balancing solution. Similar to ALBs.
* Scaling Groups - All the creation of a collection of similar servers via a Scaling Group. Scaling groups can be easily resized to grow or shrink the collection as required, ideally quickly. Similar to an AWS autoscaling group but more simple.
* Environment creation - Using a declarative syntac, deploy a set of Scaling Groups using a particular configuration. Similar to CloudFormation. Also provide the ability to deploy a swarm stack into a docker swarm environment.
* Networking - Allow automatic static IP assignment from a pool of IPs, and to also assist in management of DNS entries.
* Storage - Using minio, provide s3-like storage.

## Known issues & workarounds

No known issues.

## Requirements

The following are required to be installed to get started running or developing this application:

* Docker for Mac/Windows
* Yarn installed globally ```npm install -g yarn```
* Minio Client: <https://docs.minio.io/docs/minio-client-quickstart-guide>
* VMWare vSphere, vCenter server (for doing the vm builds against)

## Development

To get this running there are a few steps:

* Run docker-compose to start minio and postgres
* Get the minio access key and secret keys
* Copy the "contents" folder into minio
* Run the application

The steps are as follows:

### Start Minio and Postgres

```bash
docker-compose up -d
```

### Get Minio access key and secrey key

Mac/Linux

```bash
cat ./minio/config/config.json
```

Powershell

```powershell
cat .\minio\config\config.json
```

### Log into Minio and Sync Contents Folder

Mac/Linux

```bash
mc config host add minio http://localhost:9000 <YOUR_ACCESS_KEY> <YOUR_SECRET_KEY>
./syncContents.sh
```

Windows

```powershell
mc config host add minio http://localhost:9000 <YOUR_ACCESS_KEY> <YOUR_SECRET_KEY>
.\syncContents.ps1
```

You can now browse to <http://localhost:9000> for Minio's web client to check the contents, using the same
credentials as above.

### Log into Postgres

Using any Postgres client, you can log into postgres at localhost on the normal port, 5432. The default
username is `postgres` and password is `devpostgrespwd` (as shown in the docker-compose file).

### If you are running on Docker for Windows

You must override the default socket to connect to. Create a file in the __config__ folder called __local.json__ and paste in the following:

```json
{
    "Docker": {
        "Socket": "//./pipe/docker_engine"
    }
}
```

This file will not be checked in, and will override your settings locally.

### Run the application for development

```bash
yarn run dependencies
yarn run dev
```

You only need to run the dependencies script once, to install the modules and get the vsphere sdk.

## Build

To do a production build run:

```bash
yarn run prod:build
```

To run the production version, run:

```bash
yarn run prod:run
```

## Test

The is currently an API end-to-end test suite. It relies on this application being started in an api testing
mode so that it's dependencies are mocked out, allowing the test suite to run on a CI server. You will,
however, require Minio and Postgres for the application to talk to.

To run the app in API testing mode, run `yarn run apitest:run`.

To fire off the test suite while that is running, run `yarn run apitest:test`.

The API test suit will create it's own database for the run, creating it from scratch every time. This also
will ensure it won't overwrite your development database.

Keep in mind, the API testing mode does not have a web GUI. The test suite just hits all the API endpoints
to make sure they are performing correctly.

## Using Homelab VM Builder

First step is to put some content into Minio to use with the application. Clone the following repo: https://github.com/homelabaas/haas-content and copy it into the build bucker in minio.

Second step is to get some VMs building. You can use the `/contents/packer/ubuntu1804iso/` named "Ubuntu 18.04 ISO Install" builder to create a base Ubuntu box, against the VMWare host, network and datastore of your choice.

Once this is built, you can use the output of that build to feed into the builder "Ubuntu 18.04 Docker" which creates a VM template which has docker installed, but also cloud-init. The means you can provision this box with the "Provision" screen as it will accept a cloud-init file for boot time configuration.

When you create a new machine from the output of the "Ubuntu 18.04 Docker" box, select the "Standard Docker Machine" user data file and load it.

From one of these machines, you can then deploy straight docker containers. Use one of these machines and the docker-compose file in `/deployment-compose/powerdns/docker-compose.yml` to create a PowerDNS box.

For a docker swarm environment, use the environment provision screen and paste in the contents of `/environments/docker-swarm/environment.yaml`. Make sure the IP address settings are fine. This will provision a collection of servers, with a master and worker nodes, running as a swarm.
