import React, { useState } from 'react';
import { BsFillTrashFill } from 'react-icons/bs';

const Assessment: React.FC = () => {
  const [questions, setQuestions] = useState([
    { question: 'Describe a time when you faced a challenging situation at work and how you handled it.' },
    { question: 'How do you manage stress and maintain work-life balance?' }
  ]);

  const [answers, setAnswers] = useState(Array(questions.length).fill(''));

  const handleAnswerChange = (index: number, value: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  return (
    <div className='rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark'>
      <div className='border-b border-stroke py-4 px-6.5 dark:border-strokedark'>
        <h3 className='font-medium text-black dark:text-white'>
          Soft Skill Assessment Questions
        </h3>
      </div>
      <div className='flex flex-col gap-5.5 p-6.5 mb-2'>
        {questions.map((question, index) => (
          <div key={index}>
            <label className='mb-3 block text-black dark:text-white'>
              Question-{index + 1}
            </label>
            <div className='flex flex-col gap-2'>
              <p className='text-black dark:text-white mb-2'>{question.question}</p>
              <textarea
                rows={4}
                placeholder='Your answer here'
                value={answers[index]}
                onChange={(e) => handleAnswerChange(index, e.target.value)}
                className='w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary'
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Assessment;
