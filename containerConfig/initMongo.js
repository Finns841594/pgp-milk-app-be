/* global db */
db.createUser(
  {
    user: 'puppyadmin',
    pwd: 'puppypass',
    roles: [
      {
        role: 'readWrite',
        db: 'puppydb',
      },
    ],
  },
);