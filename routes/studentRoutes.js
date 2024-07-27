const express = require('express');
const router = express.Router();
const Student = require('../models/Student');

// Create a new student
/**
 * @openapi
 * /students:
 *   post:
 *     summary: Create a new student
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Student'
 *     responses:
 *       201:
 *         description: Student created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Student'
 */
router.post('/students', async (req, res) => {
    try{
        const student = new Student(req.body);
        await student.save();
        res.status(201).json(student);
    } catch (error){
        res.status(400).json({error: error.message});
    }
});

//Read all students
/**
 * @openapi
 * /students:
 *   get:
 *     summary: Retrieve a list of students
 *     responses:
 *       200:
 *         description: A list of students
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Student'
 */
router.get('/students', async (req, res) => {
    try{
        const students = await Student.find();
        res.status(200).json(students);
    } catch(error){
        res.status(400).json({error: error.message});
    }
});

// Read a single student by ID
/**
 * @openapi
 * /student:
 *   put:
 *     summary: Retrieve a students by Id
 *     responses:
 *       200:
 *         description: students with provided id
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Student'
 */
router.put('/students/:id', async (req, res) => {
    try{
        const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if(!student) {return res.status(404).json({ error: 'Student not found!'}); }
            res.status(200).json(student);

    }catch(error){
        res.status(400).json({error: error.message});
    }
});

// Delete a Student by ID
/**
 * @openapi
 * /students:
 *   delete:
 *     summary: Delete student with specified Id
 *     responses:
 *       200:
 *         description: Delete a student
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Student'
 */
router.delete('/students/:id', async (req, res) => {
    try{
        const student = await Student.findByIdAndDelete(req.params.id);
        if(!student){ return res.status(404).json({ error: 'Student not found!'}); }
        res.status(200).json({message: 'Student deleted successfully'});
    } catch (error){
        res.status(400).json({error: error.message});
    }
});

module.exports = router;