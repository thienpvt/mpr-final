export class Note {
     constructor(
          public id: number,
          public color: string,
          public labelIds: number[],
          public content: string,
          public updateAt: Date | null,
          public isBookmarked: boolean,
          public folderId: number | null,
     ) {
     }

     public calculateTime = () => {
          if (!this.updateAt) return '';
          const now = new Date();
          const diff = now.getTime() - this.updateAt.getTime();
          const minutes = Math.floor(diff / 1000 / 60);
          if (minutes < 60) return `${minutes} mins ago`;
          const hours = Math.floor(minutes / 60);
          if (hours < 24) return `${hours} hrs ago`;
          const days = Math.floor(hours / 24);
          if (days < 7) return `${days} days ago`;
          const weeks = Math.floor(days / 7);
          if (weeks < 4) return `${weeks} weeks ago`;
          const months = Math.floor(weeks / 4);
          if (months < 12) return `${months} months ago`;
          const years = Math.floor(months / 12);
          return `${years} years ago`;
     }
}