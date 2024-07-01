
const { exec } = require('child_process')
const path = require('path')
const fs = require('fs')
const mime = require('mime-types')

const { PutObjectCommand, S3Client, S3Client } = require('@aws-sdk/client-s3')


const S3Client = new S3Client({
    region: '',
    Credential :{
        accessKeyId: '',
        secretAccessKey: '', 
    }
})




    p.on('close', async function(){
        console.log('Build Complete')
        const distFolderPath = path.join(__dirname, 'output', 'dist')
        const distFolderContent = fs.readdirSync(distFolderPath, {recursive:true} )

        for (const filePath of distFolderContent){

            if(fs.lstatSync(filePath).isDirectory() )continue;




            const command = new PutObjectCommand({
                Bucket: '',
                Key : `__outputs/${PROJECT_ID}/${filePath}`,
                Body: fs.createReadStream(filePath),
                ContentType: mime.lookup(filePath)
            }) 
            
            await S3Client.send(command)

        }
        console.log('Done....')
    })
}