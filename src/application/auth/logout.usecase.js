/**
 * Logout Use Case
 * Handles user logout business logic
 */
export class LogoutUseCase {
  /**
   * @param {import('../../domain/repositories/auth.repository.interface').IAuthRepository} authRepository
   */
  constructor(authRepository) {
    this.authRepository = authRepository;
  }

  /**
   * Execute logout
   * @returns {Promise<void>}
   */
  async execute() {
    return this.authRepository.logout();
  }
}
