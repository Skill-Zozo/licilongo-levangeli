import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { queries } from './queries';
import { Song } from './models/song';

var database = new SQLite();

export class SongService {
  initDB(): Promise<boolean> {
    console.log("creating db");
    return database.create({
        name: 'songs.db',
        location: 'default'
      }).then((dbInstance: SQLiteObject) => {
        return dbInstance.executeSql(queries.createTable, {})
          .then(() =>  {
            console.log('created table');
            return dbInstance.executeSql(queries.populateTable, {})
            .then(() => {console.log("populated table"); return true})
            .catch(e => {console.log(e); return false;});
          })
          .catch(e => {console.log(e); return false;});
      });
    }

  getSongs(): Promise<Song[]> {
    console.log("querying database");
    return database.create({
      name: 'songs.db',
      location: 'default'
    }).then((dbInstance: SQLiteObject) => {
      return dbInstance.executeSql('select * from hymns', {})
                .then(data => {
                  console.log("querying finished, displaying data");
                  var rows = [];
                  for(var i = 0; i < data.rows.length;i++) {
                    rows.push(data.rows.item(i))
                  }
                  return rows as Song[]
                })
                .catch(e => console.log(e));
    })
  }

  getSong(id: number): Promise<Song> {
    return database.create({
      name: 'songs.db',
      location: 'default'
    }).then((dbInstance: SQLiteObject) => {
      return dbInstance.executeSql('select * from hymns where id = (?)', id)
                .then(data => data as Song)
                .catch(e => console.log(e));
    });
  }

  search(queryText: string): Promise<Song[]> {
    queryText = "%" + queryText + "%";
    return database.create({
      name: 'songs.db',
      location: 'default'
    }).then((dbInstance: SQLiteObject) => {
      return dbInstance.executeSql('select * from hymns where (title like (?) or lyrics like (?) or author like (?))', [queryText, queryText, queryText])
              .then(data => {
                console.log("querying finished, displaying data");
                if(data.rows.length == 0) {
                  return [{title: null}] as Song[]
                }
                var rows = [];
                for(var i = 0; i < data.rows.length;i++) {
                  rows.push(data.rows.item(i))
                }
                return rows as Song[];
              })
              .catch(e => console.log(e));
      });
    }
}
