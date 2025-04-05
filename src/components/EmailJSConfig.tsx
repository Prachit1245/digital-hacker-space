
import { useEffect } from 'react';
import emailjs from 'emailjs-com';

interface EmailJSConfigProps {
  userId: string;
}

const EmailJSConfig: React.FC<EmailJSConfigProps> = ({ userId }) => {
  useEffect(() => {
    // Initialize EmailJS with your user ID
    emailjs.init(userId);
  }, [userId]);

  return null;
};

export default EmailJSConfig;
