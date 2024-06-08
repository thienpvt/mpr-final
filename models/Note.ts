export class Note {
     constructor(
          public id: number,
          public color: String,
          public labelIds: number[],
          public content: String,
          public updateAt: Date,
          public isBookmarked: boolean,
          public folderId: number | null,
     ) {
     }
}