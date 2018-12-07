const fs = require('fs')
const os = require('os')
const Dat = require('dat-node')
const minimist = require('minimist')

const argv = minimist(process.argv.slice(2))
const file = argv._[0][0] === '/' ? argv._[0] : '/' + argv._[0]
const hashbase = 'https://dsdata.hashbase.io' + file

Dat(os.homedir() + '/dsdata', function (err, dat) {
  if (err) throw err

  dat.joinNetwork()

  const rs = fs.createReadStream(argv._[0])
  const ws = fs.createWriteStream(os.homedir() + '/dsdata' + file)

  rs.pipe(ws)

  rs.on('end', function () {
    dat.importFiles()
    console.log('dat://' + dat.key.toString('hex') + file)
    console.log(hashbase)
    console.log('~/dsdata' + file)
  })
})
