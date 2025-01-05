import multer from 'multer'
import {CloudinaryStorage} from 'multer-storage-cloudinary'
import cloudinary from './cloudinaryConfig.js'

const storage = new CloudinaryStorage({
    cloudinary,
    params:async(req,file) =>{
        return {
            folder:'Profiles',
            resource_type:'image',
            format:file.mimetype.split('/')[1],
        }
    }
})

const upload = multer({storage});

export default upload