# validation

A shared validation library containing Zod schemas for use across client and server applications.

## Purpose

This package provides centralized validation schemas using [Zod](https://zod.dev/) that can be shared between:

- Client applications (for form validation, data validation)
- Server applications (for API request/response validation)

This ensures consistent data validation rules across the entire application stack.

## Building

Run `nx build validation` to build the library.

## Running unit tests

Run `nx test validation` to execute the unit tests via [Vitest](https://vitest.dev/).

## Development

When adding new schemas:

1. Create schema files in the appropriate directory
2. Export schemas and types from the main index file
3. Add corresponding tests
4. Update this README if needed
