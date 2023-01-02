const catchAsync = require('../utillties/catchAsync');
const AppError = require('../utillties/appError');
const mainHandler = require('./mainHandler.js');
const Chapters = require('../model/chaptermodel');
const Books = require('../model/bookModel');
const multer = require('multer');



const storagepdf = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/chapter/pdf');  // set the destination folder
    },
    filename: function (req, file, cb) {
        cb(null, `chapter-${file.fieldname}-${Date.now()}.pdf`);  // set the file name
    }
});
const storageVideo = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/chapter/videos');  // set the destination folder
    },
    filename: function (req, file, cb) {
        cb(null, `chapter-${file.fieldname}-${Date.now()}.mp4`);  // set the file name
    }
});
const storageImage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/chapter/images');  // set the destination folder
    },
    filename: function (req, file, cb) {
        cb(null, `chapter-${file.fieldname}-${Date.now()}.png`);  // set the file name
    }
});


module.exports.getChapter = mainHandler.getOneDoc(Chapters)
module.exports.allChapters = mainHandler.getAllDoc(Chapters);

module.exports.createChapter = catchAsync(async (req, res, next) => {
    if (!req.body.bookId) return next(new AppError('Book Id isnt available', 404));
    const book = await Books.findById(req.body.bookId);
    const allChapter = [];
    book.chapters.forEach(el => allChapter.push(el));

    if (!book) return next(new AppError('Actually! Book isnt available', 404));
    const chap = await Chapters.create(req.body);

    allChapter.push(chap.id);
    await Books.findByIdAndUpdate(book.id, { chapters: allChapter }, {
        new: true,
        runValidators: true
    });

    res.status(201).json(
        {
            status: "success",
            data: {
                data: chap
            }
        }
    );

})


module.exports.addPdfFile = multer({ storage: storagepdf });
module.exports.addPdf = catchAsync(async (req, res, next) => {

    if (!req.file) return next(new AppError('The pdf isnt available', 404))
    if (!req.body.chapId) return next(new AppError('The Chapter referance isnt available', 404));

    const allPdf = [];
    allPdf.push(req.file.filename)

    const chapter = await Chapters.findById(req.body.chapId);
    if (!chapter) return next(new AppError('The Chapter isnt exits', 404));
    chapter.pdfs.forEach(el => allPdf.push(el));



    const chap = await Chapters.findByIdAndUpdate(req.body.chapId, { pdfs: allPdf }, {
        new: true,
        runValidators: true
    });

    res.status(201).json(
        {
            status: "success",
            data: {
                data: chap
            }
        }
    );
})


module.exports.addVideoFile = multer({ storage: storageVideo });
module.exports.addVideo = catchAsync(async (req, res, next) => {
    if (!req.file) return next(new AppError('The video isnt available', 404))
    if (!req.body.chapId) return next(new AppError('The Chapter referance isnt available', 404));

    const allVideos = [];
    allVideos.push(req.file.filename)

    const chapter = await Chapters.findById(req.body.chapId);
    if (!chapter) return next(new AppError('The Chapter isnt exits', 404));
    chapter.videos.forEach(el => allVideos.push(el));

    const chap = await Chapters.findByIdAndUpdate(req.body.chapId, { videos: allVideos }, {
        new: true,
        runValidators: true
    });

    res.status(201).json(
        {
            status: "success",
            data: {
                data: chap
            }
        }
    );
})


module.exports.addImageFile = multer({ storage: storageImage });
module.exports.addImage = catchAsync(async (req, res, next) => {
    if (!req.file) return next(new AppError('The Image isnt available', 404))
    if (!req.body.chapId) return next(new AppError('The Chapter referance isnt available', 404));

    const allImages = [];
    allImages.push(req.file.filename)

    const chapter = await Chapters.findById(req.body.chapId);
    if (!chapter) return next(new AppError('The Chapter isnt exits', 404));
    chapter.images.forEach(el => allImages.push(el));

    const chap = await Chapters.findByIdAndUpdate(req.body.chapId, { images: allImages }, {
        new: true,
        runValidators: true
    });

    res.status(201).json(
        {
            status: "success",
            data: {
                data: chap
            }
        }
    );
})
