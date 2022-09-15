import SQLite, { SQLiteDatabase } from 'react-native-sqlite-storage';

declare const db: SQLiteDatabase;
// @ts-ignore
global.db = SQLite.openDatabase(
    {
        name: 'SQLite.db',
        location: 'default',
    },
    () => { console.log("Open: SQLite" ); },
    error => {
        console.log("ERROR: " + error);
    }
);


class SQLiteService {

    constructor() {
        SQLite.DEBUG(true);
        this.executeQuery = this.executeQuery.bind(this)
    }

    /**
  * Execute sql queries
  * 
  * @param sql
  * @param params
  * 
  * @returns {resolve} results
  */
    public executeQuery(sql: string, params: any[] = []) {
        return new Promise((resolve, reject) => {
            db.transaction((trans) => {
                trans.executeSql(sql, params, (trans, results) => {
                    resolve(results);
                },
                    (error) => {
                        reject(error);
                    });
            });
        })
    }
    // Create Table
    public async createTable() {
        let Table = await this.executeQuery("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY NOT NULL, first_name VARCHAR(16), last_name VARCHAR(16), is_deleted INTEGER)", []);
        console.log(Table);
    }
}

export default new SQLiteService();