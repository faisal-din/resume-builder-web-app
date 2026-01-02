import express from 'express';
import {
  createResume,
  deleteResume,
  getPublicResumeById,
  getResumeById,
  updateResume,
} from '../controllers/resume.controller.js';
import protect from '../middlewares/auth.middleware.js';
import upload from '../config/multer.js';

const resumeRouter = express.Router();

resumeRouter.post('/create', protect, createResume);
resumeRouter.put('/update', upload.single('image'), protect, updateResume);
resumeRouter.delete('/delete/:resumeId', protect, deleteResume);
resumeRouter.get('/get/:resumeId', protect, getResumeById);
resumeRouter.get('/public/:resumeId', protect, getPublicResumeById);

export default resumeRouter;
