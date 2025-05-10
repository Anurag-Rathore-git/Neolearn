import React from 'react';
import { Mail, Phone, MapPin, Globe, Twitter, Linkedin, Github, Youtube, Instagram } from 'lucide-react';
import { ProfileData } from '../../../services/profileService';

interface PublicProfilePreviewProps {
  profile: ProfileData;
}

export function PublicProfilePreview({ profile }: PublicProfilePreviewProps) {
  const {
    name,
    email,
    phone,
    location,
    title,
    company,
    website,
    bio,
    avatar,
    socialLinks,
    expertise,
    credentials
  } = profile;

  const getPlatformIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'website':
        return <Globe className="w-5 h-5" />;
      case 'twitter':
        return <Twitter className="w-5 h-5" />;
      case 'linkedin':
        return <Linkedin className="w-5 h-5" />;
      case 'github':
        return <Github className="w-5 h-5" />;
      case 'youtube':
        return <Youtube className="w-5 h-5" />;
      case 'instagram':
        return <Instagram className="w-5 h-5" />;
      default:
        return <Globe className="w-5 h-5" />;
    }
  };

  const hasSocialLinks = Object.values(socialLinks).some(url => url !== undefined);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      {/* Profile Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-indigo-800 p-6 rounded-t-lg">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <img
              src={avatar || '/default-avatar.png'}
              alt={name}
              className="w-24 h-24 rounded-full border-4 border-white"
            />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">{name}</h1>
            <p className="text-indigo-100">{title}</p>
            {company && <p className="text-indigo-100">{company}</p>}
          </div>
        </div>
      </div>

      {/* Basic Information */}
      <div className="p-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center space-x-2">
            <Mail className="w-5 h-5 text-gray-400" />
            <span className="text-gray-600">{email}</span>
          </div>
          {phone && (
            <div className="flex items-center space-x-2">
              <Phone className="w-5 h-5 text-gray-400" />
              <span className="text-gray-600">{phone}</span>
            </div>
          )}
          {location && (
            <div className="flex items-center space-x-2">
              <MapPin className="w-5 h-5 text-gray-400" />
              <span className="text-gray-600">{location}</span>
            </div>
          )}
          {website && (
            <div className="flex items-center space-x-2">
              <Globe className="w-5 h-5 text-gray-400" />
              <a
                href={website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 hover:text-indigo-500"
              >
                {website}
              </a>
            </div>
          )}
        </div>

        {/* Social Links */}
        {hasSocialLinks && (
          <div className="flex space-x-4">
            {Object.entries(socialLinks).map(([platform, url]) => (
              url && (
                <a
                  key={platform}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-indigo-600"
                >
                  {getPlatformIcon(platform)}
                </a>
              )
            ))}
          </div>
        )}

        {/* Statistics */}
        <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-200">
          <div className="text-center">
            <p className="text-2xl font-bold text-indigo-600">12</p>
            <p className="text-sm text-gray-600">Courses</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-indigo-600">1.2K</p>
            <p className="text-sm text-gray-600">Students</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-indigo-600">4.8</p>
            <p className="text-sm text-gray-600">Rating</p>
          </div>
        </div>

        {/* Biography */}
        {bio && (
          <div className="pt-4 border-t border-gray-200">
            <h2 className="text-lg font-medium text-gray-900 mb-2">About Me</h2>
            <p className="text-gray-600 whitespace-pre-line">{bio}</p>
          </div>
        )}

        {/* Areas of Expertise */}
        {expertise.length > 0 && (
          <div className="pt-4 border-t border-gray-200">
            <h2 className="text-lg font-medium text-gray-900 mb-2">Areas of Expertise</h2>
            <div className="flex flex-wrap gap-2">
              {expertise.map((tag, index) => (
                <span
                  key={index}
                  className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm"
                >
                  {typeof tag === 'string' ? tag : tag.name}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Credentials */}
        {credentials.length > 0 && (
          <div className="pt-4 border-t border-gray-200">
            <h2 className="text-lg font-medium text-gray-900 mb-2">Credentials</h2>
            <ul className="space-y-2">
              {credentials.map((credential, index) => (
                <li key={index} className="flex items-start">
                  <div className="flex-shrink-0 h-5 w-5 text-indigo-600">•</div>
                  <div className="ml-2">
                    <p className="text-sm font-medium text-gray-900">{credential.title}</p>
                    <p className="text-sm text-gray-600">{credential.institution}</p>
                    <p className="text-xs text-gray-500">{credential.year}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Featured Courses */}
        <div className="pt-4 border-t border-gray-200">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Featured Courses</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Mock course data - replace with actual course data */}
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <img
                src="/course-placeholder.jpg"
                alt="Course thumbnail"
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h3 className="font-medium text-gray-900">Introduction to Web Development</h3>
                <p className="text-sm text-gray-600 mt-1">Learn the fundamentals of web development</p>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-sm font-medium text-indigo-600">$49.99</span>
                  <span className="text-sm text-gray-500">4.8 ★ (120 reviews)</span>
                </div>
              </div>
            </div>
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <img
                src="/course-placeholder.jpg"
                alt="Course thumbnail"
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h3 className="font-medium text-gray-900">Advanced JavaScript</h3>
                <p className="text-sm text-gray-600 mt-1">Master modern JavaScript concepts</p>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-sm font-medium text-indigo-600">$69.99</span>
                  <span className="text-sm text-gray-500">4.9 ★ (85 reviews)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 