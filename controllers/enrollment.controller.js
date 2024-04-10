
import express from 'express';
import { config as dotenvConfig } from 'dotenv';
import nodemailer from 'nodemailer';
import Course from '../models/course.model.js';
import { authenticate } from '../middlewares/auth.middleware.js';
import User from '../models/user.model.js';
import enrollmentConfirmation from '../emails/enrollmentConfirmation.js';
const transporter = nodemailer.createTransport({
	service: "gmail",
	auth: {
	  user: "sahilroyal91@gmail.com",
	  pass: "ybtwdogzakknnuja",
	},
  });

dotenvConfig();

const router = express.Router();



router.post('/courses/:id/enroll', authenticate, async (req, res) => {
    try {
        const courseId = req.params.id;
        const userId = req.user._id;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const email = user.email;
        const username = user.name;
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }

        if (course.enrolledUsers.includes(userId)) {
            return res.status(400).json({ message: 'You are already enrolled in this course' });
        }

        course.enrolledUsers.push(userId);
        await course.save();
        const mailOptions = {
            from: "sahilroyal91@gmail.com",
            to: email,
            subject: "Course Confirmation",
            html: enrollmentConfirmation(username, course.title),
          }
          await transporter.sendMail(mailOptions);


        res.json({ message: 'Enrolled in the course successfully' });
    } catch (error) {
        console.error('Error enrolling in course:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.get('/courses/enrolled', authenticate, async (req, res) => {
    try {
        const userId = req.user._id;

        const enrolledCourses = await Course.find({ enrolledUsers: userId });

        res.json(enrolledCourses);
    } catch (error) {
        console.error('Error fetching enrolled courses:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
export default router;
