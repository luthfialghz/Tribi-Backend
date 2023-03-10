// var Minio = require ('minio')


// // credensial minio
// var minioClient = new Minio.Client({
//     endPoint: '172.20.0.84',
//     port: 9000,
//     useSSL: false,
//     accessKey: 'xjUQ3DwRN4LepbaH',
//     secretKey: 'NQTArldunpvAWZJhZOrarAdvjjpjNXKc'
// });


// Melihat list bucket bisa
// minioClient.listBuckets(function(err, buckets) {
//     if (err) return console.log(err)
//     console.log('buckets :', buckets)
//   });


// Create bucket tobe public
// minioClient.setBucketPolicy('testing', 'public-read', function(err) {
//     if (err) {
//       return console.log(err)
//     }
//     console.log('Bucket mybucket is now public')
//   })


// Get link URL public from file in bucket (done)
// Get Link URL public from file in bucket dgn waktu kedaluwarsa dari URL yang dikembalikan, dalam detik.
//   minioClient.presignedUrl('GET', 'testing', 'kitten.png', 60 * 60 * 24, function(err, url) {
// // 60*60*24 = 1 hari => Itu akan mencetak URL public dari file 'myfile.jpg' di bucket 'mybucket' yang akan kadaluwarsa dalam 24 jam.
//     if (err) {
//       return console.log(err)
//     }
//     console.log(url)
//   })


// Upload file to bucket (done)
//   minioClient.fPutObject('testing2', 'kitten.png', 'E:/Capstone Server/kitten.png', function(err, etag) {
//     if (err) {
//       return console.log(err)
//     }
//     console.log('File uploaded successfully. eTag: ' + etag)
//   })



// minioClient.fPutObject('testing2', 'american-sign-language_1.tar.gz', 'E:/Capstone Server/american-sign-language_1.tar.gz', function(err, etag) {
//     if (err) {
//       return console.log(err)
//     }
//     console.log('File uploaded successfully. eTag: ' + etag)
//   })

//========================================================================

// Backup database from PostgreSQL to Minio every 10 seconds (blm jalan)

// const { Client } = require('pg');
// const { exec } = require('child_process');
// const moment = require('moment');
// const fs = require('fs');
// const path = require('path');
// const Minio = require('minio');

// // Konfigurasi koneksi PostgreSQL
// const pgClient = new Client({
//   user: 'postgres',
//   host: '127.0.0.1',
//   database: 'tribi_db',
//   password: '12345',
//   port: 5432,
// });

// // Konfigurasi koneksi Minio
// const minioClient = new Minio.Client({
//   endPoint: '172.20.0.84',
//   port: 9000,
//   useSSL: false,
//   accessKey: 'xjUQ3DwRN4LepbaH',
//   secretKey: 'NQTArldunpvAWZJhZOrarAdvjjpjNXKc',
// });

// async function backupDatabase () {
//   try {
//     //Buat nama file backup
//     const backupFileName = `backup-${moment().format('YYYY-MM-DD-HH-mm-ss')}.sql`;

//     //Buat perintah backup database menggunakan pg_dump
//     const { stdout } = await exec(`pg_dump -h 127.0.0.1 -p 5432 -U postgres tribi_db > ${backupFileName}`);
    

//     // Upload file backup ke MinIO
//     const backupStream = fs.createReadStream(path.join(__dirname, backupFileName));
//     await minioClient.putObject('testing', backupFileName, backupStream);
//     console.log(`Backup database '${backupFileName}' berhasil diunggah ke Minio`);
//   } catch (error) {
//     console.error('Terjadi kesalahan saat backup database:', error.code);
//   }
// }
// backupDatabase();

// ==================================

// const { Pool } = require('pg');
// const Minio = require('minio');
// const moment = require('moment');
// const { exec } = require('child_process');


// // Konfigurasi koneksi ke PostgreSQL
// const pool = new Pool({
//   user: 'postgres',
//   host: '172.20.0.84',
//   database: 'tribi_db',
//   password: '12345',
//   port: 5432,
// });

// // Konfigurasi koneksi ke MinIO
// const minioClient = new Minio.Client({
//   endPoint: '172.20.0.84',
//   port: 9000,
//   useSSL: false,
//   accessKey: 'xjUQ3DwRN4LepbaH',
//   secretKey: 'NQTArldunpvAWZJhZOrarAdvjjpjNXKc',
// });

// // Fungsi untuk membackup database ke MinIO
// async function backupDatabase() {
//   try {

//     await pool.connect();
//     const bucketName = 'testing';
//     const backupFileName = `backup_1-${moment().format('YYYY-MM-DD-HH-mm-ss')}.sql`;

//     // Eksekusi perintah backup database menggunakan pg_dump
//     const { stdout } = await exec(`pg_dump -U postgres -h 172.20.0.84 tribi_db > ${backupFileName}`);

