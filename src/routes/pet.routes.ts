import express from 'express';
import mongoose from 'mongoose';

import Pet from '../models/pet.js';
import Cost from '../models/cost.js';

import aws from './../services/aws.js';

const router = express.Router();

router.get('/:id', async (req: express.Request, res: express.Response) => {
    try {
        const pet = await Pet.findById({
          _id: req.params.id
        });

        if (!pet) {
            res.json({ error: true, message: 'Pet not found' });
            return false;
        }
  
        res.json({ pet });

    } catch (err) {
        if (err instanceof Error) {
            res.json({ error: true, message: err.message });
        }
    }
});

router.post('/addpet', async (req: express.Request, res: express.Response) => {
    try {         
        let errors = [];
        const petId = mongoose.Types.ObjectId;
        let photo = '';

        // @ts-ignore
        if (req.files) {
          // @ts-ignore
            const file = req.files.photo;
  
          const nameParts = file.name.split('.');
          const fileName = `${petId}.${nameParts[nameParts.length - 1]}`;
          photo = `pets/${fileName}`;

          const response = await aws.uploadToS3(file, photo);
  
          if (response.error) {
            errors.push({ error: true, message: response.message.message });
          }
        }

        if (errors.length > 0) {
            res.json(errors[0]);
            return false;
        }

        const pet = await new Pet({
            ...req.body,
            _id: petId,
            photo
        }).save();

        res.json({ pet });

    } catch (err) {
        if (err instanceof Error) {
            res.json({ error: true, message: err.message });
        }
    }
});

router.put('/editpet/:id', async (req: express.Request, res: express.Response) => {
    try {
        const petId  = req.params.id; 
        let errors = [];
        let photo = '';

        // @ts-ignore
        if (req.files) {
          // @ts-ignore
            const file = req.files.photo;
  
          const nameParts = file.name.split('.');
          const fileName = `${petId}.${nameParts[nameParts.length - 1]}`;
          photo = `pets/${fileName}`;

          const response = await aws.uploadToS3(file, photo);
  
          if (response.error) {
            errors.push({ error: true, message: response.message.message });
          }
        }

        if (errors.length > 0) {
            res.json(errors[0]);
            return false;
        }

        const pet = await Pet.findByIdAndUpdate(petId, {
            ...req.body,
            photo
        }, { new: true });

        res.json({ pet });

    } catch (err) {
        if (err instanceof Error) {
            res.json({ error: true, message: err.message });
        }
    }
});

router.delete('/deletepet/:id', async (req: express.Request, res: express.Response) => {
    try {
        const petId = req.params.id;
        const pet = await Pet.findByIdAndDelete(petId);
        if (!pet) {
            res.json({ error: true, message: 'Pet not exist'});  
        }  else {
            await aws.deleteFileS3(pet.photo);
            await Cost.deleteMany({
                petId: pet._id
            });
            res.json({ error: false, message: 'Pet successfully deleted'}); 
        }
    } catch (err) {
        if (err instanceof Error) {
            res.json({ error: true, message: err.message });
        }
    }
});

router.post('/addcost', async (req: express.Request, res: express.Response) => {
    try {   
        await new Cost({
            ...req.body
        }).save();

        res.json({ error: false, message: 'Cost apply' });

    } catch (err) {
        if (err instanceof Error) {
            res.json({ error: true, message: err.message });
        }
    }
});

router.get('/costs/:id', async (req: express.Request, res: express.Response) => {
    try {

      const costs = await Cost.find({
        petId: req.params.id
      });

      const costTotal = costs.map(item => item.price).reduce((prev, curr) => prev + curr, 0);

      if (costs.length == 0) {
        res.json({ error: true, message: 'Sem custo adicionado ao pet no momento' });
        return false;
      }
      
      res.json({ costs,
        costTotal
     });

    } catch (err) {
        if (err instanceof Error) {
            res.json({ error: true, message: err.message });
        }
    }
});

export default router;
