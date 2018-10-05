import * as chai from "chai";
import * as routeDefinitions from "../../src/common/routeDefinitions";
import { IVMSpec } from "./../../src/common/models/IVMSpec";
import { requestAddress } from "./config";
import chaiHttp = require("chai-http");
import chaiThings = require("chai-things");

chai.should();
chai.use(chaiHttp);
chai.use(chaiThings);

const expect = chai.expect;
let vmSpecId = 0;

describe("VM Spec call", () => {
    it("should save a new vm spec", (done) => {
        const newVMSpec: IVMSpec = {
            Name: "test",
            CPUCount: 1,
            RAMinGB: 1
        };
        chai.request(requestAddress())
            .post(routeDefinitions.VMSpecUrl)
            .send(newVMSpec)
            .end((err, res) => {
                expect(res).to.have.status(200);
                vmSpecId = res.body.NewId;
                done();
             });
    });

    it("should retrieve the new vm spec", (done) => {
        chai.request(requestAddress())
            .get(routeDefinitions.VMSpecUrl + "/" + vmSpecId)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.a("object");
                expect(res.body).to.have.property("Name", "test");
                done();
             });
    });

    it("should save changes to an existing vm spec", (done) => {
        const newVMSpec: IVMSpec = {
            Id: vmSpecId,
            Name: "testtwo",
            CPUCount: 1,
            RAMinGB: 1
        };
        chai.request(requestAddress())
            .post(routeDefinitions.VMSpecUrl)
            .send(newVMSpec)
            .end((err, res) => {
                expect(res).to.have.status(200);
                done();
             });
    });

    it("should retrieve the changed vm spec", (done) => {
        chai.request(requestAddress())
            .get(routeDefinitions.VMSpecUrl + "/" + vmSpecId)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.a("object");
                expect(res.body).to.have.property("Name", "testtwo");
                done();
             });
    });

    it("should retrieve all vm specs", (done) => {
        chai.request(requestAddress())
            .get(routeDefinitions.VMSpecUrl)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.a("array");
                done();
             });
    });

});
