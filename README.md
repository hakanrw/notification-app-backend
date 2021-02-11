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
| Yön | Parametreler | Açıklama | 
| --- | --- | --- |
| `GET /notifications/get` | **querystring** <br /> `fullCheck=true` veya  `receiveDate=<Date>` <br /><br /> **cookie** <br /> `SESSION_M=<SessionID>`| Belirtilen tarihten sonraki 20 bildirimi al. |
| `POST /users/login` | **body (x-www-urlencoded)** <br /> `password=<String>` <br /> `mail=<String>` | Giriş yap ve session tokeni al. |
| `POST /users/register` | **body (x-www-urlencoded)** <br /> `password=<String>` <br /> `mail=<String>` | Kayı ol. |
| `GET /admin` | - | Tarayıcı üzerinde açılabilen yönetici sayfası |
| `POST /admin/insert` | **body (x-www-urlencoded)** <br /> `password=1234qwer` <br /> `title=<String>` <br /> `message=<String>` | Bildirimlere yenisini ekle. |
