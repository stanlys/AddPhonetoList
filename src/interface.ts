import React from 'react';

export interface AvailablePhones {
  phone: string;
  isCorrect: boolean;
}

export const INIT_VALUE: AvailablePhones = {
  phone: '',
  isCorrect: false,
};

export const BEL_PHONE_TEMPLATE = /8025\d{7}/;
export const RUS_PHONE_TEMPLATE = /8950\d{7}/;

export type voidSetPhone = (value: string) => void;

export type voidAddToList = (value: React.SetStateAction<AvailablePhones[]>) => void;

export const kindPhoneNumber = (number: string): string => {
  return BEL_PHONE_TEMPLATE.test(number) ? 'Белорусский' : 'Русский';
};
