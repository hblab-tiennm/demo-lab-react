/**
 * Register Use Case
 * Handles user registration business logic
 */
export class RegisterUseCase {
  /**
   * @param {import('../../domain/repositories/auth.repository.interface').IAuthRepository} authRepository
   */
  constructor(authRepository) {
    this.authRepository = authRepository;
  }

  /**
   * Execute registration
   * @param {import('../../domain/repositories/auth.repository.interface').RegisterDTO} dto
   * @returns {Promise<import('../../domain/entities/user.entity').User>}
   */
  async execute(dto) {
    // Validate input
    if (!dto.email || !dto.password || !dto.firstName || !dto.lastName) {
      throw new Error('Missing required fields');
    }

    if (dto.password.length < 6) {
      throw new Error('Password must be at least 6 characters');
    }

    // Call repository to register
    return this.authRepository.register(dto);
  }
}
