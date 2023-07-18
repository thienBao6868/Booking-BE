## Booking hotel App

- Booking hotel App is a social network that allows peopel to join by creating account. Each User should provide a name,
  an email, and password to create an account. The email address should not link to any account in the system. After joining Booking App, users can update their profile info like sex, numberphone, address, brithday,.....
- Booking App allows user find hotel by place, date booking, number of rooms. User can discover Most popullar choices for travellers from Vietnam.
- Booking App allows user can see hotel detail.
- Booking App allows user can see any rooms detail in the hotel.
- Booking App allows user can booking rooms.
  ...

## User_stories

### Authentication

-[] As a user, I can register for a new account with my name, email and password.

- [] As a user, I can sign in with my email and PassWord.

### Users

- [] As a user, I can get my current profile info (stay signed in after page refresh).

- [] As a user, I can update Profile info (sex, brithday, phoneNumber, facebookLink).

## EndPoint APIs

### Auth APIs
```javascript
/**
 * @route POST/auth/sendcode
 * @description send code verify to user email(user email want to register)
 * @body {email}
 * @access Public
 */
```
```javascript
/**
 * @route POST/auth/checkcode
 * @description verify code from email user have received
 * @body {email}
 * @access Public
 */
```

```javascript
/**
 * @route POST/auth/Login
 * @description login with email and password
 * @body {email,password}
 * @access Public
 */
```

### User APIs

```javascript
/**
 * @route POST/users
 * @description register new user
 * @body {name, email,password}
 * @access Public
 */
```
```javascript
/**
 * @route GET/users/me
 * @description get current user info
 * @access login required
 */
```
```javascript
/**
 * @route PUT/users/:id
 * @description Update user Profile 
 * @body {sex, brithday, phoneNumber, facebookLink }
 * @access Login required.
 */
```