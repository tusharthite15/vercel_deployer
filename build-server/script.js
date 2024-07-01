
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


async function init(){
    console.log('executing script.js');
    // redorecting to outputh folder
    const outDirPath = path.join(__dirname, 'output')

    const p =  exec(`cd ${outDirPath} && npm install && npm run build`)

    p.stdout.on('data', function(data){
        console.log(data.toString())
    })
    p.stdout.on('error', function(data){
        console.log('error', data.toString())
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