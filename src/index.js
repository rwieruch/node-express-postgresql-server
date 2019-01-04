import 'dotenv/config';
import cors from 'cors';
import bodyParser from 'body-parser';
import express from 'express';

import models, { sequelize } from './models';

const app = express();

app.use(cors());

// Postman: x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// Postman: raw + JSON (application/json)
app.use(bodyParser.json());

// Application-Level Middleware

app.use((req, res, next) => {
  req.models = models;
  next();
});

app.use(async (req, res, next) => {
  req.me = await models.User.findByLogin('rwieruch');
  next();
});

// Routes

app.get('/me', async ({ me }, res) => {
  const user = await models.User.findById(me.id);
  return res.send(user);
});

app.get('/users', async ({ models }, res) => {
  const users = await models.User.findAll();
  return res.send(users);
});

app.get('/users/:userId', async (req, res) => {
  const user = await models.User.findById(req.params.userId);
  return res.send(user);
});

app.get('/messages', async (req, res) => {
  const messages = await models.Message.findAll();
  return res.send(messages);
});

app.get('/messages/:messageId', async (req, res) => {
  const message = await models.User.findById(req.params.messageId);
  return res.send(message);
});

app.post('/messages', async ({ body: { text }, me }, res) => {
  const message = await models.Message.create({
    text,
    userId: me.id,
  });

  return res.send(message);
});

app.delete('/messages/:messageId', async (req, res) => {
  const result = await models.Message.destroy({
    where: { id: req.params.messageId },
  });

  return res.send(true);
});

const eraseDatabaseOnSync = true;

sequelize.sync({ force: eraseDatabaseOnSync }).then(async () => {
  if (eraseDatabaseOnSync) {
    createUsersWithMessages();
  }

  app.listen(process.env.PORT, () =>
    console.log(`Example app listening on port ${process.env.PORT}!`),
  );
});

const createUsersWithMessages = async () => {
  await models.User.create(
    {
      username: 'rwieruch',
      messages: [
        {
          text: 'Published the Road to learn React',
        },
      ],
    },
    {
      include: [models.Message],
    },
  );

  await models.User.create(
    {
      username: 'ddavids',
      messages: [
        {
          text: 'Happy to release ...',
        },
        {
          text: 'Published a complete ...',
        },
      ],
    },
    {
      include: [models.Message],
    },
  );
};
