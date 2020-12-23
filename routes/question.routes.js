const { Router } = require('express');
const Question = require('../models/Question');
const Member = require('../models/Member');
const auth = require('../middleware/auth.middleware');

const router = Router();

router.post('/generate', auth, async (req, res) => {
  try {
    const { question, options, answer } = req.body;

    const quest = new Question({
      question,
      options,
      answer,
      owner: req.user.userId,
    });

    await quest.save();

    res.status(201).json({ quest });
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
  }
});

router.post('/change', auth, async (req, res) => {
  try {
    const { id, success } = req.body;

    const question = await Question.findById(id).exec();

    if (question) {
      const member = new Member({
        question: question._id,
        userId: req.user.userId,
        isSuccessfully: success,
      });

      await member.save();

      question.members.push(member._id);
      await question.save();
    }

    res.json(question);
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
  }
});

router.get('/', auth, async (req, res) => {
  try {
    const members = await Member.find({ userId: req.user.userId }).populate('question');
    res.json(members);
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
  }
});

router.get('/:id', auth, async (req, res) => {
  try {
    const question = await Question.findById(req.params.id).populate({
      path: 'members',
      match: { userId: { $eq: req.user.userId } },
    });
    res.json(question);
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
  }
});

module.exports = router;
