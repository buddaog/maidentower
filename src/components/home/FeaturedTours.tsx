import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import { Calendar, Clock, Star, Users } from 'lucide-react';
import { Tour } from '../../types';
import { useCurrency } from '../../context/CurrencyContext';
import { getFeaturedTours } from '../../services/dataService';

const FeaturedTours: React.FC = () => {
  const { t } = useTranslation();
  const { formatPrice } = useCurrency();
  const [featuredTours, setFeaturedTours] = useState<Tour[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    const loadTours = async () => {
      try {
        const tours = await getFeaturedTours();
        setFeaturedTours(tours);
      } catch (error) {
        console.error("Failed to load featured tours:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadTours();
  }, []);

  if (isLoading) {
    return (
      <section className="py-20 bg-neutral-50">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-primary-900 border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="mt-4 text-neutral-600">Loading featured tours...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-neutral-50">
      <div 
        ref={ref}
        className={`container mx-auto px-4 transition-all duration-1000 ease-out ${
          inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-heading text-primary-900">
            {t('featured.title')}
          </h2>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            {t('featured.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredTours.map((tour, index) => (
            <div 
              key={tour.id}
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
              style={{ 
                animationDelay: `${index * 100}ms`,
                opacity: 0,
                animation: inView ? 'fadeIn 0.5s ease-out forwards' : 'none',
                animationDelay: inView ? `${index * 150}ms` : '0ms'
              }}
            >
              <div className="relative overflow-hidden h-64">
                <img 
                  src={tour.imageUrls[0]} 
                  alt={t(tour.titleKey)} 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
                <div className="absolute top-4 right-4 bg-secondary-500 text-primary-900 font-semibold px-3 py-1 rounded-full text-sm">
                  {formatPrice(tour.price.usd, tour.price.azn)}
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-primary-900">
                  {t(tour.titleKey)}
                </h3>
                
                <div className="flex items-center mb-4">
                  <div className="flex items-center text-secondary-500">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star 
                        key={i} 
                        size={16} 
                        fill={i < Math.floor(tour.rating) ? 'currentColor' : 'none'} 
                        className={i < Math.floor(tour.rating) ? 'text-secondary-500' : 'text-neutral-300'}
                      />
                    ))}
                  </div>
                  <span className="ml-2 text-sm text-neutral-500">
                    {tour.rating.toFixed(1)}
                  </span>
                </div>
                
                <p className="text-neutral-600 mb-4 line-clamp-3">
                  {t(tour.descriptionKey)}
                </p>
                
                <div className="flex items-center justify-between text-sm text-neutral-500 mb-4">
                  <div className="flex items-center">
                    <Clock size={16} className="mr-1" />
                    <span>{tour.duration} {t('tour.days')}</span>
                  </div>
                  <div className="flex items-center">
                    <Users size={16} className="mr-1" />
                    <span>2-12</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar size={16} className="mr-1" />
                    <span>{tour.availableDates.length}</span>
                  </div>
                </div>
                
                <Link
                  to={`/tours/${tour.id}`}
                  className="block w-full bg-primary-900 hover:bg-primary-800 text-white text-center py-3 rounded transition-colors duration-200"
                >
                  {t('view.details')}
                </Link>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link
            to="/tours"
            className="inline-block border-2 border-primary-900 text-primary-900 hover:bg-primary-900 hover:text-white font-semibold px-8 py-3 rounded-md transition-colors duration-200"
          >
            {t('view.all')}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedTours;