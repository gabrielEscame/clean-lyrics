import { LyricsModel, LyricsParams } from '../models'

export interface Lyrics {
  search(params: LyricsParams): Promise<LyricsModel>
}
