var gulp = require("gulp");
var request = require("request");
var gunzip = require("gulp-gunzip");
var untar = require("gulp-untar");
var source = require("vinyl-source-stream");
var clean = require("gulp-clean");

// Download the vmware library
gulp.task("prepare-download", function () {
    return request(
        "https://download3.vmware.com/software/vmw-tools/vsphere-sdk-for-javascript/vsphere-1.1.0.tgz"
    )
        .pipe(source("vsphere-1.1.0.tgz"))
        .pipe(gunzip())
        .pipe(untar())
        .pipe(gulp.dest("./src/server/vmwarelibs"));
});

// Tidy up the downloaded folder by removing the .d.ts file
gulp.task(
    "prepare",
    gulp.series("prepare-download", function () {
        return gulp
            .src(["./src/server/vmwarelibs/package/dist/vsphere.d.ts"], {
                read: false,
            })
            .pipe(clean());
    })
);

// Clean the vmware libraries
gulp.task("cleanlibs", function () {
    return gulp
        .src(["./src/server/vmwarelibs"], {
            read: false,
        })
        .pipe(clean());
});
