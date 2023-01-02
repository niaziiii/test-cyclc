const express = require('express');
const chapterController = require('../controller/chapterController');

const chapterRoute = express.Router();


chapterRoute.post('/addpdf', chapterController.addPdfFile.single('pdf'), chapterController.addPdf);
chapterRoute.post('/addvideo', chapterController.addVideoFile.single('video'), chapterController.addVideo);
chapterRoute.post('/addImage', chapterController.addImageFile.single('image'), chapterController.addImage);

chapterRoute
    .route('/chapter/')
    .get(chapterController.allChapters)
    .post(chapterController.createChapter);

chapterRoute
    .route('/chapter/:id')
    .get(chapterController.getChapter);


module.exports = chapterRoute;