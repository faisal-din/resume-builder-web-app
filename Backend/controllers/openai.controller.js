import openai from '../config/ai.js';
import ResumeModel from '../models/resume.model.js';

// controller for enhancing resume`s professional summary
// POST /api/ai/enhance-pro-summary
export const enhanceProfessionalSummary = async (req, res) => {
  try {
    const { userContent } = req.body;

    if (!userContent) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const response = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL,
      messages: [
        {
          role: 'system',
          content:
            'You are ab expert in resume writing. Your task is to enhance the professional summary of a resume. The summary should be 1-2 sentences also highlighting key skills, experience and career objectivers. Make it compelling and ATS-friendly. and only return text no options or anything else.',
        },

        {
          role: 'user',
          content: userContent,
        },
      ],
    });

    const enhancedSummary = response.choices[0].message.content;

    res.status(200).json({
      message: 'Professional summary enhanced successfully',
      enhancedSummary,
    });
  } catch (error) {
    console.log('Error enhancing professional summary:', error);
    res.status(500).json({
      message: 'Failed to enhance professional summary',
      error: error.message,
    });
  }
};

// controller for enhancing resume`s job description
// POST /api/ai/enhance-job-desc
export const enhanceJobDescription = async (req, res) => {
  try {
    const { userContent } = req.body;
    if (!userContent) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const response = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL,
      messages: [
        {
          role: 'system',
          content:
            'You are ab expert in resume writing. Your task is to enhance the job descriptions of a resume. The job descriptions should be inly 1-2 sentences highlighting key responsibilities and achievements. Use action verbs and quantifiable results where possible. Make it compelling and ATS-friendly. and only return text no options or anything else.',
        },
        {
          role: 'user',
          content: userContent,
        },
      ],
    });
    const enhancedJobDesc = response.choices[0].message.content;

    res.status(200).json({
      message: 'Job description enhanced successfully',
      enhancedJobDesc,
    });
  } catch (error) {
    console.log('Error enhancing job description:', error);
    res.status(500).json({
      message: 'Failed to enhance job description',
      error: error.message,
    });
  }
};

// controller for uploading resume to the database
// POST /api/ai/upload-resume
export const uploadResume = async (req, res) => {
  try {
    const { resumeText, title } = req.body;
    const userId = req.userId;

    if (!resumeText || !title) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const systemPrompt =
      'You are an expert AI Agent to extract data from this resume.';

    const userPrompt = `Extract data from this resume: ${resumeText}. 
    
    Provide data in the following JSON format with no additional text before or after:
    {
    professional_summary: {
        type: String,
        default: '',
    },
    skills: [
        {
            type: String,
        },
    ],
    personal_info: {
        image: { type: String, default: '' },
        full_name: { type: String, default: '' },
        profession: { type: String, default: '' },
        email: { type: String, default: '' },
        phone: { type: String, default: '' },
        location: { type: String, default: '' },
        linkedin: { type: String, default: '' },
        website: { type: String, default: '' },
    },
    experiences: [
        {
            job_title: { type: String },
            company: { type: String },
            start_date: { type: String },
            end_date: { type: String },
            description: { type: String },
            is_current: { type: Boolean },
        },
    ],
    project: [
        {
            name: { type: String },
            type: { type: String },
            description: { type: String },
        },
    ],
    education: [
        {
            institution: { type: String },
            degree: { type: String },
            field: { type: String },
            graduation_date: { type: String },
            gpa: { type: String },
        },
    ],
    }
    `;

    const response = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      response_format: { type: 'json_object' },
    });

    const extractedData = response.choices[0].message.content;
    const parsedData = JSON.parse(extractedData);
    const newResume = await ResumeModel.create({
      userId,
      title,
      ...parsedData,
    });

    res.status(200).json({
      message: 'Resume uploaded successfully',
      resumeId: newResume._id,
    });
  } catch (error) {
    console.log('Error uploading resume:', error);
    res.status(500).json({
      message: 'Failed to upload resume',
      error: error.message,
    });
  }
};
