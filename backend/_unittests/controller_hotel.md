
Testing in Thunder Client


**Test 1 — Create a Hotel (needs token)**
```
Method:   POST
URL:      http://localhost:5000/api/hotels
Headers:  Authorization: Bearer your_token_from_login
Body:     Form (multipart) ← important, NOT JSON
Fields:
  name           → The Grand Atlantis
  location       → Maldives
  description    → A luxury beachfront hotel
  pricePerNight  → 299
  availableRooms → 10
  images         → (attach an image file)
```

> In Thunder Client, switch Body type to **Multipart Form** to test image uploads

**Test 2 — Get All Hotels**
```
Method:  GET
URL:     http://localhost:5000/api/hotels
```

**Test 3 — Search Hotels**
```
Method:  GET
URL:     http://localhost:5000/api/hotels?search=maldives
```

**Test 4 — Get Single Hotel**
```
Method:  GET
URL:     http://localhost:5000/api/hotels/paste_hotel_id_here
```

**Test 5 — Update Hotel**
```
Method:   PUT
URL:      http://localhost:5000/api/hotels/paste_hotel_id_here
Headers:  Authorization: Bearer your_token
Body:     Multipart Form
Fields:   (only the fields you want to change)
```

**Test 6 — Delete Hotel**
```
Method:   DELETE
URL:      http://localhost:5000/api/hotels/paste_hotel_id_here
Headers:  Authorization: Bearer your_token