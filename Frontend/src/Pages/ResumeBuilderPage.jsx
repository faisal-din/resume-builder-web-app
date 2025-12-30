import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { dummyResumeData } from '../assets/assets';
import {
  ArrowLeftIcon,
  Briefcase,
  ChevronLeft,
  ChevronRight,
  FileText,
  FolderIcon,
  GraduationCap,
  Sparkles,
  User,
} from 'lucide-react';
import PersonalInfoForm from '../Components/PersonalInfoForm';

const ResumeBuilderPage = () => {
  const { resumeId } = useParams();

  const [resumeData, setResumeData] = useState({
    _id: '',
    title: '',
    personal_info: {},
    professional_summary: '',
    experience: [],
    education: [],
    projects: [],
    skills: [],
    template: 'classic',
    accent_color: '#3B82F6',
    public: false,
  });

  const loadExistingResume = async () => {
    const resume = dummyResumeData.find((resume) => resume._id === resumeId);
    if (resume) {
      setResumeData(resume);
      document.title = resume.title;
    }
  };

  useEffect(() => {
    loadExistingResume();
  }, []);

  return (
    <div>
      <div className='max-w-7xl mx-auto px-4 py-6'>
        <Link
          to={'/app'}
          className='inline-flex items-center gap-2 text-slate-500 hover:text-slate-700 transition-all'
        >
          <ArrowLeftIcon className='size-4' />
          Back to Dashboard
        </Link>
      </div>

      <div className='max-w-7xl mx-auto px-4 pb-8'>
        <div className='grid lg:grid-cols-12 gap-8'>
          {/* Left Panel - Form */}

          {/* Right Panel - Resume Preview */}
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilderPage;
