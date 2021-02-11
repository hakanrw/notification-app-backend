# notification-app-backend
## TR
Bildirim uygulamasının sunucu taraflı kodu.
## Sunucuyu çalıştırma
Windows
```
C:\notification-app-backend> set DATABASE_URL = "<veritabanı adresi>"
C:\notification-app-backend> node server.js
```
## Yönler
| Yön | Headers | Açıklama | 
| --- | --- | --- |
| `GET /notifications/get` | `fullCheck=true` veya `receiveDate=<Date>`| Header olarak belirtilen tarihten sonraki 20 bildirimi al. |
| `POST /notifications/insert` |  | Bildirimlere yenisini ekle |
