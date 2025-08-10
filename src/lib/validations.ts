import { z } from 'zod';

export const userSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  role: z.enum(['ADMIN', 'MANAGER', 'STAFF', 'CUSTOMER']).default('CUSTOMER'),
});

export const businessSchema = z.object({
  name: z.string().min(2, 'Business name must be at least 2 characters'),
  slug: z.string().min(2, 'Slug must be at least 2 characters'),
  type: z.enum(['HOTEL', 'RESTAURANT', 'BOTH']),
  description: z.string().optional(),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  address: z.string().min(5, 'Address must be at least 5 characters'),
  city: z.string().min(2, 'City must be at least 2 characters'),
  country: z.string().min(2, 'Country must be at least 2 characters'),
  timezone: z.string().default('UTC'),
  currency: z.string().default('EUR'),
  language: z.string().default('en'),
  logo: z.string().url().optional(),
  images: z.array(z.string().url()).default([]),
});

export const roomSchema = z.object({
  name: z.string().min(1, 'Room name is required'),
  type: z.enum(['SINGLE', 'DOUBLE', 'SUITE', 'FAMILY']),
  capacity: z.number().min(1, 'Capacity must be at least 1'),
  price: z.number().min(0, 'Price must be a positive number'),
  description: z.string().optional(),
  amenities: z.array(z.string()).default([]),
  images: z.array(z.string().url()).default([]),
  isActive: z.boolean().default(true),
});

export const tableSchema = z.object({
  name: z.string().min(1, 'Table name is required'),
  type: z.enum(['SMALL', 'MEDIUM', 'LARGE', 'FAMILY']),
  capacity: z.number().min(1, 'Capacity must be at least 1'),
  location: z.string().optional(),
  description: z.string().optional(),
  isActive: z.boolean().default(true),
});

export const bookingSchema = z.object({
  roomId: z.string().optional(),
  tableId: z.string().optional(),
  startDate: z.date(),
  endDate: z.date().optional(),
  guests: z.number().min(1, 'Number of guests must be at least 1'),
  totalPrice: z.number().min(0, 'Total price must be a positive number'),
  notes: z.string().optional(),
}).refine((data) => data.roomId || data.tableId, {
  message: 'Either room or table must be selected',
  path: ['roomId'],
});

export const paymentSchema = z.object({
  amount: z.number().min(0, 'Amount must be a positive number'),
  currency: z.string().min(3, 'Currency must be at least 3 characters'),
  paymentMethod: z.string().optional(),
});

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

export const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

export type User = z.infer<typeof userSchema>;
export type Business = z.infer<typeof businessSchema>;
export type Room = z.infer<typeof roomSchema>;
export type Table = z.infer<typeof tableSchema>;
export type Booking = z.infer<typeof bookingSchema>;
export type Payment = z.infer<typeof paymentSchema>;
export type Login = z.infer<typeof loginSchema>;
export type Register = z.infer<typeof registerSchema>;
export type Contact = z.infer<typeof contactSchema>;