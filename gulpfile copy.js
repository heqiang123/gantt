const gulp = require('gulp')
const scp = require('gulp-scp2')

gulp.task('default', () => {
  console.log('打包完成，正在上传到服务器')
  return gulp.src('./dist/**/*')
    .pipe(scp({
      host: '121.37.164.204',
      username: 'guoger',
      password: 'Yonde1234',
      dest: '/home/guoger/dist',
      watch: function(client) {
        client.on('write', function(o) {
          console.log('write %s', o.destination)
        })
      }
    }))
    .on('error', (err) => {
      console.log(err)
    })
    .on('end', () => {
      console.log('上传完成')
    })
})
