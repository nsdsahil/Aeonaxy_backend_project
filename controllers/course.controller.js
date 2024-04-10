import express from 'express';
import Course from '../models/course.model.js';
import { authenticate, authorizeSuperadmin } from '../middlewares/auth.middleware.js';

const router = express.Router();


router.get('/courses',async (req, res) => {
    try {
        const { category, level, sortBy, sortOrder, page, limit } = req.query;
        const filter = {};
        if (category) filter.category = category;
        if (level) filter.level = level;
        const sort = {};
        if (sortBy) sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

        const options = {
            sort,
            page: parseInt(page, 10) || 1,
            limit: parseInt(limit, 10) || 10
        };
        const courses = await Course.paginate(filter, options);
        res.json(courses);
    } catch (error) {
        console.error('Error fetching courses:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.post('/courses',authenticate,authorizeSuperadmin, async (req, res) => {
    try {
        const course = new Course(req.body);
        await course.save();
        res.status(201).json({ message: 'Course created successfully', course });
    } catch (error) {
        console.error('Error creating course:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.get('/courses/:id', async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }
        res.json(course);
    } catch (error) {
        console.error('Error fetching course:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.put('/courses/:id',authenticate,authorizeSuperadmin, async (req, res) => {
    try {
        const course = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }
        res.json(course);
    } catch (error) {
        console.error('Error updating course:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


router.delete('/courses/:id',authenticate,authorizeSuperadmin, async (req, res) => {
    try {
        const course = await Course.findByIdAndDelete(req.params.id);
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }
        res.json({ message: 'Course deleted successfully' });
    } catch (error) {
        console.error('Error deleting course:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


export default router;