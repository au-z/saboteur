const postcss = require('postcss')

const input = fs.readFileSync(filePath, {encoding: 'utf-8'})
postcss(plugins).process(css, { from, to }).then(result => {
  console.log(result.css)
})