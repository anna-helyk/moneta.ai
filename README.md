# Investment Study App

A Next.js application for investment education and quiz assessment.

## Features
- Interactive investment quiz
- Personalized results based on quiz performance
- Email delivery of quiz results
- Multi-language support (English and Ukrainian)

## Getting Started

### Prerequisites
- Node.js 16.x or later
- npm or yarn
- EmailJS account for email functionality

### Installation

1. Clone the repository:
```bash
git clone [your-repo-url]
cd investment-study-app
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create a `.env.local` file in the root directory:
```
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key_here
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id_here
```

### Development

Run the development server:
```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Email Setup

The application uses EmailJS for sending quiz results. Follow these steps to configure email functionality:

1. Create an [EmailJS account](https://www.emailjs.com/)

2. Set up Email Service:
   - Go to EmailJS dashboard → "Email Services"
   - Add a new service (e.g., Gmail)
   - Copy the Service ID

3. Create Email Templates:
   - Go to "Email Templates"
   - Create two templates:
     a. High Score Template (ID: template_t362qfd)
     b. Default Template (ID: template_xh6ad1b)
   - Available template variables:
     - {{user_name}} - User's name
     - {{user_age}} - User's age
     - {{quiz_score}} - Quiz score (X/12)
     - {{result_title}} - Result category title
     - {{result_description}} - Detailed result description

4. Get your Public Key:
   - Go to Account → API Keys
   - Copy your Public Key

5. Configure environment variables in your deployment platform:
   ```
   NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key_here
   NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id_here
   ```

## Deployment

1. Push your code to your preferred Git repository

2. Deploy to your hosting platform (e.g., Vercel):
   - Connect your repository
   - Configure environment variables
   - Deploy

3. Verify email functionality:
   - Complete the quiz
   - Enter email details
   - Check if the result email is received

## Environment Variables

Required environment variables for deployment:

| Variable | Description |
|----------|-------------|
| NEXT_PUBLIC_EMAILJS_PUBLIC_KEY | EmailJS Public Key |
| NEXT_PUBLIC_EMAILJS_SERVICE_ID | EmailJS Service ID |

## Support

For issues or questions:
1. Check the [Issues](issues) section
2. Create a new issue with detailed description
3. Include steps to reproduce any bugs

## License

[Your chosen license] 