//     // Upload file backup ke MinIO
//     const backupStream = fs.createReadStream(path.join(__dirname, backupFileName));
//     await minioClient.fPutObject(bucketName, backupFileName, backupStream);

//     console.log(`Database backup ${backupFileName} telah berhasil disimpan di MinIO.`);
//   } catch (err) {
//     console.error(err.code);
//   }
// }

// backupDatabase();

//==================================================

// Done untuk upload file json berisi codingan database postgres
// const { Client } = require('pg');
// const { Pool } = require('pg');
// const Minio = require('minio');

// // Konfigurasi koneksi PostgreSQL
// const pgConfig = {
//   user: 'postgres',
//   host: '127.0.0.1',
//   database: 'tribi_db',
//   password: '12345',
//   port: 5432,
// };
    
// // Konfigurasi koneksi Minio
// const minioClient = new Minio.Client({
//   endPoint: '172.20.0.84',
//   port: 9000,
//   useSSL: false, 
//   accessKey: 'xjUQ3DwRN4LepbaH',
//   secretKey: 'NQTArldunpvAWZJhZOrarAdvjjpjNXKc',
// });

// // Mengambil isi semua tabel pada database postgres
// const query = `SELECT * FROM users; SELECT * FROM user_contributor; SELECT * FROM test;`;


// // Koneksi ke PostgreSQL
// const pool = new Pool(pgConfig);

// (async () => {
//   const client = await pool.connect();
//   const result = await client.query(query);
//   const rows = result.rows;

//   // Menyimpan data ke Minio sebagai objek JSON
//   const objectName = 'data6.json';
//   const data = JSON.stringify(rows);
//   const metaData = { 'Content-Type': 'application/json' };
//   const bucketName = 'testing';
//   minioClient.putObject(bucketName, objectName, data, metaData, (err, etag) => {
//     if (err) {
//       return console.log(err);
//     }
//     console.log('Data berhasil disimpan di Minio dengan nama objek: ', objectName);
//   });

//   client.release();
//   await pool.end();
// })();


//====================================================
// CAra 2
// const { Client } = require('pg');
// const { Pool } = require('pg');
// const Minio = require('minio');

// // Konfigurasi koneksi PostgreSQL
// const pgConfig = {
//   user: 'postgres',
//   host: '127.0.0.1',
//   database: 'tribi_db',
//   password: '12345',
//   port: 5432,
// };

// // Konfigurasi koneksi Minio
// const minioClient = new Minio.Client({
//   endPoint: '172.20.0.84',
//   port: 9000,
//   useSSL: false,
//   accessKey: 'xjUQ3DwRN4LepbaH',
//   secretKey: 'NQTArldunpvAWZJhZOrarAdvjjpjNXKc',
// });

// async function backupDatabase() {
//   try {
//     // Mengambil isi semua tabel pada database postgres
//     const query = `SELECT * FROM users;`;

//     // Koneksi ke PostgreSQL
//     const pool = new Pool(pgConfig);
//     const client = await pool.connect();
//     const result = await client.query(query);
//     const rows = result.rows;

//     // Menyimpan data ke Minio sebagai objek JSON
//     const bucketName = 'testing';
//     const objectName = 'data7.json';
//     const data = JSON.stringify(rows);

//     await minioClient.putObject(bucketName, objectName, data, (err, etag) => {
//       if (err) {
//         return console.log(err);
//       }
//       console.log('Data berhasil disimpan di Minio dengan nama objek: ', objectName);
//     });

//     client.release();
//     await pool.end();
//   }
//   catch (error) {
//     console.error('Terjadi kesalahan saat backup database:', error);
//   } 
// }
// setInterval(() => {
//   backupDatabase();
// }, 10000);
  
// backupDatabase();


//==================================================================================
// Backup data isi semua data yang terdapat table postgres
// const { Client } = require('pg');
// const Minio = require('minio');
// const { exec } = require('child_process');

// // Konfigurasi koneksi PostgreSQL
// const pgClient = new Client({
//   user: 'postgres',
//   host: '127.0.0.1',
//   database: 'tribi_db',
//   password: '12345',
//   port: 5432,
// });

// // Konfigurasi koneksi Minio
// const minioClient = new Minio.Client({
//   endPoint: '172.20.0.84',
//   port: 9000,
//   useSSL: false,
//   accessKey: 'xjUQ3DwRN4LepbaH',
//   secretKey: 'NQTArldunpvAWZJhZOrarAdvjjpjNXKc',
// });

// async function backupDatabase() {
//    // Buat nama file backup dengan format YYYY-MM-DD-HH-mm-ss.sql
//    const backupName = new Date().toISOString().replace(/:/g, '-') + '.sql';
//    const bucketName = 'testing';

