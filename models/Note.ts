export class Note {
     constructor(
          public id: number,
          public color: string,
          public labelIds: number[],
          public content: string,
          public updateAt: Date ,
          public isBookmarked: boolean,
          public folderId: number | null,
     ) {
     }
     
}