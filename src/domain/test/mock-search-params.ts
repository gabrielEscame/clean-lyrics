import { LyricsParams } from '@/domain/models'
import * as faker from 'faker'

export const mockSearchParams = (): LyricsParams => {
  return {
    artist: faker.name.firstName(),
    title: faker.music.genre()
  }
}
