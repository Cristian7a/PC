import { describe, it, expect } from 'vitest';
import { emailSchema, passwordSchema, loginSchema, registerSchema } from './auth.schema';

describe('Auth Schemas', () => {
  describe('emailSchema', () => {
    it('should validate correct email addresses', () => {
      const validEmails = [
        'user@example.com',
        'test.email+tag@domain.co.uk',
        'user123@test-domain.org',
      ];

      validEmails.forEach((email) => {
        expect(() => emailSchema.parse(email)).not.toThrow();
      });
    });

    it('should reject invalid email addresses', () => {
      const invalidEmails = ['invalid-email', '@domain.com', 'user@', 'user.domain.com', ''];

      invalidEmails.forEach((email) => {
        expect(() => emailSchema.parse(email)).toThrow();
      });
    });
  });

  describe('passwordSchema', () => {
    it('should validate password with all requirements', () => {
      const validPasswords = ['Password123!', 'MySecure1@', 'Test123#Pass', 'Strong9$word'];

      validPasswords.forEach((password) => {
        expect(() => passwordSchema.parse(password)).not.toThrow();
      });
    });

    it('should reject password shorter than 8 characters', () => {
      const shortPasswords = ['Pass1!', 'Ab1!', ''];

      shortPasswords.forEach((password) => {
        expect(() => passwordSchema.parse(password)).toThrow(/8 characters/);
      });
    });

    it('should reject password without numbers', () => {
      const passwordsWithoutNumbers = ['Password!', 'NoNumbers@'];

      passwordsWithoutNumbers.forEach((password) => {
        expect(() => passwordSchema.parse(password)).toThrow(/1 number/);
      });
    });

    it('should reject password without special characters', () => {
      const passwordsWithoutSpecial = ['Password123', 'NoSpecial1'];

      passwordsWithoutSpecial.forEach((password) => {
        expect(() => passwordSchema.parse(password)).toThrow(/1 special character/);
      });
    });

    it('should reject password without lowercase letters', () => {
      const passwordsWithoutLowercase = ['PASSWORD123!', 'UPPER1@'];

      passwordsWithoutLowercase.forEach((password) => {
        expect(() => passwordSchema.parse(password)).toThrow(/1 lowercase letter/);
      });
    });

    it('should reject password without uppercase letters', () => {
      const passwordsWithoutUppercase = ['password123!', 'lower1@'];

      passwordsWithoutUppercase.forEach((password) => {
        expect(() => passwordSchema.parse(password)).toThrow(/1 uppercase letter/);
      });
    });
  });

  describe('loginSchema', () => {
    it('should validate correct login data', () => {
      const validLogin = {
        email: 'user@example.com',
        password: 'Password123!',
      };

      expect(() => loginSchema.parse(validLogin)).not.toThrow();
    });

    it('should reject login with invalid email', () => {
      const invalidLogin = {
        email: 'invalid-email',
        password: 'Password123!',
      };

      expect(() => loginSchema.parse(invalidLogin)).toThrow();
    });

    it('should reject login with invalid password', () => {
      const invalidLogin = {
        email: 'user@example.com',
        password: 'weak',
      };

      expect(() => loginSchema.parse(invalidLogin)).toThrow();
    });
  });

  describe('registerSchema', () => {
    it('should validate correct registration data', () => {
      const validRegistration = {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'Password123!',
      };

      expect(() => registerSchema.parse(validRegistration)).not.toThrow();
    });

    it('should reject registration with empty name', () => {
      const invalidRegistration = {
        name: '',
        email: 'john@example.com',
        password: 'Password123!',
      };

      expect(() => registerSchema.parse(invalidRegistration)).toThrow(/Name is required/);
    });

    it('should reject registration with invalid email', () => {
      const invalidRegistration = {
        name: 'John Doe',
        email: 'invalid-email',
        password: 'Password123!',
      };

      expect(() => registerSchema.parse(invalidRegistration)).toThrow();
    });

    it('should reject registration with invalid password', () => {
      const invalidRegistration = {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'weak',
      };

      expect(() => registerSchema.parse(invalidRegistration)).toThrow();
    });
  });
});
