import imagekit from '../config/imageKit.js';
import ResumeModel from '../models/resume.model.js';
import fs from 'fs';

// controller for creating a new resume
// POST /api/resumes/create
export const createResume = async (req, res) => {
  try {
    const userId = req.userId;
    const { title } = req.body;
    if (!title) {
      return res.status(400).json({ message: 'Title is required' });
    }

    // create a new resume
    const newResume = await ResumeModel.create({
      userId,
      title,
    });

    res
      .status(201)
      .json({ message: 'Resume created successfully', resume: newResume });
  } catch (error) {
    console.log('Error creating resume: ', error);
    res
      .status(500)
      .json({ message: 'Error creating resume', error: error.message });
  }
};

// controller for deleting a resume
// DELETE /api/resumes/delete
export const deleteResume = async (req, res) => {
  try {
    const userId = req.userId;
    const { resumeId } = req.params;
    if (!resumeId) {
      return res.status(400).json({ message: 'Resume ID is required' });
    }

    // delete the resume
    const deletedResume = await ResumeModel.findOneAndDelete({
      userId,
      _id: resumeId,
    });

    if (!deletedResume) {
      return res.status(404).json({ message: 'Resume not found' });
    }
    res
      .status(200)
      .json({ message: 'Resume deleted successfully', resume: deletedResume });
  } catch (error) {
    console.log('Error deleting resume: ', error);
    res
      .status(500)
      .json({ message: 'Error deleting resume', error: error.message });
  }
};

// controller for getting resume by ID
// GET /api/resumes/get
export const getResumeById = async (req, res) => {
  try {
    const userId = req.user.id;
    const { resumeId } = req.params;
    if (!resumeId) {
      return res.status(400).json({ message: 'Resume ID is required' });
    }

    // get the resume
    const resume = await ResumeModel.findOne({
      userId,
      _id: resumeId,
    });
    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }

    resume.__v = undefined; // remove __v field
    resume.createdAt = undefined; // remove createdAt field
    resume.updatedAt = undefined; // remove updatedAt field

    res.status(200).json({ message: 'Resume fetched successfully', resume });
  } catch (error) {
    console.log('Error fetching resume by ID: ', error);
    res
      .status(500)
      .json({ message: 'Error fetching resume by ID', error: error.message });
  }
};

// controller for get a resume by id public
// GET /api/resumes/public
export const getPublicResumeById = async (req, res) => {
  try {
    const { resumeId } = req.params;
    if (!resumeId) {
      return res.status(400).json({ message: 'Resume ID is required' });
    }

    // get the resume
    const resume = await ResumeModel.findOne({
      public: true,
      _id: resumeId,
    });

    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }

    res.status(200).json({ message: 'Resume fetched successfully', resume });
  } catch (error) {
    console.log('Error fetching public resume by ID: ', error);
    res.status(500).json({
      message: 'Error fetching public resume by ID',
      error: error.message,
    });
  }
};

// controller for update a resume
// PUT /api/resumes/update
export const updateResume = async (req, res) => {
  try {
    const userId = req.userId;
    const { resumeId, resumeData, removeBackground } = req.body;

    const image = req.file;

    const resumeDataCopy = JSON.parse(resumeData);

    if (image) {
      const imageBufferData = fs.createReadStream(image.path);

      const response = await imagekit.files.upload({
        file: imageBufferData,
        fileName: 'resume.png',
        folder: 'user-resumes',
        transformation: {
          pre:
            'w-300,h-300,fo-face, z-0.75' +
            (removeBackground ? ',e-bgremove' : ''),
        },
      });

      resumeDataCopy.personal_info.image = response.url;
    }

    // update the resume
    const updatedResume = await ResumeModel.findOneAndUpdate(
      { userId, _id: resumeId },
      resumeDataCopy,
      { new: true }
    );

    res
      .status(200)
      .json({ message: 'Resume updated successfully', resume: updatedResume });
  } catch (error) {
    console.log('Error updating resume: ', error);
    res
      .status(500)
      .json({ message: 'Error updating resume', error: error.message });
  }
};
