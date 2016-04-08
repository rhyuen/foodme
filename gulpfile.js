var gulp = require("gulp");
var browserSync = require("browser-sync").create();


gulp.task("browserSync", function(){
  browserSync.init({
    proxy: "localhost:9098"
  });
});

gulp.task("watch", ["browserSync"], function(){
  gulp.watch("public/views/*.hbs", browserSync.reload);
});
