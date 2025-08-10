import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting seed...');

  // Create demo businesses
  const hotelBusiness = await prisma.business.create({
    data: {
      name: 'Grand Hotel Plaza',
      slug: 'grand-hotel-plaza',
      type: 'HOTEL',
      description: 'Luxury hotel in the heart of the city with premium amenities and exceptional service.',
      email: 'info@grandhotelplaza.com',
      phone: '+1-555-0123',
      address: '123 Main Street',
      city: 'New York',
      country: 'USA',
      timezone: 'America/New_York',
      currency: 'USD',
      language: 'en',
      images: [
        'https://images.unsplash.com/photo-1566073771259-6a8506099945',
        'https://images.unsplash.com/photo-1564013799919-ab600027ffc6',
      ],
      isActive: true,
    },
  });

  const restaurantBusiness = await prisma.business.create({
    data: {
      name: 'Bella Vista Restaurant',
      slug: 'bella-vista-restaurant',
      type: 'RESTAURANT',
      description: 'Fine dining restaurant with Italian cuisine and stunning city views.',
      email: 'reservations@bellavista.com',
      phone: '+1-555-0456',
      address: '456 Oak Avenue',
      city: 'San Francisco',
      country: 'USA',
      timezone: 'America/Los_Angeles',
      currency: 'USD',
      language: 'en',
      images: [
        'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4',
        'https://images.unsplash.com/photo-1555396273-367ea4eb4db5',
      ],
      isActive: true,
    },
  });

  // Create demo users
  const adminUser = await prisma.user.create({
    data: {
      name: 'Admin User',
      email: 'admin@bookingpro.com',
      password: await bcrypt.hash('admin123', 12),
      role: 'ADMIN',
      businessId: hotelBusiness.id,
    },
  });

  const hotelManager = await prisma.user.create({
    data: {
      name: 'Hotel Manager',
      email: 'manager@grandhotelplaza.com',
      password: await bcrypt.hash('manager123', 12),
      role: 'MANAGER',
      businessId: hotelBusiness.id,
    },
  });

  const restaurantManager = await prisma.user.create({
    data: {
      name: 'Restaurant Manager',
      email: 'manager@bellavista.com',
      password: await bcrypt.hash('manager123', 12),
      role: 'MANAGER',
      businessId: restaurantBusiness.id,
    },
  });

  const customer = await prisma.user.create({
    data: {
      name: 'John Doe',
      email: 'john@example.com',
      password: await bcrypt.hash('customer123', 12),
      role: 'CUSTOMER',
      phone: '+1-555-0789',
    },
  });

  // Create hotel rooms
  const rooms = await Promise.all([
    prisma.room.create({
      data: {
        businessId: hotelBusiness.id,
        name: 'Deluxe Single Room',
        type: 'SINGLE',
        capacity: 1,
        price: 150.00,
        description: 'Comfortable single room with city view, modern amenities, and free Wi-Fi.',
        amenities: ['WiFi', 'AC', 'TV', 'Mini Bar', 'Safe'],
        images: ['https://images.unsplash.com/photo-1611892440504-42a792e24d32'],
        isActive: true,
      },
    }),
    prisma.room.create({
      data: {
        businessId: hotelBusiness.id,
        name: 'Superior Double Room',
        type: 'DOUBLE',
        capacity: 2,
        price: 220.00,
        description: 'Spacious double room with premium bedding and stunning city views.',
        amenities: ['WiFi', 'AC', 'TV', 'Mini Bar', 'Safe', 'Balcony'],
        images: ['https://images.unsplash.com/photo-1590490360182-c33d57733427'],
        isActive: true,
      },
    }),
    prisma.room.create({
      data: {
        businessId: hotelBusiness.id,
        name: 'Executive Suite',
        type: 'SUITE',
        capacity: 4,
        price: 450.00,
        description: 'Luxurious suite with separate living area, premium amenities, and VIP service.',
        amenities: ['WiFi', 'AC', 'TV', 'Mini Bar', 'Safe', 'Balcony', 'Jacuzzi', 'Concierge'],
        images: ['https://images.unsplash.com/photo-1582719478250-c89cae4dc85b'],
        isActive: true,
      },
    }),
  ]);

  // Create restaurant tables
  const tables = await Promise.all([
    prisma.table.create({
      data: {
        businessId: restaurantBusiness.id,
        name: 'Table 1 - Window View',
        type: 'SMALL',
        capacity: 2,
        location: 'Window Side',
        description: 'Intimate table for two with beautiful city view.',
        isActive: true,
      },
    }),
    prisma.table.create({
      data: {
        businessId: restaurantBusiness.id,
        name: 'Table 2 - Garden View',
        type: 'MEDIUM',
        capacity: 4,
        location: 'Garden Side',
        description: 'Perfect table for families with garden view.',
        isActive: true,
      },
    }),
    prisma.table.create({
      data: {
        businessId: restaurantBusiness.id,
        name: 'Private Dining Room',
        type: 'LARGE',
        capacity: 8,
        location: 'Private Area',
        description: 'Exclusive dining room for special occasions and business meetings.',
        isActive: true,
      },
    }),
  ]);

  // Create sample bookings
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(14, 0, 0, 0); // 2 PM tomorrow

  const dayAfterTomorrow = new Date(tomorrow);
  dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 1);

  // Hotel booking
  const hotelBooking = await prisma.booking.create({
    data: {
      businessId: hotelBusiness.id,
      userId: customer.id,
      roomId: rooms[1].id, // Superior Double Room
      status: 'CONFIRMED',
      startDate: tomorrow,
      endDate: dayAfterTomorrow,
      guests: 2,
      totalPrice: 220.00,
      notes: 'Anniversary celebration - please prepare champagne',
    },
  });

  // Restaurant booking
  const restaurantBooking = await prisma.booking.create({
    data: {
      businessId: restaurantBusiness.id,
      userId: customer.id,
      tableId: tables[0].id, // Table 1 - Window View
      status: 'PENDING',
      startDate: tomorrow,
      guests: 2,
      totalPrice: 120.00,
      notes: 'Birthday dinner - vegetarian options preferred',
    },
  });

  // Create payment records
  await Promise.all([
    prisma.payment.create({
      data: {
        bookingId: hotelBooking.id,
        businessId: hotelBusiness.id,
        amount: 220.00,
        currency: 'USD',
        status: 'PAID',
        paymentMethod: 'card',
        stripePaymentId: 'pi_demo_hotel_booking',
      },
    }),
    prisma.payment.create({
      data: {
        bookingId: restaurantBooking.id,
        businessId: restaurantBusiness.id,
        amount: 120.00,
        currency: 'USD',
        status: 'PENDING',
        paymentMethod: 'card',
        stripePaymentId: 'pi_demo_restaurant_booking',
      },
    }),
  ]);

  console.log('✅ Seed completed successfully!');
  console.log('\n📊 Demo data created:');
  console.log(`👥 Users: ${4} (1 admin, 2 managers, 1 customer)`);
  console.log(`🏢 Businesses: ${2} (1 hotel, 1 restaurant)`);
  console.log(`🏨 Rooms: ${rooms.length}`);
  console.log(`🍽️  Tables: ${tables.length}`);
  console.log(`📅 Bookings: ${2}`);
  console.log(`💳 Payments: ${2}`);
  
  console.log('\n🔑 Demo credentials:');
  console.log('Admin: admin@bookingpro.com / admin123');
  console.log('Hotel Manager: manager@grandhotelplaza.com / manager123');
  console.log('Restaurant Manager: manager@bellavista.com / manager123');
  console.log('Customer: john@example.com / customer123');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });