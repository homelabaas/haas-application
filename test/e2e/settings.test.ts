import * as chai from "chai";
import { IPowerDnsSettings } from "../../src/common/models/IPowerDnsSettings";
import * as routeDefinitions from "../../src/common/routeDefinitions";
import { IVCenterSettings } from "./../../src/common/models/IVcenterSettings";
import { requestAddress } from "./config";
import chaiHttp = require("chai-http");
import chaiThings = require("chai-things");

chai.should();
chai.use(chaiHttp);
chai.use(chaiThings);

const expect = chai.expect;

describe("Set settings", () => {
    it("should save the vcenter settings", (done) => {
        const vcenterSettings: IVCenterSettings = {
            Username: "vmwarelogin",
            Password: "vmwarepassword",
            URL: "vmware.mydomain.com",
            DefaultFolder: "folder"
        };
        chai.request(requestAddress())
            .post(routeDefinitions.SettingsRouteUrl + "/vcenter")
            .send(vcenterSettings)
            .end((err, res) => {
                expect(res).to.have.status(200);
                done();
             });
    });

    it("should save the powerdns settings", (done) => {
        const powerdnsSettings: IPowerDnsSettings = {
            APIKey: "apikey",
            Url: "http://127.0.0.1:8081",
            defaultDomain: "mydomain.com"
        };
        chai.request(requestAddress())
            .post(routeDefinitions.SettingsRouteUrl + "/powerdns")
            .send(powerdnsSettings)
            .end((err, res) => {
                expect(res).to.have.status(200);
                done();
             });
    });

    it("should retrieve the vcenter settings", (done) => {
        chai.request(requestAddress())
            .get(routeDefinitions.SettingsRouteUrl + "/vcenter")
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.a("object");
                expect(res.body).to.have.property("Username", "vmwarelogin");
                expect(res.body).to.have.property("Password", "vmwarepassword");
                expect(res.body).to.have.property("URL", "vmware.mydomain.com");
                expect(res.body).to.have.property("DefaultFolder", "folder");
                done();
             });
    });

    it("should retrieve the powerdns settings", (done) => {
        chai.request(requestAddress())
            .get(routeDefinitions.SettingsRouteUrl + "/powerdns")
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.a("object");
                expect(res.body).to.have.property("APIKey", "apikey");
                expect(res.body).to.have.property("Url", "http://127.0.0.1:8081");
                expect(res.body).to.have.property("defaultDomain", "mydomain.com");
                done();
             });
    });
});