//   //Buat perintah backup database menggunakan pg_dump
//   const { stdout } = await exec(`pg_dump -h 127.0.0.1 -p 5432 -U postgres tribi_db > ${backupName}`);
//   console.log(stdout);

//    // Upload stream backup ke Minio
//    await minioClient.putObject(bucketName, backupName, backupName);
 
//    console.log(`Backup ${backupName} berhasil disimpan di Minio.`);
 
//     // Tutup koneksi PostgreSQL
//     await pgClient.end();
// }

// // setInterval(() => {
// //   backupDatabase();
// // }, 50000); // 50000 = 50 detik

// backupDatabase();      

//===================================================
// Backup database from PostgreSQL to Minio every 10 seconds

const { exec } = require('child_process');
const moment = require('moment');
const fs = require('fs');
const path = require('path');
const Minio = require('minio');
const Pool    = require('pg').Pool;

// Konfigurasi koneksi PostgreSQL
const pool  = new Pool({
  user: 'postgres',
  host: '127.0.0.1',
  database: 'tribi_db',
  password: '12345',
  port: 5432,
});

// Konfigurasi koneksi Minio
const minioClient = new Minio.Client({
  endPoint: '172.20.0.84',
  port: 9000,
  useSSL: false,
  accessKey: 'xjUQ3DwRN4LepbaH',
  secretKey: 'NQTArldunpvAWZJhZOrarAdvjjpjNXKc',
});

async function backupDatabase () {
  try{
    await pool.connect();
    // Membuat backup database PostgreSQL
    const backupFileName = `backup-${moment().format('YYYY-MM-DD-HH-mm-ss')}.sql`;
    const { stdout } = await exec (`pg_dump -U postgres -h 127.0.0.1 -p 5432 tribi_db > ${backupFileName}`);
    console.log(`Backup database '${backupFileName}' berhasil dibuat`);
  
    // Upload backup database ke Minio
    const bucketName = 'testing';
    const backupStream = fs.createReadStream(path.join(__dirname, backupFileName));
  
    await minioClient.fPutObject(bucketName, backupFileName, backupStream);
    console.log(`Backup database '${backupFileName}' berhasil diupload ke Minio`);

  } catch (error) {
    console.error('Terjadi kesalahan saat backup database:', error.code);
  }
}
backupDatabase ();



//===================================================
// const { Client } = require('pg');
// const { exec } = require('child_process');
// const Minio = require('minio');

// // Konfigurasi koneksi PostgreSQL
// const pgClient = new Client({
//   user: 'postgres',
//   host: '127.0.0.1',
//   database: 'tribi_db',
//   password: '12345',
//   port: 5432,
// });
    
// // Konfigurasi koneksi Minio
// const minioClient = new Minio.Client({
//   endPoint: '172.20.0.84',
//   port: 9000,
//   useSSL: false,
//   accessKey: 'xjUQ3DwRN4LepbaH',
//   secretKey: 'NQTArldunpvAWZJhZOrarAdvjjpjNXKc',
// });

// const fs = require('fs');
// const path = require('path');
// const moment = require('moment');

// async function backupDatabase  () {
//   try {
//     // Buat nama file backup
//     const backupFileName = `backup-${moment().format('YYYY-MM-DD-HH-mm-ss')}.sql`;

//     // Buat perintah backup database
//     const backupCommand = `pg_dump -h 172.20.0.84 -p 5432 -U postgres tribi_db > ${backupFileName}`;

//     // Jalankan perintah backup database
//     await pgClient.connect();
//     await pgClient.query(`COPY (${backupCommand}) TO STDOUT`);

//     const backupData = await pgClient.query(`COPY (${backupCommand}) TO STDOUT`);
//     console.log(backupData);
  
//     // Unggah file backup ke Minio
//     const backupStream = fs.createReadStream(path.join(__dirname, backupFileName));
//     await minioClient.putObject('testing', backupFileName, backupStream);
//     console.log(`Backup database '${backupFileName}' berhasil diunggah ke Minio`);
//   } catch (error) {
//     console.error('Terjadi kesalahan saat backup database:', error.code);
//   }
// }

// backupDatabase();
// // setInterval(() => {
// //   backupDatabase();
// // // }, 10000); // 10 detik
// // }, 60000); // 1 menit

// ================================================================
// Masih gagal
// const { Client } = require('pg');
// const fs = require('fs');
// const path = require('path');
// const moment = require('moment');
// const Minio = require('minio');
// const { exec } = require('child_process');

// // Konfigurasi koneksi PostgreSQL
// const pgClient = new Client({
//   user: 'postgres',
//   host: '127.0.0.1',
//   database: 'tribi_db',
//   password: '12345',
//   port: 5432,
// });
    
