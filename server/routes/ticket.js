const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const clonedeep = require('lodash.clonedeep');
const { Ticket } = require('../models/Ticket');

const mongoose = require('mongoose');

router.post('/payment', (req, res) => {
  // 구매완료후 DB에 식권 저장
  const TicketList = [];
  let payOrder = 0;
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

module.exports = router;
