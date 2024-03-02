import Meme from '../models/Videos.js';
import {getStorage, ref, getDownloadURL} from 'firebase/storage';
import { initializeApp } from 'firebase/app';
import fetch from 'node-fetch';


  const firebaseConfig = {
    apiKey: process.env.APIKEY,
    authDomain: process.env.AUTHDOMAIN,
    projectId: process.env.PROJECTID,
    storageBucket: process.env.STORAGEBUCKET,
    messagingSenderId: process.env.MESSAGINGSENDERID,
    appId: process.env.APPID,
    measurementId: process.env.MEASUREMENTID
  };

  const firebaseApp = initializeApp(firebaseConfig);
  const storage = getStorage(firebaseApp);


export const getAllMemes = async(req,res,next)=>{
    const {page, pageSize} = req.query;
    try {
        const videos = await Meme.find().skip((page-1)*pageSize).limit(pageSize).exec();
        res.status(200).json(videos)
    } catch (error) {
        console.log('cannot find videos');
    }   
}


export const getSingleMeme = async(req, res, next)=>{
    try {
        const meme = await Meme.findById(req.params.id);
        const video = meme.vidUrl;
        const obj = {title:meme.title, time:meme.time, views:meme.views, video:video, desc:meme.desc, tags:meme.tags}
        res.status(200).json(obj);
    } catch (error) {
        console.log('cannot find video');
    }
}


export const downloadMeme = async(req, res, next)=>{
    try {
        const vidUrl = req.query.url;
        const httpsReference = ref(storage, vidUrl);  
        const url = await getDownloadURL(httpsReference);
        const response = await fetch(url);
        res.setHeader('Content-Type', response.headers.get('content-type'));
        res.setHeader('Content-Disposition', 'attachment; filename=video.mp4');

        response.body.pipe(res);
    } catch (error) {
        console.log('this is error', error);
    }
}

export const searchMeme = async(req, res, next)=>{
    const {title, page, pageSize} = req.query;
    try {
        const memes = await Meme.find({ title: { $regex: title, $options: 'i' } }).skip((page-1)*12).limit(pageSize).exec();
        res.status(200).json(memes);
    } catch (error) {
        console.log('server error while searching ', error)
    }
}