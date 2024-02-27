import db from "./conexion.js";

export const validateDependency = async (datos, fkId) => {
  let references = false;
  datos = datos[0];
  for (let i = 0; i < datos.length && !references; i++) {
    let res = await db.query(
      `select ${datos[i].COLUMN_NAME} from ${datos[i].TABLE_NAME} where ${datos[i].COLUMN_NAME} = '${fkId}' limit 1`
    );

    res = res[0];
    if (res[0] != null) {
      return (references = true);
    }
  }

  return references;
};

export const getTableReferences =async (tableName, columnName) => {
  return await db.query(`SELECT
                    TABLE_NAME,
                    COLUMN_NAME
                FROM
                    INFORMATION_SCHEMA.KEY_COLUMN_USAGE
                WHERE
                    REFERENCED_TABLE_NAME = '${tableName}'
                    AND REFERENCED_COLUMN_NAME = '${columnName}'
                `);
};
