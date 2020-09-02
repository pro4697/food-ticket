const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const { Ticket } = require('../models/Ticket');

router.post('/payment', (req, res) => {
  // 구매완료후 DB에 식권 저장
  const TicketList = [];
  let payOrder = 0;
  let now = new Date();
  // 9시간 보정
  let timeZone = new Date(now.getTime() + 540 * 60000).format(
    'yy-MM-dd(KS) HH:mm:ss'
  );

  req.body.Cart.map((cart) => {
    for (let i = 0; i < cart.cnt; i++) {
      TicketList.push({
        user: req.body._id,
        key: crypto
          .createHash('sha512')
          .update(req.body._id + cart.name + payOrder++)
          .digest('base64'),
        name: cart.name,
        url: cart.url,
        section: cart.section,
        date: timeZone,
      });
    }
  });

  TicketList.map((ticket) => {
    try {
      Ticket(ticket).save();
    } catch (e) {
      res.status(400).json({ success: false });
    }
  });
  res.status(200).json({ success: true });
});

router.post('/getTicket', (req, res) => {
  Ticket.find({ user: req.body.userId }).exec((err, result) => {
    if (err) return res.status(400).json({ success: false, err });
    res.status(200).json({ success: true, result });
  });
});

router.post('/useTicket', (req, res) => {
  Ticket.findOneAndDelete({ key: req.body.key }).exec((err, result) => {
    if (err) return res.status(400).json({ success: false, err });
    if (result) res.status(200).json({ success: true, result });
    else res.status(200).json({ success: false });
  });
});

router.post('/isTicket', (req, res) => {
  Ticket.findOne({ key: req.body.key }).exec((err, result) => {
    if (err) return res.status(400).json({ success: false, err });
    if (result) res.status(200).json({ success: true });
    else res.status(200).json({ success: false });
  });
});

Date.prototype.format = function (f) {
  if (!this.valueOf()) return ' ';
  var weekKorShortName = ['일', '월', '화', '수', '목', '금', '토'];
  var d = this;
  return f.replace(/(yyyy|yy|MM|dd|KS|KL|ES|EL|HH|hh|mm|ss|a\/p)/gi, function (
    $1
  ) {
    switch ($1) {
      case 'yyyy':
        return d.getFullYear(); // 년 (4자리)
      case 'yy':
        return (d.getFullYear() % 1000).zf(2); // 년 (2자리)
      case 'MM':
        return (d.getMonth() + 1).zf(2); // 월 (2자리)
      case 'dd':
        return d.getDate().zf(2); // 일 (2자리)
      case 'KS':
        return weekKorShortName[d.getDay()]; // 요일 (짧은 한글)
      case 'HH':
        return d.getHours().zf(2); // 시간 (24시간 기준, 2자리)
      case 'mm':
        return d.getMinutes().zf(2); // 분 (2자리)
      case 'ss':
        return d.getSeconds().zf(2); // 초 (2자리)
      default:
        return $1;
    }
  });
};

String.prototype.string = function (len) {
  var s = '',
    i = 0;
  while (i++ < len) {
    s += this;
  }
  return s;
};

String.prototype.zf = function (len) {
  return '0'.string(len - this.length) + this;
};

Number.prototype.zf = function (len) {
  return this.toString().zf(len);
};

module.exports = router;
