/**
 * Base interface for HTTP Problem Details as specified in RFC 9457.
 *
 * Problem Details is a standardized way to carry machine-readable details of errors
 * in an HTTP response to avoid the need to define new error response formats.
 *
 * @see {@link https://datatracker.ietf.org/doc/html/rfc9457 RFC 9457}
 *
 * @example
 * ```typescript
 * const problem: ProblemBase = {
 *   status: 404,
 *   type: 'https://example.com/probs/not-found',
 *   title: 'Resource Not Found',
 *   detail: 'The requested resource was not found on this server.',
 *   instance: '/users/123'
 * };
 * ```
 */
export interface ProblemBase {
  /**
   * The HTTP status code ([RFC 9457], Section 3.1.2)
   */
  status?: number;
  /**
   * A URI reference that identifies the problem type ([RFC 9457], Section 3.1.1)
   *
   * Can be ignored for now. We do not have web pages to link to.
   */
  type?: string;
  /**
   * A short, human-readable summary of the problem ([RFC 9457], Section 3.1.3)
   */
  title?: string;
  /**
   * A human-readable explanation specific to this occurrence of the problem ([RFC 9457], Section 3.1.4)
   */
  detail?: string;
  /**
   * A URI reference that identifies the specific occurrence of the problem ([RFC 9457], Section 3.1.5)
   *
   * Typically, this would be the full request URI that caused the problem.
   */
  instance?: string;
}

/**
 * A class representing an HTTP Problem Details error that extends the native Error class
 * and implements the ProblemBase interface.
 *
 * @template Extensions - Type for additional properties that can be included in the problem details object
 */
export class ProblemError<Extensions extends Record<string, unknown> = Record<string, unknown>>
  extends Error
  implements ProblemBase
{
  public type: string;
  public status: number;
  public title: string;
  public detail: string;
  public instance?: string;
  /**
   * Additional properties applicable to the problem
   */
  public extensions?: Extensions;

  constructor(options: ProblemBase & { extensions?: Extensions }) {
    super(options.detail || options.title);
    // Fix prototype because we are extending a built-in class
    Object.setPrototypeOf(this, new.target.prototype);

    this.name = 'ProblemError';
    this.status = options.status ?? 500;
    this.type = options.type ?? 'about:blank';
    this.title = options.title ?? options.type ?? 'Internal Server Error';
    this.detail = options.detail ?? '';
    this.instance = options.instance;
    this.extensions = options.extensions;
  }

  toProblemObject(): Record<string, unknown> {
    const problem: Record<string, unknown> = {
      type: this.type,
      title: this.title,
      status: this.status,
    };
    if (this.detail) problem['detail'] = this.detail;
    if (this.instance) problem['instance'] = this.instance;
    if (this.extensions) Object.assign(problem, this.extensions);
    return problem;
  }
}
