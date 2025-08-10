'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { bookingSchema, type Booking } from '@/lib/validations';
import { BUSINESS_TYPES } from '@/lib/constants';
import { Calendar, Users, Clock, MapPin } from 'lucide-react';

interface BookingFormProps {
  businessType: keyof typeof BUSINESS_TYPES;
  onSubmit: (data: Booking) => Promise<void>;
  loading?: boolean;
}

export function BookingForm({ businessType, onSubmit, loading }: BookingFormProps) {
  const [step, setStep] = useState(1);
  const totalSteps = 3;

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
    trigger,
  } = useForm<Booking>({
    resolver: zodResolver(bookingSchema),
    mode: 'onChange',
  });

  const watchedValues = watch();

  const handleNext = async () => {
    const fieldsToValidate = step === 1 
      ? ['startDate', 'guests'] 
      : step === 2 
      ? businessType === 'HOTEL' ? ['roomId'] : ['tableId']
      : [];

    const isStepValid = await trigger(fieldsToValidate as any);
    if (isStepValid) {
      setStep(step + 1);
    }
  };

  const handlePrevious = () => {
    setStep(step - 1);
  };

  const renderStepIndicator = () => (
    <div className="flex items-center justify-between mb-8">
      {Array.from({ length: totalSteps }, (_, i) => i + 1).map((stepNumber) => (
        <div
          key={stepNumber}
          className={`flex items-center ${
            stepNumber < totalSteps ? 'flex-1' : ''
          }`}
        >
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
              stepNumber <= step
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground'
            }`}
          >
            {stepNumber}
          </div>
          {stepNumber < totalSteps && (
            <div
              className={`flex-1 h-1 mx-4 rounded-full ${
                stepNumber < step ? 'bg-primary' : 'bg-muted'
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );

  const renderStep1 = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="text-center mb-8">
        <Calendar className="w-16 h-16 mx-auto mb-4 text-primary" />
        <h3 className="text-2xl font-semibold mb-2">When & How Many?</h3>
        <p className="text-muted-foreground">
          Select your preferred date and number of guests
        </p>
      </div>

      <div className="grid gap-6">
        <div className="space-y-2">
          <Label htmlFor="startDate">
            {businessType === 'HOTEL' ? 'Check-in Date' : 'Reservation Date'}
          </Label>
          <Input
            id="startDate"
            type="datetime-local"
            {...register('startDate', { valueAsDate: true })}
            className="w-full"
          />
          {errors.startDate && (
            <p className="text-sm text-destructive">{errors.startDate.message}</p>
          )}
        </div>

        {businessType === 'HOTEL' && (
          <div className="space-y-2">
            <Label htmlFor="endDate">Check-out Date</Label>
            <Input
              id="endDate"
              type="datetime-local"
              {...register('endDate', { valueAsDate: true })}
              className="w-full"
            />
            {errors.endDate && (
              <p className="text-sm text-destructive">{errors.endDate.message}</p>
            )}
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="guests">Number of Guests</Label>
          <div className="relative">
            <Users className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              id="guests"
              type="number"
              min="1"
              max="20"
              {...register('guests', { valueAsNumber: true })}
              className="pl-10"
              placeholder="How many guests?"
            />
          </div>
          {errors.guests && (
            <p className="text-sm text-destructive">{errors.guests.message}</p>
          )}
        </div>
      </div>
    </motion.div>
  );

  const renderStep2 = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="text-center mb-8">
        <MapPin className="w-16 h-16 mx-auto mb-4 text-primary" />
        <h3 className="text-2xl font-semibold mb-2">Choose Your Space</h3>
        <p className="text-muted-foreground">
          Select your preferred {businessType === 'HOTEL' ? 'room' : 'table'}
        </p>
      </div>

      <div className="grid gap-4">
        {businessType === 'HOTEL' ? (
          <div className="space-y-2">
            <Label htmlFor="roomId">Room Selection</Label>
            <select
              id="roomId"
              {...register('roomId')}
              className="w-full p-3 rounded-md border border-input bg-background"
            >
              <option value="">Select a room...</option>
              <option value="room-1">Deluxe Single Room - €120/night</option>
              <option value="room-2">Superior Double Room - €180/night</option>
              <option value="room-3">Executive Suite - €320/night</option>
            </select>
            {errors.roomId && (
              <p className="text-sm text-destructive">{errors.roomId.message}</p>
            )}
          </div>
        ) : (
          <div className="space-y-2">
            <Label htmlFor="tableId">Table Selection</Label>
            <select
              id="tableId"
              {...register('tableId')}
              className="w-full p-3 rounded-md border border-input bg-background"
            >
              <option value="">Select a table...</option>
              <option value="table-1">Table for 2 - Window View</option>
              <option value="table-2">Table for 4 - Garden View</option>
              <option value="table-3">Large Table for 8 - Private Area</option>
            </select>
            {errors.tableId && (
              <p className="text-sm text-destructive">{errors.tableId.message}</p>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );

  const renderStep3 = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="text-center mb-8">
        <Clock className="w-16 h-16 mx-auto mb-4 text-primary" />
        <h3 className="text-2xl font-semibold mb-2">Final Details</h3>
        <p className="text-muted-foreground">
          Add any special requests and confirm your booking
        </p>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="totalPrice">Total Price</Label>
          <Input
            id="totalPrice"
            type="number"
            step="0.01"
            {...register('totalPrice', { valueAsNumber: true })}
            placeholder="Total amount"
          />
          {errors.totalPrice && (
            <p className="text-sm text-destructive">{errors.totalPrice.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="notes">Special Requests (Optional)</Label>
          <textarea
            id="notes"
            {...register('notes')}
            rows={4}
            className="w-full p-3 rounded-md border border-input bg-background resize-none"
            placeholder="Any special requests or notes..."
          />
        </div>

        {/* Booking Summary */}
        <Card>
          <CardHeader>
            <CardTitle>Booking Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between">
              <span>Guests:</span>
              <span>{watchedValues.guests}</span>
            </div>
            <div className="flex justify-between">
              <span>Date:</span>
              <span>
                {watchedValues.startDate
                  ? new Date(watchedValues.startDate).toLocaleDateString()
                  : 'Not selected'}
              </span>
            </div>
            <div className="flex justify-between font-semibold">
              <span>Total:</span>
              <span>€{watchedValues.totalPrice || '0.00'}</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-center">
          Make a {businessType === 'HOTEL' ? 'Hotel' : 'Restaurant'} Booking
        </CardTitle>
        <CardDescription className="text-center">
          Complete the form below to secure your reservation
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          {renderStepIndicator()}

          <div className="min-h-[400px]">
            {step === 1 && renderStep1()}
            {step === 2 && renderStep2()}
            {step === 3 && renderStep3()}
          </div>

          <div className="flex justify-between pt-6 mt-8 border-t">
            {step > 1 && (
              <Button
                type="button"
                variant="outline"
                onClick={handlePrevious}
                disabled={loading}
              >
                Previous
              </Button>
            )}
            
            <div className="ml-auto">
              {step < totalSteps ? (
                <Button
                  type="button"
                  onClick={handleNext}
                  disabled={loading}
                >
                  Next Step
                </Button>
              ) : (
                <Button
                  type="submit"
                  variant="gradient"
                  disabled={!isValid || loading}
                >
                  {loading ? 'Processing...' : 'Confirm Booking'}
                </Button>
              )}
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}