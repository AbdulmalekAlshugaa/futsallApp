const { Storage } = require('@google-cloud/storage')
const path = require('path')

/**
 * Upload files to firebase storage
 * @param {File} file
 */
const uploadFile = async (file) => {
  const { gcp_projectId, storage_bucket } = process.env
  const storage = new Storage({
      projectId: gcp_projectId
  })
  const bucket = storage.bucket(storage_bucket)

  return new Promise((resolve, reject) => {
    if (!file) {
      reject('No image file')
    }

    let newFileName = `${file.originalname}_${Date.now()}`

    let fileUpload = bucket.file(`futsal/${newFileName}`)

    const blobStream = fileUpload.createWriteStream({
      metadata: {
        contentType: file.mimetype,
      },
    })

    blobStream.on('error', (error) => {
      console.log(error)
      reject('Something is wrong! Unable to upload at the moment.')
    })

    blobStream.on('finish', async () => {
      // The public URL can be used to directly access the file via HTTP.
      const url = await bucket
        .file(`community-users/${newFileName}`)
        .getSignedUrl({ action: 'read', expires: '03-09-2491' })

      resolve(url[0])
    })

    blobStream.end(file.buffer)
  })
}

module.exports = uploadFile