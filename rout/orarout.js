import express from 'express';
import * as orarendController from '../controllers/oracontrollers.js';

const router = express.Router();

router.get('/', orarendController.getAllOrarend);
router.get('/:id', orarendController.getOrarendById);
router.post('/', orarendController.createOrarend);
router.put('/', orarendController.updateOrarend);
router.delete('/:id', orarendController.deleteOrarend);
export default router;  