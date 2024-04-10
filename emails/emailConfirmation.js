function generateRegistrationConfirmationEmail(username, confirmationLink) {
    return `
        <html>
        <head>
            <style>
                /* Add your CSS styles here */
            </style>
        </head>
        <body>
            <p>Dear ${username},</p>
            <p>Thank you for registering on Aeonaxy! We're thrilled to have you join our community.</p>
            <p>To complete your registration and start exploring our platform, please click the link below:</p>
            <p><a href="${confirmationLink}">Confirmation Link</a></p>
            <p>If you have any questions or need assistance, feel free to reach out to our support team at support@example.com.</p>
            <p>Welcome aboard!</p>
            <p>Best regards,<br>Aeonaxy Team</p>
        </body>
        </html>
    `;
}

export default generateRegistrationConfirmationEmail;