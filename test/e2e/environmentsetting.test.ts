import * as chai from "chai";
import * as routeDefinitions from "../../src/common/routeDefinitions";
import { requestAddress } from "./config";
import chaiHttp = require("chai-http");
import chaiThings = require("chai-things");

chai.should();
chai.use(chaiHttp);
chai.use(chaiThings);

const expect = chai.expect;

const environmentName = "testenvironment";

describe("Envirionment setting", () => {
    it("should allow setting of kvps", (done) => {
        const saveSettingsPost = {
            settingkey: "settingvalue"
        };
        chai.request(requestAddress())
            .post(routeDefinitions.EnvironmentUrl + "/" + environmentName)
            .send(saveSettingsPost)
            .end((err, res) => {
                expect(res).to.have.status(200);
                done();
             });
    });

    it("should retrieve the value", (done) => {
        const saveSettingsPost = {
            settingkey: "settingvalue"
        };
        chai.request(requestAddress())
            .get(routeDefinitions.EnvironmentUrl + "/" + environmentName + "/settingkey")
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.equal("settingvalue");
                done();
             });
    });
});
