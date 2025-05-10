import React from 'react';
import { CheckCircle, AlertCircle } from 'lucide-react';
import { ProfileData } from '../../../services/profileService';

interface ProfileSection {
  id: string;
  label: string;
  completed: boolean;
  tip: string;
}

interface ProfileCompletionCheckerProps {
  profile: ProfileData;
}

export function ProfileCompletionChecker({ profile }: ProfileCompletionCheckerProps) {
  const sections: ProfileSection[] = [
    {
      id: 'basic',
      label: 'Basic Information',
      completed: Boolean(profile.name && profile.title && profile.company),
      tip: 'Add your full name, title, and company'
    },
    {
      id: 'photo',
      label: 'Profile Photo',
      completed: Boolean(profile.avatar && profile.avatar !== 'default-avatar.jpg'),
      tip: 'Upload a professional headshot'
    },
    {
      id: 'bio',
      label: 'Biography',
      completed: Boolean(profile.bio && profile.bio.length > 100),
      tip: 'Write a compelling professional bio (at least 100 characters)'
    },
    {
      id: 'credentials',
      label: 'Credentials',
      completed: Boolean(profile.credentials && profile.credentials.length > 0),
      tip: 'Add your qualifications and experience'
    },
    {
      id: 'expertise',
      label: 'Expertise',
      completed: Boolean(profile.expertise && profile.expertise.length > 0),
      tip: 'Select your areas of expertise'
    },
    {
      id: 'social',
      label: 'Social Links',
      completed: Boolean(
        profile.socialLinks &&
        (profile.socialLinks.linkedin || profile.socialLinks.github || profile.socialLinks.twitter)
      ),
      tip: 'Connect your professional networks'
    }
  ];

  const completedCount = sections.filter(section => section.completed).length;
  const completionPercentage = Math.round((completedCount / sections.length) * 100);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-medium text-gray-900">Profile Completion</h2>
        <span className="text-sm font-medium text-gray-500">
          {completionPercentage}% Complete
        </span>
      </div>

      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div
          className="bg-indigo-600 h-2.5 rounded-full transition-all duration-300"
          style={{ width: `${completionPercentage}%` }}
        ></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sections.map((section) => (
          <div
            key={section.id}
            className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg"
          >
            {section.completed ? (
              <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
            ) : (
              <AlertCircle className="h-5 w-5 text-yellow-500 flex-shrink-0" />
            )}
            <div>
              <h3 className="text-sm font-medium text-gray-900">{section.label}</h3>
              <p className="text-sm text-gray-500">{section.tip}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 