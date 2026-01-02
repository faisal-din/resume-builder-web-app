import express from 'express';
import {
  enhanceJobDescription,
  enhanceProfessionalSummary,
  uploadResume,
} from '../controllers/openai.controller.js';
import protect from '../middlewares/auth.middleware.js';

const openaiRouter = express.Router();

openaiRouter.post('/enhance-pro-summary', protect, enhanceProfessionalSummary);
openaiRouter.post('/enhance-job-desc', protect, enhanceJobDescription);
openaiRouter.post('/upload-resume', protect, uploadResume);

export default openaiRouter;
