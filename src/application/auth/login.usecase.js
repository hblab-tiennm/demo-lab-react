/**
 * Login Use Case
 * Handles user login business logic
 */
export class LoginUseCase {
  /**
   * @param {import('../../domain/repositories/auth.repository.interface').IAuthRepository} authRepository
   */
  constructor(authRepository) {
    this.authRepository = authRepository;
  }

  /**
   * Execute login
   * @param {import('../../domain/repositories/auth.repository.interface').LoginDTO} dto
   * @returns {Promise<import('../../domain/repositories/auth.repository.interface').AuthResponse>}
   */
  async execute(dto) {
    // Validate input
    if (!dto.email || !dto.password) {
      throw new Error('Email and password are required');
    }

    // Call repository to login
    return this.authRepository.login(dto);
  }
}
