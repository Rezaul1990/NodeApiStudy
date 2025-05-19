
# 🚀 Member Profile API

This is a Node.js + Express.js REST API for managing authentication, user profiles, and member profiles. The project is built with clean architecture and uses JWT authentication for protected routes.

---

## 📦 Getting Started

### 🔧 Installation

```bash
git clone https://github.com/Rezaul1990/NodeApiStudy
cd your-repo-name
npm install
```

### 🗝️ Environment Variables

Create a `.env` file in the root directory based on `.env-example`:

```
PORT=8080
MONGO_URI=your-mongodb-uri
JWT_SECRET=your-secret-key
```

---

## 🧪 Running the Server

```bash
npm start
```

Server will start at: `http://localhost:8080`

---

## 📡 API Endpoints

### 🔐 Auth Routes

| Method | Endpoint             | Description        | Auth Required |
|--------|----------------------|--------------------|----------------|
| POST   | /api/auth/login      | Login user         | ❌ No         |
| POST   | /api/auth/register   | Register new user  | ❌ No         |

---

### 👤 Profile Routes

| Method | Endpoint             | Description         | Auth Required |
|--------|----------------------|---------------------|----------------|
| GET    | /api/profiles        | Get all profiles    | ✅ Yes        |
| POST   | /api/profiles        | Create profile      | ✅ Yes        |
| PUT    | /api/profiles/:id    | Update profile      | ✅ Yes        |
| DELETE | /api/profiles/:id    | Delete profile      | ✅ Yes        |

---

### 🧑‍🤝‍🧑 Member Profile Routes

| Method | Endpoint                | Description             | Auth Required |
|--------|-------------------------|-------------------------|----------------|
| GET    | /api/memberprofile      | Get member profiles     | ✅ Yes        |
| POST   | /api/memberprofile      | Create member profile   | ✅ Yes        |
| PUT    | /api/memberprofile/:id  | Update member profile   | ✅ Yes        |
| DELETE | /api/memberprofile/:id  | Delete member profile   | ✅ Yes        |

---

## 🔐 Protected Routes

All routes under `/api/profiles` and `/api/memberprofile` are **JWT Protected**.

Include the token in the header:

```
Authorization: Bearer <your-token>
```

---

## 📬 Sample Request (Postman)

### 🔸 Login

- **POST** `/api/auth/login`
- Body:
```json
{ "email": "user@email.com", "password": "123456" }
```

- **Response:**
```json
{ "token": "your-jwt-token" }
```


## 📤 POST Request Body Examples

### 👤 Profile - Create

**Endpoint:** `POST /api/profiles`  
**Headers:**
```
Authorization: Bearer your-jwt-token
Content-Type: application/json
```

**Body:**
```json
{
  "firstname": "John",
  "lastname": "Doe",
  "phonenumber": "01700000000",
  "address": "123 Main Street",
  "notes": "Regular visitor",
  "gender": "Male",
  "agree": true
}
```



### 🧑‍🤝‍🧑 MemberProfile - Create

**Endpoint:** `POST /api/memberprofile`  
**Headers:**
```
Authorization: Bearer your-jwt-token
Content-Type: application/json
```

**Body:**
```json
{
  "firstName": "Jane",
  "lastName": "Smith",
  "dob": {
    "day": "15",
    "month": "08",
    "year": "1990"
  },
  "phone": "01800000000",
  "email": "jane@example.com",
  "nok": {
    "firstName": "Emily",
    "lastName": "Smith",
    "phone": "01900000000",
    "email": "emily@example.com",
    "relationship": "Sister"
  }
}
```

---

## ♻️ PUT / DELETE Examples

### 👤 Profile - Update

**Endpoint:** `PUT /api/profiles/:id`  
**Headers:**
```
Authorization: Bearer your-jwt-token
Content-Type: application/json
```

**Body:**
```json
{
  "firstname": "John Updated",
  "lastname": "Doe",
  "phonenumber": "01711111111",
  "address": "456 New Address",
  "notes": "Updated info",
  "gender": "Other",
  "agree": true
}
```

---

### 👤 Profile - Delete

**Endpoint:** `DELETE /api/profiles/:id`  
**Headers:**
```
Authorization: Bearer your-jwt-token
```

---

### 🧑‍🤝‍🧑 MemberProfile - Update

**Endpoint:** `PUT /api/memberprofile/:id`  
**Headers:**
```
Authorization: Bearer your-jwt-token
Content-Type: application/json
```

**Body:**
```json
{
  "firstName": "Jane Updated",
  "dob": {
    "day": "16",
    "month": "09",
    "year": "1991"
  },
  "email": "jane_updated@example.com",
  "nok": {
    "firstName": "Emma",
    "phone": "01722222222",
    "relationship": "Mother"
  }
}
```

---

### 🧑‍🤝‍🧑 MemberProfile - Delete

**Endpoint:** `DELETE /api/memberprofile/:id`  
**Headers:**
```
Authorization: Bearer your-jwt-token
```



## 👨‍💻 Author

Rezaul (Your name here)

---
