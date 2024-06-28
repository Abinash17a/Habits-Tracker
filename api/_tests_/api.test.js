// const request = require('supertest');
// const express = require('express');
// const app = require('../index'); // Adjust the path as needed
// const db = require('../config/db'); // Import the db module

// jest.mock('../config/db'); // Mock the db module

// describe('Habits API', () => {
//   beforeEach(() => {
//     // Reset all mocks before each test
//     jest.clearAllMocks();
//   });

//   it('should create a new habit', async () => {
//     const mockHabit = {
//       title: 'contentWriting',
//       color: '#4169E1',
//       repeatMode: 'Daily',
//       reminder: true
//     };

//     db.createHabit?.mockResolvedValue({
//       recordset: [mockHabit]
//     });

//     const res = await request(app)
//       .post('/habits')
//       .send(mockHabit);

//     expect(res.statusCode).toEqual(200);
//     expect(res.body).toHaveProperty('title', 'contentWriting' );
//     expect(res.body).toHaveProperty('color', '#4169E1');
//     expect(res.body).toHaveProperty('repeatMode', 'Daily');
//     expect(res.body).toHaveProperty('reminder', true);
//   });

//   it('should fetch all habits', async () => {
//     const mockHabits = [
//       { title: 'contentWriting', color: '#4169E1', repeatMode: 'Daily', reminder: true }
//     ];

//     db.getHabits?.mockResolvedValue({
//       recordset: mockHabits
//     });

//     const res = await request(app).get('/habits');

//     expect(res.statusCode).toEqual(200);
//     expect(res.body).toEqual(mockHabits);
//   });

//   it('should update the completion status of a habit', async () => {
//     const habitId = 1;
//     const mockCompleted = true;

//     db.updateHabitCompletion?.mockResolvedValue({ rowsAffected: [1] });

//     const res = await request(app)
//       .put(`/habits/${habitId}/completed`)
//       .send({ completed: mockCompleted });

//     expect(res.statusCode).toEqual(200);
//     expect(res.body).toHaveProperty('message', 'Habit completion status updated successfully');
//   });

//   it('should delete a habit', async () => {
//     const habitId = 1;

//     db.deleteHabit?.mockResolvedValue({ rowsAffected: [1] });

//     const res = await request(app).delete(`/habits/${habitId}`);

//     expect(res.statusCode).toEqual(200);
//     expect(res.body).toHaveProperty('message', 'Habit deleted successfully');
//   });
// });

// describe('Auth API', () => {
//   beforeEach(() => {
//     // Reset all mocks before each test
//     jest.clearAllMocks();
//   });

//   it('should register a new user', async () => {
//     const mockUser = {
//       username: 'testuser0',
//       password: '123456'
//     };

//     db.createUser?.mockResolvedValue({ rowsAffected: [1] });

//     const res = await request(app)
//       .post('/auth/register')
//       .send(mockUser);

//     expect(res.statusCode).toEqual(200);
//     expect(res.body).toHaveProperty('success', true);
//   });

//   it('should login a user', async () => {
//     const mockUser = {
//       username: 'testuser',
//       password: 'password123'
//     };

//     db.getUserByUsername?.mockResolvedValue({
//       recordset: [{
//         username: 'testuser',
//         password_hash: '$2b$10$w9/qo5E.vQK7O76F4.p1KuTVLVpNzF/p1J6fl1IHYUGuJ0ZRI3Gsq' // bcrypt hash for 'password123'
//       }]
//     });

//     const res = await request(app)
//       .post('/auth/login')
//       .send(mockUser);

//     expect(res.statusCode).toEqual(200);
//     expect(res.body).toHaveProperty('success', true);
//   });
// });
