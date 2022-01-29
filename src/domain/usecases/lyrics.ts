import { LyricsModel, LyricsParams } from '@/domain/models'

export interface Lyrics {
  search(params: LyricsParams): Promise<LyricsModel>
}
