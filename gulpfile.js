/**
 * Created by laipraserta on 17/1/18.
 */

const gulp = require('gulp');
const runSequence = require('run-sequence');
const nodemon = require('nodemon');
// const makeWebpackConfig = require('../client/webpack.make');

const serverPath = 'src';
const paths = {
  server: {
    scripts: [
      `${serverPath}/**/*.js`,
      `!${serverPath}/*.js`
    ]
  },
  dist: 'dist'
};

function onServerLog(log) {

}

gulp.task('default', () => {
  console.log('default task');
});

gulp.task('watch', () => {
  gulp.watch(paths.server.scripts);
});

// gulp.task('webpack:dev', () => {
//   const webpackDevMake = makeWebpackConfig({ DEV: true });
//   // return gulp.src(webpackDevMake)
// });

gulp.task('serve', cb => {
  runSequence(
    [
      'start:server'
    ],
    'watch',
    cb
  );
});

gulp.task('start:server', () => {
  process.env.NODE_ENV = process.env.NODE_ENV || 'development';
  // config = require(`./${serverPath}/config/environment`);
  nodemon(`-w ${serverPath} ${serverPath}`)
    .on('log', onServerLog);
});
