import * as chai from "chai";
import { INetworkSegment } from "../../src/common/models/INetworkSegment";
import { IPopulateNetworkRequest } from "../../src/common/models/IPopulateNetworkRequest";
import * as routeDefinitions from "../../src/common/routeDefinitions";
import { requestAddress } from "./config";
import chaiHttp = require("chai-http");
import chaiThings = require("chai-things");

chai.should();
chai.use(chaiHttp);
chai.use(chaiThings);

const expect = chai.expect;
let newNetworkSegmentId: number;

describe("The network segment endpoint", () => {
    it("should save a new network segment", (done) => {
        const newSegment: INetworkSegment = {
            Name: "name",
            StartIP: "192.168.0.200",
            EndIP: "192.168.0.250",
            SubnetMask: "255.255.0.0",
            DNS1: "192.168.0.1",
            DNS2: "192.168.0.2",
            Gateway: "192.168.0.1"
        };
        chai.request(requestAddress())
            .post(routeDefinitions.NetworkSegmentUrl)
            .send(newSegment)
            .end((err, res) => {
                expect(res).to.have.status(200);
                newNetworkSegmentId = res.body.NewId;
                done();
             });
    });

    it("should return all segments", (done) => {
        chai.request(requestAddress())
            .get(routeDefinitions.NetworkSegmentUrl)
            .end((err, res) => {
                expect(res).to.have.status(200);
                done();
             });
    });

    it("should populate segments", (done) => {
        const populateSegment: IPopulateNetworkRequest = {
            NetworkSegmentId: newNetworkSegmentId
        }
        chai.request(requestAddress())
            .post(routeDefinitions.NetworkSegmentUrl + "/populate")
            .send(populateSegment)
            .end((err, res) => {
                expect(res).to.have.status(200);
                done();
             });
    });

    it("should return a segment and all it's IP addresses", (done) => {
        chai.request(requestAddress())
            .get(routeDefinitions.NetworkSegmentUrl + "/" + newNetworkSegmentId)
            .end((err, res) => {
                expect(res).to.have.status(200);
                done();
             });
    });

});
