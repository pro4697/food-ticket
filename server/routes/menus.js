const express = require('express');
const router = express.Router();
const { Menu } = require('../models/Menu');
const multer = require('multer');

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage }).single('file');

router.get('/menus', (req, res) => { // get으로 바꾸기
  // 섹션별 메뉴 가져오기
  Menu.find({ section: req.query.section }).exec((err, result) => {
    if (err) return res.status(400).json({ success: false, err });
    res.status(200).json({ success: true, result });
  });
});

router.post('/uploadfiles', (req, res) => {
  // 메뉴 사진 저장
  upload(req, res, (err) => {
    if (err) {
      return res.json({ success: false, err });
    }
    return res.json({
      success: true,
      url: res.req.file.path,
      fileName: res.req.file.filename,
    });
  });
});

router.post('/savefiles', (req, res) => {
  // 메뉴 생성
  const menu = new Menu(req.body);
  menu.save((err, dox) => {
    if (err) return res.status(400).json({ success: false });
    res.status(200).json({ success: true });
  });
});

module.exports = router;
