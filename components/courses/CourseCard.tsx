import React from 'react';
import { Star, Clock, Users, ShoppingCart, Heart } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useWishlistStore } from '../../store/useWishlistStore';
import { useUserStore } from '../../store/useUserStore';
import type { Course } from '../../types';

interface CourseCardProps {
  course: Course;
}

export function CourseCard({ course }: CourseCardProps) {
  const { items, addToCart, isInCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlistStore();
  const { isAuthenticated } = useUserStore();
  const navigate = useNavigate();
  
  const discount = Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100);
  const isCourseInCart = isInCart(course.id);
  const isWishlisted = isInWishlist(course.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation to course details
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    if (!isCourseInCart) {
      addToCart(course);
    }
  };

  const handleBuyNow = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    if (!isCourseInCart) {
      addToCart(course);
    }
    navigate('/cart');
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    if (isWishlisted) {
      removeFromWishlist(course.id);
    } else {
      addToWishlist(course);
    }
  };

  return (
    <Link to={`/course/${course.id}/learning-interface`} className="group">
      <div className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition">
        {/* Course Image */}
        <div className="relative h-48">
          <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
          {discount > 0 && (
            <div className="absolute top-4 right-4 bg-red-500 text-white px-2 py-1 rounded text-sm font-medium">
              {discount}% OFF
            </div>
          )}
          <button
            onClick={handleWishlist}
            className="absolute top-4 left-4 p-2 bg-white rounded-full shadow-md hover:bg-gray-50"
          >
            <Heart className={`w-5 h-5 ${isWishlisted ? 'text-red-600 fill-current' : 'text-gray-600'}`} />
          </button>
        </div>

        {/* Course Info */}
        <div className="p-6">
          <div className="flex items-center space-x-2 mb-2">
            <span className="text-sm font-medium text-indigo-600 bg-indigo-50 px-2 py-1 rounded">
              {course.category}
            </span>
            <span className="text-sm text-gray-500">{course.level}</span>
          </div>

          <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-indigo-600 transition">
            {course.title}
          </h3>

          <p className="text-sm text-gray-600 mb-4 line-clamp-2">
            {course.description}
          </p>

          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="text-sm font-medium text-gray-900">{course.rating}</span>
              <span className="text-sm text-gray-500">({course.reviews})</span>
            </div>
            <div className="flex items-center space-x-1 text-sm text-gray-500">
              <Users className="w-4 h-4" />
              <span>{course.students} students</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-500">{course.duration}</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="text-right">
                {course.originalPrice !== course.price && (
                  <span className="text-sm text-gray-500 line-through mr-2">
                    Rs.{course.originalPrice}
                  </span>
                )}
                <span className="text-lg font-bold text-gray-900">Rs.{course.price}</span>
              </div>
              <div className="flex space-x-2 relative z-10">
                <button
                  onClick={handleAddToCart}
                  disabled={isCourseInCart}
                  className={`p-2 rounded-lg ${
                    isCourseInCart
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-indigo-600 text-white hover:bg-indigo-700'
                  } transition`}
                >
                  <ShoppingCart className="w-5 h-5" />
                </button>
                <button
                  onClick={handleBuyNow}
                  className="px-3 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition text-sm"
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}