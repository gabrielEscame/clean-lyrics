// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { LyricsModel } from '../models'

type LyricsParams = {
  author: string
  song: string
}

export interface Lyrics {
  search(params: LyricsParams): Promise<LyricsModel>
}