// // Konfigurasi koneksi Minio
// const minioClient = new Minio.Client({
//   endPoint: '172.20.0.84',
//   port: 9000,
//   useSSL: false,
//   accessKey: 'xjUQ3DwRN4LepbaH',
//   secretKey: 'NQTArldunpvAWZJhZOrarAdvjjpjNXKc',
// });


// async function backupDatabase() {
//   try {
//     // Buat nama file backup
//     const backupFileName = `backup-${moment().format('YYYY-MM-DD-HH-mm-ss')}.sql`;

//     // Buat perintah backup database
//     const backupCommand = await exec (`pg_dump -h 127.0.0.1 -p 5432 -U postgres tribi_db > ${backupFileName}`);

//     // Jalankan perintah backup database
//     await pgClient.connect();
//     await pgClient.query(`COPY (${backupCommand}) TO STDOUT`);
//     await pgClient.end();

//     // Unggah file backup ke Minio
//     const backupStream = fs.createReadStream(path.join(__dirname, backupFileName));
//     await minioClient.putObject('testing', backupFileName, backupStream);
//     console.log(`Backup database '${backupFileName}' berhasil diunggah ke Minio`);
//   } catch (error) {
//     console.error('Terjadi kesalahan saat backup database:', error.code);
//   }
// }
// backupDatabase();


//===============================================
// const { Client } = require('pg');
// const { exec } = require('child_process');
// const Minio = require('minio');

// // Konfigurasi koneksi PostgreSQL
// const pgClient = new Client({
//   user: 'postgres',
//   host: '172.20.0.84',
//   database: 'tribi_db',
//   password: '12345',
//   port: 5432,
// });
    
// // Konfigurasi koneksi Minio
// const minioClient = new Minio.Client({
//   endPoint: '172.20.0.84',
//   port: 9000,
//   useSSL: false,
//   accessKey: 'xjUQ3DwRN4LepbaH',
//   secretKey: 'NQTArldunpvAWZJhZOrarAdvjjpjNXKc',
// });

// const fs = require('fs');
// const path = require('path');
// const moment = require('moment');

// async function backupDatabase  () {
//   try {
//     // Buat nama file backup
//     const backupFileName = `backup-${moment().format('YYYY-MM-DD-HH-mm-ss')}.sql`;

//     // Buat perintah backup database
//     const backupCommand = await exec `pg_dump -h 172.20.0.84 -p 5432 -U postgres tribi_db > ${backupFileName}`;

//     // Jalankan perintah backup database
//     await pgClient.connect();
//     await pgClient.query(`COPY (${backupCommand}) TO STDOUT`);

//     const backupData = await pgClient.query(`COPY (${backupCommand}) TO STDOUT`);
//     console.log(backupData);
  
//     // Unggah file backup ke Minio
//     const backupStream = fs.createReadStream(path.join(__dirname, backupFileName));
//     await minioClient.putObject('testing', backupFileName, backupStream);
//     console.log(`Backup database '${backupFileName}' berhasil diunggah ke Minio`);
//   } catch (error) {
//     console.error('Terjadi kesalahan saat backup database:', error.code);
//   }
// }

// backupDatabase();

//=======================================
// const fs = require('fs');
// const path = require('path');
// const moment = require('moment');
// const { Client } = require('pg');
// const Minio = require('minio');
// const { exec } = require('child_process');

// // Konfigurasi koneksi PostgreSQL
// const pgClient = new Client({
//   user: 'postgres',
//   host: '172.20.0.84',
//   database: 'tribi_db',
//   password: '12345',
//   port: 5432,
// });
    
// // Konfigurasi koneksi Minio
// const minioClient = new Minio.Client({
//   endPoint: '172.20.0.84',
//   port: 9000,
//   useSSL: false,
//   accessKey: 'xjUQ3DwRN4LepbaH',
//   secretKey: 'NQTArldunpvAWZJhZOrarAdvjjpjNXKc',
// });

// async function backupDatabase() {
//   try {
//     // Buat nama file backup
//     const backupFileName = `backup-${moment().format('YYYY-MM-DD-HH-mm-ss')}.sql`;

//     // Buat perintah backup database
//     const backupCommand = `pg_dump -U postgres mydatabase > ${backupFileName}`;

//     // Jalankan perintah backup database
//     await pgClient.connect();
//     await pgClient.query(`COPY (${backupCommand}) TO STDOUT`);
//     await pgClient.end();

//     // Unggah file backup ke Minio
//     const backupStream = fs.createReadStream(path.join(__dirname, backupFileName));
//     await minioClient.putObject('testing', backupFileName, backupStream);
//     console.log(`Backup database '${backupFileName}' berhasil diunggah ke Minio`);
//   } catch (error) {
//     console.error('Terjadi kesalahan saat backup database:', error);
//   }
// }

// backupDatabase();