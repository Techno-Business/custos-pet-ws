import express from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

import Owner from '../../infra/models/owner.js';
import Pet from '../../infra/models/pet.js';

const router = express.Router();

router.post('/signup', async (req: express.Request, res: express.Response) => {
    try {
        const { email } = req.body;
        const userId = mongoose.Types.ObjectId;

        const ownerSearch = await Owner.findOne({ email });

        if (ownerSearch) {
            res.json({ error: true, message: 'Email already registered' });
            return false;
        }

        const password = await bcrypt.hash(req.body.password, 10);

        const owner = await new Owner({
            ...req.body,
            _id: userId,
            password
        }).save();

        res.json({ owner });

    } catch (err) {
        if (err instanceof Error) {
            res.json({ error: true, message: err.message });
        }
    }
});

router.post('/signin', async (req, res) => {
    try {
        const { email, password } = req.body;
    
        const owner = await Owner.findOne({ email });
    
        if (!owner) {
          res.json({ error: true, message: 'No email address found' });
          return false;
        }
    
        const isPasswordValid = await bcrypt.compare(password, owner.password);
        if (!isPasswordValid) {
          res.json({
            error: true,
            message: 'Incorrect email address or password',
          });
          return false;
        }
    
        // @ts-ignore
        delete owner.password;
    
        res.json({ owner });
        
      } catch (err) {
        if (err instanceof Error) {
            res.json({ error: true, message: err.message });
        }
      }
});

router.get('/pets/:id', async (req, res) => {
  try {
      const pets = await Pet.find({
        ownerId: req.params.id
      });

      if (pets.length == 0) {
        res.json({ error: true, message: 'Nenhum pet cadastrado no momento' });
        return false;
      }

      res.json({ pets });

  } catch (err) {
      if (err instanceof Error) {
          res.json({ error: true, message: err.message });
      }
  }
});

export default router;
