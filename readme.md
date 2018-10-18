# Homelab as a Service Application

[![CircleCI](https://circleci.com/gh/homelabaas/haas-application.svg?style=svg)](https://circleci.com/gh/homelabaas/haas-application)

The idea of this application is to provide a great developer/ops experience for a homelab environment, taking a lot of influence from how various cloud vendors present their services in such an easy to consume way.

This is a web application which can manage the building and provisioning of VMs and general infrastructure for a home lab environment. It focuses on having a great way to provision new servers, plus running docker with load balacing and DNS integration. This application is designed to work with a very particular set of technologies for a home lab.

More information, along with documentation, can be found at <https://homelabaas.io>

## Known issues & workarounds

The trello board tracks outstanding bugs.

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
