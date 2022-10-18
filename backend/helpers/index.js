const Cloud = require('@google-cloud/storage')
const path = require('path')
const serviceKey = path.join(__dirname, './unique-bonbon-364702-49a30afecdd5.json')

const { Storage } = Cloud
const storage = new Storage({
  keyFilename: serviceKey,
  projectId: 'unique-bonbon-364702',
})

module.exports = storage