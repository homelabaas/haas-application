import * as chai from "chai";
import * as routeDefinitions from "../../src/common/routeDefinitions";
import { requestAddress } from "./config";
import chaiHttp = require("chai-http");
import chaiThings = require("chai-things");

chai.should();
chai.use(chaiHttp);
chai.use(chaiThings);

const expect = chai.expect;

describe("The artifact endpoint", () => {
    it("should return a list of all artifacts with their builds", (done) => {
        chai.request(requestAddress())
            .get(routeDefinitions.ArtifactsUrl)
            .end((err, res) => {
                expect(res).to.have.status(200);
                done();
             });
    });

    it("should return a list of all artifacts with their builds by a certain feature", (done) => {
        chai.request(requestAddress())
            .get(routeDefinitions.ArtifactsUrl)
            .end((err, res) => {
                expect(res).to.have.status(200);
                done();
             });
    });
});
