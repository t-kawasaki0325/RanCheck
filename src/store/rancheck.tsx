import { rancheckRepository } from '../services'

export default {
  fetchRancheck: async () => await rancheckRepository.get()
}