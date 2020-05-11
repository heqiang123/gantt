const gulp = require('gulp')
const GulpSSH = require('gulp-ssh')
var exec = require('child_process').exec

// 需要上传到服务器的路径
const remotePath = '/home/guoger/dist'
const config = {
  ssh: {
    host: '121.37.164.204', // 服务器host
    port: 22, // 服务器端口,这个不用改
    username: 'guoger', // 登陆服务器账号
    password: 'Yonde1234' // 登陆服务器密码
  },
  remotePath,
  commands: [
    // 删除现有文件
    `cd /usr/share/nginx`,
    `sudo mv html html9`,
    `sudo mv ~dist html`
  ]
}
const gulpSSH = new GulpSSH({
  ignoreErrors: false,
  sshConfig: config.ssh
})
gulp.task('cmdtask', function(cb) {
  exec('npm run build', function(err, stdout, stderr) {
    console.log(stdout)
    console.log(stderr)
    console.log('打包成功')
    cb(err)
  })
})
gulp.task('shellTask', function() {
  return gulpSSH
    .shell(['cd /usr/share/nginx', 'sudo rm -rf html~', 'sudo mv html html~', 'sudo mv ~/dist html'], { filePath: 'shell.log' })
    .pipe(gulp.dest('logs'))
})

/**
 * 上传文件到服务器
 */
gulp.task('upload', () => {
  console.log('开始上传')
  return gulp.src('./dist/**')
    .pipe(gulpSSH.dest(config.remotePath))
})

/**
 * 上传完成
 */
gulp.task('default', gulp.series('upload', 'shellTask', done => {
  console.log('上传完成')
  done()
}))
