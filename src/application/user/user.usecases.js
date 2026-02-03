/**
 * Get Current User Use Case
 * Fetches the currently logged in user
 */
export class GetCurrentUserUseCase {
  /**
   * @param {Object} userRepository
   */
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  /**
   * Execute
   * @returns {Promise<import('../../domain/entities/user.entity').User>}
   */
  async execute() {
    return this.userRepository.getCurrentUser();
  }
}

/**
 * Update User Profile Use Case
 */
export class UpdateProfileUseCase {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute(dto) {
    return this.userRepository.updateProfile(dto);
  }
}
