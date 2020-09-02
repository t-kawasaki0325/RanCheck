import { rancheckRepository } from '../services'
import { IRancheckEntity } from '../usecase'

export default {
  setRancheck: (payload: IRancheckEntity) => payload,
  fetchRancheck: async () => await rancheckRepository.get()
}