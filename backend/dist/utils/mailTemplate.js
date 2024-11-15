const passwordResetTemplate = (userName, link) => `
  <div style="font-family: Arial, sans-serif; background-color: #f5f5f5; padding: 20px;">
    <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; border-radius: 10px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
      <h1 style="color: #333333; text-align: center;">Hi! ${userName},</h1>
      <p style="color: #666666;">Hope you are doing well.</p>
      <p style="color: #666666;">Click the reset link below to reset your password:</p>
      <p style="text-align: center;">
        <a href="${link}" style="display: inline-block; background-color: #4CAF50; color: #ffffff; text-decoration: none; padding: 10px 20px; border-radius: 5px;">Reset Your Password</a>
      </p>
      <p style="color: #666666; text-align: center;">This link will expire in 5 MIN.</p>
      <p style="color: #666666;">If you did not request this password reset, please ignore this email.</p>
    </div>
  </div>
`;
export default passwordResetTemplate;
