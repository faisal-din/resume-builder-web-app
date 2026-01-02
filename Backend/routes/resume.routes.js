import express from 'express';
import {
  createResume,
  deleteResume,
  getPublicResumeById,
  getResumeById,
  updateResume,
} from '../controllers/resume.controller.js';

const resumeRouter = express.Router();

resumeRouter.post('/create', createResume);
resumeRouter.delete('/delete', deleteResume);
resumeRouter.get('/get', getResumeById);
resumeRouter.get('/public', getPublicResumeById);
resumeRouter.put('/update', updateResume);

export default resumeRouter;
