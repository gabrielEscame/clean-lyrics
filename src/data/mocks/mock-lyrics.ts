import { LyricsModel, LyricsParams } from '@/domain/models'
import * as faker from 'faker'

export const mockSearchParams = (): LyricsParams => {
  return {
    artist: faker.name.firstName(),
    title: faker.music.genre()
  }
}

export const mockLyricModel = (): LyricsModel => {
  return {
    lyrics: faker.lorem.paragraphs()
  }
}
