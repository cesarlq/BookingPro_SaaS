# BookingPro SaaS

<div align="center">

![BookingPro Logo](https://via.placeholder.com/200x80/667eea/ffffff?text=BookingPro)

**The Complete SaaS Solution for Hotels and Restaurants**

A modern, scalable booking platform built with Next.js 14, TypeScript, and cutting-edge technologies.

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5-blue?style=flat-square&logo=typescript)](https://typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?style=flat-square&logo=prisma)](https://prisma.io/)
[![Stripe](https://img.shields.io/badge/Stripe-Payment-635BFF?style=flat-square&logo=stripe)](https://stripe.com/)

</div>

## ✨ Features

### 🏨 **Dual Business Support**
- **Hotels**: Room management, check-in/check-out, guest services
- **Restaurants**: Table reservations, time slots, dining preferences
- **Hybrid**: Combined hotel and restaurant operations

### 💳 **Payment Processing**
- Secure Stripe integration
- Multiple currency support (EUR, USD, GBP)
- Automated invoicing and receipts
- Refund management

### 👥 **User Management**
- Role-based access control (Admin, Manager, Staff, Customer)
- OAuth authentication (Google, Facebook)
- Custom credentials authentication
- User dashboard and profiles

### 📊 **Analytics & Reporting**
- Real-time booking statistics
- Revenue tracking and analytics
- Occupancy rates and performance metrics
- Customizable dashboard widgets

### 🌍 **Multi-language & Multi-currency**
- i18n support for English, Spanish, French, German
- Dynamic currency conversion
- Localized date and time formatting
- Regional preference settings

### 📧 **Notification System**
- Email notifications via SendGrid
- Booking confirmations and reminders
- Status update alerts
- Custom email templates

### 🎨 **Modern UI/UX**
- Responsive design (mobile-first)
- Dark/Light theme support
- Smooth animations with Framer Motion
- Accessibility compliance (WCAG AA+)
- Material-UI components with Tailwind CSS

### 🔧 **Developer Experience**
- Full TypeScript coverage
- Clean Architecture principles
- SOLID design patterns
- Modular and reusable components
- Comprehensive API documentation

## 🚀 Quick Start

### Demo en Vivo

**¡Prueba el demo inmediatamente!** No necesitas configurar nada:

1. **Instalar dependencias**
   ```bash
   npm install
   ```

2. **Ejecutar demo**
   ```bash
   npm run dev
   ```

3. **Ver el demo**
   - Página principal: `http://localhost:3000`
   - Demo interactivo: `http://localhost:3000/demo`

### 📋 Para Implementación Completa

### Prerequisites

- **Node.js** 18+ 
- **PostgreSQL** database
- **Stripe** account (for payments)
- **SendGrid** account (for emails)
- **Google/Facebook** OAuth apps (optional)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/bookingpro-saas.git
   cd bookingpro-saas
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment setup**
   ```bash
   cp .env.example .env
   ```
   
   Fill in your environment variables:
   ```env
   # Database
   DATABASE_URL="postgresql://username:password@localhost:5432/bookingpro"
   
   # NextAuth
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your-secret-key"
   
   # OAuth (Optional)
   GOOGLE_CLIENT_ID="your-google-client-id"
   GOOGLE_CLIENT_SECRET="your-google-client-secret"
   
   # Stripe
   STRIPE_PUBLIC_KEY="pk_test_..."
   STRIPE_SECRET_KEY="sk_test_..."
   
   # SendGrid
   SENDGRID_API_KEY="SG...."
   SENDGRID_FROM_EMAIL="noreply@yourdomain.com"
   ```

4. **Database setup**
   ```bash
   npm run db:push      # Push schema to database
   npm run db:seed      # Seed with demo data
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🏗️ Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes
│   ├── auth/              # Authentication pages
│   ├── dashboard/         # Dashboard pages
│   └── layout.tsx         # Root layout
├── components/            # Reusable UI components
│   ├── ui/               # Base UI components
│   ├── layout/           # Layout components
│   ├── forms/            # Form components
│   └── providers/        # Context providers
├── features/             # Business logic modules
│   ├── auth/            # Authentication
│   ├── bookings/        # Booking management
│   ├── payments/        # Payment processing
│   ├── users/           # User management
│   ├── dashboard/       # Dashboard features
│   └── notifications/   # Notification system
├── lib/                 # Shared utilities
│   ├── utils.ts         # Helper functions
│   ├── constants.ts     # App constants
│   ├── validations.ts   # Zod schemas
│   ├── prisma.ts        # Database client
│   └── auth.ts          # Auth configuration
├── services/            # External service integrations
│   ├── stripe/          # Payment processing
│   ├── email/           # Email services
│   └── auth/            # Authentication services
└── styles/              # Global styles and themes
    ├── globals.css      # Global CSS
    └── theme.ts         # MUI theme configuration
```

## 🔑 Demo Credentials

After running the seed script, you can use these demo accounts:

| Role | Email | Password |
|------|-------|----------|
| **Admin** | admin@bookingpro.com | admin123 |
| **Hotel Manager** | manager@grandhotelplaza.com | manager123 |
| **Restaurant Manager** | manager@bellavista.com | manager123 |
| **Customer** | john@example.com | customer123 |

## 🛠️ Development Scripts

```bash
# Development
npm run dev              # Start development server
npm run build           # Build for production
npm run start           # Start production server
npm run lint            # Run ESLint
npm run type-check      # Run TypeScript check

# Database
npm run db:generate     # Generate Prisma client
npm run db:push         # Push schema changes
npm run db:migrate      # Run migrations
npm run db:seed         # Seed database
npm run db:studio       # Open Prisma Studio
npm run db:reset        # Reset database
```

## 🏛️ Architecture Principles

### Clean Architecture
- **Domain Layer**: Business entities and rules
- **Application Layer**: Use cases and business logic
- **Infrastructure Layer**: External services and frameworks
- **UI Layer**: Components and user interface

### SOLID Principles
- **Single Responsibility**: Each component has one reason to change
- **Open/Closed**: Open for extension, closed for modification
- **Liskov Substitution**: Subtypes must be substitutable for base types
- **Interface Segregation**: Many client-specific interfaces
- **Dependency Inversion**: Depend on abstractions, not concretions

### Design Patterns
- **Repository Pattern**: Data access abstraction
- **Factory Pattern**: Object creation
- **Observer Pattern**: Event handling
- **Strategy Pattern**: Algorithm selection

## 🎨 Customization Guide

### Branding
1. **Logo and Colors**: Update `src/styles/theme.ts`
2. **Fonts**: Modify `src/app/layout.tsx`
3. **Images**: Replace in `public/` directory

### Business Logic
1. **Booking Rules**: Extend `src/features/bookings/`
2. **Payment Methods**: Add to `src/services/stripe/`
3. **User Roles**: Update `src/lib/constants.ts`

### Styling
1. **Theme Colors**: Update CSS variables in `src/styles/globals.css`
2. **Component Styles**: Modify Tailwind classes
3. **Responsive Design**: Adjust breakpoints in `tailwind.config.ts`

## 📊 Database Schema

### Core Entities
- **Business**: Hotel/Restaurant information
- **User**: System users with roles
- **Room**: Hotel accommodations
- **Table**: Restaurant seating
- **Booking**: Reservations and bookings
- **Payment**: Payment processing records

### Relationships
- Business → Users (1:N)
- Business → Rooms/Tables (1:N)
- User → Bookings (1:N)
- Booking → Payment (1:1)

## 🔌 API Backend Specification

### Endpoints Requeridos

El frontend está preparado para conectarse a un backend con los siguientes endpoints:

#### **Authentication**
```
POST /api/auth/login
POST /api/auth/register  
POST /api/auth/logout
GET  /api/auth/me
```

#### **Bookings Management**
```
GET    /api/bookings                    # Lista reservas
POST   /api/bookings                    # Nueva reserva
GET    /api/bookings/:id               # Detalles reserva
PUT    /api/bookings/:id               # Actualizar reserva
DELETE /api/bookings/:id               # Cancelar reserva
```

#### **Business Management**
```
GET  /api/businesses                   # Lista negocios
POST /api/businesses                   # Crear negocio
GET  /api/businesses/:id              # Detalles negocio
PUT  /api/businesses/:id              # Actualizar negocio
```

#### **Rooms/Tables**
```
GET  /api/rooms                       # Lista habitaciones
POST /api/rooms                       # Crear habitación
PUT  /api/rooms/:id                   # Actualizar habitación
GET  /api/tables                      # Lista mesas
POST /api/tables                      # Crear mesa
PUT  /api/tables/:id                  # Actualizar mesa
```

#### **Payments**
```
POST /api/payments/intent             # Crear Payment Intent (Stripe)
POST /api/payments/confirm            # Confirmar pago
POST /api/payments/refund             # Reembolsar
```

#### **Analytics**
```
GET  /api/analytics/dashboard         # Stats del dashboard
GET  /api/analytics/revenue           # Análisis de ingresos
GET  /api/analytics/occupancy         # Análisis de ocupación
```

### 📊 Data Models

Los modelos de datos ya están definidos en `prisma/schema.prisma`:

- **User**: Usuarios del sistema
- **Business**: Hoteles/Restaurantes
- **Room**: Habitaciones de hotel
- **Table**: Mesas de restaurante
- **Booking**: Reservas
- **Payment**: Pagos

### 🔧 Response Format

Todos los endpoints deben retornar JSON con el siguiente formato:

```json
{
  "success": true,
  "data": { ... },
  "message": "Success message",
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 100,
    "pages": 10
  }
}
```

### 🔒 Security Features

- **Authentication**: NextAuth.js with multiple providers
- **Authorization**: Role-based access control
- **Data Validation**: Zod schema validation
- **SQL Injection**: Prisma ORM protection
- **XSS Protection**: Content Security Policy
- **HTTPS**: SSL/TLS encryption
- **Environment Variables**: Secure configuration

## 🚀 Deployment

### Vercel (Recommended)
1. Push to GitHub
2. Import project to Vercel
3. Add environment variables
4. Deploy automatically

### Docker
1. Build image: `docker build -t bookingpro .`
2. Run container: `docker run -p 3000:3000 bookingpro`

### Traditional Hosting
1. Build: `npm run build`
2. Start: `npm start`
3. Configure reverse proxy (nginx)

## 🧪 Testing

### Unit Tests
```bash
npm run test            # Run unit tests
npm run test:watch      # Watch mode
npm run test:coverage   # Coverage report
```

### E2E Tests
```bash
npm run e2e             # Run Playwright tests
npm run e2e:ui          # Interactive mode
```

## 📈 Performance Optimization

- **Server-Side Rendering**: Next.js SSR/ISR
- **Database Optimization**: Prisma query optimization
- **Image Optimization**: Next.js Image component
- **Code Splitting**: Automatic bundle splitting
- **Caching**: Redis for session storage
- **CDN**: Static asset delivery

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation**: [docs.bookingpro.com](https://docs.bookingpro.com)
- **Issues**: [GitHub Issues](https://github.com/your-username/bookingpro-saas/issues)
- **Email**: support@bookingpro.com
- **Discord**: [Join our community](https://discord.gg/bookingpro)

## 🙏 Acknowledgments

- **Next.js Team** - Amazing React framework
- **Vercel** - Excellent hosting platform
- **Prisma** - Modern database toolkit
- **Tailwind CSS** - Utility-first CSS framework
- **Material-UI** - React component library
- **Stripe** - Payment processing platform

---

<div align="center">
  <p>Made with ❤️ by the BookingPro Team</p>
  <p>© 2024 BookingPro SaaS. All rights reserved.</p>
</div>