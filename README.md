# apiazanscrap
REST API yang diambil dari scraping web jadwalsholat.org

## Instalasi
Clone repository :
```bash
git clone https://github.com/gen781/apiazanscrap.git
```
Masuk ke folder :
```bash
cd apiazanscrap
```
Gunakan npm package manager untuk instalasi:
```bash
npm install
```
Jalankan server:
```bash
node index
```

## Instruksi
Parameter yang digunakan untuk mendapatkan response API:
* id = id kota 
* month = bulan
* year = tahun

Contoh penggunaan:
```url
http://localhost:3000/?id=151&month=5&year=2019
```
Gunakan curl, postman atau browser untuk mendapatkan response json

## License
[MIT](https://choosealicense.com/licenses/mit/)



