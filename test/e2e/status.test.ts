import * as chai from "chai";
import * as routeDefinitions from "../../src/common/routeDefinitions";
import { requestAddress } from "./config";
import chaiHttp = require("chai-http");
import chaiThings = require("chai-things");

chai.should();
chai.use(chaiHttp);
chai.use(chaiThings);

const expect = chai.expect;

describe("Status call", () => {
    it("should return status 200", (done) => {
        chai.request(requestAddress())
            .get(routeDefinitions.StatusRouteUrl)
            .end((err, res) => {
                expect(res).to.have.status(200);
                done();
             });
    });
});
