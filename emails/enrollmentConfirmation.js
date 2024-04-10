function enrollmentConfirmation(username, courseName) {

    return `
        <html>
        <head>
            <style>
                /* Add your CSS styles here */
            </style>
        </head>
        <body>
            <p>Hello ${username},</p>
            <p>We're excited to inform you that you've successfully enrolled in the course "${courseName}" on Aeonaxy.</p>
            <p><strong>Course Details:</strong></p>
            <ul>
                <li>Course Name: ${courseName}</li>
                <li>Start Date: [Course Start Date]</li>
                <li>Duration: [Course Duration]</li>
                <li>Instructor: [Instructor Name]</li>
            </ul>
            <p>Get ready to embark on an exciting learning journey and acquire valuable skills.</p>
            <p>If you have any questions or need assistance, don't hesitate to contact us at support@example.com.</p>
            <p>Best regards,<br>Aeonaxy Team</p>
        </body>
        </html>
    `;
}

export default enrollmentConfirmation