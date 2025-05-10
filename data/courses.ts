import { Course } from '../types/course';

export const courses: Course[] = [
  {
    id: 1,
    title: 'Complete Web Development Bootcamp',
    instructor: {
      name: 'John Doe',
      title: 'Senior Software Engineer',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
      rating: 4.9,
      students: 50000,
      courses: 12
    },
    rating: 4.8,
    reviews: 1234,
    enrolled: 5000,
    lastUpdated: '2025-01-15',
    language: 'English',
    price: 89.99,
    originalPrice: 199.99,
    description: `Master web development from scratch with this comprehensive bootcamp. You'll learn everything from HTML and CSS basics to advanced React.js and Node.js concepts.

This course is constantly updated with the latest trends and best practices in web development. You'll build real-world projects and learn through hands-on coding exercises.`,
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085',
    preview: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    level: 'Beginner',
    duration: '12 weeks',
    category: 'Development',
    enrolled: 5000,
    tags: ['JavaScript', 'React', 'Node.js'],
    modules: [
      {
        id: 1,
        title: 'Introduction to Web Development',
        duration: '2 hours',
        lessons: [
          { id: 1, title: 'Course Overview', duration: '10 min', isPreview: true },
          { id: 2, title: 'Setting Up Your Development Environment', duration: '20 min', isPreview: false },
          { id: 3, title: 'HTML Fundamentals', duration: '30 min', isPreview: false },
        ]
      },
      {
        id: 2,
        title: 'JavaScript Essentials',
        duration: '3 hours',
        lessons: [
          { id: 4, title: 'Introduction to JavaScript', duration: '30 min', isPreview: true },
          { id: 5, title: 'Variables and Data Types', duration: '30 min', isPreview: false },
          { id: 6, title: 'Control Flow', duration: '30 min', isPreview: false },
        ]
      }
    ]
  },
  {
    id: 2,
    title: 'Machine Learning & AI Fundamentals',
    instructor: {
      name: 'Sarah Johnson',
      title: 'AI Research Scientist',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80',
      rating: 4.9,
      students: 35000,
      courses: 8
    },
    rating: 4.9,
    reviews: 856,
    enrolled: 3200,
    lastUpdated: '2025-01-10',
    language: 'English',
    price: 129.99,
    originalPrice: 249.99,
    description: 'Master the fundamentals of machine learning and artificial intelligence with hands-on projects and real-world applications.',
    image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c',
    preview: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    level: 'Intermediate',
    duration: '10 weeks',
    category: 'IT & Software',
    tags: ['Python', 'TensorFlow', 'AI'],
    modules: [
      {
        id: 1,
        title: 'Introduction to AI',
        duration: '2 hours',
        lessons: [
          { id: 1, title: 'What is AI?', duration: '20 min', isPreview: true },
          { id: 2, title: 'Machine Learning Basics', duration: '30 min', isPreview: false },
        ]
      }
    ]
  },
  {
    id: 3,
    title: 'Digital Marketing Mastery',
    instructor: {
      name: 'Michael Chen',
      title: 'Marketing Director',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
      rating: 4.7,
      students: 28000,
      courses: 6
    },
    rating: 4.7,
    reviews: 923,
    enrolled: 4100,
    lastUpdated: '2025-01-05',
    language: 'English',
    price: 79.99,
    originalPrice: 159.99,
    description: 'Comprehensive guide to digital marketing strategies and tools.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f',
    preview: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    level: 'Beginner',
    duration: '8 weeks',
    category: 'Marketing',
    tags: ['SEO', 'Social Media', 'Analytics'],
    modules: [
      {
        id: 1,
        title: 'Digital Marketing Fundamentals',
        duration: '2 hours',
        lessons: [
          { id: 1, title: 'Introduction to Digital Marketing', duration: '20 min', isPreview: true },
          { id: 2, title: 'Building Your Strategy', duration: '30 min', isPreview: false },
        ]
      }
    ]
  }
];