import * as chai from "chai";
import { ICreateBuild } from "../../src/common/models/ICreateBuild";
import * as routeDefinitions from "../../src/common/routeDefinitions";
import { IBuildConfig } from "./../../src/common/models/IBuildConfig";
import { requestAddress } from "./config";
import chaiHttp = require("chai-http");
import chaiThings = require("chai-things");

chai.should();
chai.use(chaiHttp);
chai.use(chaiThings);

const expect = chai.expect;
const validBuilderConfigId = "packer/openstackallinone/.builder.yml";
let buildConfigId = 0;

describe("Build Configuration endpoint", () => {
    it("should save a new build config with an ISO filename", (done) => {
        const newBuildConfig: IBuildConfig = {
            Name: "Test build config",
            BuilderDefinitionId: validBuilderConfigId,
            VMName: "vmname",
            AppendBuildNumber: true,
            Host: "host",
            HostId: "hostid",
            Datastore: "datastore",
            Network: "network",
            ISO: "ISO File Name",
            SSHUsername: "sshusername",
            SSHPassword: "sshpassword"
        };
        chai.request(requestAddress())
            .post(routeDefinitions.BuildConfigRouteUrl)
            .send(newBuildConfig)
            .end((err, res) => {
                expect(res).to.have.status(200);
                buildConfigId = res.body.NewId;
                done();
             });
    });

    it("should save a new build config with a template", (done) => {
        const newBuildConfig: IBuildConfig = {
            Name: "Test build config with template",
            BuilderDefinitionId: validBuilderConfigId,
            VMName: "vmname",
            AppendBuildNumber: true,
            Host: "host",
            HostId: "hostid",
            Datastore: "datastore",
            Network: "network",
            TemplatePackerBuildId: buildConfigId,
            SSHUsername: "sshusername",
            SSHPassword: "sshpassword"
        };
        chai.request(requestAddress())
            .post(routeDefinitions.BuildConfigRouteUrl)
            .send(newBuildConfig)
            .end((err, res) => {
                expect(res).to.have.status(200);
                done();
             });
    });

    it("should retrieve all build configs", (done) => {
        const saveSettingsPost = {
            settingkey: "settingvalue"
        };
        chai.request(requestAddress())
            .get(routeDefinitions.BuildConfigRouteUrl)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an("array");
                done();
             });
    });

    it("should retrieve a single build config", (done) => {
        const saveSettingsPost = {
            settingkey: "settingvalue"
        };
        chai.request(requestAddress())
            .get(routeDefinitions.BuildConfigRouteUrl + "/" + buildConfigId)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.a("object");
                done();
             });
    });

    it("should create a new build", (done) => {
        const createBuild: ICreateBuild = {
            BuildConfigId: buildConfigId
        };
        chai.request(requestAddress())
            .post(routeDefinitions.BuildRouteUrl)
            .send(createBuild)
            .end((err, res) => {
                expect(res).to.have.status(200);
                done();
             });
    });

    it("should modify an existing build", (done) => {
        const createBuild: ICreateBuild = {
            BuildConfigId: buildConfigId
        };
        const oldBuildConfig: IBuildConfig = {
            Id: buildConfigId,
            Name: "Test build config two",
            BuilderDefinitionId: validBuilderConfigId,
            VMName: "vmname",
            AppendBuildNumber: true,
            Host: "host",
            HostId: "hostid",
            Datastore: "datastore",
            Network: "network",
            ISO: "some iso",
            SSHUsername: "sshusername",
            SSHPassword: "sshpassword"
        };
        chai.request(requestAddress())
            .post(routeDefinitions.BuildConfigRouteUrl)
            .send(oldBuildConfig)
            .end((err, res) => {
                expect(res).to.have.status(200);
                done();
             });
    });

    it("should retrieve a single build config with changes applied", (done) => {
        const saveSettingsPost = {
            settingkey: "settingvalue"
        };
        chai.request(requestAddress())
            .get(routeDefinitions.BuildConfigRouteUrl + "/" + buildConfigId)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.a("object");
                expect(res.body).to.have.property("Name", "Test build config two");
                done();
             });
    });
});
