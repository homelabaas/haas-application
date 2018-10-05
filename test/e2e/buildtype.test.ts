import * as chai from "chai";
import "mocha";
import * as routeDefinitions from "../../src/common/routeDefinitions";
import { requestAddress } from "./config";
import chaiHttp = require("chai-http");
import chaiThings = require("chai-things");

chai.should();
chai.use(chaiHttp);
chai.use(chaiThings);

const expect = chai.expect;
const validItemId = "packer/openstackallinone/.builder.yml";
const validBuildTypeType = "Packer";

describe("Build type get request", () => {
    it("should return status 200", (done) => {
        chai.request(requestAddress())
            .get(routeDefinitions.BuildTypeRouteUrl)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an("array");
                (res.body).should.all.have.property("Id");
                done();
             });
    });
});

describe("Build type get request with type queryparam", () => {
    it("should return an array with items with the proper type", (done) => {
        chai.request(requestAddress())
            .get(routeDefinitions.BuildTypeRouteUrl + "?type=" + validBuildTypeType)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an("array");
                (res.body).should.all.have.property("Id");
                (res.body).should.all.have.property("Type", validBuildTypeType);
                done();
             });
    });
});

describe("BuildType request by id", () => {
    it("should return a valid item", (done) => {
        chai.request(requestAddress())
            .get(routeDefinitions.BuildTypeRouteUrl + "/id?id=" + validItemId)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.a("object");
                expect(res.body).to.have.property("Id");
                done();
             });
    });
});
