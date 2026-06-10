# Stage 1

## Notification System Design

### Core Actions
The notification platform shall support the following operations:

Creation of notifications.
Retrieval of notifications for authenticated users.
Retrieval of a specific notification.
Updating notification status (mark as read).
Removal of notifications.
Delivery of notifications in real time.

---

## API Contracts

### 1. Create Notification

#### Endpoint

```http
POST /api/notifications
```

#### Headers

```http
Content-Type: application/json
Authorization: Bearer {JWT_TOKEN/access-token}
```

#### Request Body

```json
{
  "userId": "string",
  "title": "string",
  "message": "string",
  "category": "placements | events | results"
}
```

#### Success Response (201 Created)

```json
{
  "notificationId": "string",
  "status": "created"
}
```
### 2. Retrieve Notifications for Authenticated User

#### Endpoint

```http
GET /api/notifications
```

#### Headers

```http
Authorization: Bearer {JWT_TOKEN/access-token}
```

#### Success Response (200 OK)

```json
{
  "notifications": [
    {
      "notificationId": "string",
      "title": "string",
      "message": "string",
      "category": "placements | events | results",
      "isRead": false,
      "createdAt": "ISO-8601 timestamp"
    }
  ]
}
```

---

### 3. Retrieve Notification by Identifier

#### Endpoint

```http
GET /api/notifications/{notificationId}
```

#### Headers

```http
Authorization: Bearer {JWT_TOKEN/access-token}
```

#### Success Response (200 OK)

```json
{
  "notificationId": "string",
  "title": "string",
  "message": "string",
  "category": "placements | events | results",
  "isRead": false,
  "createdAt": "ISO-8601 timestamp"
}
```
### 4. Mark Notification as Read

#### Endpoint

```http
PATCH /api/notifications/{notificationId}/read
```

#### Headers

```http
Authorization: Bearer {JWT_TOKEN}
```

#### Success Response (200 OK)

```json
{
  "notificationId": "string",
  "status": "read"
}
```

---

### 5. Delete Notification

#### Endpoint

```http
DELETE /api/notifications/{notificationId}
```

#### Headers

```http
Authorization: Bearer {JWT_TOKEN}
```

#### Success Response (200 OK)

```json
{
  "notificationId": "string",
  "status": "deleted"
}
```

---

## Real-Time Notification Mechanism

### Proposed Solution

WebSockets shall be used to facilitate real-time notification delivery.

Workflow

Upon successful authentication, the client establishes a WebSocket connection with the server.
The server maintains active connections for authenticated users.
Whenever a notification is generated, the server identifies the intended recipient(s).
The notification payload is pushed immediately through the existing WebSocket connection.
The client updates the notification interface without requiring manual refresh or periodic polling.

Rationale

Enables low-latency notification delivery.
Supports bidirectional communication.
Reduces overhead associated with repeated polling requests.
Enhances user experience through immediate visibility of campus updates.
Suitable for event-driven systems with dynamic notification requirements.