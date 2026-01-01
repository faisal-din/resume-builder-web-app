import { Briefcase, Plus, Sparkles, Trash } from 'lucide-react';
import React from 'react';

const ExperienceForm = ({ data, onChange }) => {
  const addExperience = () => {
    const newExperience = {
      company: '',
      position: '',
      start_date: '',
      end_date: '',
      description: '',
      is_current: '',
    };

    onChange([...data, newExperience]);
  };

  const removeExperience = (index) => {
    const updated = data.filter((_, i) => i !== index);

    onChange(updated);
  };

  const updatedExperience = (index, field, value) => {
    const updated = [...data];
    updated[index] = { ...updated[index], [field]: value };

    onChange(updated);
  };

  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <div>
          <h3 className='flex items-center gap-2 text-lg font-semibold text-gray-900'>
            Professional Experience
          </h3>
          <p className='text-sm text-gray-500'>
            Add your job experience details here
          </p>
        </div>

        <button
          onClick={addExperience}
          className='flex items-center gap-2 px-3 py-1 text-sm bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors
'
        >
          <Plus className='size-4' />
          Add Experience
        </button>
      </div>

      {data.length === 0 ? (
        <div className='text-center py-8 text-gray-500'>
          <Briefcase className='w-12 h-12 mx-auto mb-3 text-gray-300' />
          <p>No experience added yet.</p>
          <p className='text-sm'>Click "Add Experience" to get started.</p>
        </div>
      ) : (
        <div className='space-y-6'>
          {data.map((experience, index) => (
            <div
              key={index}
              className='border border-gray-200 p-4 rounded-lg space-y-3'
            >
              <div className='flex justify-between items-start'>
                <h4 className='text-md font-semibold text-gray-900'>
                  Experience #{index + 1}
                </h4>
                <button
                  onClick={() => removeExperience(index)}
                  className='text-red-500 text-sm hover:text-red-700 transition-colors'
                >
                  <Trash className='size-4' />
                </button>
              </div>

              <div className='grid grid-cols-2 gap-4'>
                <input
                  value={experience.company || ''}
                  onChange={(e) =>
                    updatedExperience(index, 'company', e.target.value)
                  }
                  type='text'
                  placeholder='Company Name'
                  className='px-3 py-2 text-sm rounded-lg'
                />
                <input
                  value={experience.position || ''}
                  onChange={(e) =>
                    updatedExperience(index, 'position', e.target.value)
                  }
                  type='text'
                  placeholder='Position'
                  className='px-3 py-2 text-sm rounded-lg'
                />
                <input
                  value={experience.start_date || ''}
                  onChange={(e) =>
                    updatedExperience(index, 'start_date', e.target.value)
                  }
                  type='month'
                  className='px-3 py-2 text-sm rounded-lg'
                />
                <input
                  value={experience.end_date || ''}
                  onChange={(e) =>
                    updatedExperience(index, 'end_date', e.target.value)
                  }
                  type='month'
                  disabled={experience.is_current}
                  className='px-3 py-2 text-sm rounded-lg disabled:bg-gray-100'
                />
              </div>

              <label className='flex items-center gap-2'>
                <input
                  type='checkbox'
                  checked={experience.is_current || false}
                  onChange={(e) =>
                    updatedExperience(
                      index,
                      'is_current',
                      e.target.checked ? true : false
                    )
                  }
                  className='rounded border-gray-300 text-blue-600 focus:ring-blue-500'
                />

                <span className=' text-sm text-gray-700'>
                  Currently Working Here
                </span>
              </label>

              <div className='space-y-2'>
                <div className='flex items-center justify-between'>
                  <label className='text-sm font-medium text-gray-700'>
                    Job Description
                  </label>

                  <button
                    className='flex items-center gap-1 px-2 py-1 text-xs bg-purple-100 text-purple-700 rounded hover:bg-purple-200 transition-colors
disabled:opacity-50'
                  >
                    <Sparkles className='w-3 h-3' /> Enhance with AI
                  </button>
                </div>

                <textarea
                  value={experience.description || ''}
                  onChange={(e) =>
                    updatedExperience(index, 'description', e.target.value)
                  }
                  rows={4}
                  className='w-full px-3 py-2 text-sm rounded-lg resize-none'
                  placeholder='Describe your responsibilities and achievements in this role.'
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExperienceForm;
