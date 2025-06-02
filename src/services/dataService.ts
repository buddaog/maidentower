import { Tour, Testimonial } from '../types';

// Helper function to fetch JSON data
async function fetchData<T>(path: string): Promise<T> {
  try {
    const response = await fetch(path);
    if (!response.ok) {
      throw new Error(`Failed to fetch data from ${path}`);
    }
    return await response.json() as T;
  } catch (error) {
    console.error(`Error fetching data from ${path}:`, error);
    throw error;
  }
}

// Get all tours
export async function getAllTours(): Promise<Tour[]> {
  return await fetchData<Tour[]>('/src/data/tours.json');
}

// Get featured tours
export async function getFeaturedTours(): Promise<Tour[]> {
  const tours = await getAllTours();
  return tours.filter(tour => tour.featured);
}

// Get a specific tour by ID
export async function getTourById(id: string): Promise<Tour | undefined> {
  const tours = await getAllTours();
  return tours.find(tour => tour.id === id);
}

// Get related tours
export async function getRelatedTours(currentTourId: string, categories: string[], limit: number = 3): Promise<Tour[]> {
  const tours = await getAllTours();
  return tours
    .filter(tour => 
      tour.id !== currentTourId && 
      tour.categories.some(cat => categories.includes(cat))
    )
    .slice(0, limit);
}

// Get all testimonials
export async function getAllTestimonials(): Promise<Testimonial[]> {
  return await fetchData<Testimonial[]>('/src/data/testimonials.json');
}

// Get testimonials for a specific tour
export async function getTestimonialsForTour(tourId: string): Promise<Testimonial[]> {
  const testimonials = await getAllTestimonials();
  return testimonials.filter(testimonial => testimonial.tourId === tourId);
}